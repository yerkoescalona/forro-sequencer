/**
 * Synth functions for forró percussion sounds.
 * Each is a pure function: (ctx, time, dest?) => void.
 * `dest` defaults to ctx.destination when not provided.
 *
 * To swap for recorded samples later, replace each function with a
 * BufferSource that plays a pre-loaded AudioBuffer at `time`.
 */

import { getNoise } from './context.js';

// ─── Zabumba: maceta (mallet on top skin) ───────────────────────────

export function macetaOpen(ctx, time, dest) {
  const d = dest || ctx.destination;
  // Fundamental
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, time);
  osc.frequency.exponentialRampToValueAtTime(60, time + 0.08);
  g.gain.setValueAtTime(0.45, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.45);
  osc.connect(g).connect(d);
  osc.start(time);
  osc.stop(time + 0.5);
  // 2nd harmonic — audible on small speakers
  const h2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  h2.type = 'sine';
  h2.frequency.setValueAtTime(280, time);
  h2.frequency.exponentialRampToValueAtTime(120, time + 0.08);
  g2.gain.setValueAtTime(0.18, time);
  g2.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
  h2.connect(g2).connect(d);
  h2.start(time);
  h2.stop(time + 0.35);
  // 3rd harmonic — adds presence
  const h3 = ctx.createOscillator();
  const g3 = ctx.createGain();
  h3.type = 'sine';
  h3.frequency.setValueAtTime(420, time);
  h3.frequency.exponentialRampToValueAtTime(180, time + 0.06);
  g3.gain.setValueAtTime(0.08, time);
  g3.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
  h3.connect(g3).connect(d);
  h3.start(time);
  h3.stop(time + 0.2);
  // Attack transient — click that cuts through on any speaker
  const at = ctx.createBufferSource();
  const af = ctx.createBiquadFilter();
  const ag = ctx.createGain();
  at.buffer = getNoise(ctx);
  af.type = 'bandpass';
  af.frequency.value = 300;
  af.Q.value = 1;
  ag.gain.setValueAtTime(0.15, time);
  ag.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
  at.connect(af).connect(ag).connect(d);
  at.start(time);
  at.stop(time + 0.02);
}

export function macetaClosed(ctx, time, dest) {
  const d = dest || ctx.destination;
  // Fundamental
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(110, time);
  osc.frequency.exponentialRampToValueAtTime(80, time + 0.04);
  g.gain.setValueAtTime(0.32, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
  osc.connect(g).connect(d);
  osc.start(time);
  osc.stop(time + 0.1);
  // 2nd harmonic
  const h2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  h2.type = 'sine';
  h2.frequency.setValueAtTime(220, time);
  h2.frequency.exponentialRampToValueAtTime(160, time + 0.04);
  g2.gain.setValueAtTime(0.15, time);
  g2.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
  h2.connect(g2).connect(d);
  h2.start(time);
  h2.stop(time + 0.08);
  // Attack transient
  const at = ctx.createBufferSource();
  const af = ctx.createBiquadFilter();
  const ag = ctx.createGain();
  at.buffer = getNoise(ctx);
  af.type = 'bandpass';
  af.frequency.value = 350;
  af.Q.value = 1;
  ag.gain.setValueAtTime(0.12, time);
  ag.gain.exponentialRampToValueAtTime(0.001, time + 0.01);
  at.connect(af).connect(ag).connect(d);
  at.start(time);
  at.stop(time + 0.015);
}

// ─── Zabumba: bacalhau (thin stick on bottom skin) ──────────────────

export function bacalhau(ctx, time, dest) {
  const d = dest || ctx.destination;
  const src = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  const g = ctx.createGain();
  src.buffer = getNoise(ctx);
  f.type = 'bandpass';
  f.frequency.value = 1200;
  g.gain.setValueAtTime(0.28, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  src.connect(f).connect(g).connect(d);
  src.start(time);
  src.stop(time + 0.06);
}

export function bacalhauAccent(ctx, time, dest) {
  const d = dest || ctx.destination;
  const src = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  const g = ctx.createGain();
  src.buffer = getNoise(ctx);
  f.type = 'bandpass';
  f.frequency.value = 1800;
  g.gain.setValueAtTime(0.5, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
  src.connect(f).connect(g).connect(d);
  src.start(time);
  src.stop(time + 0.13);
}

// ─── Pandeiro ───────────────────────────────────────────────────────

function panJingles(ctx, time, vol, dest) {
  const d = dest || ctx.destination;
  const v = vol || 0.1;
  // Layer 1 — main shimmer
  const s1 = ctx.createBufferSource();
  const f1 = ctx.createBiquadFilter();
  const g1 = ctx.createGain();
  s1.buffer = getNoise(ctx);
  f1.type = 'bandpass';
  f1.frequency.value = 7000;
  f1.Q.value = 3;
  g1.gain.setValueAtTime(v, time);
  g1.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
  s1.connect(f1).connect(g1).connect(d);
  s1.start(time);
  s1.stop(time + 0.07);
  // Layer 2 — high detuned shimmer
  const s2 = ctx.createBufferSource();
  const f2 = ctx.createBiquadFilter();
  const g2 = ctx.createGain();
  s2.buffer = getNoise(ctx);
  f2.type = 'bandpass';
  f2.frequency.value = 9500;
  f2.Q.value = 2;
  g2.gain.setValueAtTime(v * 0.6, time);
  g2.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  s2.connect(f2).connect(g2).connect(d);
  s2.start(time);
  s2.stop(time + 0.05);
}

export function panXi(ctx, time, dest) {
  panJingles(ctx, time, 0.15, dest);
}

export function panTum(ctx, time, dest) {
  const d = dest || ctx.destination;
  // Fundamental
  const o1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  o1.type = 'sine';
  o1.frequency.setValueAtTime(180, time);
  o1.frequency.exponentialRampToValueAtTime(90, time + 0.12);
  g1.gain.setValueAtTime(0.4, time);
  g1.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
  o1.connect(g1).connect(d);
  o1.start(time);
  o1.stop(time + 0.45);
  // 2nd harmonic — critical for mobile
  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = 'sine';
  o2.frequency.setValueAtTime(360, time);
  o2.frequency.exponentialRampToValueAtTime(180, time + 0.08);
  g2.gain.setValueAtTime(0.2, time);
  g2.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
  o2.connect(g2).connect(d);
  o2.start(time);
  o2.stop(time + 0.25);
  // 3rd harmonic — adds body
  const o3 = ctx.createOscillator();
  const g3 = ctx.createGain();
  o3.type = 'sine';
  o3.frequency.setValueAtTime(540, time);
  o3.frequency.exponentialRampToValueAtTime(270, time + 0.06);
  g3.gain.setValueAtTime(0.08, time);
  g3.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
  o3.connect(g3).connect(d);
  o3.start(time);
  o3.stop(time + 0.12);
  // Skin-attack noise
  const s = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  const ga = ctx.createGain();
  s.buffer = getNoise(ctx);
  f.type = 'bandpass';
  f.frequency.value = 400;
  f.Q.value = 1;
  ga.gain.setValueAtTime(0.2, time);
  ga.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
  s.connect(f).connect(ga).connect(d);
  s.start(time);
  s.stop(time + 0.03);
  panJingles(ctx, time, 0.08, dest);
}

export function panTumClosed(ctx, time, dest) {
  const d = dest || ctx.destination;
  // Fundamental
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(160, time);
  o.frequency.exponentialRampToValueAtTime(100, time + 0.03);
  g.gain.setValueAtTime(0.32, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
  o.connect(g).connect(d);
  o.start(time);
  o.stop(time + 0.08);
  // 2nd harmonic
  const h2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  h2.type = 'sine';
  h2.frequency.setValueAtTime(320, time);
  h2.frequency.exponentialRampToValueAtTime(200, time + 0.03);
  g2.gain.setValueAtTime(0.15, time);
  g2.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  h2.connect(g2).connect(d);
  h2.start(time);
  h2.stop(time + 0.06);
  // Skin noise
  const s = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  const ga = ctx.createGain();
  s.buffer = getNoise(ctx);
  f.type = 'bandpass';
  f.frequency.value = 500;
  f.Q.value = 1;
  ga.gain.setValueAtTime(0.15, time);
  ga.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
  s.connect(f).connect(ga).connect(d);
  s.start(time);
  s.stop(time + 0.025);
  panJingles(ctx, time, 0.08, dest);
}

export function panTapa(ctx, time, dest) {
  const d = dest || ctx.destination;
  const s1 = ctx.createBufferSource();
  const f1 = ctx.createBiquadFilter();
  const g1 = ctx.createGain();
  s1.buffer = getNoise(ctx);
  f1.type = 'bandpass';
  f1.frequency.value = 2000;
  f1.Q.value = 0.8;
  g1.gain.setValueAtTime(0.4, time);
  g1.gain.exponentialRampToValueAtTime(0.001, time + 0.07);
  s1.connect(f1).connect(g1).connect(d);
  s1.start(time);
  s1.stop(time + 0.08);
  const s2 = ctx.createBufferSource();
  const f2 = ctx.createBiquadFilter();
  const g2 = ctx.createGain();
  s2.buffer = getNoise(ctx);
  f2.type = 'highpass';
  f2.frequency.value = 3500;
  g2.gain.setValueAtTime(0.2, time);
  g2.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  s2.connect(f2).connect(g2).connect(d);
  s2.start(time);
  s2.stop(time + 0.05);
  panJingles(ctx, time, 0.18, dest);
}

// ─── Triângulo ──────────────────────────────────────────────────────
// The triangle is mostly inharmonic high-frequency content with very
// little low-end. We layer 3-4 detuned high oscillators to approximate
// the metallic ping. Open vs closed is purely about decay length.

function triangleTone(ctx, time, { vol, decay }, dest) {
  const d = dest || ctx.destination;
  // Inharmonic partials in the 2–8 kHz range — characteristic of
  // a small struck metal triangle.
  const partials = [
    { freq: 2250, gain: 1.0 },
    { freq: 3300, gain: 0.6 },
    { freq: 4750, gain: 0.4 },
    { freq: 6800, gain: 0.25 },
  ];
  for (const p of partials) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = p.freq;
    g.gain.setValueAtTime(vol * p.gain, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + decay);
    osc.connect(g).connect(d);
    osc.start(time);
    osc.stop(time + decay + 0.02);
  }
  // High-frequency noise transient for the strike attack
  const src = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  const ng = ctx.createGain();
  src.buffer = getNoise(ctx);
  f.type = 'highpass';
  f.frequency.value = 3000;
  ng.gain.setValueAtTime(vol * 0.4, time);
  ng.gain.exponentialRampToValueAtTime(0.001, time + 0.015);
  src.connect(f).connect(ng).connect(d);
  src.start(time);
  src.stop(time + 0.02);
}

// closed (c): hand muffles the triangle — short decay
export function triangleClosed(ctx, time, dest) {
  triangleTone(ctx, time, { vol: 0.22, decay: 0.08 }, dest);
}

// open (o): hand off — full ringing decay
export function triangleOpen(ctx, time, dest) {
  triangleTone(ctx, time, { vol: 0.22, decay: 0.55 }, dest);
}
