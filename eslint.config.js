/**
 * File: eslint.config.js
 * Description: ESLint Flat Config with Clean Code and architectural rules for SynapseStack.
 * Version: 0.2.0
 * Author: Ali Kahwaji
 */

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      unicorn,
      sonarjs,
    },
    rules: {
      'unicorn/no-for-loop': 'warn',
      'unicorn/prefer-string-slice': 'warn',
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/cognitive-complexity': ['warn', 15]
    }
  },
  {
    files: ['src/adapters/**/*.ts'],
    rules: {
      'unicorn/prevent-abbreviations': 'error',
      'unicorn/filename-case': 'off'
    }
  }
];
