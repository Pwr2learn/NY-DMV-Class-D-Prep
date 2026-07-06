import React from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function Practice() {
  const { t } = useAppContext();
  
  return (
    <div className="flex flex-col items-center mt-4">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.practice')}</h1>
        <div className="card">
            <h2>Under Construction</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--border-color)' }}>
                This section will allow you to practice questions by specific topics like Road Signs, Right of Way, etc.
            </p>
        </div>
      </div>
    </div>
  );
}
