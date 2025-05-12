/**
 * File: scripts/audit-functional.ts
 * Description: Runtime audit for SynapseStack CLI, metrics, and pipeline behavior.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { execSync } from 'child_process';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

console.log('\n Functional Audit — SynapseStack');

// CLI Init Test
console.log('\n CLI: init');
try {
  execSync('npx tsx src/cli/rag-cli.ts init');
  const file = fs.existsSync(path.resolve('pipeline.yaml'));
  console.log(file ? ' pipeline.yaml created' : ' init failed to create pipeline.yaml');
} catch {
  console.error(' rag-cli init failed');
}

// CLI Run Test
console.log('\n CLI: run');
try {
  const output = execSync('npx tsx src/cli/rag-cli.ts run').toString();
  if (output.includes('Proceeding to execute')) {
    console.log(' rag-cli run executed');
  } else {
    console.error(' rag-cli run did not execute as expected');
  }
} catch {
  console.error(' rag-cli run failed');
}

// Metrics Test
console.log('\n Metrics scrape check');
(async () => {
  try {
    const res = await axios.get('http://localhost:9464/metrics');
    const data = res.data;
    const latencyFound = data.includes('pipeline_latency_ms');
    const tokensFound = data.includes('pipeline_tokens_used');
    console.log(latencyFound ? ' latency metric found' : ' latency metric missing');
    console.log(tokensFound ? ' token metric found' : ' token metric missing');
  } catch (err) {
    console.error(' Failed to fetch /metrics:', err.message);
  }
})();
