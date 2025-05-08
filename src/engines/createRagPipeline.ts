/**
 * File: src/engines/createRagPipeline.ts
 * Description: Orchestration function for modular RAG pipelines.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { IEmbeddingProvider } from '../core/IEmbeddingProvider';
import { IVectorStore } from '../core/IVectorStore';
import { ILLMClient } from '../core/ILLMClient';
import { ContextManager } from './ContextManager';

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
      const context = contextManager?.getContext() || [];
      const embeddings = await embedder.embed([input]);
      const results = await vectorStore.similaritySearch(embeddings[0], 5);
      const retrievedDocs = results.map((r) => `Doc: ${r.id} [score: ${r.score}]`);
      const promptContext = [...context, ...retrievedDocs];
      return llm.generate(input, promptContext);
    }
  };
}
