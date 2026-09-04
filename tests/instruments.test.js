import { describe, it, expect } from 'vitest';
import { INSTRUMENTS, getInstrument, getTrackIds } from '../src/instruments/index.js';

describe('INSTRUMENTS registry', () => {
  it('contains zabumba, pandeiro, and triangle', () => {
    expect(Object.keys(INSTRUMENTS)).toEqual(
      expect.arrayContaining(['zabumba', 'pandeiro', 'triangle'])
    );
  });

  it('each instrument has id, label, and tracks', () => {
    for (const [id, inst] of Object.entries(INSTRUMENTS)) {
      expect(inst.id).toBe(id);
      expect(typeof inst.label).toBe('string');
      expect(Array.isArray(inst.tracks)).toBe(true);
      expect(inst.tracks.length).toBeGreaterThan(0);
    }
  });
});

describe('getInstrument', () => {
  it('returns the correct instrument by id', () => {
    const zab = getInstrument('zabumba');
    expect(zab.id).toBe('zabumba');
    expect(zab.label).toBe('Zabumba');
  });

  it('throws for unknown instrument', () => {
    expect(() => getInstrument('banjo')).toThrow('Unknown instrument');
  });
});

describe('getTrackIds', () => {
  it('returns ["m", "b"] for zabumba', () => {
    expect(getTrackIds('zabumba')).toEqual(['m', 'b']);
  });

  it('returns ["p"] for pandeiro', () => {
    expect(getTrackIds('pandeiro')).toEqual(['p']);
  });

  it('returns ["t"] for triangle', () => {
    expect(getTrackIds('triangle')).toEqual(['t']);
  });
});

describe('track definitions', () => {
  it('every track has matching lengths for states, sounds, and colors', () => {
    for (const inst of Object.values(INSTRUMENTS)) {
      for (const track of inst.tracks) {
        expect(track.sounds).toHaveLength(track.states.length);
        expect(track.colors).toHaveLength(track.states.length);
        if (track.labels) {
          expect(track.labels).toHaveLength(track.states.length);
        }
      }
    }
  });

  it('state 0 is always silent (null sound)', () => {
    for (const inst of Object.values(INSTRUMENTS)) {
      for (const track of inst.tracks) {
        expect(track.sounds[0]).toBeNull();
      }
    }
  });

  it('non-zero states have sound functions', () => {
    for (const inst of Object.values(INSTRUMENTS)) {
      for (const track of inst.tracks) {
        for (let i = 1; i < track.sounds.length; i++) {
          expect(typeof track.sounds[i]).toBe('function');
        }
      }
    }
  });
});
