import { zabumbaPresets } from './zabumba.js';
import { pandeiroPresets } from './pandeiro.js';
import { trianglePresets } from './triangle.js';
import { getInstrument } from '../instruments/index.js';

export const PRESETS = {
  zabumba: zabumbaPresets,
  pandeiro: pandeiroPresets,
  triangle: trianglePresets,
};

export function getPreset(instrumentId, presetId) {
  return PRESETS[instrumentId]?.[presetId] ?? null;
}

export function listPresets(instrumentId) {
  const bank = PRESETS[instrumentId] ?? {};
  return Object.entries(bank).map(([id, p]) => ({ id, label: p.label }));
}

/**
 * Apply a preset to a pattern in place.
 *
 * Generic over instrument shape — reads track ids from the instrument
 * definition, copies values from the preset's per-track arrays.
 *
 * Handles two grid modes:
 *  - 8 steps per bar  → straight copy
 *  - 24 steps per bar → expand: each preset slot fills 1 of 3 slots
 *
 * @returns {boolean} true on success, false if preset not found
 */
export function applyPreset(pattern, bars, stepsPerBar, instrumentId, presetId) {
  const preset = getPreset(instrumentId, presetId);
  if (!preset) return false;

  const inst = getInstrument(instrumentId);
  const trackIds = inst.tracks.map((t) => t.id);

  for (let i = 0; i < pattern.length; i++) {
    const j = i % stepsPerBar;
    for (const trackId of trackIds) {
      const presetArr = preset[trackId];
      if (!presetArr) continue;

      if (stepsPerBar === 8) {
        pattern[i][trackId] = presetArr[j];
      } else {
        const srcIdx = Math.floor(j / 3);
        pattern[i][trackId] = j % 3 === 0 ? presetArr[srcIdx] : 0;
      }
    }
  }

  return true;
}
