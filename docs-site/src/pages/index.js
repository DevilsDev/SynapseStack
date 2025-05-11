import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="SynapseStack Docs" description="Modular RAG pipelines. CLI-first. Dev-ready.">
      <main style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}> Welcome to SynapseStack</h1>
        <p style={{ fontSize: '1.2rem' }}>
          A modular framework for building and benchmarking Context-augmented + Retrieval-augmented generation pipelines.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '2rem',
          gap: '1.5rem'
        }}>
          <Link
            className="button button--primary"
            style={{ padding: '1rem 2rem' }}
            to="/sandbox">
             Try the Sandbox
          </Link>
          <Link
            className="button button--secondary"
            style={{ padding: '1rem 2rem' }}
            to="/benchmark-visual">
             Run a Benchmark
          </Link>
          <Link
            className="button button--secondary"
            style={{ padding: '1rem 2rem' }}
            to="/cli-reference">
             Explore CLI Docs
          </Link>
        </div>
      </main>
    </Layout>
  );
}
