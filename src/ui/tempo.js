import { state, setBpm as updateBpmState } from '../state.js';

export function setBpm(bpm) {
  updateBpmState(bpm);
  document.getElementById('bpmValue').textContent = state.bpm;
  document.getElementById('bpmSlider').value = state.bpm;
}

export function setupTempo() {
  const minusBtn = document.getElementById('minusBtn');
  const plusBtn = document.getElementById('plusBtn');
  const bpmSlider = document.getElementById('bpmSlider');

  minusBtn.addEventListener('click', () => setBpm(state.bpm - 1));
  plusBtn.addEventListener('click', () => setBpm(state.bpm + 1));
  bpmSlider.addEventListener('input', (e) => setBpm(parseInt(e.target.value)));
}
