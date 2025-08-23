import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      reporter: ['text'],
      include: ['src/utils/cache.ts', 'src/utils/common.ts'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});
