/**
 * File: src/adapters/vectorstore/redis/RedisVectorStore.ts
 * Description: Stub adapter for integrating Redis-based vector storage.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { IVectorStore } from '../../../core/IVectorStore';

export class RedisVectorStore implements IVectorStore {
  constructor(private _endpoint = 'redis://localhost:6379') {
    // Future: connect to Redis (e.g., RediSearch module)
  }

  getName(): string {
    return 'Redis';
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
