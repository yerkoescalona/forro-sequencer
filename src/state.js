/**
 * Single source of truth for app state.
 *
 * Pattern: each step is an object whose keys correspond to track ids
 * defined in the active instrument. Example for zabumba: { m: 0, b: 0 }.
 * Example for pandeiro: { p: 0 }.
 *
 * The pattern array length is always state.bars * state.stepsPerBar.
 */

export const state = {
  bpm: 100,
  bars: 1,
  stepsPerBar: 8, // 8 (binary 4+4) or 24 (triplet 12+12)
  instrumentId: 'zabumba',
  activePresetId: null,
  ensemble: false,

  // playback
  currentStep: 0,
  isPlaying: false,

  // per-instrument patterns: { zabumba: [{m:0,b:0}, ...], ... }
  patterns: {},

  // per-instrument volume (0–1)
  volumes: {},
};

export function setBpm(bpm) {
  state.bpm = Math.max(40, Math.min(220, Math.round(bpm)));
}

export function totalSteps() {
  return state.bars * state.stepsPerBar;
}

/**
 * Build an empty pattern matching state.bars × state.stepsPerBar,
 * with one empty step per slot. Track keys default to 0.
 */
export function makeEmptyPattern(trackIds) {
  const out = [];
  for (let i = 0; i < totalSteps(); i++) {
    const step = {};
    for (const id of trackIds) step[id] = 0;
    out.push(step);
  }
  return out;
}

export function clearPattern(pattern, trackIds) {
  for (const step of pattern) {
    for (const id of trackIds) step[id] = 0;
  }
}
