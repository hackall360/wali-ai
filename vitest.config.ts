import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      reporter: ['text'],
      include: ['src/utils/*.ts'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
  resolve: {
    alias: {
      '#config': path.resolve(__dirname, './src/config.ts'),
      '#utils': path.resolve(__dirname, './src/utils'),
      '#types': path.resolve(__dirname, './src/types'),
    },
  },
});
