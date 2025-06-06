import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['benchmarks/**', 'dist/**']
    }
  }
});