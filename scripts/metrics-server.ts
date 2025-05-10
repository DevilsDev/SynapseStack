/**
 * File: scripts/metrics-server.ts
 * Description: Lightweight Express server to expose Prometheus /metrics endpoint.
 * Version: 0.2.1
 * Author: Ali Kahwaji
 */

import express from 'express';
import client from 'prom-client';

const app = express();
const port = process.env.METRICS_PORT || 9464;

client.collectDefaultMetrics();

app.get('/metrics', async (_req: express.Request, res: express.Response) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(` Prometheus metrics server running at http://localhost:${port}/metrics`);
});
