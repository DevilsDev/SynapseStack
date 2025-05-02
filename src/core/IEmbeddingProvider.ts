/**
 * File: src/core/IEmbeddingProvider.ts
 * Description: Interface for embedding providers. Supports batch embedding and introspection.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */
export interface IEmbeddingProvider {
    embed(texts: string[]): Promise<number[][]>;
    getModelName(): string;
  }
  