/**
 * File: src/scoring/ScoreStrategy.ts
 * Description: Interface and scoring functions for document similarity/confidence.
 * Version: 0.1.0
 * Author: Ali Kahwaji
 */

export interface ScoredDocument {
  id: string;
  score: number;
  metadata?: Record<string, any>;
}

export interface ConfidenceScoredDocument extends ScoredDocument {
  confidence: number;
}

export interface ScoreStrategy {
  name: string;
  compute(documents: ScoredDocument[]): ConfidenceScoredDocument[];
}

export const marginScoring: ScoreStrategy = {
  name: 'margin',
  compute: (docs) => {
    if (docs.length < 2) return docs.map(d => ({ ...d, confidence: 1 }));
    const top = docs[0].score;
    const second = docs[1].score;
    const margin = top - second;
    return docs.map(doc => ({ ...doc, confidence: doc.score / (top || 1) }));
  }
};

export const cosineScoring: ScoreStrategy = {
  name: 'cosine',
  compute: (docs) => {
    const max = Math.max(...docs.map(d => d.score));
    return docs.map(doc => ({ ...doc, confidence: doc.score / (max || 1) }));
  }
};

export const hybridScoring: ScoreStrategy = {
  name: 'hybrid',
  compute: (docs) => {
    const cosine = cosineScoring.compute(docs);
    const margin = marginScoring.compute(docs);
    return docs.map((doc, i) => ({
      ...doc,
      confidence: (cosine[i].confidence + margin[i].confidence) / 2
    }));
  }
};
