/**
 * File: scripts/test-confidence-pipeline.ts
 * Description: Validates RAG pipeline scoring and reranking behavior.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { createRagPipeline } from '../src/engines/createRagPipeline';
import { hybridScoring } from '../src/scoring/ScoreStrategy';

const embedder = {
  getModelName: () => 'MockEmbedder',
  embed: async () => [[0.1, 0.2, 0.3]]
};

const vectorStore = {
  getName: () => 'MockStore',
  addDocuments: async () => {},
  similaritySearch: async () => [
    { id: 'doc1', score: 0.91 },
    { id: 'doc2', score: 0.76 },
    { id: 'doc3', score: 0.52 }
  ],
  delete: async () => {}
};

const llm = {
  getModelName: () => 'MockLLM',
  generate: async (_prompt: string, ctx: string[]) => {
    return `Generated with context:\n${ctx.join('\n')}`;
  },
  stream: async () => {}
};

(async () => {
  const pipeline = createRagPipeline({ embedder, vectorStore, llm, scoringStrategy: hybridScoring });
  const result = await pipeline.query('What is SynapseStack?');
  console.log('\n--- Pipeline Output ---\n');
  console.log(result);
})();
