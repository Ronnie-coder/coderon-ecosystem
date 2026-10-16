"use client";

// Visitor preferences: colour theme and motion.
// Both are applied as attributes on <html> (data-theme, data-motion) so CSS can react
// before React hydrates; the inline script in layout.tsx sets them on first paint.
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';

type Theme = 'dark' | 'light';
type Motion = 'full' | 'reduce';

export const THEME_KEY = 'coderon-theme-v2';
export const MOTION_KEY = 'coderon-motion';

interface PrefsContextType {
  theme: Theme;
  toggleTheme: () => void;
  motion: Motion;
  toggleMotion: () => void;
}

const PrefsContext = createContext<PrefsContextType | undefined>(undefined);

const readAttr = <T extends string>(name: string, fallback: T): T => {
  if (typeof document === 'undefined') return fallback;
  return (document.documentElement.getAttribute(name) as T) || fallback;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [motion, setMotion] = useState<Motion>('full');

  // Sync state with what the inline script already applied.
  useEffect(() => {
    setTheme(readAttr<Theme>('data-theme', 'light'));
    setMotion(readAttr<Motion>('data-motion', 'full'));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch {}
      return next;
    });
  }, []);

  const toggleMotion = useCallback(() => {
    setMotion((prev) => {
      const next = prev === 'reduce' ? 'full' : 'reduce';
      document.documentElement.setAttribute('data-motion', next);
      try { localStorage.setItem(MOTION_KEY, next); } catch {}
      window.dispatchEvent(new CustomEvent('coderon:motion', { detail: next }));
      return next;
    });
  }, []);

  return (
    <PrefsContext.Provider value={{ theme, toggleTheme, motion, toggleMotion }}>
      <MotionConfig reducedMotion={motion === 'reduce' ? 'always' : 'user'}>{children}</MotionConfig>
    </PrefsContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(PrefsContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

/** True when animations should be skipped. data-motion starts from the OS setting and the switch overrides it. */
export const prefersReducedMotion = () =>
  typeof document === 'undefined' || document.documentElement.getAttribute('data-motion') === 'reduce';

/** Runs before paint (inlined in <head>) so there is no flash of the wrong theme. */
export const prefsBootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('${THEME_KEY}');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t);var m=localStorage.getItem('${MOTION_KEY}');if(m!=='full'&&m!=='reduce'){m=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'full'}d.setAttribute('data-motion',m)}catch(e){}})();`;
