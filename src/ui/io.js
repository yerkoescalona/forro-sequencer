import { state } from '../state.js';

const FILE_VERSION = 1;

export function serializeSequence(st) {
  return {
    version: FILE_VERSION,
    bpm: st.bpm,
    bars: st.bars,
    stepsPerBar: st.stepsPerBar,
    instrumentId: st.instrumentId,
    ensemble: st.ensemble,
    patterns: st.patterns,
    volumes: st.volumes,
  };
}

export function deserializeSequence(data) {
  if (!data || typeof data !== 'object') return null;
  if (!data.patterns || typeof data.bpm !== 'number') return null;
  return {
    bpm: data.bpm,
    bars: data.bars ?? 1,
    stepsPerBar: data.stepsPerBar ?? 8,
    instrumentId: data.instrumentId ?? 'zabumba',
    ensemble: data.ensemble ?? false,
    patterns: data.patterns,
    volumes: data.volumes ?? {},
  };
}

export function exportSequence() {
  const blob = new Blob([JSON.stringify(serializeSequence(state), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'forro-sequence.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importSequence(onImport) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = deserializeSequence(JSON.parse(e.target.result));
        if (data) onImport(data);
      } catch {
        // silently ignore malformed files
      }
    };
    reader.readAsText(file);
  });
  input.click();
}
