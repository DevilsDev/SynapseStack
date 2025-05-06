/**
 * File: src/adapters/vectorstore/pinecone/PineconeVectorStore.ts
 * Description: Adapter for integrating Pinecone vector database.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { IVectorStore } from '../../../core/IVectorStore';

export class PineconeVectorStore implements IVectorStore {
  constructor(private _apiKey: string, private _indexName: string) {
    // no-op for now
  }

  getName(): string {
    return 'Pinecone';
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
