/**
 * File: src/utils/renderPipelineGraph.ts
 * Description: Renders pipeline config to Mermaid graph string.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import fs from 'fs';
import yaml from 'js-yaml';

export function renderMermaidFromConfig(configPath: string): string {
  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as any;
  const name = config?.pipeline?.name || 'pipeline';
  const embedder = config?.pipeline?.embedder || 'Embedder';
  const vectorStore = config?.pipeline?.vectorStore || 'VectorStore';
  const llm = config?.pipeline?.llm || 'LLM';

  return [
    'graph TD',
    `    input["User Prompt"] --> E["${embedder}"]`,
    `    E --> V["${vectorStore}"]`,
    `    V --> L["${llm}"]`,
    '    L --> output["Final Response"]'
  ].join('\n');
}
