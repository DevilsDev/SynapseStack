/**
 * File: src/core/ILLMClient.ts
 * Description: Interface for large language model (LLM) clients supporting generation and streaming.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */
export interface ILLMClient {
    generate(prompt: string, context?: string[]): Promise<string>;
    stream(prompt: string, context?: string[], onToken: (token: string) => void): Promise<void>;
    getModelName(): string;
  }
  