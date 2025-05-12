/**
 * File: scripts/metrics-server.ts
 * Description: Lightweight Express server to expose Prometheus /metrics endpoint.
 * Version: 0.2.2
 * Author: Ali Kahwaji
 */

import express from 'express';
import client from 'prom-client';
import { latencyHistogram, tokenCounter } from '../src/utils/telemetry';

const app = express();
const port = process.env.METRICS_PORT || 9464;

// Move this inside the request handler instead:
app.get('/metrics', async (_req, res) => {
  latencyHistogram.observe(Math.random() * 200 + 100); // emit on demand
  tokenCounter.inc(Math.floor(Math.random() * 50));     // emit on demand

  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(` Prometheus metrics server running at http://localhost:${port}/metrics`);
});
