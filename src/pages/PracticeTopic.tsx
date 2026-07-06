import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

import enQuestions from '../content/en/questions.json';
import esQuestions from '../content/es/questions.json';
import type { Question } from '../types';

export default function PracticeTopic() {
  const { topicId } = useParams();
  const { language, t } = useAppContext();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const questions = language === 'en' ? enQuestions : esQuestions;

  // Filter questions by the selected topic
  const topicQuestions = useMemo(() => {
    return (questions as Question[]).filter(q => q.topic === topicId && q.status === 'approved');
  }, [questions, topicId]);

  if (!topicId || topicQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8">
        <h2>{t('learn.noMaterials')}</h2>
        <button className="btn-primary mt-4" onClick={() => navigate('/practice')}>
          {t('learn.goBack')}
        </button>
      </div>
    );
  }

  const currentQ = topicQuestions[currentIndex];
  
  // Need the localized topic name
  const topicName = (t as any)(`practice.topics.${topicId}`);

  const handleNext = () => {
    if (currentIndex < topicQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      navigate('/practice');
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 pb-8">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <button 
          className="mb-4" 
          onClick={() => navigate('/practice')}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--primary-color)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0
          }}
        >
          {t('learn.goBack')}
        </button>
        
        <h1 className="mb-2">{topicName} Practice</h1>
        <div className="flex justify-between items-center mb-2">
          <span>{t('test.questionOf', { current: currentIndex + 1, total: topicQuestions.length })}</span>
        </div>
        
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: `${((currentIndex) / topicQuestions.length) * 100}%` }}></div>
        </div>

        <div className="card mt-4">
          <h2 className="mb-4">{currentQ.question}</h2>
          
          <div className="flex flex-col gap-2">
            {currentQ.choices.map((choice, i) => {
              // Determine button styling based on if user has answered
              let btnClass = 'choice-btn';
              if (selectedAnswer) {
                if (choice === currentQ.correctAnswer) {
                  btnClass += ' bg-green-100 border-green-500 text-green-800';
                } else if (choice === selectedAnswer) {
                  btnClass += ' bg-red-100 border-red-500 text-red-800';
                }
              }

              // Overriding some inline styles manually if classes aren't enough without tailwind compilation
              const inlineStyle = selectedAnswer 
                ? (choice === currentQ.correctAnswer 
                    ? { backgroundColor: 'var(--success-color)', color: 'white', borderColor: 'var(--success-color)' }
                    : choice === selectedAnswer 
                      ? { backgroundColor: 'var(--error-color)', color: 'white', borderColor: 'var(--error-color)' }
                      : { opacity: 0.5 })
                : {};

              return (
                <button 
                  key={i}
                  className={btnClass}
                  onClick={() => !selectedAnswer && setSelectedAnswer(choice)}
                  style={inlineStyle}
                  disabled={selectedAnswer !== null}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>

        {selectedAnswer && (
          <div className="card mt-4" style={{ backgroundColor: 'var(--bg-color)', borderLeft: '4px solid var(--primary-color)' }}>
            <h3 className="mb-2">{t('results.explanation')}</h3>
            <p className="mb-2">{currentQ.explanation}</p>
            <em style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t('results.source')} {currentQ.source}</em>
          </div>
        )}

        <div className="flex justify-end mt-4">
          {selectedAnswer && (
            <button className="btn-primary" onClick={handleNext}>
              {currentIndex < topicQuestions.length - 1 ? t('test.next') : t('learn.goBack')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
