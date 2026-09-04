# Forró Sequencer

A drum sequencer for forró rhythms — zabumba, pandeiro, triângulo. Built for forró musicians everywhere.

## Stack

- **Vanilla JS** with ES modules — no framework
- **Web Audio API** — sample-accurate scheduling, fully synthesized sounds
- **Vite** — dev server and production builds
- **Vitest** — unit tests
- **GitHub Pages** — hosting

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:5173/forro-sequencer/
npm run test:run   # run tests once
npm run build      # production build → dist/
npm run build      # production build (deploy is handled by GitHub Actions)
```

## Languages

Available in **Portuguese** (default) and **English**. The app auto-detects browser language on first visit and persists the choice. Musical terms (Baião, Xote, Maceta, Bacalhau, xi/tum/tũ/tapa…) are never translated.

## License

GPL-3.0 — see [LICENSE](LICENSE) for details.

**Author:** Yerko Escalona
