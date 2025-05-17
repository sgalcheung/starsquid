import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite'

process.env.NODE_OPTIONS ??= '--enable-source-maps';
process.setSourceMapsEnabled(true);

export default defineConfig(({ mode }) => ({
  test: {
    maxConcurrency: 1,
    name: 'starsquid-loader',
    setupFiles: ['./test/vitest.setup.ts'],
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
