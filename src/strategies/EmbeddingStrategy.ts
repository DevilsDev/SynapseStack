/**
 * File: src/strategies/EmbeddingStrategy.ts
 * Description: Strategy logic to route embeddings based on content metadata.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

export type EmbeddingMeta = {
  language?: string;
  domain?: string;
};

export function byLanguage(meta: EmbeddingMeta): string {
  switch (meta.language) {
    case 'en': return 'openai';
    case 'fr': return 'cohere';
    case 'ar': return 'custom-arabic';
    default: return 'default';
  }
}

export function byDomain(meta: EmbeddingMeta): string {
  switch (meta.domain) {
    case 'finance': return 'openai';
    case 'legal': return 'cohere';
    default: return 'default';
  }
}
