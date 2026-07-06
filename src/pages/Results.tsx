import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { QuizResult } from '../types';

export default function Results() {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const result = location.state?.result as QuizResult;

  if (!result) {
    return <Navigate to="/test" replace />;
  }

  const isPassed = result.passed;

  return (
    <div className="flex flex-col items-center mt-4 pb-8">
      <div className="card text-center" style={{ width: '100%', maxWidth: '800px', borderColor: isPassed ? 'var(--success-color)' : 'var(--error-color)' }}>
        <h1 style={{ color: isPassed ? 'var(--success-color)' : 'var(--error-color)', fontSize: 'var(--font-3xl)' }} className="mb-2">
          {isPassed ? t('results.pass') : t('results.fail')}
        </h1>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4" style={{ backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
            <h3>{t('results.score')}</h3>
            <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold' }}>{result.totalCorrect} / {result.totalCorrect + result.totalIncorrect}</p>
            <p>{result.scorePercentage}%</p>
          </div>
          <div className="p-4" style={{ backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
            <h3>{t('results.roadSigns')}</h3>
            <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold' }}>{result.roadSignCorrect} / {result.roadSignTotal}</p>
          </div>
        </div>

        {result.weakTopics.length > 0 && (
            <div className="mt-4 p-4 text-left" style={{ backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
                <h3 className="mb-2">{t('results.weakTopics')}:</h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                    {result.weakTopics.slice(0, 3).map((topic, i) => (
                        <li key={i}>{topic.replace('_', ' ').toUpperCase()}</li>
                    ))}
                </ul>
            </div>
        )}

        <div className="flex gap-4 justify-center mt-6 flex-wrap">
          <button className="btn-primary" onClick={() => navigate('/test')}>
            {t('results.retake')}
          </button>
          <button className="btn-secondary" onClick={() => navigate('/practice')}>
            {t('results.practiceWeak')}
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')}>
            {t('results.returnHome')}
          </button>
        </div>
      </div>

      {result.missedQuestions.length > 0 && (
        <div className="mt-8" style={{ width: '100%', maxWidth: '800px' }}>
          <h2 className="mb-4">Review Missed Questions</h2>
          <div className="flex flex-col gap-4">
            {result.missedQuestions.map((q, i) => (
              <div key={i} className="card">
                <p className="font-bold mb-2">Q: {q.question}</p>
                <p style={{ color: 'var(--error-color)' }} className="mb-1">Your Answer: {result.userAnswers[q.id]}</p>
                <p style={{ color: 'var(--success-color)' }} className="mb-2">Correct Answer: {q.correctAnswer}</p>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '4px', fontSize: 'var(--font-sm)' }}>
                    <strong>Explanation:</strong> {q.explanation} <br/>
                    <em>Source: {q.source}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
