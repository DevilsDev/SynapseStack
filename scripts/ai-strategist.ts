/**
 * File: scripts/ai-strategist.ts
 * Description: Generates a next-step development prompt using OpenAI based on the last commit.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { Configuration, OpenAIApi } from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment');
  process.exit(1);
}

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

function getLastCommitSummary(): string {
  return execSync('git log -1 --pretty=format:"%s%n%n%b"')
    .toString()
    .trim();
}

async function generateSuggestion(commitMessage: string): Promise<string> {
  const prompt = `You are an AI roadmap assistant for the SynapseStack project.
Given the last Git commit:

"""
${commitMessage}
"""

Suggest the next most logical development task according to the roadmap.`;

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  return response.data.choices[0].message?.content?.trim() || '[No response]';
}

async function main() {
  const commit = getLastCommitSummary();
  const suggestion = await generateSuggestion(commit);

  const filePath = path.resolve(__dirname, '../docs/internal/SUGGESTIONS.md');
  const timestamp = new Date().toISOString();

  const output = `\n## Suggestion — ${timestamp}\n\n**Commit Summary:**\n\n${commit}\n\n**Suggested Next Task:**\n\n${suggestion}\n`;

  fs.appendFileSync(filePath, output);
  console.log('Suggestion logged to SUGGESTIONS.md');
}

main().catch((err) => {
  console.error('AI Strategist failed:', err);
  process.exit(1);
});
