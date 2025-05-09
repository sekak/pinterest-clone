import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Maps @ to src/
    },
  },
  server: {
    host: true
  },
  preview:{
    host: true,
    port: 4173
  }
})
