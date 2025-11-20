import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, '@stylistic': stylistic },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    rules: {
      eqeqeq: 'error',
      'no-console': 'off',
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
]);
