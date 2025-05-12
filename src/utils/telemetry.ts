/**
 * File: src/utils/telemetry.ts
 * Description: Exports Prometheus metrics for SynapseStack instrumentation.
 * Version: 0.2.1
 * Author: Ali Kahwaji
 */

import client from 'prom-client';

//client.collectDefaultMetrics();

const latencyHistogram = new client.Histogram({
  name: 'pipeline_latency_ms',
  help: 'Pipeline execution latency in milliseconds',
  registers: [client.register]
});

const tokenCounter = new client.Counter({
  name: 'pipeline_tokens_used',
  help: 'Number of tokens used by pipeline operations',
  registers: [client.register]
});

export { latencyHistogram, tokenCounter };
