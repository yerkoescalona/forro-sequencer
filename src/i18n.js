/**
 * Internationalization module.
 *
 * Default language: Portuguese (the language of forró itself).
 * Fallback: English.
 *
 * Musical terms (Baião, Xote, Forró, Maceta, Bacalhau, Pandeiro,
 * xi/tum/tũ/tapa) are intentionally NOT translated — they are
 * proper names of Brazilian percussion techniques and rhythms.
 *
 * To add a new language, copy one of the objects below, translate
 * the values, and add the key to SUPPORTED_LANGUAGES.
 */

const STORAGE_KEY = 'forro-seq-lang';
const DEFAULT_LANG = 'pt';
const FALLBACK_LANG = 'en';

const TRANSLATIONS = {
  pt: {
    // Header
    'app.title': 'Forró Sequencer',

    // Tempo
    'tempo.bpm': 'BPM',
    'tempo.tap': 'Marcar Tempo',

    // Transport
    'transport.play': 'Tocar',
    'transport.stop': 'Parar',
    'transport.clear': 'Limpar',
    'transport.hint': 'Tocar inicia o ritmo, Limpar apaga o padrão, Marcar Tempo ajusta o BPM batendo no botão',

    // Sections
    'section.instrument': 'Instrumento',
    'section.instrument.hint': 'Escolha um instrumento individual ou Todos para tocar zabumba, pandeiro e triângulo juntos',
    'section.rhythms': 'Ritmos',
    'section.rhythms.hint': 'Padrões tradicionais de forró — baião, xote, forró, xaxado, coco e rastapé. Selecione para carregar o padrão no sequenciador',

    // Bars
    'bars.add': '+ Compasso',
    'bars.remove': '− Compasso',
    'bars.title': 'COMPASSO',
    'grid.toggle.toTriplet': '12+12',
    'grid.toggle.toBinary': '4+4',
    'bars.hint': 'Adicione compassos para padrões mais longos. 4+4 usa colcheias, 12+12 dá maior resolução para trabalhar com tercinas',

    // Theme
    'theme.dark': 'ESCURO',
    'theme.light': 'CLARO',

    // Language selector (the names stay in their own language for clarity)
    'lang.pt': 'PT',
    'lang.en': 'EN',

    // Ensemble
    'instrument.ensemble': 'Todos',

    // Legend
    'legend.title': 'Legenda',
    'legend.hint': 'Clique nas células para alternar os sons',
    'legend.off': 'silêncio',
    'legend.open': 'aberta',
    'legend.closed': 'fechada',
    'legend.normal': 'normal',
    'legend.accent': 'acento',

    // Footer
    'footer.text': 'forró sequencer · para músicos de forró',

    // IO
    'io.save': 'Salvar',
    'io.load': 'Carregar',
    'io.hint': 'Salvar exporta o padrão atual como arquivo JSON. Carregar restaura um arquivo salvo anteriormente',

    // Tutorial
    'tutorial.button': '? Como usar',
    'tutorial.title': 'Como usar o Forró Sequencer',
    'tutorial.step1.title': '1. Escolha um instrumento',
    'tutorial.step1.text': 'Selecione zabumba, pandeiro, triângulo ou "Todos" para tocar todos juntos.',
    'tutorial.step2.title': '2. Escolha um ritmo',
    'tutorial.step2.text': 'Clique em um ritmo (Baião, Xote, Forró…) para carregar o padrão no sequenciador. Um padrão de Baião já vem carregado por padrão.',
    'tutorial.step3.title': '3. Toque!',
    'tutorial.step3.text': 'Aperte "Tocar" para ouvir o ritmo. Ajuste o BPM com o controle deslizante ou use "Marcar Tempo".',
    'tutorial.step4.title': '4. Edite o padrão',
    'tutorial.step4.text': 'Clique nas células da grade para alternar os sons. Cada clique muda para o próximo tipo de som.',
    'tutorial.step5.title': '5. Adicione compassos',
    'tutorial.step5.text': 'Use "+Compasso" para padrões mais longos. O botão "4+4 / 12+12" alterna entre colcheias e tercinas.',
    'tutorial.close': 'Entendi!',
  },

  en: {
    'app.title': 'Forró Sequencer',

    'tempo.bpm': 'BPM',
    'tempo.tap': 'Tap Tempo',

    'transport.play': 'Play',
    'transport.stop': 'Stop',
    'transport.clear': 'Clear',
    'transport.hint': 'Play starts the rhythm, Clear erases the pattern, Tap Tempo sets BPM by tapping the button',

    'section.instrument': 'Instrument',
    'section.instrument.hint': 'Pick a single instrument or Ensemble to play zabumba, pandeiro and triangle together',
    'section.rhythms': 'Rhythms',
    'section.rhythms.hint': 'Traditional forró patterns — baião, xote, forró, xaxado, coco and rastapé. Select one to load it into the sequencer',

    'bars.add': '+ Bar',
    'bars.remove': '− Bar',
    'bars.title': 'BAR',
    'grid.toggle.toTriplet': '12+12',
    'grid.toggle.toBinary': '4+4',
    'bars.hint': 'Add bars for longer patterns. 4+4 uses eighth notes, 12+12 gives higher resolution for working with triplets',

    'theme.dark': 'DARK',
    'theme.light': 'LIGHT',

    'lang.pt': 'PT',
    'lang.en': 'EN',

    'instrument.ensemble': 'Ensemble',

    'legend.title': 'Legend',
    'legend.hint': 'Click cells to cycle through sounds',
    'legend.off': 'off',
    'legend.open': 'open',
    'legend.closed': 'closed',
    'legend.normal': 'normal',
    'legend.accent': 'accent',

    'footer.text': 'forró sequencer · for forró musicians',

    // IO
    'io.save': 'Save',
    'io.load': 'Load',
    'io.hint': 'Save exports the current pattern as a JSON file. Load restores a previously saved file',

    // Tutorial
    'tutorial.button': '? How to use',
    'tutorial.title': 'How to use Forró Sequencer',
    'tutorial.step1.title': '1. Pick an instrument',
    'tutorial.step1.text': 'Select zabumba, pandeiro, triangle or "Ensemble" to play all together.',
    'tutorial.step2.title': '2. Pick a rhythm',
    'tutorial.step2.text': 'Click a rhythm (Baião, Xote, Forró…) to load the pattern into the sequencer. A Baião pattern is loaded by default.',
    'tutorial.step3.title': '3. Play!',
    'tutorial.step3.text': 'Press "Play" to hear the rhythm. Adjust BPM with the slider or use "Tap Tempo".',
    'tutorial.step4.title': '4. Edit the pattern',
    'tutorial.step4.text': 'Click grid cells to cycle through sounds. Each click changes to the next sound type.',
    'tutorial.step5.title': '5. Add bars',
    'tutorial.step5.text': 'Use "+ Bar" for longer patterns. The "4+4 / 12+12" button toggles between eighth notes and triplets.',
    'tutorial.close': 'Got it!',
  },
};

const SUPPORTED_LANGUAGES = Object.keys(TRANSLATIONS);

let currentLang = DEFAULT_LANG;
const listeners = new Set();

/**
 * Detect language from browser's accept-language list.
 * Returns the first supported language found, or DEFAULT_LANG.
 */
function detectBrowserLanguage() {
  const browserLangs = navigator.languages || [navigator.language || ''];
  for (const fullCode of browserLangs) {
    const code = fullCode.toLowerCase().split('-')[0]; // 'pt-BR' -> 'pt'
    if (SUPPORTED_LANGUAGES.includes(code)) return code;
  }
  return DEFAULT_LANG;
}

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;
  } catch (e) {
    // localStorage unavailable — fall back to detection
  }
  return detectBrowserLanguage();
}

/**
 * Get a translated string by key. Falls back to English if missing in
 * the current language, then to the key itself.
 */
export function t(key) {
  return (
    TRANSLATIONS[currentLang]?.[key] ??
    TRANSLATIONS[FALLBACK_LANG]?.[key] ??
    key
  );
}

export function getLanguage() {
  return currentLang;
}

export function getSupportedLanguages() {
  return [...SUPPORTED_LANGUAGES];
}

/**
 * Change the active language. Persists to localStorage and notifies
 * all subscribers so they can re-render their text.
 */
export function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) return;
  if (lang === currentLang) return;
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // non-fatal
  }
  for (const fn of listeners) fn(lang);
}

/**
 * Subscribe to language changes. Returns an unsubscribe function.
 *
 * UI modules call this to re-render their text whenever the user
 * picks a different language.
 */
export function onLanguageChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function initLanguage() {
  currentLang = getInitialLanguage();
  document.documentElement.setAttribute('lang', currentLang);
}
