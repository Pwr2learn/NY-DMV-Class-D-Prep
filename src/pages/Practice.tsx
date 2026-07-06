import { useAppContext } from '../contexts/AppContext';

export default function Practice() {
  const { t } = useAppContext();
  
  return (
    <div className="flex flex-col items-center mt-4">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.practice')}</h1>
        <div className="card">
            <h2>{t('practice.underConstruction')}</h2>
            <p className="mt-2 text-sm" style={{ opacity: 0.8 }}>
                {t('practice.description')}
            </p>
        </div>
      </div>
    </div>
  );
}
