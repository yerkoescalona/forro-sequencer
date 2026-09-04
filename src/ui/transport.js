import { state } from '../state.js';
import { setBpm } from './tempo.js';
import { t, onLanguageChange } from '../i18n.js';

const tapTimes = [];

export function setupTransport({ onPlay, onStop, onClear }) {
  const playBtn = document.getElementById('playBtn');
  const clearBtn = document.getElementById('clearBtn');
  const tapBtn = document.getElementById('tapBtn');

  playBtn.addEventListener('click', () => {
    if (state.isPlaying) {
      onStop();
    } else {
      onPlay();
    }
  });

  clearBtn.addEventListener('click', () => {
    onClear();
  });

  tapBtn.addEventListener('click', () => {
    const now = Date.now();
    tapTimes.push(now);
    while (tapTimes.length > 0 && now - tapTimes[0] > 2000) tapTimes.shift();
    if (tapTimes.length >= 2) {
      let sum = 0;
      for (let i = 1; i < tapTimes.length; i++) {
        sum += tapTimes[i] - tapTimes[i - 1];
      }
      const avg = sum / (tapTimes.length - 1);
      setBpm(60000 / avg);
    }
  });

  // Initial labels and re-render on language change
  refreshLabels();
  onLanguageChange(refreshLabels);
}

function refreshLabels() {
  const playBtn = document.getElementById('playBtn');
  const clearBtn = document.getElementById('clearBtn');
  const tapBtn = document.getElementById('tapBtn');
  if (clearBtn) clearBtn.textContent = t('transport.clear');
  if (tapBtn) tapBtn.textContent = t('tempo.tap');
  // Play button text is set via setPlayingUI based on playback state
  if (playBtn && !state.isPlaying) playBtn.textContent = t('transport.play');
  if (playBtn && state.isPlaying) playBtn.textContent = t('transport.stop');
}

export function setPlayingUI(isPlaying) {
  const playBtn = document.getElementById('playBtn');
  if (isPlaying) {
    playBtn.classList.add('playing');
    playBtn.textContent = t('transport.stop');
  } else {
    playBtn.classList.remove('playing');
    playBtn.textContent = t('transport.play');
  }
}
