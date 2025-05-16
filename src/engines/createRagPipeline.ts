/**
 * File: src/engines/createRagPipeline.ts
 * Description: Orchestration function for modular RAG pipelines with confidence scoring and audit trail support.
 * Version: 0.5.0
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
import { AuditLogger } from '../audit/AuditLogger';

export type RagPipelineConfig = {
  embedder?: IEmbeddingProvider;
  embeddingRegistry?: EmbeddingRegistry;
  embeddingMeta?: { language?: string; domain?: string };
  vectorStore: IVectorStore;
  llm: ILLMClient;
  contextManager?: ContextManager;
  scoringStrategy?: ScoreStrategy;
  audit?: boolean;
};

export function createRagPipeline(config: RagPipelineConfig) {
  const {
    embedder,
    embeddingRegistry,
    embeddingMeta,
    vectorStore,
    llm,
    contextManager,
    scoringStrategy = hybridScoring,
    audit = false
  } = config;

  const scorer = new ConfidenceCalculator(scoringStrategy);
  const auditLogger = new AuditLogger();

  return {
    async query(input: string): Promise<string> {
      const start = Date.now();

      const context = contextManager?.getContext() || [];
      const activeEmbedder =
        embedder ||
        embeddingRegistry?.get(embeddingMeta || {}) ||
        embeddingRegistry?.fallback();

      if (!activeEmbedder) throw new Error('No valid embedding provider found');

      const embeddings = await activeEmbedder.embed([input]);
      const rawResults = await vectorStore.similaritySearch(embeddings[0], 5);

      const ranked = scorer.rank(
        rawResults.map((r) => ({ id: r.id, score: r.score, metadata: r }))
      );

      const retrievedDocs = ranked.map(
        (r) => `Doc: ${r.id} [conf: ${r.confidence.toFixed(2)}]`
      );
      const promptContext = [...context, ...retrievedDocs];
      const output = await llm.generate(input, promptContext);

      latencyHistogram.observe(Date.now() - start);
      tokenCounter.inc(output.length); // approximate

      if (audit) {
        await auditLogger.log({
          prompt: input,
          retrieved: ranked,
          output,
          tokens: output.length
        });
      }

      return output;
    }
  };
}
