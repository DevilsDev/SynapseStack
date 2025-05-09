/**
 * File: src/utils/telemetry.ts
 * Description: Exports OpenTelemetry tracer and Prometheus metrics for SynapseStack instrumentation.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { trace } from '@opentelemetry/api';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { PrometheusExporter as PrometheusMetricsExporter } from '@opentelemetry/exporter-prometheus';

// Setup diagnostic logger
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

// Tracer provider setup
const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'synapsestack-pipeline'
  })
});

const prometheusExporter = new PrometheusExporter({ startServer: true });
provider.addSpanProcessor(new BatchSpanProcessor(prometheusExporter));
provider.register();

registerInstrumentations({ instrumentations: [] });

const tracer = trace.getTracer('synapsestack');

// Metrics setup
const meterProvider = new MeterProvider();
const promMetrics = new PrometheusMetricsExporter();
const reader = new PeriodicExportingMetricReader({ exporter: promMetrics });
meterProvider.addMetricReader(reader);
const meter = meterProvider.getMeter('synapsestack-metrics');

// Define sample metrics
const latencyHistogram = meter.createHistogram('pipeline_latency_ms', {
  description: 'Pipeline execution latency in milliseconds'
});

const tokenCounter = meter.createCounter('pipeline_tokens_used', {
  description: 'Number of tokens used by pipeline operations'
});

export { tracer, latencyHistogram, tokenCounter };
