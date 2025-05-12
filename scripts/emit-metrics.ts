/**
 * File: scripts/emit-metrics.ts
 * Description: Emit dummy Prometheus metrics to test pipeline visibility.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import client from 'prom-client';

client.collectDefaultMetrics();

const latency = new client.Histogram({
  name: 'pipeline_latency_ms',
  help: 'Latency for validation',
  registers: [client.register] //  bind to exposed registry
});

const tokens = new client.Counter({
  name: 'pipeline_tokens_used',
  help: 'Token count for validation',
  registers: [client.register] //  bind to exposed registry
});

latency.observe(123);
tokens.inc(45);

console.log(' Dummy metrics emitted to /metrics');

setTimeout(() => {
  process.exit(0)
}, 15000)