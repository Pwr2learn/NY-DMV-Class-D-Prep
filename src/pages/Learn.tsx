import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import enChapters from '../content/en/chapters.json';
import esChapters from '../content/es/chapters.json';

export default function Learn() {
  const { t, language } = useAppContext();
  const navigate = useNavigate();
  
  const chapters = language === 'en' ? enChapters : esChapters;
  
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
