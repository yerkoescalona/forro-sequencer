/**
 * Zabumba rhythm presets.
 *
 * Each preset has a bpm and one array per track (matching the track ids
 * in instruments/zabumba.js). Arrays are 8 steps long (one bar of 4/4
 * subdivided into eighths: 1 & 2 & 3 & 4 &).
 *
 * State numbers correspond to the `states` array in the track:
 *  m: 0 = off,  1 = open mallet,  2 = closed mallet
 *  b: 0 = off,  1 = normal,       2 = accent
 */
export const zabumbaPresets = {
  baiao: {
    label: 'Baião',
    bpm: 92,
    //  1  &  2  &  3  &  4  &
    m: [2, 0, 0, 1, 0, 0, 0, 0],
    b: [0, 0, 1, 0, 1, 0, 1, 0],
  },
  xote: {
    label: 'Xote',
    bpm: 76,
    m: [2, 0, 0, 0, 1, 0, 1, 0],
    b: [0, 0, 1, 0, 0, 0, 0, 0],
  },
  forro: {
    label: 'Forró',
    bpm: 100,
    m: [1, 0, 0, 2, 0, 0, 0, 1],
    b: [0, 1, 1, 0, 1, 0, 1, 0],
  },
  xaxado: {
    label: 'Xaxado',
    bpm: 110,
    m: [2, 0, 0, 2, 0, 0, 1, 0],
    b: [0, 1, 0, 0, 1, 0, 0, 0],
  },
  coco: {
    label: 'Coco',
    bpm: 120,
    m: [1, 0, 0, 1, 0, 0, 2, 0],
    b: [0, 1, 0, 0, 1, 0, 0, 0],
  },
  rastape: {
    label: 'Rastapé',
    bpm: 140,
    m: [1, 0, 1, 0, 2, 0, 0, 0],
    b: [0, 0, 1, 1, 0, 0, 1, 1],
  },
};
