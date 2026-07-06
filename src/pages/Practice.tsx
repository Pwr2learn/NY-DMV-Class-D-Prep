import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import enQuestions from '../content/en/questions.json';
import esQuestions from '../content/es/questions.json';
import type { Question } from '../types';

export default function Practice() {
  const { t, language } = useAppContext();
  const navigate = useNavigate();
  
  const questions = (language === 'en' ? enQuestions : esQuestions) as Question[];

  // These keys correspond to the translation keys in en.json / es.json under practice.topics
  const topics = [
    'licenses',
    'restrictions',
    'points',
    'suspensions',
    'insurance',
    'registration',
    'road_signs',
    'traffic_lights',
    'pavement_markings',
    'right_of_way',
    'turning',
    'passing',
    'parking',
    'defensive_driving',
    'alcohol_and_drugs',
    'special_conditions',
    'school_buses',
    'emergency_vehicles',
    'crashes',
    'emergencies'
  ];
  
  return (
    <div className="flex flex-col items-center mt-4 pb-8">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.practice')}</h1>
        <p className="text-center mb-6" style={{ opacity: 0.8 }}>
          {t('practice.description')}
        </p>

        <h2 className="mb-4 text-center" style={{ fontSize: '1.5rem' }}>{t('practice.selectTopic')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map(topic => (
                <div 
                  key={topic} 
                  className="card cursor-pointer hover:border-[var(--primary-color)] transition-colors text-center"
                  onClick={() => navigate(`/practice/${topic}`)}
                  style={{ padding: '2rem 1rem' }}
                >
                    <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>
                        {/* We use type assertion any because TypeScript doesn't know these keys exist on the translation object statically without a complex type setup */}
                        {(t as any)(`practice.topics.${topic}`)}
                    </h3>
                    <p style={{ margin: 0, opacity: 0.6, fontSize: '0.85rem' }}>
                      {t('learn.questionsAvailable', { count: questions.filter(q => q.topic === topic && q.status === 'approved').length })}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
