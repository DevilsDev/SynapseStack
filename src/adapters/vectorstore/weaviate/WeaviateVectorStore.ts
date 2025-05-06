/**
 * File: src/adapters/vectorstore/weaviate/WeaviateVectorStore.ts
 * Description: Stub adapter for integrating Weaviate vector database.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { IVectorStore } from '../../../core/IVectorStore';

export class WeaviateVectorStore implements IVectorStore {
  constructor(private _endpoint = 'http://localhost:8080') {
    // Future: integrate with Weaviate REST API or GraphQL
  }

  getName(): string {
    return 'Weaviate';
  }

  async addDocuments(_documents: { id: string; embedding: number[] }[]): Promise<void> {
    // no-op for now
  }

  async similaritySearch(
    _queryEmbedding: number[],
    _topK: number
  ): Promise<{ id: string; score: number }[]> {
    // no-op for now
    return [];
  }

  async delete(_ids: string[]): Promise<void> {
    // no-op for now
  }
}
