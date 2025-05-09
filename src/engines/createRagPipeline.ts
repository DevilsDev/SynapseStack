/**
 * File: src/engines/createRagPipeline.ts
 * Description: Orchestration function for modular RAG pipelines.
 * Version: 0.2.0
 * Author: Ali Kahwaji
 */

import { IEmbeddingProvider } from '../core/IEmbeddingProvider';
import { IVectorStore } from '../core/IVectorStore';
import { ILLMClient } from '../core/ILLMClient';
import { ContextManager } from './ContextManager';
import { tracer, latencyHistogram, tokenCounter } from '../utils/telemetry';

export type RagPipelineConfig = {
  embedder: IEmbeddingProvider;
  vectorStore: IVectorStore;
  llm: ILLMClient;
  contextManager?: ContextManager;
};

export function createRagPipeline(config: RagPipelineConfig) {
  const { embedder, vectorStore, llm, contextManager } = config;

  return {
    async query(input: string): Promise<string> {
      const span = tracer.startSpan('pipeline.query');
      const start = Date.now();

      try {
        const context = contextManager?.getContext() || [];
        const embeddings = await embedder.embed([input]);
        const results = await vectorStore.similaritySearch(embeddings[0], 5);
        const retrievedDocs = results.map((r) => `Doc: ${r.id} [score: ${r.score}]`);
        const promptContext = [...context, ...retrievedDocs];
        const output = await llm.generate(input, promptContext);

        latencyHistogram.record(Date.now() - start);
        tokenCounter.add(output.length); // simplistic approximation
        return output;
      } finally {
        span.end();
      }
    }
  };
}
