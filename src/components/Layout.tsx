import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Settings, Moon, Sun } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, fontSize, setFontSize, t } = useAppContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const cycleFontSize = () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'] as const;
    const currentIndex = sizes.indexOf(fontSize);
    setFontSize(sizes[(currentIndex + 1) % sizes.length]);
  };

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
          <button onClick={toggleTheme} className="control-btn" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={cycleFontSize} className="control-btn" aria-label="Change Font Size" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>A</span>
            <span style={{ fontSize: '0.8rem' }}>{t(`settings.${fontSize}`)}</span>
          </button>
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
