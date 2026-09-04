import { state } from '../state.js';
import { getInstrument, INSTRUMENTS } from '../instruments/index.js';
import { setInstrumentVolume } from '../audio/context.js';
import { t } from '../i18n.js';

/**
 * Build a single track row.
 * Generic — works for any instrument shape.
 */
function buildRow(track, bar, pattern, onChange) {
  const row = document.createElement('div');
  row.className = 'row';

  const label = document.createElement('div');
  label.className = 'label';
  label.textContent = track.label;
  row.appendChild(label);

  const spb = state.stepsPerBar;
  const half = spb / 2;
  const numStates = track.states.length;

  for (let i = 0; i < spb; i++) {
    if (i === half) {
      const sep = document.createElement('div');
      sep.className = 'half-sep';
      row.appendChild(sep);
    }

    const idx = bar * spb + i;
    const step = pattern[idx];
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.step = idx;
    cell.dataset.trackId = track.id;

    const val = step[track.id];
    if (val > 0) {
      cell.classList.add(`${track.id}${val}`);
    }

    if (track.labels && track.labels[val]) {
      const lbl = document.createElement('div');
      lbl.className = 'cell-label';
      lbl.textContent = track.labels[val];
      cell.appendChild(lbl);
    }

    cell.addEventListener('click', () => {
      step[track.id] = (step[track.id] + 1) % numStates;
      onChange();
    });

    row.appendChild(cell);
  }

  return row;
}

function buildBeatNumbers(stepsPerBar) {
  const nums = document.createElement('div');
  nums.className = 'numbers';

  let html = '<div></div>';
  if (stepsPerBar === 24) {
    for (let beat = 1; beat <= 8; beat++) {
      if (beat === 5) html += '<div class="half-sep"></div>';
      html += `<div class="num main">${beat}</div>`;
      html += '<div class="num">.</div><div class="num">.</div>';
    }
  } else {
    const labels = ['1', '&', '2', '&', '3', '&', '4', '&'];
    for (let i = 0; i < 8; i++) {
      if (i === 4) html += '<div class="half-sep"></div>';
      const cls = i % 2 === 0 ? 'num main' : 'num';
      html += `<div class="${cls}">${labels[i]}</div>`;
    }
  }
  nums.innerHTML = html;
  return nums;
}

export function renderGrid({ onChange }) {
  const root = document.getElementById('sequencer');
  root.innerHTML = '';

  const instrumentIds = state.ensemble
    ? Object.keys(INSTRUMENTS)
    : [state.instrumentId];

  for (let bar = 0; bar < state.bars; bar++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bar view-' + state.stepsPerBar;

    const title = document.createElement('div');
    title.className = 'bar-title';
    title.textContent = `${t('bars.title')} ${bar + 1}`;
    wrapper.appendChild(title);

    wrapper.appendChild(buildBeatNumbers(state.stepsPerBar));

    for (const instId of instrumentIds) {
      const inst = getInstrument(instId);
      const pattern = state.patterns[instId];

      if (state.ensemble) {
        const header = document.createElement('div');
        header.className = 'inst-header';

        const label = document.createElement('span');
        label.textContent = inst.label;
        header.appendChild(label);

        const volControl = document.createElement('div');
        volControl.className = 'vol-control';

        const volIcon = document.createElement('span');
        volIcon.className = 'vol-icon';
        volIcon.textContent = '🔊';
        volControl.appendChild(volIcon);

        const volSlider = document.createElement('input');
        volSlider.type = 'range';
        volSlider.min = '0';
        volSlider.max = '100';
        volSlider.value = String(Math.round((state.volumes[instId] ?? 1) * 100));
        volSlider.className = 'vol-slider';
        volSlider.addEventListener('input', (e) => {
          const vol = parseInt(e.target.value) / 100;
          state.volumes[instId] = vol;
          setInstrumentVolume(instId, vol);
          volIcon.textContent = vol === 0 ? '🔇' : vol < 0.5 ? '🔉' : '🔊';
        });

        volControl.appendChild(volSlider);
        header.appendChild(volControl);
        wrapper.appendChild(header);
      }

      for (const track of inst.tracks) {
        wrapper.appendChild(buildRow(track, bar, pattern, onChange));
      }
    }

    root.appendChild(wrapper);
  }
}

/**
 * Highlight the currently-playing step. Called from the visual loop.
 */
export function highlightStep(step) {
  document.querySelectorAll('.cell.current').forEach((c) =>
    c.classList.remove('current')
  );
  document
    .querySelectorAll(`.cell[data-step="${step}"]`)
    .forEach((c) => c.classList.add('current'));
}

export function clearHighlight() {
  document.querySelectorAll('.cell.current').forEach((c) =>
    c.classList.remove('current')
  );
}

/**
 * Render a color legend showing what each cell state means.
 * Musical terms (maceta, bacalhau, xi, tum, tapa, etc.) stay in Portuguese.
 * Generic state descriptions (open, closed, accent) are translated.
 */
const STATE_I18N = {
  off: 'legend.off',
  open: 'legend.open',
  closed: 'legend.closed',
  normal: 'legend.normal',
  accent: 'legend.accent',
};

export function renderLegend() {
  const root = document.getElementById('legend');
  if (!root) return;
  root.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'legend';

  const title = document.createElement('div');
  title.className = 'legend-title';
  title.textContent = t('legend.title');
  wrapper.appendChild(title);

  const instrumentIds = state.ensemble
    ? Object.keys(INSTRUMENTS)
    : [state.instrumentId];

  for (const instId of instrumentIds) {
    const inst = getInstrument(instId);

    for (const track of inst.tracks) {
      const row = document.createElement('div');
      row.className = 'legend-row';

      const trackLabel = document.createElement('span');
      trackLabel.className = 'legend-track';
      trackLabel.textContent = track.label;
      row.appendChild(trackLabel);

      const items = document.createElement('div');
      items.className = 'legend-items';

      for (let s = 1; s < track.states.length; s++) {
        const item = document.createElement('div');
        item.className = 'legend-item';

        const swatch = document.createElement('span');
        swatch.className = `legend-swatch ${track.id}${s}`;
        item.appendChild(swatch);

        const stateName = track.states[s];
        // Use cell label if available (xi, tum, tũ, tapa, c, o),
        // otherwise translate the state name
        const label = (track.labels && track.labels[s])
          ? track.labels[s]
          : (STATE_I18N[stateName] ? t(STATE_I18N[stateName]) : stateName);
        const text = document.createElement('span');
        text.className = 'legend-text';
        text.textContent = label;
        item.appendChild(text);

        items.appendChild(item);
      }

      row.appendChild(items);
      wrapper.appendChild(row);
    }
  }

  const hint = document.createElement('div');
  hint.className = 'legend-hint';
  hint.textContent = t('legend.hint');
  wrapper.appendChild(hint);

  root.appendChild(wrapper);
}
