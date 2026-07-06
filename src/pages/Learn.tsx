import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import enChapters from '../content/en/chapters.json';
import esChapters from '../content/es/chapters.json';
import enQuestions from '../content/en/questions.json';
import esQuestions from '../content/es/questions.json';
import type { Question } from '../types';

export default function Learn() {
  const { t, language } = useAppContext();
  const navigate = useNavigate();
  
  const chapters = language === 'en' ? enChapters : esChapters;
  const questions = (language === 'en' ? enQuestions : esQuestions) as Question[];
  
  return (
    <div className="flex flex-col items-center mt-4 pb-8">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.learn')}</h1>
        <p className="text-center mb-6" style={{ opacity: 0.8 }}>
          {t('learn.description')}
        </p>
        
        <div className="flex flex-col gap-4">
          {chapters.map((chapter) => (
            <div 
              key={chapter.id} 
              className="card cursor-pointer hover:border-[var(--primary-color)] transition-colors"
              onClick={() => navigate(`/learn/${chapter.number}`)}
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center' }}
            >
              <div 
                style={{ 
                  backgroundColor: 'var(--primary-color)', 
                  color: 'white',
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  marginRight: '1rem',
                  flexShrink: 0
                }}
              >
                {chapter.number}
              </div>
              <div>
                <h3 className="mb-1" style={{ margin: 0, fontSize: '1.2rem' }}>{chapter.title}</h3>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>{chapter.summary}</p>
                <p style={{ margin: 0, marginTop: '0.5rem', opacity: 0.6, fontSize: '0.85rem' }}>
                  {t('learn.questionsAvailable', { count: questions.filter(q => q.chapter === chapter.number && q.status === 'approved').length })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
