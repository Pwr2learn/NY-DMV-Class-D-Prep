import { useAppContext } from '../contexts/AppContext';

export default function Learn() {
  const { t } = useAppContext();
  
  return (
    <div className="flex flex-col items-center mt-4">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.learn')}</h1>
        <div className="card">
            <h2>Under Construction</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--border-color)' }}>
                This section will contain chapter-by-chapter lessons extracted from the NY DMV manual.
            </p>
        </div>
      </div>
    </div>
  );
}
