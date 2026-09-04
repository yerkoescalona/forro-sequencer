import { state, makeEmptyPattern } from './state.js';
import { ensureAudio, getAudioCtx, getGainNode, setInstrumentVolume } from './audio/context.js';
import { createScheduler } from './audio/scheduler.js';
import { INSTRUMENTS, getInstrument, getTrackIds } from './instruments/index.js';
import { PRESETS, listPresets, applyPreset } from './presets/index.js';
import { renderGrid, highlightStep, clearHighlight, renderLegend } from './ui/grid.js';
import { setupTheme } from './ui/theme.js';
import { setupTempo, setBpm } from './ui/tempo.js';
import { setupTransport, setPlayingUI } from './ui/transport.js';
import { setupLanguage } from './ui/language.js';
import { exportSequence, importSequence } from './ui/io.js';
import { initLanguage, t, onLanguageChange } from './i18n.js';

// ─── HELPERS ────────────────────────────────────────────────────────

function allInstrumentIds() {
  return Object.keys(INSTRUMENTS);
}

function activeInstrumentIds() {
  return state.ensemble ? allInstrumentIds() : [state.instrumentId];
}

function initAllPatterns() {
  for (const id of allInstrumentIds()) {
    const trackIds = getTrackIds(id);
    state.patterns[id] = makeEmptyPattern(trackIds);
    state.volumes[id] = 1.0;
  }
}

// ─── PLAYBACK ───────────────────────────────────────────────────────

/**
 * Generic playStep — iterates active instruments and fires the synth
 * function for whatever state each track is in.
 *
 * In ensemble mode this plays all instruments simultaneously.
 */
function playStep(stepIdx, time) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  for (const instId of activeInstrumentIds()) {
    const inst = getInstrument(instId);
    const pattern = state.patterns[instId];
    if (!pattern || !pattern[stepIdx]) continue;
    const step = pattern[stepIdx];
    const dest = getGainNode(instId);
    for (const track of inst.tracks) {
      const value = step[track.id];
      const sound = track.sounds[value];
      if (sound) sound(ctx, time, dest);
    }
  }
}

const notesQueued = [];

const scheduler = createScheduler({
  getCtx: () => getAudioCtx(),
  getState: () => state,
  playStep,
  onScheduled: (stepIdx, time) => {
    notesQueued.push({ step: stepIdx, time });
  },
});

function visualLoop() {
  if (!state.isPlaying) return;
  const ctx = getAudioCtx();
  if (ctx) {
    const now = ctx.currentTime;
    while (notesQueued.length && notesQueued[0].time <= now) {
      const note = notesQueued.shift();
      highlightStep(note.step);
    }
  }
  requestAnimationFrame(visualLoop);
}

function startPlayback() {
  ensureAudio();
  state.isPlaying = true;
  notesQueued.length = 0;
  scheduler.start();
  requestAnimationFrame(visualLoop);
  setPlayingUI(true);
}

function stopPlayback() {
  state.isPlaying = false;
  scheduler.stop();
  notesQueued.length = 0;
  clearHighlight();
  setPlayingUI(false);
}

// ─── INSTRUMENT SWITCHING ───────────────────────────────────────────

function switchInstrument(instrumentId) {
  if (instrumentId === 'ensemble') {
    if (state.ensemble) return;
    state.ensemble = true;
  } else {
    if (!state.ensemble && instrumentId === state.instrumentId) return;
    state.ensemble = false;
    state.instrumentId = instrumentId;
  }

  if (state.isPlaying) stopPlayback();

  renderInstrumentButtons();
  renderPresetButtons();
  rerender();
}

// ─── BUTTONS rendered from data ─────────────────────────────────────

function renderInstrumentButtons() {
  const grid = document.getElementById('instGrid');
  grid.innerHTML = '';
  for (const id of allInstrumentIds()) {
    const btn = document.createElement('button');
    btn.dataset.inst = id;
    btn.textContent = INSTRUMENTS[id].label;
    if (!state.ensemble && id === state.instrumentId) btn.classList.add('active');
    btn.addEventListener('click', () => switchInstrument(id));
    grid.appendChild(btn);
  }
  // Ensemble button
  const ensBtn = document.createElement('button');
  ensBtn.dataset.inst = 'ensemble';
  ensBtn.textContent = t('instrument.ensemble');
  if (state.ensemble) ensBtn.classList.add('active');
  ensBtn.addEventListener('click', () => switchInstrument('ensemble'));
  grid.appendChild(ensBtn);
}

function renderPresetButtons() {
  const grid = document.getElementById('presetGrid');
  grid.innerHTML = '';

  // In ensemble mode, use zabumba's presets as reference
  // (all instruments share the same rhythm names)
  const refInstrumentId = state.ensemble ? 'zabumba' : state.instrumentId;
  const presets = listPresets(refInstrumentId);

  for (const { id, label } of presets) {
    const btn = document.createElement('button');
    btn.dataset.preset = id;
    btn.textContent = label;
    if (id === state.activePresetId) btn.classList.add('active');

    btn.addEventListener('click', () => {
      const instrumentIds = activeInstrumentIds();
      for (const instId of instrumentIds) {
        applyPreset(
          state.patterns[instId],
          state.bars,
          state.stepsPerBar,
          instId,
          id
        );
      }
      const presetData = PRESETS[instrumentIds[0]]?.[id];
      if (presetData?.bpm) setBpm(presetData.bpm);
      state.activePresetId = id;
      renderPresetButtons();
      rerender();
    });

    grid.appendChild(btn);
  }
}

// ─── BAR + GRID-RESOLUTION CONTROLS ─────────────────────────────────

function setupBarControls() {
  document.getElementById('addBarBtn').addEventListener('click', () => {
    state.bars++;
    for (const instId of allInstrumentIds()) {
      const trackIds = getTrackIds(instId);
      const empty = {};
      for (const id of trackIds) empty[id] = 0;
      for (let i = 0; i < state.stepsPerBar; i++) {
        state.patterns[instId].push({ ...empty });
      }
    }
    if (state.activePresetId) {
      for (const instId of activeInstrumentIds()) {
        applyPreset(
          state.patterns[instId],
          state.bars,
          state.stepsPerBar,
          instId,
          state.activePresetId
        );
      }
    }
    rerender();
  });

  document.getElementById('removeBarBtn').addEventListener('click', () => {
    if (state.bars <= 1) return;
    state.bars--;
    for (const instId of allInstrumentIds()) {
      state.patterns[instId].splice(-state.stepsPerBar, state.stepsPerBar);
    }
    rerender();
  });

  const gridBtn = document.getElementById('gridBtn');
  gridBtn.addEventListener('click', () => {
    if (state.isPlaying) stopPlayback();
    const oldSpb = state.stepsPerBar;
    const newSpb = oldSpb === 8 ? 24 : 8;

    for (const instId of allInstrumentIds()) {
      const trackIds = getTrackIds(instId);
      const oldPattern = state.patterns[instId];
      const newPattern = [];

      for (let bar = 0; bar < state.bars; bar++) {
        if (oldSpb === 8 && newSpb === 24) {
          for (let i = 0; i < 8; i++) {
            newPattern.push({ ...oldPattern[bar * 8 + i] });
            const empty = {};
            for (const id of trackIds) empty[id] = 0;
            newPattern.push({ ...empty });
            newPattern.push({ ...empty });
          }
        } else {
          for (let i = 0; i < 24; i += 3) {
            newPattern.push({ ...oldPattern[bar * 24 + i] });
          }
        }
      }

      state.patterns[instId] = newPattern;
    }

    state.stepsPerBar = newSpb;
    gridBtn.textContent = newSpb === 24
      ? t('grid.toggle.toBinary')
      : t('grid.toggle.toTriplet');
    rerender();
  });
}

// ─── RENDER ─────────────────────────────────────────────────────────

function rerender() {
  renderGrid({
    onChange: () => {
      // Cell click means we're no longer faithfully on a preset
      state.activePresetId = null;
      document
        .querySelectorAll('.preset-grid button')
        .forEach((b) => b.classList.remove('active'));
      rerender();
    },
  });
  renderLegend();
}

// ─── STATIC LABELS (h1, section headers, bar buttons, footer) ───────

function refreshStaticLabels() {
  // Top-level h1 in the header
  const h1 = document.querySelector('.header h1');
  if (h1) h1.textContent = t('app.title');

  // Section labels for instrument and rhythm groups
  document.querySelectorAll('.presets-label').forEach((el) => {
    if (el.dataset.i18n) el.textContent = t(el.dataset.i18n);
  });

  // BPM unit
  const bpmLabel = document.querySelector('.bpm-label');
  if (bpmLabel) bpmLabel.textContent = t('tempo.bpm');

  // Bar add/remove buttons
  const addBar = document.getElementById('addBarBtn');
  const removeBar = document.getElementById('removeBarBtn');
  if (addBar) addBar.textContent = t('bars.add');
  if (removeBar) removeBar.textContent = t('bars.remove');

  // Grid resolution toggle (text depends on current state)
  const gridBtn = document.getElementById('gridBtn');
  if (gridBtn) {
    gridBtn.textContent =
      state.stepsPerBar === 24
        ? t('grid.toggle.toBinary')
        : t('grid.toggle.toTriplet');
  }

  // Footer
  const footer = document.querySelector('.footer');
  if (footer) footer.textContent = t('footer.text');

  // Section hints
  const transportHint = document.getElementById('transportHint');
  if (transportHint) transportHint.textContent = t('transport.hint');

  const instrumentHint = document.getElementById('instrumentHint');
  if (instrumentHint) instrumentHint.textContent = t('section.instrument.hint');

  const rhythmsHint = document.getElementById('rhythmsHint');
  if (rhythmsHint) rhythmsHint.textContent = t('section.rhythms.hint');

  const barsHint = document.getElementById('barsHint');
  if (barsHint) barsHint.textContent = t('bars.hint');
}

// ─── SAVE / LOAD ────────────────────────────────────────────────────

function setupIO() {
  const saveBtn = document.getElementById('saveBtn');
  const loadBtn = document.getElementById('loadBtn');

  saveBtn.addEventListener('click', () => exportSequence());

  loadBtn.addEventListener('click', () => {
    importSequence((data) => {
      if (state.isPlaying) stopPlayback();

      state.bpm = data.bpm;
      state.bars = data.bars;
      state.stepsPerBar = data.stepsPerBar;
      state.instrumentId = data.instrumentId ?? 'zabumba';
      state.ensemble = data.ensemble ?? false;
      state.activePresetId = null;

      for (const instId of allInstrumentIds()) {
        if (data.patterns[instId]) {
          state.patterns[instId] = data.patterns[instId];
        }
        if (data.volumes?.[instId] != null) {
          state.volumes[instId] = data.volumes[instId];
        }
      }

      setBpm(state.bpm);
      renderInstrumentButtons();
      renderPresetButtons();
      rerender();
    });
  });

  refreshIOLabels();
  onLanguageChange(refreshIOLabels);
}

function refreshIOLabels() {
  const saveBtn = document.getElementById('saveBtn');
  const loadBtn = document.getElementById('loadBtn');
  const ioHint = document.getElementById('ioHint');
  if (saveBtn) saveBtn.textContent = t('io.save');
  if (loadBtn) loadBtn.textContent = t('io.load');
  if (ioHint) ioHint.textContent = t('io.hint');
}

// ─── INIT ───────────────────────────────────────────────────────────

function init() {
  initLanguage();
  setupLanguage();
  setupTheme();
  setupTempo();

  setupTransport({
    onPlay: startPlayback,
    onStop: stopPlayback,
    onClear: () => {
      for (const instId of activeInstrumentIds()) {
        const trackIds = getTrackIds(instId);
        for (const step of state.patterns[instId]) {
          for (const id of trackIds) step[id] = 0;
        }
      }
      state.activePresetId = null;
      document
        .querySelectorAll('.preset-grid button')
        .forEach((b) => b.classList.remove('active'));
      rerender();
    },
  });

  setupBarControls();
  setupIO();

  // Initialize patterns for ALL instruments at startup
  initAllPatterns();

  // Load baião as default rhythm so users hear sound immediately
  const defaultPreset = 'baiao';
  for (const instId of allInstrumentIds()) {
    applyPreset(
      state.patterns[instId],
      state.bars,
      state.stepsPerBar,
      instId,
      defaultPreset
    );
  }
  state.activePresetId = defaultPreset;
  const defaultBpm = PRESETS.zabumba?.[defaultPreset]?.bpm;
  if (defaultBpm) state.bpm = defaultBpm;

  setBpm(state.bpm);
  refreshStaticLabels();
  renderInstrumentButtons();
  renderPresetButtons();
  rerender();

  // Re-render anything containing translatable text when language changes
  onLanguageChange(() => {
    refreshStaticLabels();
    renderInstrumentButtons();
    rerender();
  });
}

init();
