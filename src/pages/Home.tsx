import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

export default function Home() {
  const { t } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center mt-4">
      <h1 className="mb-4" style={{ fontSize: 'var(--font-3xl)' }}>{t('home.title')}</h1>
      <p className="mb-4" style={{ fontSize: 'var(--font-lg)', maxWidth: '600px' }}>
        {t('home.subtitle')}
      </p>
      <p className="mb-4" style={{ maxWidth: '600px', color: 'var(--border-color)' }}>
        {t('home.description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" style={{ maxWidth: '800px', width: '100%' }}>
        <button className="card btn-primary" onClick={() => navigate('/learn')}>
          {t('home.startLearning')}
        </button>
        
        <button className="card btn-primary" onClick={() => navigate('/practice')}>
          {t('home.practiceQuestions')}
        </button>
        
        <button className="card btn-primary" onClick={() => navigate('/test')}>
          {t('home.takeMockTest')}
        </button>
        
        <button className="card btn-secondary" onClick={() => navigate('/progress')}>
          {t('home.viewProgress')}
        </button>
      </div>
    </div>
  );
}
