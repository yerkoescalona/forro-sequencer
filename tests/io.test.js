import { describe, it, expect } from 'vitest';
import { serializeSequence, deserializeSequence } from '../src/ui/io.js';

const BASE = {
  version: 1,
  bpm: 120,
  bars: 1,
  stepsPerBar: 8,
  instrumentId: 'zabumba',
  ensemble: false,
  patterns: { zabumba: [{ m: 1, b: 0 }, { m: 0, b: 1 }] },
  volumes: { zabumba: 1.0 },
};

describe('serializeSequence', () => {
  it('includes a version field', () => {
    expect(serializeSequence(BASE).version).toBe(1);
  });

  it('captures all session fields', () => {
    const st = {
      bpm: 130,
      bars: 2,
      stepsPerBar: 24,
      instrumentId: 'pandeiro',
      ensemble: true,
      patterns: { pandeiro: [{ p: 1 }] },
      volumes: { pandeiro: 0.8 },
    };
    const out = serializeSequence(st);
    expect(out.bpm).toBe(130);
    expect(out.bars).toBe(2);
    expect(out.stepsPerBar).toBe(24);
    expect(out.instrumentId).toBe('pandeiro');
    expect(out.ensemble).toBe(true);
    expect(out.patterns).toEqual(st.patterns);
    expect(out.volumes).toEqual(st.volumes);
  });

  it('roundtrips through JSON without data loss', () => {
    const json = JSON.stringify(serializeSequence(BASE));
    const back = deserializeSequence(JSON.parse(json));
    expect(back.bpm).toBe(BASE.bpm);
    expect(back.bars).toBe(BASE.bars);
    expect(back.stepsPerBar).toBe(BASE.stepsPerBar);
    expect(back.instrumentId).toBe(BASE.instrumentId);
    expect(back.patterns).toEqual(BASE.patterns);
  });
});

describe('deserializeSequence', () => {
  it('returns parsed data for valid input', () => {
    const result = deserializeSequence(BASE);
    expect(result).not.toBeNull();
    expect(result.bpm).toBe(120);
    expect(result.patterns).toEqual(BASE.patterns);
    expect(result.volumes).toEqual(BASE.volumes);
  });

  it('returns null for null input', () => {
    expect(deserializeSequence(null)).toBeNull();
  });

  it('returns null for non-object input', () => {
    expect(deserializeSequence('not json')).toBeNull();
    expect(deserializeSequence(42)).toBeNull();
    expect(deserializeSequence(undefined)).toBeNull();
  });

  it('returns null when patterns is missing', () => {
    const { patterns: _, ...noPat } = BASE;
    expect(deserializeSequence(noPat)).toBeNull();
  });

  it('returns null when bpm is not a number', () => {
    expect(deserializeSequence({ ...BASE, bpm: 'fast' })).toBeNull();
    expect(deserializeSequence({ ...BASE, bpm: null })).toBeNull();
  });

  it('uses default bars=1 when missing', () => {
    const { bars: _, ...noBars } = BASE;
    expect(deserializeSequence(noBars).bars).toBe(1);
  });

  it('uses default stepsPerBar=8 when missing', () => {
    const { stepsPerBar: _, ...noSpb } = BASE;
    expect(deserializeSequence(noSpb).stepsPerBar).toBe(8);
  });

  it('uses default instrumentId=zabumba when missing', () => {
    const { instrumentId: _, ...noInst } = BASE;
    expect(deserializeSequence(noInst).instrumentId).toBe('zabumba');
  });

  it('uses default ensemble=false when missing', () => {
    const { ensemble: _, ...noEns } = BASE;
    expect(deserializeSequence(noEns).ensemble).toBe(false);
  });

  it('uses default volumes={} when missing', () => {
    const { volumes: _, ...noVol } = BASE;
    expect(deserializeSequence(noVol).volumes).toEqual({});
  });

  it('preserves ensemble=true from file', () => {
    const result = deserializeSequence({ ...BASE, ensemble: true });
    expect(result.ensemble).toBe(true);
  });

  it('preserves multi-instrument patterns', () => {
    const multi = {
      ...BASE,
      patterns: {
        zabumba: [{ m: 1, b: 0 }],
        pandeiro: [{ p: 2 }],
        triangle: [{ t: 1 }],
      },
    };
    const result = deserializeSequence(multi);
    expect(result.patterns.pandeiro[0].p).toBe(2);
    expect(result.patterns.triangle[0].t).toBe(1);
  });
});
