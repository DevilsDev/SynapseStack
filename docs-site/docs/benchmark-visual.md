---
id: benchmark-visual
title: Benchmark Visualizer
sidebar_label: Benchmark Visualizer
---

#  Benchmark Results Visualizer

Upload your `metrics.csv` file below to visualize latency and token performance across prompts.

> The chart updates live from your file upload. Data is not uploaded to any server.

```csv
id,text,latency_ms,tokens
p1,What is SynapseStack?,122,41
p2,Explain RAG orchestration.,135,45
```

import BenchmarkViewer from '@site/src/components/BenchmarkViewer';

<BenchmarkViewer />
