/**
 * File: src/cli/rag-cli.ts
 * Description: CLI tool for managing RAG pipelines.
 * Version: 0.6.4
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

const program = new Command();
program.name('rag-cli').description('SynapseStack CLI for managing RAG pipelines').version('0.6.4');

const DEFAULT_CONFIG_PATH = 'pipeline.yaml';

interface PipelineConfig {
  pipeline: {
    name: string;
    embedder: string;
    vectorStore: string;
    llm: string;
  };
}

program
  .command('visualize')
  .description('Render a pipeline graph as Mermaid and optionally write to file')
  .option('-o, --output <file>', 'Output file (.md or .svg)', '')
  .action((options) => {
    const configPath = path.resolve(DEFAULT_CONFIG_PATH);
    const mermaid = renderMermaidFromConfig(configPath);

    if (options.output) {
      const ext = path.extname(options.output);
      if (ext === '.md') {
        fs.writeFileSync(options.output, '```mermaid\n' + mermaid + '\n```');
        console.log(` Mermaid graph written to ${options.output}`);
      } else if (ext === '.svg') {
        const temp = path.join(os.tmpdir(), 'graph.mmd');
        fs.writeFileSync(temp, mermaid);
        try {
          execSync(`npx -y @mermaid-js/mermaid-cli -i ${temp} -o ${options.output}`);
          console.log(` Mermaid SVG generated: ${options.output}`);
        } catch (err) {
          console.error(' Failed to render SVG with mermaid-cli:', err);
        }
      } else {
        console.error(' Unsupported output format. Use .md or .svg');
      }
    } else {
      console.log('```mermaid');
      console.log(mermaid);
      console.log('```');
    }
  });

program.parse(process.argv);
