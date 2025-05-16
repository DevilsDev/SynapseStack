/**
 * File: src/scoring/ConfidenceCalculator.ts
 * Description: Normalizes and reranks document scores with pluggable strategies.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

import { ScoredDocument, ConfidenceScoredDocument, ScoreStrategy } from './ScoreStrategy';

export class ConfidenceCalculator {
  constructor(private strategy: ScoreStrategy) {}

  rank(docs: ScoredDocument[]): ConfidenceScoredDocument[] {
    const enriched = this.strategy.compute(docs);
    return enriched.sort((a, b) => b.confidence - a.confidence);
  }

  setStrategy(strategy: ScoreStrategy) {
    this.strategy = strategy;
  }
}
