# Forró Sequencer

Drum sequencer for forró rhythms — zabumba, pandeiro, triângulo. Vanilla JS + Web Audio API, bundled with Vite. No framework, no dependencies at runtime.

## Commands

```bash
npm run dev          # dev server with hot reload (http://localhost:5173/forro-sequencer/)
npm run build        # production build → dist/
npm run preview      # preview the production build locally
npm run test:run     # run tests once
npm run deploy       # build + push dist/ to gh-pages branch (publishes the site)
```

## CI / Deploy

GitHub Actions (`.github/workflows/deploy.yml`) runs on every push/PR to main:
- Runs `npm run test:run` on all pushes and PRs
- On push to main: builds and deploys to GitHub Pages via `actions/deploy-pages`

The Pages source in the repo settings must be set to **GitHub Actions** (not "Deploy from a branch").

Before merging to main, always verify locally:

```bash
npm run test:run
npm run build
```

Husky also enforces `npm run test:run` as a pre-commit hook and commitlint on commit messages.

## Architecture

State is a single plain mutable object in `src/state.js` — no signals, no stores, no framework. UI modules read from it and call `rerender()` when they change it. `main.js` owns initialization and wires everything together.

```
src/
  main.js              # app entry — init, playback, instrument/preset switching, re-render
  state.js             # single source of truth: bpm, bars, stepsPerBar, patterns, volumes
  i18n.js              # translations (pt default, en fallback)
  audio/
    context.js         # AudioContext lifecycle, per-instrument GainNodes
    scheduler.js       # lookahead scheduler (Chris Wilson pattern) — pure stepDuration() is tested
    synthesis.js       # Web Audio synth functions, one per sound (ctx, time, dest) => void
  instruments/
    index.js           # INSTRUMENTS map + getInstrument() / getTrackIds() helpers
    zabumba.js         # tracks: maceta (m), bacalhau (b) — 3 states each
    pandeiro.js        # tracks: pandeiro (p) — 5 states: non/xi/tum/tũ/tapa
    triangle.js        # tracks: triângulo (t) — 3 states: off/closed/open
  presets/
    index.js           # PRESETS map, applyPreset(), listPresets()
    zabumba.js         # 6 rhythms: baião, xote, forró, xaxado, coco, rastapé
    pandeiro.js        # same 6 rhythms for pandeiro
    triangle.js        # same 6 rhythms for triangle
  ui/
    grid.js            # renders the sequencer grid and legend
    transport.js       # play/stop/clear/tap buttons
    tempo.js           # BPM slider, +/− buttons
    theme.js           # dark/light toggle, persisted to localStorage
    language.js        # PT/EN language switcher
    io.js              # export/import sequences as JSON (serializeSequence, deserializeSequence)
tests/
  state.test.js
  scheduler.test.js
  instruments.test.js
  presets.test.js
  i18n.test.js
  io.test.js
index.html             # single-page shell — all buttons are in the HTML, JS wires them up
```

## Key concepts

**Pattern format** — `state.patterns` is a map of `instrumentId → step[]`. Each step is an object keyed by track id, e.g. `{ m: 1, b: 0 }` for zabumba or `{ p: 3 }` for pandeiro. Value 0 is always silent; higher values cycle through the track's sounds.

**Grid modes** — 8 steps/bar (binary, eighth notes) or 24 steps/bar (triplet, 16th-triplets). Switching converts the pattern in place. `applyPreset` handles both modes.

**Ensemble mode** — plays all three instruments simultaneously. Preset buttons apply the same rhythm to all instruments. `activeInstrumentIds()` in `main.js` returns either `[state.instrumentId]` or all three.

**Lookahead scheduler** — fires every 25ms and schedules any steps within the next 100ms using the Web Audio clock. This avoids setTimeout drift. Visual highlighting (`highlightStep`) is driven by `requestAnimationFrame` comparing `ctx.currentTime` against scheduled note times.

**Synth functions** — each is `(ctx, time, dest) => void`. They are pure in the sense that they only create Web Audio nodes; no shared mutable state. All sounds are synthesized (no samples). To add a sampled sound, replace the function body with a `BufferSource` that plays a pre-loaded `AudioBuffer` at `time`.

**Save / load** — `src/ui/io.js` exports `serializeSequence(state)` → plain object and `deserializeSequence(data)` → validated/defaulted object. These are pure and fully tested. `exportSequence()` and `importSequence()` wrap them with browser file APIs.

## Adding a new instrument

1. Create `src/instruments/yourname.js` following the same shape (id, label, tracks with states/sounds/colors).
2. Add it to `INSTRUMENTS` in `src/instruments/index.js`.
3. Create `src/presets/yourname.js` with the same 6 rhythm keys (baiao, xote, forro, xaxado, coco, rastape) — arrays of 8 values matching the track ids.
4. Add it to `PRESETS` in `src/presets/index.js`.
5. Add the synthesis functions to `src/audio/synthesis.js`.

## Adding a new rhythm preset

Add an entry with the same key to all three preset files (zabumba, pandeiro, triangle). All instruments must have matching rhythm names — there is a test that enforces this.

## i18n

Default language is Portuguese (`pt`). Musical term names (Baião, Xote, Pandeiro, maceta, bacalhau, xi, tum, tapa, etc.) are never translated — they are proper names of Brazilian percussion techniques and rhythms. To add a new language, copy one of the objects in `TRANSLATIONS` in `src/i18n.js` and add the key to `SUPPORTED_LANGUAGES`.
