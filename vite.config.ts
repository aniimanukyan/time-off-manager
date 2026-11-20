import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Playwright e2e specs live in e2e/.
    include: ['src/**/*.test.{ts,tsx}'],
    alias: {
      '@lit/react': fileURLToPath(new URL('./node_modules/@lit/react/development/index.js', import.meta.url)),
    },
    server: {
      deps: {
        inline: ['@stencil/react-output-target'],
      },
    },
  },
});
