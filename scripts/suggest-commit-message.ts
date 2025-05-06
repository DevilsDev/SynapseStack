/**
 * File: scripts/suggest-commit-message.ts
 * Description: Suggests a conventional commit message using OpenAI based on staged git diff.
 * Version: 0.3.1
 * Author: Ali Kahwaji
 */

import 'dotenv/config';
import { execSync } from 'child_process';
import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

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

  const raw = response.choices[0].message?.content?.trim() || '[No suggestion]';

  // Strip nested commit prefixes from AI if present (e.g., feat:, fix:, etc.)
  const cleaned = raw.replace(/^(feat|fix|chore|docs|test|refactor|style|perf|ci)(\([^)]*\))?:\s*/i, '');

  // Wrap with fallback prefix
  const formatted = `chore(ai): ${cleaned.trim()}`;

  return formatted;
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
