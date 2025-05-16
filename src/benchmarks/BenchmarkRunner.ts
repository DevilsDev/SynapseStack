/**
 * File: src/benchmarks/BenchmarkRunner.ts
 * Description: Executes prompt suite against a RAG pipeline and records latency/token usage.
 * Version: 0.2.0
 * Author: Ali Kahwaji
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { latencyHistogram, tokenCounter } from '../utils/telemetry';

export type PromptItem = {
  id: string;
  text: string;
};

export type BenchmarkResult = {
  id: string;
  text: string;
  latency_ms: number;
  tokens: number;
  timestamp: string;
};

export class BenchmarkRunner {
  private pipeline: { query: (input: string) => Promise<string> };
  private mode: 'generate' | 'stream';

  constructor(pipeline: any, mode: 'generate' | 'stream' = 'generate') {
    this.pipeline = pipeline;
    this.mode = mode;
  }

  loadPrompts(filePath: string): PromptItem[] {
    const ext = path.extname(filePath);
    const raw = fs.readFileSync(filePath, 'utf8');
    return ext === '.json' ? JSON.parse(raw) : yaml.load(raw) as PromptItem[];
  }

  loadBaseline(filePath: string): Record<string, BenchmarkResult> {
    const ext = path.extname(filePath);
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = ext === '.json' ? JSON.parse(raw) : this.parseCSV(raw);
    const map: Record<string, BenchmarkResult> = {};
    for (const r of data) map[r.id] = r;
    return map;
  }

  parseCSV(csv: string): BenchmarkResult[] {
    const [header, ...lines] = csv.trim().split('\n');
    return lines.map((line) => {
      const [id, text, latency, tokens, timestamp] = line.split(',');
      return { id, text: text.replace(/^"|"$/g, ''), latency_ms: +latency, tokens: +tokens, timestamp };
    });
  }

  compareResults(newResults: BenchmarkResult[], baselineMap: Record<string, BenchmarkResult>) {
    console.log('\n📊 Benchmark Comparison to Baseline:');
    console.log('Prompt ID | Δ Latency (ms) | Δ Tokens');
    console.log('----------|----------------|----------');
    for (const result of newResults) {
      const base = baselineMap[result.id];
      if (base) {
        const deltaLatency = result.latency_ms - base.latency_ms;
        const deltaTokens = result.tokens - base.tokens;
        console.log(`${result.id.padEnd(9)} | ${deltaLatency >= 0 ? '+' : ''}${deltaLatency.toFixed(0)} ms       | ${deltaTokens >= 0 ? '+' : ''}${deltaTokens}`);
      }
    }
  }

  async run(prompts: PromptItem[]): Promise<BenchmarkResult[]> {
    const results: BenchmarkResult[] = [];

    for (const prompt of prompts) {
      const start = Date.now();
      const output = await this.pipeline.query(prompt.text);
      const latency = Date.now() - start;
      const tokens = output.length;

      latencyHistogram.observe(latency);
      tokenCounter.inc(tokens);

      results.push({
        id: prompt.id,
        text: prompt.text,
        latency_ms: latency,
        tokens,
        timestamp: new Date().toISOString()
      });
    }

    return results;
  }

  writeCSV(results: BenchmarkResult[], filePath: string) {
    const header = 'id,text,latency_ms,tokens,timestamp';
    const lines = results.map(r => `${r.id},"${r.text}",${r.latency_ms},${r.tokens},${r.timestamp}`);
    fs.writeFileSync(filePath, [header, ...lines].join('\n'));
  }

  writeJSON(results: BenchmarkResult[], filePath: string) {
    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
  }
}
