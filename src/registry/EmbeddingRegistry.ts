/**
 * File: src/registry/EmbeddingRegistry.ts
 * Description: Maintains and routes to multiple embedding providers based on strategy.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { IEmbeddingProvider } from '../core/IEmbeddingProvider';

export type EmbeddingSelector = (meta: {
  language?: string;
  domain?: string;
  fallback?: boolean;
}) => string;

export class EmbeddingRegistry {
  private providers: Map<string, IEmbeddingProvider> = new Map();
  private selector: EmbeddingSelector;

  constructor(selector: EmbeddingSelector) {
    this.selector = selector;
  }

  register(name: string, provider: IEmbeddingProvider) {
    this.providers.set(name, provider);
  }

  get(meta: { language?: string; domain?: string }): IEmbeddingProvider {
    const key = this.selector(meta);
    const match = this.providers.get(key);
    if (!match) throw new Error(`No embedding provider matched for selector: ${key}`);
    return match;
  }

  fallback(): IEmbeddingProvider {
    for (const p of this.providers.values()) return p; // first-registered fallback
    throw new Error('No fallback embedding provider registered');
  }
}
