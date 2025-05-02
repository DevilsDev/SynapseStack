/**
 * File: scripts/suggest-commit-message.ts
 * Description: Suggests a conventional commit message using OpenAI based on staged git diff.
 * Version: 0.1.1
 * Author: Ali Kahwaji
 */

import { execSync } from 'child_process';
import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

function getStagedDiff(): string {
  return execSync('git diff --cached --stat').toString().trim();
}

async function generateCommitMessage(diff: string): Promise<string> {
  const prompt = `You are an AI assistant helping a developer write a Conventional Commit message.

Given the following staged changes:

"""
${diff}
"""

Generate a commit message that follows the conventional commit format.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0].message.content?.trim() || '[No suggestion]';
}

async function main() {
  const diff = getStagedDiff();
  const message = await generateCommitMessage(diff);
  console.log('\nSuggested Commit Message:\n');
  console.log(message);
}

main().catch((err) => {
  console.error('Failed to suggest commit message:', err);
  process.exit(1);
});
