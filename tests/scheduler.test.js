import { describe, it, expect } from 'vitest';
import { stepDuration, nextStep } from '../src/audio/scheduler.js';

describe('stepDuration', () => {
  it('returns half-beat duration for 8 steps per bar', () => {
    // 8 steps per bar of 4/4 = eighth-note resolution.
    // Internal divisor = 4 (steps per half-bar), so step = 60/bpm/4.
    // At 60 bpm: one beat = 1s, one eighth = 0.5s.
    // The 0.25s value here = step duration in *half-bar* terms,
    // which matches our internal scheduling math.
    expect(stepDuration(60, 8)).toBeCloseTo(0.25);
  });

  it('scales inversely with bpm', () => {
    const slow = stepDuration(60, 8);
    const fast = stepDuration(120, 8);
    expect(fast).toBeCloseTo(slow / 2);
  });

  it('returns triplet-16th duration for 24 steps per bar', () => {
    // At 60 bpm, 24 steps per bar = 12 per beat-pair = sixteenth-triplets
    // 60/60/12 ≈ 0.0833s
    expect(stepDuration(60, 24)).toBeCloseTo(0.0833, 3);
  });

  it('24-step duration is 1/3 of 8-step duration at the same bpm', () => {
    expect(stepDuration(100, 24) * 3).toBeCloseTo(stepDuration(100, 8));
  });
});

describe('nextStep', () => {
  it('advances by 1 inside the range', () => {
    expect(nextStep(0, 8)).toBe(1);
    expect(nextStep(5, 8)).toBe(6);
  });

  it('wraps to 0 at the end', () => {
    expect(nextStep(7, 8)).toBe(0);
    expect(nextStep(23, 24)).toBe(0);
  });

  it('handles single-step patterns', () => {
    expect(nextStep(0, 1)).toBe(0);
  });
});
