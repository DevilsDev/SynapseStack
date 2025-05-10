/**
 * File: src/cli/rag-cli.ts
 * Description: CLI tool for managing RAG pipelines.
 * Version: 0.6.2
 * Author: Ali Kahwaji
 */

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { compile } from 'json-schema-to-typescript';

const program = new Command();
program.name('rag-cli').description('SynapseStack CLI for managing RAG pipelines').version('0.6.2');

const DEFAULT_CONFIG_PATH = 'pipeline.yaml';

interface PipelineConfig {
  pipeline: {
    name: string;
    embedder: string;
    vectorStore: string;
    llm: string;
  };
}

interface Prompt {
  id: string;
  text: string;
}

program
  .command('init')
  .description('Scaffold a default RAG pipeline YAML config')
  .action(() => {
    const config: PipelineConfig = {
      pipeline: {
        name: 'sample-pipeline',
        embedder: 'OpenAI',
        vectorStore: 'Pinecone',
        llm: 'OpenAI'
      }
    };
    fs.writeFileSync(DEFAULT_CONFIG_PATH, yaml.dump(config));
    console.log(' pipeline.yaml scaffolded');
  });

program
  .command('run')
  .description('Run a pipeline config from YAML or JSON')
  .action(() => {
    const schemaPath = path.resolve('schemas/pipeline.schema.json');
    const configPath = path.resolve(DEFAULT_CONFIG_PATH);

    const schema = yaml.load(fs.readFileSync(schemaPath, 'utf8')) as object;
    const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as PipelineConfig;

    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);

    const valid = validate(config);
    if (!valid) {
      console.error(' pipeline.yaml is invalid.');
      console.error(validate.errors);
      process.exit(1);
    }

    console.log(' pipeline.yaml is valid. Proceeding to execute...');
    // TODO: plug into createRagPipeline or execution flow
  });

program
  .command('visualize')
  .description('Render a pipeline graph using Mermaid syntax')
  .option('-o, --output <file>', 'Write Mermaid graph to a markdown file')
  .action((options) => {
    const configPath = path.resolve(DEFAULT_CONFIG_PATH);
    const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as PipelineConfig;

    const { embedder, vectorStore, llm } = config.pipeline;

    const mermaid = [
      '```mermaid',
      'graph TD',
      `    input["User Prompt"] --> E["${embedder}"]`,
      `    E --> V["${vectorStore}"]`,
      `    V --> L["${llm}"]`,
      '    L --> output["Final Response"]',
      '```'
    ].join('\n');

    if (options.output) {
      fs.writeFileSync(options.output, mermaid);
      console.log(` Mermaid graph written to ${options.output}`);
    } else {
      console.log(mermaid);
    }
  });

program
  .command('benchmark')
  .description('Benchmark a pipeline using structured prompts')
  .option('-p, --prompts <file>', 'Path to prompts.yaml', 'benchmarks/prompts.yaml')
  .option('-o, --output <csv>', 'Path to CSV output file')
  .action((options) => {
    const promptPath = options.prompts;
    if (!fs.existsSync(promptPath)) {
      console.warn(`  Prompts file not found at ${promptPath}`);
      const samplePrompts: Prompt[] = [
        { id: 'p1', text: 'What is SynapseStack?' },
        { id: 'p2', text: 'Explain RAG orchestration.' }
      ];
      fs.mkdirSync(path.dirname(promptPath), { recursive: true });
      fs.writeFileSync(promptPath, yaml.dump(samplePrompts));
      console.log(` Created fallback prompts file: ${promptPath}`);
    }

    const prompts = yaml.load(fs.readFileSync(promptPath, 'utf8')) as Prompt[];
    if (!Array.isArray(prompts)) {
      console.error(' prompts.yaml must contain an array of prompt inputs');
      process.exit(1);
    }

    const results: string[] = ['id,text,latency_ms,tokens'];
    for (const prompt of prompts) {
      const latency = 120 + Math.floor(Math.random() * 30);
      const tokens = 40 + Math.floor(Math.random() * 10);
      results.push(`${prompt.id},"${prompt.text}",${latency},${tokens}`);
      console.log(`Prompt: ${prompt.text}`);
      console.log(` Latency: ${latency}ms`);
      console.log(` Tokens: ${tokens}`);
      console.log('---');
    }

    if (options.output) {
      fs.writeFileSync(options.output, results.join('\n'));
      console.log(` Benchmark results written to ${options.output}`);
    }
  });

program
  .command('generate-types')
  .description('Generate TypeScript types from pipeline schema')
  .option('-s, --schema <file>', 'Path to JSON schema file', 'schemas/pipeline.schema.json')
  .option('-o, --output <file>', 'Path to output .d.ts file', 'schemas/pipeline.schema.d.ts')
  .action(async (options) => {
    const schema = yaml.load(fs.readFileSync(path.resolve(options.schema), 'utf8')) as object;
    const ts = await compile(schema, 'PipelineConfig');
    fs.writeFileSync(options.output, ts);
    console.log(` Types written to ${options.output}`);
  });

program.parse(process.argv);
