
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // GitHub Pages repository path
  base: '/Portfolio-React/',

  server: {
    port: 3000,
    open: false,
    host: true
  }
});
