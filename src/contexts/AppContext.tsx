import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language, Theme, FontSize, UserProgress } from '../types';
import { loadProgress, saveProgress } from '../lib/progress';

import en from '../locales/en.json';
import es from '../locales/es.json';

const translations = { en, es };

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  progress: UserProgress;
  updateProgress: (newProgress: UserProgress) => void;
  usedQuestionIds: string[];
  addUsedQuestions: (ids: string[]) => void;
  resetUsedQuestions: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [progress, setProgressState] = useState<UserProgress>(loadProgress());
  const [usedQuestionIds, setUsedQuestionIdsState] = useState<string[]>([]);

  // Load initial settings
  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as Language;
    if (savedLang) setLanguageState(savedLang);

    const savedTheme = localStorage.getItem('app_theme') as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }

    const savedFontSize = localStorage.getItem('app_fontsize') as FontSize;
    if (savedFontSize) setFontSizeState(savedFontSize);

    const savedUsed = localStorage.getItem('app_used_questions');
    if (savedUsed) {
      try {
        setUsedQuestionIdsState(JSON.parse(savedUsed));
      } catch (e) {
        setUsedQuestionIdsState([]);
      }
    }
  }, []);

  // Update HTML classes when settings change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-fontsize', fontSize);
  }, [theme, fontSize]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('app_theme', t);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('app_fontsize', size);
  };

  const updateProgress = (newProgress: UserProgress) => {
    setProgressState(newProgress);
    saveProgress(newProgress);
  };

  const addUsedQuestions = (ids: string[]) => {
    const newUsed = Array.from(new Set([...usedQuestionIds, ...ids]));
    setUsedQuestionIdsState(newUsed);
    localStorage.setItem('app_used_questions', JSON.stringify(newUsed));
  };

  const resetUsedQuestions = () => {
    setUsedQuestionIdsState([]);
    localStorage.removeItem('app_used_questions');
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if missing
      }
    }
    
    if (typeof value !== 'string') return key;

    let result = value;
    if (params) {
      for (const [pKey, pVal] of Object.entries(params)) {
        result = result.replace(new RegExp(`{{${pKey}}}`, 'g'), String(pVal));
      }
    }
    return result;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        fontSize,
        setFontSize,
        progress,
        updateProgress,
        usedQuestionIds,
        addUsedQuestions,
        resetUsedQuestions,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
