/**
 * File: scripts/ai-strategist.ts
 * Description: Generates a next-step development prompt using OpenAI based on the last commit.
 * Version: 0.4.0
 * Author: Ali Kahwaji
 */

import 'dotenv/config';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

function getLastCommitSummary(): string {
  return execSync('git log -1 --pretty=format:"%s%n%n%b"')
    .toString()
    .trim();
}

function classifySuggestion(text: string): string {
  const lowered = text.toLowerCase();
  if (lowered.includes('test') || lowered.includes('coverage')) return 'test';
  if (lowered.includes('adapter') || lowered.includes('feature')) return 'feature';
  if (lowered.includes('config') || lowered.includes('refactor')) return 'infra';
  if (lowered.includes('doc')) return 'docs';
  return 'unspecified';
}

async function generateSuggestion(commitMessage: string): Promise<{ suggestion: string; phase: string }> {
  const phaseContext = `
Roadmap Phases:
0 - Discovery & Design
1 - Scaffolding & CI Architecture
2 - Embedding Adapters
3 - Vector Store Integrations
4 - Core Pipeline Implementation
5 - LLM Client Abstraction
6 - Developer Experience Enhancements
7 - Observability & Performance
8 - Security & Dependency Hygiene
9 - Documentation & Governance
10 - Dockerization & Deployment
11 - Publish & Launch
12 - AI Prompt Generator
13+ - Advanced Features (Multi-embedding, Benchmarking, Graphing, etc.)
`;

  const prompt = `You are a roadmap AI assistant.

Given the last commit message:
"""
${commitMessage}
"""

Suggest the next most logical development task.
Also classify it into the most relevant roadmap phase below:
${phaseContext}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  const result = response.choices[0].message?.content?.trim() || '[No suggestion]';

  const split = result.split('Phase');
  const suggestion = split[0].trim();
  const phase = result.includes('Phase') ? 'Phase ' + split[1].trim() : 'unspecified';

  return { suggestion, phase };
}

async function main() {
  const commit = getLastCommitSummary();
  const { suggestion, phase } = await generateSuggestion(commit);
  const category = classifySuggestion(suggestion);
  const filePath = path.resolve(__dirname, '../docs/internal/SUGGESTIONS.md');
  const timestamp = new Date().toISOString();

  const output = `\n## Suggestion — ${timestamp}\n\n**Commit Summary:**\n\n${commit}\n\n**Suggested Next Task:**\n\n${suggestion}\n\n**Classified As:** ${category}\n**Phase Suggested:** ${phase}\n`;

  fs.appendFileSync(filePath, output);
  console.log('Suggestion logged to SUGGESTIONS.md');
}

main().catch((err) => {
  console.error('AI Strategist failed:', err);
  process.exit(1);
});
