/**
 * File: src/engines/createRagPipeline.ts
 * Description: Orchestration function for modular RAG pipelines.
 * Version: 0.3.0
 * Author: Ali Kahwaji
 */

import { IEmbeddingProvider } from '../core/IEmbeddingProvider';
import { IVectorStore } from '../core/IVectorStore';
import { ILLMClient } from '../core/ILLMClient';
import { ContextManager } from './ContextManager';
import { latencyHistogram, tokenCounter } from '../utils/telemetry';
import { EmbeddingRegistry } from '../registry/EmbeddingRegistry';

export type RagPipelineConfig = {
  embedder?: IEmbeddingProvider;
  embeddingRegistry?: EmbeddingRegistry;
  embeddingMeta?: { language?: string; domain?: string };
  vectorStore: IVectorStore;
  llm: ILLMClient;
  contextManager?: ContextManager;
};

export function createRagPipeline(config: RagPipelineConfig) {
  const { embedder, embeddingRegistry, embeddingMeta, vectorStore, llm, contextManager } = config;

  return {
    async query(input: string): Promise<string> {
      const start = Date.now();

      const context = contextManager?.getContext() || [];
      const activeEmbedder = embedder || embeddingRegistry?.get(embeddingMeta || {}) || embeddingRegistry?.fallback();
      if (!activeEmbedder) throw new Error('No valid embedding provider found');

      const embeddings = await activeEmbedder.embed([input]);
      const results = await vectorStore.similaritySearch(embeddings[0], 5);
      const retrievedDocs = results.map((r) => `Doc: ${r.id} [score: ${r.score}]`);
      const promptContext = [...context, ...retrievedDocs];
      const output = await llm.generate(input, promptContext);

      latencyHistogram.observe(Date.now() - start);
      tokenCounter.inc(output.length);

      return output;
    }
  };
}
