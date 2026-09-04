import { zabumba } from './zabumba.js';
import { pandeiro } from './pandeiro.js';
import { triangle } from './triangle.js';

export const INSTRUMENTS = {
  zabumba,
  pandeiro,
  triangle,
};

export function getInstrument(id) {
  const inst = INSTRUMENTS[id];
  if (!inst) throw new Error(`Unknown instrument: ${id}`);
  return inst;
}

export function getTrackIds(instrumentId) {
  return getInstrument(instrumentId).tracks.map((t) => t.id);
}
