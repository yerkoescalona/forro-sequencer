/**
 * Lookahead audio scheduler — based on the standard pattern described
 * by Chris Wilson (https://web.dev/articles/audio-scheduling).
 *
 * Why lookahead?
 * setInterval/setTimeout drift and have ~10ms jitter. Web Audio uses a
 * separate, sample-accurate clock (audioCtx.currentTime). The trick:
 *  1. Wake up periodically (every 25ms) via setInterval — it's OK if
 *     this is jittery.
 *  2. Schedule any notes that fall within the next 100ms via the
 *     audio clock, which is rock-solid.
 *
 * The math that determines step duration is extracted as pure
 * functions so it can be unit-tested without browser audio.
 */

export const SCHEDULE_AHEAD_TIME = 0.1; // seconds
export const TIMER_INTERVAL = 25; // ms

/**
 * Step duration in seconds for a given BPM and steps-per-bar.
 *
 * 8 steps per bar  → eighth notes  → divisor = 4 (4 beats per bar × 2)
 * 24 steps per bar → 16th-triplets → divisor = 12 (4 beats × 3)
 *
 * Pure function — easy to test.
 */
export function stepDuration(bpm, stepsPerBar) {
  const divisor = stepsPerBar === 24 ? 12 : 4;
  return 60 / bpm / divisor;
}

/**
 * Advance to the next step, wrapping at totalSteps.
 * Pure function — easy to test.
 */
export function nextStep(currentStep, totalSteps) {
  const next = currentStep + 1;
  return next >= totalSteps ? 0 : next;
}

/**
 * Create a scheduler instance.
 *
 * @param {Object} opts
 * @param {() => AudioContext} opts.getCtx     — returns the active audio context
 * @param {() => Object} opts.getState         — returns { bpm, stepsPerBar, pattern, currentStep }
 * @param {(step, time) => void} opts.playStep — fires audio for one step
 * @param {(step, time) => void} [opts.onScheduled] — optional callback when step is scheduled (for visuals)
 */
export function createScheduler({ getCtx, getState, playStep, onScheduled }) {
  let nextNoteTime = 0;
  let timerId = null;
  let currentStep = 0;

  function tick() {
    const ctx = getCtx();
    if (!ctx) return;
    const s = getState();
    const total = s.bars * s.stepsPerBar;
    while (nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD_TIME) {
      playStep(currentStep, nextNoteTime);
      onScheduled?.(currentStep, nextNoteTime);
      nextNoteTime += stepDuration(s.bpm, s.stepsPerBar);
      currentStep = nextStep(currentStep, total);
    }
  }

  return {
    start() {
      const ctx = getCtx();
      currentStep = 0;
      nextNoteTime = ctx.currentTime + 0.05;
      timerId = setInterval(tick, TIMER_INTERVAL);
    },
    stop() {
      if (timerId) clearInterval(timerId);
      timerId = null;
    },
    getCurrentStep() {
      return currentStep;
    },
    isRunning() {
      return timerId !== null;
    },
  };
}
