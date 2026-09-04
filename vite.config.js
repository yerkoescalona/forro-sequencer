import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // For GitHub Pages: served at https://<user>.github.io/forro-sequencer/
  // Change this if you use a custom domain (set to '/' instead).
  base: '/forro-sequencer/',

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        tutorial: resolve(__dirname, 'tutorial.html'),
        about: resolve(__dirname, 'about.html'),
      },
    },
  },

  test: {
    environment: 'node',
    globals: true,
  },
});
