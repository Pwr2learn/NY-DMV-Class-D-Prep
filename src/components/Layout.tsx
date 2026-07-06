import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Settings, Moon, Sun, Languages } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, language, setLanguage, fontSize, setFontSize, t } = useAppContext();

  return (
    <div className="app-container">
      <header className="header">
        <nav className="header-nav">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/learn" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            {t('nav.learn')}
          </NavLink>
          <NavLink to="/practice" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            {t('nav.practice')}
          </NavLink>
          <NavLink to="/test" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            {t('nav.mockTest')}
          </NavLink>
          <NavLink to="/progress" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            {t('nav.progress')}
          </NavLink>
          <NavLink to="/help" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            {t('nav.help')}
          </NavLink>
        </nav>
        
        <div className="header-controls">
          <NavLink to="/settings" className={({isActive}) => isActive ? "control-btn nav-link active" : "control-btn nav-link"} aria-label="Settings" style={{ padding: '0.5rem' }}>
            <Settings size={20} /> <span style={{ marginLeft: '0.5rem' }}>{t('nav.settings')}</span>
          </NavLink>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
