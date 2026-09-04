import { t, onLanguageChange } from '../i18n.js';

const STORAGE_KEY = 'forro-seq-theme';

function updateThemeButtonLabel() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const isLight =
    document.documentElement.getAttribute('data-theme') === 'light';
  btn.textContent = isLight ? t('theme.light') : t('theme.dark');
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeButtonLabel();
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    // localStorage may be unavailable (private mode, etc.) — non-fatal
  }
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {
    // fall through to OS preference
  }
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function setupTheme() {
  applyTheme(getInitialTheme());

  document.getElementById('themeBtn').addEventListener('click', () => {
    const isLight =
      document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });

  // Re-render the button label when the user changes language
  onLanguageChange(updateThemeButtonLabel);
}
