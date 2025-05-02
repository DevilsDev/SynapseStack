// File: eslint.config.js
// Description: Flat config for ESLint v9+ with TypeScript support
// Version: 0.1.0
// Author: Ali Kahwaji

import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
];
