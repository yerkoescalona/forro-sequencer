/**
 * Pandeiro rhythm presets.
 *
 * State numbers correspond to the `states` array in the track:
 *  p: 0 = non, 1 = xi, 2 = tum (open), 3 = tũ (closed), 4 = tapa (slap)
 */
export const pandeiroPresets = {
  baiao: {
    label: 'Baião',
    bpm: 92,
    p: [3, 1, 1, 2, 1, 1, 1, 1],
  },
  xote: {
    label: 'Xote',
    bpm: 76,
    p: [3, 1, 1, 1, 2, 1, 2, 1],
  },
  forro: {
    label: 'Forró',
    bpm: 100,
    p: [2, 1, 1, 3, 1, 1, 1, 2],
  },
  xaxado: {
    label: 'Xaxado',
    bpm: 110,
    p: [3, 1, 1, 3, 1, 1, 2, 1],
  },
  coco: {
    label: 'Coco',
    bpm: 120,
    p: [2, 1, 1, 2, 1, 1, 3, 1],
  },
  rastape: {
    label: 'Rastapé',
    bpm: 140,
    p: [2, 1, 2, 1, 3, 1, 1, 1],
  },
};
