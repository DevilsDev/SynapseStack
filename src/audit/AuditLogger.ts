/**
 * File: src/audit/AuditLogger.ts
 * Description: Logs traceable pipeline audit entries.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import fs from 'fs';
import path from 'path';

export interface AuditEntry {
  timestamp: string;
  prompt: string;
  retrieved: { id: string; score: number; confidence: number }[];
  output: string;
  tokens: number;
}

export class AuditLogger {
  private logPath: string;

  constructor(logFile = 'audit/audit-log.json') {
    this.logPath = path.resolve(logFile);
    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }
  }

  log(entry: AuditEntry) {
    const existing = fs.existsSync(this.logPath)
      ? JSON.parse(fs.readFileSync(this.logPath, 'utf8'))
      : [];
    existing.push(entry);
    fs.writeFileSync(this.logPath, JSON.stringify(existing, null, 2));
  }
}
