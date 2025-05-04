/**
 * File: src/adapters/openai/OpenAIEmbeddingProvider.ts
 * Description: Adapter for generating text embeddings using OpenAI's embedding API.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import OpenAI from 'openai';
import { IEmbeddingProvider } from '../../core/IEmbeddingProvider';

export class OpenAIEmbeddingProvider implements IEmbeddingProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model = 'text-embedding-ada-002') {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  getModelName(): string {
    return this.model;
  }

  async embed(texts: string[]): Promise<number[][]> {
    const results: number[][] = [];

    for (const text of texts) {
      const response = await this.client.embeddings.create({
        input: text,
        model: this.model
      });

      results.push(response.data[0].embedding);
    }

    return results;
  }
}
