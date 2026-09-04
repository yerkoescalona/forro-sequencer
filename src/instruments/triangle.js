import { triangleClosed, triangleOpen } from '../audio/synthesis.js';

/**
 * Triângulo: brazilian forró triangle.
 *
 * Standard forró notation uses two sounds only:
 *   c = closed (hand muffles the triangle)
 *   o = open  (hand off, full ring)
 *
 * The classic forró triangle pattern is c c o c — repeated identically
 * across every rhythm in the genre.
 */
export const triangle = {
  id: 'triangle',
  label: 'Triângulo',

  tracks: [
    {
      id: 't',
      label: 'TRIÂNGULO',
      states: ['off', 'closed', 'open'],
      sounds: [null, triangleClosed, triangleOpen],
      colors: [null, 'var(--t-closed)', 'var(--t-open)'],
      // Visible inside each cell — standard forró notation
      labels: ['', 'c', 'o'],
    },
  ],
};
