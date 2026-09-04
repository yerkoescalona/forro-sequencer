/**
 * Triângulo rhythm presets.
 *
 * The pattern c c o c is universal in forró triangle playing —
 * used identically across baião, xote, forró, xaxado, coco, rastapé.
 * Only the BPM changes between rhythms; the figure itself is fixed.
 *
 * State numbers: 0 = off, 1 = closed (c), 2 = open (o)
 */

//                  1  &  2  &  3  &  4  &
const CCOCCCOC = [1, 1, 2, 1, 1, 1, 2, 1];
const CCO_CCO_ = [1, 1, 2, 0, 1, 1, 2, 0];

export const trianglePresets = {
  baiao:   { label: 'Baião',   bpm: 92,  t: CCOCCCOC },
  xote:    { label: 'Xote',    bpm: 76,  t: CCOCCCOC },
  forro:   { label: 'Forró',   bpm: 100, t: CCOCCCOC },
  xaxado:  { label: 'Xaxado',  bpm: 110, t: CCOCCCOC },
  coco:    { label: 'Coco',    bpm: 120, t: CCOCCCOC },
  rastape: { label: 'Rastapé', bpm: 140, t: CCO_CCO_ },
};
