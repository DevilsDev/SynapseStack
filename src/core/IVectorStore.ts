/**
 * File: src/core/IVectorStore.ts
 * Description: Interface for vector database operations—write, query, and delete.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */
export interface IVectorStore {
  addDocuments(_documents: { id: string; embedding: number[] }[]): Promise<void>;
  similaritySearch(_queryEmbedding: number[], _topK: number): Promise<{ id: string; score: number }[]>;
  delete(_ids: string[]): Promise<void>;
}

  