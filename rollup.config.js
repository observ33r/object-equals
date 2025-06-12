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
  // Node-specific ESM Build
  {
    input: 'src/objectEquals.node.mjs',
    output: {
      file: 'dist/object-equals.node.esm.js',
      format: 'esm',
      sourcemap: false,
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