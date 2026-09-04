import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * The i18n module reads navigator.language and localStorage on init.
 * For node-environment tests we shim those globals before each test.
 *
 * We use Object.defineProperty because in newer Node versions
 * globalThis.navigator is a non-configurable getter.
 */
function shimGlobals({ langs = ['pt-BR'], storage = {} } = {}) {
  Object.defineProperty(globalThis, 'navigator', {
    value: { languages: langs, language: langs[0] },
    writable: true,
    configurable: true,
  });
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      _store: { ...storage },
      getItem(k) {
        return this._store[k] ?? null;
      },
      setItem(k, v) {
        this._store[k] = String(v);
      },
      removeItem(k) {
        delete this._store[k];
      },
    },
    writable: true,
    configurable: true,
  });
  Object.defineProperty(globalThis, 'document', {
    value: {
      documentElement: {
        attrs: {},
        setAttribute(k, v) {
          this.attrs[k] = v;
        },
        getAttribute(k) {
          return this.attrs[k];
        },
      },
    },
    writable: true,
    configurable: true,
  });
}

async function loadFreshI18n() {
  // vi.resetModules clears module cache so each test gets a fresh module
  vi.resetModules();
  return await import('../src/i18n.js');
}

describe('i18n language detection', () => {
  beforeEach(() => {
    shimGlobals({ langs: ['pt-BR'], storage: {} });
  });

  it('detects portuguese from pt-BR browser locale', async () => {
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    expect(i18n.getLanguage()).toBe('pt');
  });

  it('falls back to portuguese when browser language is unsupported', async () => {
    shimGlobals({ langs: ['fr-FR', 'it-IT'], storage: {} });
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    expect(i18n.getLanguage()).toBe('pt');
  });

  it('picks english when browser sends en-US', async () => {
    shimGlobals({ langs: ['en-US'], storage: {} });
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    expect(i18n.getLanguage()).toBe('en');
  });

  it('honors stored language over browser preference', async () => {
    shimGlobals({ langs: ['en-US'], storage: { 'forro-seq-lang': 'pt' } });
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    expect(i18n.getLanguage()).toBe('pt');
  });
});

describe('i18n translations', () => {
  beforeEach(() => {
    shimGlobals({ langs: ['pt-BR'], storage: {} });
  });

  it('returns portuguese strings by default', async () => {
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    expect(i18n.t('transport.play')).toBe('Tocar');
    expect(i18n.t('transport.stop')).toBe('Parar');
    expect(i18n.t('bars.title')).toBe('COMPASSO');
  });

  it('switches to english when setLanguage("en") is called', async () => {
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    i18n.setLanguage('en');
    expect(i18n.getLanguage()).toBe('en');
    expect(i18n.t('transport.play')).toBe('Play');
    expect(i18n.t('bars.title')).toBe('BAR');
  });

  it('returns the key itself for unknown translations', async () => {
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    expect(i18n.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('notifies subscribers when language changes', async () => {
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    const calls = [];
    i18n.onLanguageChange((lang) => calls.push(lang));
    i18n.setLanguage('en');
    expect(calls).toEqual(['en']);
  });

  it('ignores unsupported languages on setLanguage', async () => {
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    const before = i18n.getLanguage();
    i18n.setLanguage('zz');
    expect(i18n.getLanguage()).toBe(before);
  });

  it('does not fire change event when setting the same language', async () => {
    const i18n = await loadFreshI18n();
    i18n.initLanguage();
    const calls = [];
    i18n.onLanguageChange((lang) => calls.push(lang));
    i18n.setLanguage(i18n.getLanguage());
    expect(calls).toHaveLength(0);
  });
});
