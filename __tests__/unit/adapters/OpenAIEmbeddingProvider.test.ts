/**
 * File: __tests__/unit/adapters/OpenAIEmbeddingProvider.test.ts
 * Description: Unit tests for OpenAIEmbeddingProvider using mocked OpenAI client.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { OpenAIEmbeddingProvider } from '../../../src/adapters/openai/OpenAIEmbeddingProvider';

jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      embeddings: {
        create: jest.fn().mockResolvedValue({
          data: [
            { embedding: [0.1, 0.2, 0.3] }
          ]
        })
      }
    }))
  };
});

describe('OpenAIEmbeddingProvider', () => {
  const FAKE_KEY = 'sk-test-key';

  it('should return the configured model name', () => {
    const provider = new OpenAIEmbeddingProvider(FAKE_KEY, 'text-embedding-custom');
    expect(provider.getModelName()).toBe('text-embedding-custom');
  });

  it('should return embeddings for provided texts', async () => {
    const provider = new OpenAIEmbeddingProvider(FAKE_KEY);
    const result = await provider.embed(['test input']);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toEqual([0.1, 0.2, 0.3]);
  });
});
