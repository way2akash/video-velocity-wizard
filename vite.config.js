// vite.config.js (root)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup/index.html'),
        background: resolve(__dirname, 'background/index.js')
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext'
  },
  publicDir: 'public'
});
