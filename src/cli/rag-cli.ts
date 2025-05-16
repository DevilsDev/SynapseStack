/**
 * File: src/cli/rag-cli.ts
 * Description: CLI tool for managing RAG pipelines.
 * Version: 0.6.9
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

const program = new Command();
program.name('rag-cli').description('SynapseStack CLI for managing RAG pipelines').version('0.6.9');

const DEFAULT_CONFIG_PATH = 'pipeline.yaml';

program
  .command('benchmark')
  .description('Benchmark a pipeline using structured prompts')
  .option('-s, --suite <file>', 'Prompt suite file (YAML or JSON)', 'benchmarks/prompts.yaml')
  .option('-o, --output <file>', 'Results output file (CSV or JSON)', 'benchmarks/results.csv')
  .option('-m, --mode <mode>', 'Execution mode: generate or stream', 'generate')
  .option('-b, --baseline <file>', 'Previous results file for comparison')
  .action(async (options) => {
    const promptsPath = path.resolve(options.suite);
    const outputPath = path.resolve(options.output);
    const ext = path.extname(outputPath);

    const pipeline = {
      query: async (text: string) => `Mocked response for: ${text}`
    };

    const runner = new BenchmarkRunner(pipeline, options.mode);
    const prompts = runner.loadPrompts(promptsPath);
    const results = await runner.run(prompts);

    if (ext === '.json') {
      runner.writeJSON(results, outputPath);
    } else {
      runner.writeCSV(results, outputPath);
    }

    console.log(`✅ Benchmark complete: ${outputPath}`);

    if (options.baseline) {
      const baselinePath = path.resolve(options.baseline);
      if (!fs.existsSync(baselinePath)) {
        console.warn(`⚠️ Baseline file not found: ${baselinePath}`);
        return;
      }
      const baselineMap = runner.loadBaseline(baselinePath);
      runner.compareResults(results, baselineMap);
    }
  });

program.parse(process.argv);
