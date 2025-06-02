import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

export default defineConfig([
  // ESM Build (main)
  {
    input: 'src/objectEquals.mjs',
    output: {
      file: 'dist/object-equals.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [terser()],
  },
  // Web-safe ESM Build
  {
    input: 'src/objectEquals.web.mjs',
    output: {
      file: 'dist/object-equals.web.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [terser()],
  },
  // TypeScript declarations
  {
    input: 'src/objectEquals.d.mts',
    output: {
      file: 'dist/object-equals.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
]);