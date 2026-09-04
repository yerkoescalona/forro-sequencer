/**
 * AudioContext is created lazily on first call to ensureAudio().
 * Browsers require a user gesture before audio can start.
 */

let audioCtx = null;
let noiseBuffer = null;
const gainNodes = {};

export function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

export function getAudioCtx() {
  return audioCtx;
}

/**
 * Get (or create) a per-instrument GainNode for volume control.
 * Each instrument routes through its own gain before ctx.destination.
 */
export function getGainNode(instrumentId) {
  if (!audioCtx) return null;
  if (!gainNodes[instrumentId]) {
    gainNodes[instrumentId] = audioCtx.createGain();
    gainNodes[instrumentId].connect(audioCtx.destination);
  }
  return gainNodes[instrumentId];
}

/**
 * Set the volume for a specific instrument (0–1).
 */
export function setInstrumentVolume(instrumentId, vol) {
  const node = getGainNode(instrumentId);
  if (node) node.gain.value = vol;
}

/**
 * Reusable white-noise buffer — used by every percussion sound that
 * needs noise (bacalhau, pandeiro tapa, etc.). Created once.
 */
export function getNoise(ctx) {
  if (noiseBuffer) return noiseBuffer;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return (noiseBuffer = buffer);
}
