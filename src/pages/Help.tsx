import { useAppContext } from '../contexts/AppContext';

export default function Help() {
  const { t } = useAppContext();
  
  return (
    <div className="flex flex-col items-center mt-4">
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <h1 className="mb-4 text-center">{t('nav.help')}</h1>
        <div className="card">
            <h2 className="mb-2">{t('helpPage.howToUseTitle')}</h2>
            <p className="mb-4">{t('helpPage.howToUseText')}</p>

            <h2 className="mb-2">{t('helpPage.mockRulesTitle')}</h2>
            <ul className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                <li><strong>{t('helpPage.mockNormalTitle')}</strong>{t('helpPage.mockNormalDesc')}</li>
                <li><strong>{t('helpPage.mockHardTitle')}</strong>{t('helpPage.mockHardDesc')}</li>
                <li><strong>{t('helpPage.mockExpertTitle')}</strong>{t('helpPage.mockExpertDesc')}</li>
            </ul>

            <h2 className="mb-2">{t('helpPage.accessibilityTitle')}</h2>
            <p>{t('helpPage.accessibilityText')}</p>
        </div>
      </div>
    </div>
  );
}
