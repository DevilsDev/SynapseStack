import React, { useState } from 'react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BenchmarkRow {
  id: string;
  text: string;
  latency_ms: number;
  tokens: number;
}

export default function BenchmarkViewer() {
  const [data, setData] = useState<BenchmarkRow[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = result.data as any[];
        const formatted = parsed.map(row => ({
          id: row.id,
          text: row.text,
          latency_ms: Number(row.latency_ms),
          tokens: Number(row.tokens),
        })) as BenchmarkRow[];
        setData(formatted);
      },
    });
  };

  return (
    <div>
      <h3> Upload Benchmark CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="latency_ms" fill="#8884d8" name="Latency (ms)" />
            <Bar dataKey="tokens" fill="#82ca9d" name="Tokens Used" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
