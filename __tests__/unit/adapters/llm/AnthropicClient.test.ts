/**
 * File: __tests__/unit/adapters/llm/AnthropicClient.test.ts
 * Description: Unit tests for AnthropicClient implementing ILLMClient.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { AnthropicClient } from '../../../../src/adapters/llm/AnthropicClient';

describe('AnthropicClient', () => {
  const FAKE_KEY = 'anthropic-test-key';

  it('should return the configured model name', () => {
    const client = new AnthropicClient(FAKE_KEY, 'claude-custom');
    expect(client.getModelName()).toBe('claude-custom');
  });

  it('should return a mock response from generate()', async () => {
    const client = new AnthropicClient(FAKE_KEY);
    const result = await client.generate('Who are you?', []);
    expect(result).toContain('Mock response');
  });

  it('should invoke onToken once in stream()', async () => {
    const client = new AnthropicClient(FAKE_KEY);
    const onToken = jest.fn();
    await client.stream('Prompt', [], onToken);
    expect(onToken).toHaveBeenCalledTimes(1);
    expect(onToken).toHaveBeenCalledWith(expect.stringContaining('streaming not yet implemented'));
  });
});
