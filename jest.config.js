/**
 * File: jest.config.js
 * Description: Jest configuration for SynapseStack with TS support and coverage enabled.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    coverageDirectory: './coverage',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      }
    }
  };
  