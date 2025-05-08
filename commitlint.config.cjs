/**
 * File: commitlint.config.cjs
 * Description: Commitlint configuration for enforcing Conventional Commits in an ESM project.
 * Version: 0.2.0
 * Author: Ali Kahwaji
 */

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional']
};

export default config;
