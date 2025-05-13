/**
 * File: scripts/test-real-pipeline.ts
 * Description: Real-world simulation test using mocked embedding, vector store, and LLM.
 * Version: 0.2.0
 * Author: Ali Kahwaji
 */

import { createRagPipeline } from '../src/engines/createRagPipeline';
import { latencyHistogram, tokenCounter } from '../src/utils/telemetry';

// Mock embedding provider
const embedder = {
  getModelName: () => 'MockEmbedder',
  embed: async (_texts: string[]) => [[0.1, 0.2, 0.3]]
};

// Mock vector store
const vectorStore = {
  getName: () => 'MockStore',
  addDocuments: async () => {},
  similaritySearch: async () => {
    return [
      { id: 'doc1', score: 0.92 },
      { id: 'doc2', score: 0.85 }
    ];
  },
  delete: async () => {}
};

// Mock LLM client
const llm = {
  getModelName: () => 'MockLLM',
  generate: async (prompt: string, context: string[]) => {
    tokenCounter.inc(prompt.length + context.join(' ').length); // simulate token usage
    return `Summary: Spaceflight has evolved significantly since the mid-20th century... [mocked]`;
  },
  stream: async () => {}
};

(async () => {
  const pipeline = createRagPipeline({ embedder, vectorStore, llm });

  const prompt = 'Summarize the history of spaceflight in 3 sentences.';
  const start = Date.now();
  const result = await pipeline.query(prompt);
  const duration = Date.now() - start;

  latencyHistogram.observe(duration);

  console.log('--- RAG PIPELINE OUTPUT ---');
  console.log(result);
  console.log(`Latency: ${duration}ms`);
})();
