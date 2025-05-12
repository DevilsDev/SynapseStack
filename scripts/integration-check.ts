/**
 * File: scripts/integration-check.ts
 * Description: Runs basic validation of SynapseStack's key files, telemetry hooks, and CLI behavior.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REQUIRED_FILES = [
  'src/cli/rag-cli.ts',
  'src/engines/createRagPipeline.ts',
  'src/utils/telemetry.ts',
  'scripts/metrics-server.ts',
  'scripts/emit-metrics.ts',
  'docs-site/src/components/Sandbox.tsx',
  'docs-site/src/components/BenchmarkViewer.tsx',
  'docker-compose.yml',
  'config/prometheus.yml'
];

console.log('\n Checking core file structure...');
for (const file of REQUIRED_FILES) {
  if (!fs.existsSync(path.resolve(file))) {
    console.error(` MISSING: ${file}`);
  } else {
    console.log(` Found: ${file}`);
  }
}

console.log('\n Verifying CLI commands...');
try {
  const help = execSync('npx tsx src/cli/rag-cli.ts --help').toString();
  if (help.includes('Usage:')) {
    console.log(' CLI responds to --help');
  }
} catch (err) {
  console.error(' CLI failed to execute --help');
}

console.log('\n Verifying telemetry exports...');
try {
  const telemetryCode = fs.readFileSync(path.resolve('src/utils/telemetry.ts'), 'utf8');
  if (
    telemetryCode.includes('registers: [client.register]') &&
    telemetryCode.includes('Histogram') &&
    telemetryCode.includes('Counter')
  ) {
    console.log(' Telemetry metrics bound to Prometheus registry');
  } else {
    console.warn('  Telemetry config incomplete');
  }
} catch {
  console.error(' telemetry.ts not found or unreadable');
}

console.log('\n Integration check complete.')
