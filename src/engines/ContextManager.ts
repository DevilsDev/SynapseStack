/**
 * File: src/engines/ContextManager.ts
 * Description: Manages session context for chaining RAG prompts.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

export class ContextManager {
    private history: string[] = [];
  
    add(entry: string): void {
      this.history.push(entry);
    }
  
    getContext(): string[] {
      return this.history.slice(-5);
    }
  
    reset(): void {
      this.history = [];
    }
  }
  