import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'v8',
      include: [
        'src/App.jsx',
        'src/components/*.jsx',
        'src/pages/*.jsx',
        'src/hooks/*.js',
      ],
      exclude: ['**/*.cy.jsx', '**/*.test.jsx'],
      reporter: ['text', 'html', 'json-summary'],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
});
