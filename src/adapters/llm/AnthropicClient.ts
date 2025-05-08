/**
 * File: src/adapters/llm/AnthropicClient.ts
 * Description: LLM client adapter for Anthropic's Claude models.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { ILLMClient } from '../../core/ILLMClient';

export class AnthropicClient implements ILLMClient {
  private _apiKey: string;
  private _model: string;
  private _endpoint: string = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string, model = 'claude-3-opus-20240229') {
    this._apiKey = apiKey;
    this._model = model;
  }

  getModelName(): string {
    return this._model;
  }

  async generate(prompt: string, _context: string[] = []): Promise<string> {
    // TODO: implement Claude completion using fetch()
    return '[AnthropicClient] Mock response';
  }

  async stream(
    prompt: string,
    _context: string[] = [],
    onToken: (token: string) => void
  ): Promise<void> {
    // TODO: implement Claude streaming using SSE or streaming API
    onToken('[AnthropicClient] streaming not yet implemented');
  }
}
