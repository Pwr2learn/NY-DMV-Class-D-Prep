import { useAppContext } from '../contexts/AppContext';

export default function Settings() {
  const { t, language, setLanguage, theme, setTheme, fontSize, setFontSize } = useAppContext();

  return (
    <div className="flex flex-col items-center mt-4 pb-8">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('settings.title')}</h1>
        <p className="text-center mb-6" style={{ opacity: 0.8 }}>
          {t('settings.description')}
        </p>

        <div className="card mb-4">
          <h2 className="mb-4">{t('settings.language')}</h2>
          <div className="flex gap-4">
            <button 
              className={`btn-primary ${language === 'en' ? '' : 'opacity-50'}`} 
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <button 
              className={`btn-primary ${language === 'es' ? '' : 'opacity-50'}`} 
              onClick={() => setLanguage('es')}
            >
              Español
            </button>
          </div>
        </div>

        <div className="card mb-4">
          <h2 className="mb-4">{t('settings.theme')}</h2>
          <div className="flex gap-4">
            <button 
              className={`btn-primary ${theme === 'light' ? '' : 'opacity-50'}`} 
              onClick={() => setTheme('light')}
            >
              {t('settings.light')}
            </button>
            <button 
              className={`btn-primary ${theme === 'dark' ? '' : 'opacity-50'}`} 
              onClick={() => setTheme('dark')}
            >
              {t('settings.dark')}
            </button>
          </div>
        </div>

        <div className="card mb-4">
          <h2 className="mb-4">{t('settings.fontSize')}</h2>
          <div className="flex flex-wrap gap-4">
            {['small', 'medium', 'large', 'xlarge'].map((size) => (
              <button 
                key={size}
                className={`btn-primary ${fontSize === size ? '' : 'opacity-50'}`} 
                onClick={() => setFontSize(size as any)}
              >
                {t(`settings.${size}`)}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
