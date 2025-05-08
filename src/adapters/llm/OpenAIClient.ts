/**
 * File: src/adapters/llm/OpenAIClient.ts
 * Description: LLM client adapter for OpenAI's GPT models.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { OpenAI } from 'openai';
import { ILLMClient } from '../../core/ILLMClient';

export class OpenAIClient implements ILLMClient {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model = 'gpt-4') {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  getModelName(): string {
    return this.model;
  }

  async generate(prompt: string, context: string[] = []): Promise<string> {
    const fullPrompt = context.concat(prompt).join('\n');

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: fullPrompt }],
      temperature: 0.3
    });

    return completion.choices[0].message?.content?.trim() || '';
  }

  async stream(
    prompt: string,
    context: string[] = [],
    onToken: (token: string) => void
  ): Promise<void> {
    const fullPrompt = context.concat(prompt).join('\n');

    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: fullPrompt }],
      stream: true,
    });

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content;
      if (token) onToken(token);
    }
  }
}
