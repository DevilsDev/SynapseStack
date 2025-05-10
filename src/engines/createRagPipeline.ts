/**
 * File: src/engines/createRagPipeline.ts
 * Description: Orchestration function for modular RAG pipelines.
 * Version: 0.2.1
 * Author: Ali Kahwaji
 */

import { IEmbeddingProvider } from '../core/IEmbeddingProvider';
import { IVectorStore } from '../core/IVectorStore';
import { ILLMClient } from '../core/ILLMClient';
import { ContextManager } from './ContextManager';
import { latencyHistogram, tokenCounter } from '../utils/telemetry';

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
      const start = Date.now();

      const context = contextManager?.getContext() || [];
      const embeddings = await embedder.embed([input]);
      const results = await vectorStore.similaritySearch(embeddings[0], 5);
      const retrievedDocs = results.map((r) => `Doc: ${r.id} [score: ${r.score}]`);
      const promptContext = [...context, ...retrievedDocs];
      const output = await llm.generate(input, promptContext);

      latencyHistogram.observe(Date.now() - start);
      tokenCounter.inc(output.length); // approximate

      return output;
    }
  };
}
