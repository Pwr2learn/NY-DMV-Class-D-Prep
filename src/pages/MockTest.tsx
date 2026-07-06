import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import type { Question } from '../types';
import { generateMockTest } from '../lib/quizEngine';
import { calculateScore, canStillPass } from '../lib/scoring';
import { updateProgressWithResult } from '../lib/progress';

import enQuestions from '../content/en/questions.json';
import esQuestions from '../content/es/questions.json';

type TestMode = 'normal' | 'hard' | 'expert';

export default function MockTest() {
  const { t, language, progress, updateProgress, usedQuestionIds, addUsedQuestions, resetUsedQuestions } = useAppContext();
  const navigate = useNavigate();

  const [mode, setMode] = useState<TestMode | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [, setIsFinished] = useState(false);
  const [earlyFailWarning, setEarlyFailWarning] = useState(false);
  const [continueAfterFail, setContinueAfterFail] = useState(false);

  // Load questions based on language
  const allQuestions = useMemo(() => {
    return (language === 'en' ? enQuestions : esQuestions) as Question[];
  }, [language]);

  const startTest = (selectedMode: TestMode) => {
    const testQuestions = generateMockTest(allQuestions, selectedMode, usedQuestionIds);
    
    // Check if a reset just occurred in the engine by comparing lengths if needed, 
    // or we can just proactively add the new ones.
    addUsedQuestions(testQuestions.map(q => q.id));

    setQuestions(testQuestions);
    setMode(selectedMode);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setEarlyFailWarning(false);
    setContinueAfterFail(false);
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentIndex];
    const newAnswers = { ...userAnswers, [currentQuestion.id]: answer };
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    // Check if early fail conditions met
    if (!continueAfterFail && mode) {
        let currentIncorrect = 0;
        let currentRoadSignIncorrect = 0;
        
        const roadSignTotal = questions.filter(q => q.isRoadSign).length;

        for (const [id, answer] of Object.entries(userAnswers)) {
            const q = questions.find(q => q.id === id);
            if (q && q.correctAnswer !== answer) {
                currentIncorrect++;
                if (q.isRoadSign) currentRoadSignIncorrect++;
            }
        }

        const questionsLeft = questions.length - Object.keys(userAnswers).length;
        
        if (!canStillPass(questionsLeft, currentIncorrect, currentRoadSignIncorrect, mode, roadSignTotal)) {
            setEarlyFailWarning(true);
            return;
        }
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitTest();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const submitTest = () => {
    if (!mode) return;
    const result = calculateScore(questions, userAnswers, mode);
    updateProgress(updateProgressWithResult(progress, result));
    
    // Pass result to Results page via state
    navigate('/results', { state: { result } });
  };

  if (!mode) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-4">
        <h1 className="mb-4 text-2xl font-bold">{t('nav.mockTest')}</h1>
        <p className="mb-4">{t('test.selectDifficulty')}</p>
        
        <div className="card mb-6 bg-[var(--bg-color)]">
          <h3 className="mb-2">{t('test.poolStatus')}</h3>
          <p className="mb-2" style={{ opacity: 0.8 }}>
            {t('test.available')}: {allQuestions.length} | {t('test.used')}: {usedQuestionIds.length}
          </p>
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={resetUsedQuestions}>
            {t('test.resetPool')}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ maxWidth: '800px', width: '100%' }}>
          <button className="btn-primary" style={{ padding: '1.5rem' }} onClick={() => startTest('normal')}>
            {t('test.normal')}
          </button>
          <button className="btn-primary" onClick={() => startTest('hard')} style={{ backgroundColor: 'var(--warning-color)', padding: '1.5rem' }}>
            {t('test.hard')}
          </button>
          <button className="btn-primary" onClick={() => startTest('expert')} style={{ backgroundColor: 'var(--error-color)', padding: '1.5rem' }}>
            {t('test.expert')}
          </button>
        </div>
      </div>
    );
  }

  if (earlyFailWarning && !continueAfterFail) {
      return (
          <div className="flex flex-col items-center justify-center text-center mt-4">
              <div className="warning-alert max-w-lg">
                  <h3 className="font-bold mb-2">{t('test.notice')}</h3>
                  <p className="mb-4">{t('test.earlyFailWarning')}</p>
                  <div className="flex gap-4 justify-center">
                      <button className="btn-secondary" onClick={() => { setContinueAfterFail(true); setEarlyFailWarning(false); nextQuestion(); }}>
                          {t('test.finishAnyway')}
                      </button>
                      <button className="btn-primary" onClick={submitTest}>
                          {t('test.stopTest')}
                      </button>
                  </div>
              </div>
          </div>
      )
  }

  if (questions.length === 0) return <div>{t('test.loading')}</div>;

  const currentQ = questions[currentIndex];
  const selectedAnswer = userAnswers[currentQ.id];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div className="flex justify-between items-center mb-2">
          <span>{t('test.questionOf', { current: currentIndex + 1, total: questions.length })}</span>
          <div className="flex gap-4">
              <span>{t('test.answered', { count: answeredCount })}</span>
              <span>{t('test.left', { count: questions.length - answeredCount })}</span>
          </div>
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <div className="card mt-4">
          <h2 className="mb-4">{currentQ.question}</h2>
          
          <div className="flex flex-col gap-2">
            {currentQ.choices.map((choice, i) => (
              <button 
                key={i}
                className={`choice-btn ${selectedAnswer === choice ? 'selected' : ''}`}
                onClick={() => handleAnswer(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button className="btn-secondary" onClick={prevQuestion} disabled={currentIndex === 0}>
            {t('test.prev')}
          </button>
          
          {currentIndex < questions.length - 1 ? (
            <button className="btn-primary" onClick={nextQuestion} disabled={!selectedAnswer}>
              {t('test.next')}
            </button>
          ) : (
            <button className="btn-primary" onClick={submitTest} disabled={!selectedAnswer} style={{ backgroundColor: 'var(--success-color)' }}>
              {t('test.submit')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
