import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/tools/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared-tokens': path.resolve(__dirname, '../src/styles/tokens.css'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
  },
});
