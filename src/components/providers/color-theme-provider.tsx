'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  colorThemes,
  DEFAULT_COLOR_THEME,
  type ColorThemeId,
  type ColorThemeOption,
} from '@/config/color-themes';

const STORAGE_KEY = 'portfolio-color-theme';

const listeners = new Set<() => void>();

function getSnapshot(): ColorThemeId {
  if (typeof window === 'undefined') return DEFAULT_COLOR_THEME;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ColorThemeId | null;
    if (saved && colorThemes.some((t) => t.id === saved)) {
      return saved;
    }
  } catch {
    // LocalStorage unavailable
  }
  return DEFAULT_COLOR_THEME;
}

function getServerSnapshot(): ColorThemeId {
  return DEFAULT_COLOR_THEME;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

interface ColorThemeContextType {
  colorTheme: ColorThemeId;
  setColorTheme: (theme: ColorThemeId) => void;
  themes: ColorThemeOption[];
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  colorTheme: DEFAULT_COLOR_THEME,
  setColorTheme: () => {},
  themes: colorThemes,
});

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const colorTheme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setColorTheme = useCallback((theme: ColorThemeId) => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // LocalStorage unavailable
    }
    document.documentElement.setAttribute('data-color-theme', theme);
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <ColorThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        themes: colorThemes,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
}
