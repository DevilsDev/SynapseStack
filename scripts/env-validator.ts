/**
 * File: scripts/env-validator.ts
 * Description: Validates required environment variables for SynapseStack CLI and CI scripts.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import 'dotenv/config';

const requiredVars = [
  'OPENAI_API_KEY'
];

let missing: string[] = [];

for (const key of requiredVars) {
  if (!process.env[key]) {
    missing.push(key);
  }
}

if (missing.length > 0) {
  console.error(`Missing required environment variables:\n  ${missing.join('\n  ')}`);
  process.exit(1);
}

console.log('All required environment variables are set.');
