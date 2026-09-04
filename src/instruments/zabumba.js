import {
  macetaOpen,
  macetaClosed,
  bacalhau,
  bacalhauAccent,
} from '../audio/synthesis.js';

/**
 * Each track is one row in the grid.
 *
 * Cell click cycles through `states` in order. State 0 is always silent.
 * `sounds[i]` is the synth function for state i (null = silent).
 * `colors[i]` is the CSS background for cells in state i.
 */
export const zabumba = {
  id: 'zabumba',
  label: 'Zabumba',

  tracks: [
    {
      id: 'm',
      label: 'MACETA',
      states: ['off', 'open', 'closed'],
      sounds: [null, macetaOpen, macetaClosed],
      colors: [null, 'var(--m-open)', 'var(--m-closed)'],
    },
    {
      id: 'b',
      label: 'BACALHAU',
      states: ['off', 'normal', 'accent'],
      sounds: [null, bacalhau, bacalhauAccent],
      colors: [null, 'var(--b-normal)', 'var(--b-accent)'],
    },
  ],
};
