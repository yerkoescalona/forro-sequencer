import {
  panXi,
  panTum,
  panTumClosed,
  panTapa,
} from '../audio/synthesis.js';

export const pandeiro = {
  id: 'pandeiro',
  label: 'Pandeiro',

  tracks: [
    {
      id: 'p',
      label: 'PANDEIRO',
      states: ['non', 'xi', 'tum', 'tũ', 'tapa'],
      sounds: [null, panXi, panTum, panTumClosed, panTapa],
      colors: [
        null,
        'var(--p-open)',
        'var(--p-closed)',
        '#2a4a5a',
        'var(--d-accent)',
      ],
      // Optional: text rendered inside each cell to label the technique
      labels: ['', 'xi', 'tum', 'tũ', 'tapa'],
    },
  ],
};
