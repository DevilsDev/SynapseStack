/**
 * File: src/adapters/vectorstore/chroma/ChromaVectorStore.ts
 * Description: Stub adapter for integrating Chroma DB.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { IVectorStore } from '../../../core/IVectorStore';

export class ChromaVectorStore implements IVectorStore {
  constructor(private _endpoint = 'http://localhost:8000') {
    // no-op for now
  }

  getName(): string {
    return 'Chroma';
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
