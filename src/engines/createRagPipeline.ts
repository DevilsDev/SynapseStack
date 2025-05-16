/**
 * File: src/engines/createRagPipeline.ts
 * Description: Orchestration function for modular RAG pipelines with confidence scoring.
 * Version: 0.4.0
 * Author: Ali Kahwaji
 */

import { IEmbeddingProvider } from '../core/IEmbeddingProvider';
import { IVectorStore } from '../core/IVectorStore';
import { ILLMClient } from '../core/ILLMClient';
import { ContextManager } from './ContextManager';
import { latencyHistogram, tokenCounter } from '../utils/telemetry';
import { EmbeddingRegistry } from '../registry/EmbeddingRegistry';
import { ConfidenceCalculator } from '../scoring/ConfidenceCalculator';
import { ScoreStrategy, hybridScoring } from '../scoring/ScoreStrategy';

export type RagPipelineConfig = {
  embedder?: IEmbeddingProvider;
  embeddingRegistry?: EmbeddingRegistry;
  embeddingMeta?: { language?: string; domain?: string };
  vectorStore: IVectorStore;
  llm: ILLMClient;
  contextManager?: ContextManager;
  scoringStrategy?: ScoreStrategy;
};

export function createRagPipeline(config: RagPipelineConfig) {
  const {
    embedder,
    embeddingRegistry,
    embeddingMeta,
    vectorStore,
    llm,
    contextManager,
    scoringStrategy = hybridScoring
  } = config;

  const scorer = new ConfidenceCalculator(scoringStrategy);

  return {
    async query(input: string): Promise<string> {
      const start = Date.now();

      const context = contextManager?.getContext() || [];
      const activeEmbedder = embedder || embeddingRegistry?.get(embeddingMeta || {}) || embeddingRegistry?.fallback();
      if (!activeEmbedder) throw new Error('No valid embedding provider found');

      const embeddings = await activeEmbedder.embed([input]);
      const rawResults = await vectorStore.similaritySearch(embeddings[0], 5);

      const ranked = scorer.rank(
        rawResults.map(r => ({ id: r.id, score: r.score, metadata: r }))
      );

      const retrievedDocs = ranked.map((r) => `Doc: ${r.id} [conf: ${r.confidence.toFixed(2)}]`);
      const promptContext = [...context, ...retrievedDocs];
      const output = await llm.generate(input, promptContext);

      latencyHistogram.observe(Date.now() - start);
      tokenCounter.inc(output.length);

      return output;
    }
  };
}
