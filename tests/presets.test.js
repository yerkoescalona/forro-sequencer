import { describe, it, expect } from 'vitest';
import { applyPreset, getPreset, listPresets } from '../src/presets/index.js';
import { getTrackIds, INSTRUMENTS } from '../src/instruments/index.js';

describe('applyPreset for zabumba', () => {
  it('applies baião to an empty 8-step pattern', () => {
    const trackIds = getTrackIds('zabumba');
    const pattern = makeEmptyPatternFor(1, 8, trackIds);
    const ok = applyPreset(pattern, 1, 8, 'zabumba', 'baiao');

    expect(ok).toBe(true);
    const preset = getPreset('zabumba', 'baiao');
    for (let i = 0; i < 8; i++) {
      expect(pattern[i].m).toBe(preset.m[i]);
      expect(pattern[i].b).toBe(preset.b[i]);
    }
  });

  it('repeats the preset across multiple bars', () => {
    const trackIds = getTrackIds('zabumba');
    const pattern = makeEmptyPatternFor(2, 8, trackIds);
    applyPreset(pattern, 2, 8, 'zabumba', 'baiao');

    const preset = getPreset('zabumba', 'baiao');
    // Bar 2 should be identical to bar 1
    for (let i = 0; i < 8; i++) {
      expect(pattern[8 + i].m).toBe(preset.m[i]);
      expect(pattern[8 + i].b).toBe(preset.b[i]);
    }
  });

  it('expands to 24-step grid by placing values on every 3rd slot', () => {
    const trackIds = getTrackIds('zabumba');
    const pattern = makeEmptyPatternFor(1, 24, trackIds);
    applyPreset(pattern, 1, 24, 'zabumba', 'baiao');

    const preset = getPreset('zabumba', 'baiao');
    // Slot 0, 3, 6 ... should match preset[0], preset[1], preset[2] ...
    for (let j = 0; j < 8; j++) {
      expect(pattern[j * 3].m).toBe(preset.m[j]);
      expect(pattern[j * 3].b).toBe(preset.b[j]);
      // Off-beats should be 0
      expect(pattern[j * 3 + 1].m).toBe(0);
      expect(pattern[j * 3 + 2].m).toBe(0);
    }
  });

  it('returns false for unknown preset', () => {
    const trackIds = getTrackIds('zabumba');
    const pattern = makeEmptyPatternFor(1, 8, trackIds);
    expect(applyPreset(pattern, 1, 8, 'zabumba', 'nonexistent')).toBe(false);
  });
});

describe('applyPreset for pandeiro', () => {
  it('applies a single-track preset correctly', () => {
    const trackIds = getTrackIds('pandeiro');
    const pattern = makeEmptyPatternFor(1, 8, trackIds);
    applyPreset(pattern, 1, 8, 'pandeiro', 'baiao');

    const preset = getPreset('pandeiro', 'baiao');
    for (let i = 0; i < 8; i++) {
      expect(pattern[i].p).toBe(preset.p[i]);
    }
  });
});

describe('applyPreset for triangle', () => {
  it('applies baião triangle pattern correctly', () => {
    const trackIds = getTrackIds('triangle');
    const pattern = makeEmptyPatternFor(1, 8, trackIds);
    const ok = applyPreset(pattern, 1, 8, 'triangle', 'baiao');

    expect(ok).toBe(true);
    const preset = getPreset('triangle', 'baiao');
    for (let i = 0; i < 8; i++) {
      expect(pattern[i].t).toBe(preset.t[i]);
    }
  });

  it('applies rastapé triangle pattern (CCO_CCO_)', () => {
    const trackIds = getTrackIds('triangle');
    const pattern = makeEmptyPatternFor(1, 8, trackIds);
    applyPreset(pattern, 1, 8, 'triangle', 'rastape');

    const preset = getPreset('triangle', 'rastape');
    for (let i = 0; i < 8; i++) {
      expect(pattern[i].t).toBe(preset.t[i]);
    }
    // Rastapé has rests on beats 4 and 8
    expect(pattern[3].t).toBe(0);
    expect(pattern[7].t).toBe(0);
  });
});

describe('all preset banks have matching rhythm names', () => {
  it('every instrument has the same set of rhythm presets', () => {
    const instrumentIds = Object.keys(INSTRUMENTS);
    const presetSets = instrumentIds.map((id) =>
      listPresets(id).map((p) => p.id).sort()
    );
    // All instruments should have the same rhythm names
    for (let i = 1; i < presetSets.length; i++) {
      expect(presetSets[i]).toEqual(presetSets[0]);
    }
  });
});

// helper that mirrors state.makeEmptyPattern but doesn't touch shared state
function makeEmptyPatternFor(bars, stepsPerBar, trackIds) {
  const out = [];
  for (let i = 0; i < bars * stepsPerBar; i++) {
    const step = {};
    for (const id of trackIds) step[id] = 0;
    out.push(step);
  }
  return out;
}
