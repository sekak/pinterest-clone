import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Maps @ to src directory
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__test__/setup.ts',
  },
});