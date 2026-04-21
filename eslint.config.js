import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import svelteEslint from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/']
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...svelteEslint.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'svelte/no-dom-manipulating': 'off',
      'svelte/no-navigation-without-resolve': 'off',
      'svelte/require-each-key': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'svelte/no-useless-mustaches': 'off',

    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tsEslint.parser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },
];
