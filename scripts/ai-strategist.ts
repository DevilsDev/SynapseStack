/**
 * File: scripts/ai-strategist.ts
 * Description: Generates a next-step development prompt using OpenAI based on the last commit.
 * Version: 0.2.2
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

function sanitizeMessage(message: string): string {
  return message.replace(/[^\w\d\s:\-.,\n]/g, '').trim();
}

function classifySuggestion(text: string): string {
  const lowered = text.toLowerCase();
  if (lowered.includes('test') || lowered.includes('coverage')) return 'test';
  if (lowered.includes('adapter') || lowered.includes('feature')) return 'feature';
  if (lowered.includes('config') || lowered.includes('refactor')) return 'infra';
  if (lowered.includes('doc')) return 'docs';
  return 'unspecified';
}

async function generateSuggestion(commitMessage: string): Promise<string> {
  const prompt = `You are an AI roadmap assistant for the SynapseStack project.
Given the last Git commit:

"""
${commitMessage}
"""

Suggest the next most logical development task according to the roadmap.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  return sanitizeMessage(response.choices[0].message?.content?.trim() || '[No response]');
}

async function main() {
  const commit = getLastCommitSummary();
  const suggestion = await generateSuggestion(commit);
  const category = classifySuggestion(suggestion);

  const filePath = path.resolve(__dirname, '../docs/internal/SUGGESTIONS.md');
  const timestamp = new Date().toISOString();

  const output = `\n## Suggestion — ${timestamp}\n\n**Commit Summary:**\n\n${commit}\n\n**Suggested Next Task:**\n\n${suggestion}\n\n**Classified As:** ${category}\n`;

  fs.appendFileSync(filePath, output);
  console.log('Suggestion logged to SUGGESTIONS.md');
}

main().catch((err) => {
  console.error('AI Strategist failed:', err);
  process.exit(1);
});
