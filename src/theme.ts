export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

export const getPreferredTheme = (): Theme => {
  let savedTheme: string | null = null;

  try {
    savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The visual theme still applies when persistence is unavailable.
  }

  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'dark' ? '#17191e' : '#f4f4f2',
  );
};

export const initializeTheme = () => applyTheme(getPreferredTheme());
