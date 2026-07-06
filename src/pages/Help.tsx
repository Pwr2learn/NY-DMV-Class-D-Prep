import React from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function Help() {
  const { t } = useAppContext();
  
  return (
    <div className="flex flex-col items-center mt-4">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.help')}</h1>
        <div className="card">
            <h2 className="mb-2">How to Use This App</h2>
            <p className="mb-4">Use the top navigation to study lessons, practice topics, or take mock exams.</p>

            <h2 className="mb-2">Mock Exam Rules</h2>
            <ul className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                <li><strong>Normal:</strong> 20 questions. Need 14/20 total and 2/4 road signs to pass.</li>
                <li><strong>Hard:</strong> 20 questions. Need 19/20 total and 4/4 road signs to pass.</li>
                <li><strong>Expert:</strong> 50 questions. Need 49/50 total and 90% road signs to pass.</li>
            </ul>

            <h2 className="mb-2">Accessibility</h2>
            <p>Use the buttons in the top right to change the language (EN/ES), toggle dark/light mode, or change the font size.</p>
        </div>
      </div>
    </div>
  );
}
