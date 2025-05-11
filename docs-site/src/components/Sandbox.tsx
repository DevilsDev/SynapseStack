import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Mermaid from '@theme/Mermaid';

const DEFAULT_YAML = `pipeline:
  name: try-me-pipeline
  embedder: OpenAI
  vectorStore: Pinecone
  llm: OpenAI`;

export default function Sandbox() {
  const [yamlText, setYamlText] = useState(DEFAULT_YAML);
  const [graph, setGraph] = useState('');

  useEffect(() => {
    try {
      const lines = yamlText.split('\n');
      const e = lines.find((l) => l.includes('embedder'))?.split(':')[1].trim() || 'Embedder';
      const v = lines.find((l) => l.includes('vectorStore'))?.split(':')[1].trim() || 'VectorStore';
      const l = lines.find((l) => l.includes('llm'))?.split(':')[1].trim() || 'LLM';

      const g = [
        'graph TD',
        `input["User Prompt"] --> E["${e}"]`,
        `E --> V["${v}"]`,
        `V --> L["${l}"]`,
        'L --> output["Final Response"]'
      ].join('\n');

      setGraph(g);
    } catch {
      setGraph('');
    }
  }, [yamlText]);

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '400px' }}>
        <Editor
          height="300px"
          defaultLanguage="yaml"
          value={yamlText}
          onChange={(val) => setYamlText(val || '')}
        />
      </div>
      <div style={{ flex: 1, minWidth: '400px' }}>
        <Mermaid chart={graph} />
      </div>
    </div>
  );
}
