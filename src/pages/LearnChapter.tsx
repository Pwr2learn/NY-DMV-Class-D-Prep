import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';

import enChapters from '../content/en/chapters.json';
import esChapters from '../content/es/chapters.json';
import enQuestions from '../content/en/questions.json';
import esQuestions from '../content/es/questions.json';

export default function LearnChapter() {
  const { chapterId } = useParams();
  const { language, t } = useAppContext();
  const navigate = useNavigate();

  const chapterNum = parseInt(chapterId || '0', 10);

  const chapters = language === 'en' ? enChapters : esChapters;
  const questions = language === 'en' ? enQuestions : esQuestions;

  const chapterData = useMemo(() => {
    return chapters.find(c => c.number === chapterNum);
  }, [chapters, chapterNum]);

  const studyFacts = useMemo(() => {
    return questions.filter(q => q.chapter === chapterNum);
  }, [questions, chapterNum]);

  if (!chapterData) {
    return (
      <div className="flex flex-col items-center mt-8">
        <h2>{t('learn.chapterNotFound')}</h2>
        <button className="btn-primary mt-4" onClick={() => navigate('/learn')}>
          {t('learn.goBack')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4 pb-8">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <button 
          className="mb-4" 
          onClick={() => navigate('/learn')}
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
          {t('learn.backToChapters')}
        </button>
        
        <h1 className="mb-2">{t('learn.chapter')} {chapterData.number}: {chapterData.title}</h1>
        <p className="mb-6" style={{ opacity: 0.8, fontSize: '1.1rem' }}>
          {chapterData.summary}
        </p>

        {studyFacts.length === 0 ? (
          <div className="card text-center">
            <p>{t('learn.noMaterials')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {studyFacts.map((fact, index) => (
              <div key={fact.id} className="card">
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div 
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      minWidth: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      marginRight: '1rem',
                      marginTop: '2px'
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-2" style={{ fontSize: '1.1rem' }}>{fact.question}</h3>
                    <div style={{ 
                      backgroundColor: 'var(--bg-color)', 
                      padding: '1rem', 
                      borderRadius: '8px',
                      borderLeft: '4px solid var(--success-color)'
                    }}>
                      <p className="font-bold mb-2" style={{ color: 'var(--success-color)' }}>
                        {fact.correctAnswer}
                      </p>
                      <p style={{ fontSize: '0.95rem' }}>{fact.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
