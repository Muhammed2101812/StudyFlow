import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple';
import electronRenderer from 'vite-plugin-electron-renderer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`
        entry: 'src/main/main.js',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`
        input: 'src/main/preload.js',
      },
      // Ployfill the electron api to the render process
      renderer: {},
    }),
    // Polyfill Node/Electron APIs in renderer when needed
    electronRenderer(),
  ],
  build: {
    rollupOptions: {
      external: ['electron', 'electron-store', 'path', 'url'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
