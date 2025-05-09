/**
 * File: scripts/metrics-server.ts
 * Description: Lightweight Express server to expose Prometheus /metrics endpoint.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import express from 'express';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

const app = express();
const port = process.env.METRICS_PORT || 9464;

const exporter = new PrometheusExporter({ startServer: false });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', exporter.contentType);
  res.end(await exporter.getMetricsAsPrometheusPlainText());
});

app.listen(port, () => {
  console.log(`Prometheus metrics server running at http://localhost:${port}/metrics`);
});
