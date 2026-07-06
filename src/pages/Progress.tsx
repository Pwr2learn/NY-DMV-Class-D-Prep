import { useAppContext } from '../contexts/AppContext';
import { getReadinessLevel } from '../lib/progress';

export default function Progress() {
  const { t, progress } = useAppContext();
  
  const readiness = getReadinessLevel(progress);
  
  const accuracy = progress.totalQuestionsAnswered > 0 
    ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100) 
    : 0;

  return (
    <div className="flex flex-col items-center mt-4 pb-8">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.progress')}</h1>
        
        <div className="card mb-4 text-center">
            <h2 className="mb-2">{t('progress.readinessLevel')}</h2>
            <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                {readiness}
            </p>
            <p className="mt-2 text-sm" style={{ opacity: 0.8 }}>
                {t('progress.keepTakingTests')}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card text-center">
                <h3>{t('progress.overallAccuracy')}</h3>
                <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold' }}>{accuracy}%</p>
                <p>({t('progress.correctOutOf', { correct: progress.totalCorrect, total: progress.totalQuestionsAnswered })})</p>
            </div>
            <div className="card text-center">
                <h3>{t('progress.roadSignAccuracy')}</h3>
                <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold' }}>{Math.round(progress.roadSignAccuracy)}%</p>
            </div>
            <div className="card text-center">
                <h3>{t('progress.mockTestsTaken')}</h3>
                <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold' }}>{progress.mockTestsCompleted}</p>
            </div>
            <div className="card text-center">
                <h3>{t('progress.bestScore')}</h3>
                <p style={{ fontSize: 'var(--font-2xl)', fontWeight: 'bold' }}>{progress.bestMockTestScore}%</p>
            </div>
        </div>

        {Object.keys(progress.weakTopics).length > 0 && (
            <div className="card mt-4">
                <h3 className="mb-4">{t('progress.areasToImprove')}</h3>
                <ul>
                    {Object.entries(progress.weakTopics)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([topic, mistakes], i) => (
                            <li key={i} className="mb-2 flex justify-between">
                                <span style={{ textTransform: 'capitalize' }}>{topic.replace('_', ' ')}</span>
                                <span style={{ color: 'var(--error-color)' }}>{t('progress.mistakes', { count: mistakes })}</span>
                            </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </div>
  );
}
