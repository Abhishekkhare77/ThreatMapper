/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { configDefaults } from 'vitest/config';

import { peerDependencies } from './package.json';

const current = fileURLToPath(import.meta.url);
const root = path.dirname(current);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        jsxRuntime: 'classic',
      }),
      dts({
        insertTypesEntry: true,
      }),
      ...(mode === 'production' ? [visualizer()] : []),
    ],
    test: {
      includeSource: ['src/**/*.test.{ts, tsx}'],
      exclude: [...configDefaults.exclude, 'e2e/**'],
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/tests/setup.ts'], // to do prior task before all of your tests run
      coverage: {
        reporter: ['text', 'json', 'html'],
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
    build: {
      lib: {
        entry: path.resolve(root, 'src/main.ts'),
        formats: ['es'],
        name: 'ui-components',
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: [...Object.keys(peerDependencies)],
      },
    },
    sourcemap: true,
  };
});
