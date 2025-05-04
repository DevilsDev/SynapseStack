/**
 * File: src/adapters/cohere/CohereEmbeddingProvider.ts
 * Description: Adapter for generating embeddings using Cohere's API.
 * Version: 0.2.0
 * Author: Ali Kahwaji
 */

import { IEmbeddingProvider } from '../../core/IEmbeddingProvider';
import { request } from 'undici';

export class CohereEmbeddingProvider implements IEmbeddingProvider {
  private apiKey: string;
  private model: string;
  private endpoint: string = 'https://api.cohere.ai/v1/embed';

  constructor(apiKey: string, model = 'embed-english-light-v3.0') {
    this.apiKey = apiKey;
    this.model = model;
  }

  getModelName(): string {
    return this.model;
  }

  async embed(texts: string[]): Promise<number[][]> {
    const { body } = await request(this.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ texts, model: this.model })
    });

    const data = (await body.json()) as { embeddings: number[][] };
    return data.embeddings;
  }
}
