/**
 * File: src/core/ILLMClient.ts
 * Description: Interface for large language model (LLM) clients supporting generation and streaming.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */
export interface ILLMClient {
  generate(_prompt: string, _context?: string[]): Promise<string>;
  stream(_prompt: string, _context?: string[], _onToken: (_token: string) => void): Promise<void>;
  getModelName(): string;
}

  