/**
 * File: __tests__/integration/pipeline.e2e.test.ts
 * Description: E2E test scaffold for validating RAG pipeline orchestration.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { createRagPipeline } from 'engines/createRagPipeline';
import { ContextManager } from 'engines/ContextManager';


describe('RAG Pipeline (E2E)', () => {
  const mockEmbedder = {
    embed: jest.fn().mockResolvedValue([[0.1, 0.2, 0.3]]),
    getModelName: () => 'mock-embed'
  };

  const mockVectorStore = {
    similaritySearch: jest.fn().mockResolvedValue([
      { id: 'doc1', score: 0.9 },
      { id: 'doc2', score: 0.8 }
    ]),
    addDocuments: jest.fn(),
    delete: jest.fn(),
    getName: () => 'mock-store'
  };

  const mockLLM = {
    generate: jest.fn().mockResolvedValue('Mock LLM Response'),
    stream: jest.fn(),
    getModelName: () => 'mock-llm'
  };

  it('should orchestrate embedding, search, and LLM', async () => {
    const pipeline = createRagPipeline({
      embedder: mockEmbedder,
      vectorStore: mockVectorStore,
      llm: mockLLM,
      contextManager: new ContextManager()
    });

    const response = await pipeline.query('What is SynapseStack?');
    expect(response).toBe('Mock LLM Response');
    expect(mockEmbedder.embed).toHaveBeenCalled();
    expect(mockVectorStore.similaritySearch).toHaveBeenCalled();
    expect(mockLLM.generate).toHaveBeenCalled();
  });
});
