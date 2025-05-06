/**
 * File: jest.config.cjs
 * Description: Clean Jest config using CommonJS, compatible with type: module project.
 * Version: 0.2.1
 * Author: Ali Kahwaji
 */

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }]
  },
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 70,
      statements: 70
    }
  }
};
