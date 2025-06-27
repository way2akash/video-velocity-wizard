import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {}
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.jsx'),
      formats: ['iife'],
      name: 'ContentScript'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'content.js'
      }
    },
    outDir: resolve(__dirname, '../dist/assets'),
    emptyOutDir: false
  }
});
