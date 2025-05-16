/**
 * File: src/audit/FeedbackTracker.ts
 * Description: Captures thumbs up/down signal per query for audit and tuning.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import fs from 'fs';
import path from 'path';

export interface FeedbackEntry {
  timestamp: string;
  prompt: string;
  output: string;
  feedback: 'up' | 'down';
  context?: string[];
}

export class FeedbackTracker {
  private csvPath: string;

  constructor(file = 'audit/feedback.csv') {
    this.csvPath = path.resolve(file);
    if (!fs.existsSync(path.dirname(this.csvPath))) {
      fs.mkdirSync(path.dirname(this.csvPath), { recursive: true });
    }
    if (!fs.existsSync(this.csvPath)) {
      fs.writeFileSync(this.csvPath, 'timestamp,prompt,output,feedback\n');
    }
  }

  log(entry: FeedbackEntry) {
    const line = `"${entry.timestamp}","${entry.prompt}","${entry.output}",${entry.feedback}\n`;
    fs.appendFileSync(this.csvPath, line);
  }
}
