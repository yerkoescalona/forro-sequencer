import { describe, it, expect, beforeEach } from 'vitest';
import { state, setBpm, totalSteps, makeEmptyPattern, clearPattern } from '../src/state.js';

describe('setBpm', () => {
  it('clamps bpm to minimum 40', () => {
    setBpm(10);
    expect(state.bpm).toBe(40);
  });

  it('clamps bpm to maximum 220', () => {
    setBpm(999);
    expect(state.bpm).toBe(220);
  });

  it('rounds to integer', () => {
    setBpm(99.7);
    expect(state.bpm).toBe(100);
  });

  it('sets valid bpm correctly', () => {
    setBpm(120);
    expect(state.bpm).toBe(120);
  });
});

describe('totalSteps', () => {
  beforeEach(() => {
    state.bars = 1;
    state.stepsPerBar = 8;
  });

  it('returns bars × stepsPerBar', () => {
    expect(totalSteps()).toBe(8);
  });

  it('scales with multiple bars', () => {
    state.bars = 3;
    expect(totalSteps()).toBe(24);
  });

  it('works with triplet grid', () => {
    state.stepsPerBar = 24;
    state.bars = 2;
    expect(totalSteps()).toBe(48);
  });
});

describe('makeEmptyPattern', () => {
  beforeEach(() => {
    state.bars = 1;
    state.stepsPerBar = 8;
  });

  it('creates correct number of steps', () => {
    const pattern = makeEmptyPattern(['m', 'b']);
    expect(pattern).toHaveLength(8);
  });

  it('initializes all track values to 0', () => {
    const pattern = makeEmptyPattern(['m', 'b']);
    for (const step of pattern) {
      expect(step.m).toBe(0);
      expect(step.b).toBe(0);
    }
  });

  it('works with single-track instruments', () => {
    const pattern = makeEmptyPattern(['p']);
    expect(pattern[0]).toEqual({ p: 0 });
  });

  it('scales with bars', () => {
    state.bars = 2;
    const pattern = makeEmptyPattern(['t']);
    expect(pattern).toHaveLength(16);
  });
});

describe('clearPattern', () => {
  beforeEach(() => {
    state.bars = 1;
    state.stepsPerBar = 8;
  });

  it('resets all track values to 0', () => {
    const pattern = makeEmptyPattern(['m', 'b']);
    pattern[0].m = 2;
    pattern[1].b = 1;
    pattern[3].m = 1;
    clearPattern(pattern, ['m', 'b']);
    for (const step of pattern) {
      expect(step.m).toBe(0);
      expect(step.b).toBe(0);
    }
  });
});
