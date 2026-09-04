import {
  t,
  getLanguage,
  getSupportedLanguages,
  setLanguage,
  onLanguageChange,
} from '../i18n.js';

/**
 * Render the language selector and wire it up.
 * Lives in #langSelector in the header.
 */
export function setupLanguage() {
  const container = document.getElementById('langSelector');
  if (!container) return;

  function render() {
    container.innerHTML = '';
    const current = getLanguage();
    for (const lang of getSupportedLanguages()) {
      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.textContent = t(`lang.${lang}`);
      btn.dataset.lang = lang;
      if (lang === current) btn.classList.add('active');
      btn.addEventListener('click', () => setLanguage(lang));
      container.appendChild(btn);
    }
  }

  render();
  onLanguageChange(render);
}
