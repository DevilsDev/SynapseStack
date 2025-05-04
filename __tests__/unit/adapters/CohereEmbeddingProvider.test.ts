/**
 * File: __tests__/unit/adapters/CohereEmbeddingProvider.test.ts
 * Description: Unit tests for CohereEmbeddingProvider using mocked undici.
 * Version: 0.2.0
 * Author: Ali Kahwaji
 */

import { CohereEmbeddingProvider } from '../../../src/adapters/cohere/CohereEmbeddingProvider';
import * as undici from 'undici';

jest.mock('undici', () => ({
  request: jest.fn()
}));

describe('CohereEmbeddingProvider', () => {
  const FAKE_KEY = 'cohere-test-key';

  it('should return the configured model name', () => {
    const provider = new CohereEmbeddingProvider(FAKE_KEY, 'embed-custom');
    expect(provider.getModelName()).toBe('embed-custom');
  });

  it('should return embeddings for provided texts', async () => {
    const mockJson = jest.fn().mockResolvedValue({ embeddings: [[0.1, 0.2, 0.3]] });
    (undici.request as jest.Mock).mockResolvedValue({ body: { json: mockJson } });

    const provider = new CohereEmbeddingProvider(FAKE_KEY);
    const result = await provider.embed(['hello world']);

    expect(result).toEqual([[0.1, 0.2, 0.3]]);
    expect(undici.request).toHaveBeenCalledWith(
      'https://api.cohere.ai/v1/embed',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Bearer ${FAKE_KEY}`,
          'Content-Type': 'application/json'
        })
      })
    );
  });
});
