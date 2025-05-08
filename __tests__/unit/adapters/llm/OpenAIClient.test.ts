/**
 * File: __tests__/unit/adapters/llm/OpenAIClient.test.ts
 * Description: Unit tests for OpenAIClient implementing ILLMClient.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { OpenAIClient } from '../../../../src/adapters/llm/OpenAIClient';

jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockImplementation(({ stream }) => {
            if (stream) {
              return {
                [Symbol.asyncIterator]: async function* () {
                  yield { choices: [{ delta: { content: 'mock token' } }] };
                }
              };
            }
            return Promise.resolve({
              choices: [
                { message: { content: 'Mock response' } }
              ]
            });
          })
        }
      }
    }))
  };
});

describe('OpenAIClient', () => {
  const FAKE_KEY = 'sk-test';

  it('should return the configured model name', () => {
    const client = new OpenAIClient(FAKE_KEY, 'gpt-custom');
    expect(client.getModelName()).toBe('gpt-custom');
  });

  it('should generate a response from prompt and context', async () => {
    const client = new OpenAIClient(FAKE_KEY);
    const result = await client.generate('Hello?', ['Context line']);
    expect(result).toBe('Mock response');
  });

  it('should support streaming with token callback', async () => {
    const client = new OpenAIClient(FAKE_KEY);
    const tokens: string[] = [];

    await client.stream('Prompt', ['ctx'], (token) => tokens.push(token));

    expect(tokens).toContain('mock token');
  });
});
