/**
 * File: src/cli/rag-cli.ts
 * Description: CLI tool for managing RAG pipelines.
 * Version: 0.7.0
 * Author: Ali Kahwaji
 */

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { compile } from 'json-schema-to-typescript';
import { renderMermaidFromConfig } from '../utils/renderPipelineGraph';
import { execSync } from 'child_process';
import os from 'os';
import { BenchmarkRunner } from '../benchmarks/BenchmarkRunner';
import { createRagPipeline } from '../engines/createRagPipeline';
import { hybridScoring, cosineScoring, marginScoring } from '../scoring/ScoreStrategy';

const program = new Command();
program.name('rag-cli').description('SynapseStack CLI for managing RAG pipelines').version('0.7.0');

const DEFAULT_CONFIG_PATH = 'pipeline.yaml';

program
  .command('benchmark')
  .description('Benchmark a pipeline using structured prompts')
  .option('-s, --suite <file>', 'Prompt suite file (YAML or JSON)', 'benchmarks/prompts.yaml')
  .option('-o, --output <file>', 'Results output file (CSV or JSON)', 'benchmarks/results.csv')
  .option('-m, --mode <mode>', 'Execution mode: generate or stream', 'generate')
  .option('-b, --baseline <file>', 'Previous results file for comparison')
  .option('--scoring <strategy>', 'Scoring strategy: hybrid, cosine, margin', 'hybrid')
  .option('--rerank', 'Enable reranking by confidence', false)
  .action(async (options) => {
    const promptsPath = path.resolve(options.suite);
    const outputPath = path.resolve(options.output);
    const ext = path.extname(outputPath);

    const strategy = options.scoring === 'cosine' ? cosineScoring
                    : options.scoring === 'margin' ? marginScoring
                    : hybridScoring;

    const pipeline = createRagPipeline({
      embedder: {
        getModelName: () => 'MockEmbedder',
        embed: async () => [[0.1, 0.2, 0.3]]
      },
      vectorStore: {
        getName: () => 'MockStore',
        addDocuments: async () => {},
        similaritySearch: async () => [
          { id: 'doc1', score: 0.91 },
          { id: 'doc2', score: 0.76 },
          { id: 'doc3', score: 0.52 }
        ],
        delete: async () => {}
      },
      llm: {
        getModelName: () => 'MockLLM',
        generate: async (_prompt: string, ctx: string[]) => `Generated:\n${ctx.join('\n')}`,
        stream: async () => {}
      },
      scoringStrategy: options.rerank ? strategy : undefined
    });

    const runner = new BenchmarkRunner(pipeline, options.mode);
    const prompts = runner.loadPrompts(promptsPath);
    const results = await runner.run(prompts);

    if (ext === '.json') {
      runner.writeJSON(results, outputPath);
    } else {
      runner.writeCSV(results, outputPath);
    }

    console.log(` Benchmark complete: ${outputPath}`);

    if (options.baseline) {
      const baselinePath = path.resolve(options.baseline);
      if (!fs.existsSync(baselinePath)) {
        console.warn(` Baseline file not found: ${baselinePath}`);
        return;
      }
      const baselineMap = runner.loadBaseline(baselinePath);
      runner.compareResults(results, baselineMap);
    }
  });

program.parse(process.argv);
