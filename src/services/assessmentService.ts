import { FinancialProfile, FinancialSignal } from '../types';
import { mockFinancialProfile, mockFinancialSignals, cashflowMonthlyData } from '../data/mockData';

class AssessmentService {
  getFinancialProfile(): FinancialProfile {
    return mockFinancialProfile;
  }

  getSignals(): FinancialSignal[] {
    return mockFinancialSignals;
  }

  getCashflowHistory() {
    return cashflowMonthlyData;
  }

  getScoreBreakdown() {
    return {
      overallScore: 742,
      maxScore: 1000,
      confidenceScore: 86,
      status: 'Good foundation',
      methodologyVersion: 'Prototype v1.2 — Deterministic Readiness Engine',
      signals: mockFinancialSignals.map((s) => ({
        id: s.id,
        name: s.name,
        score: s.score,
        maxScore: s.maxScore,
        percentage: Math.round((s.score / s.maxScore) * 100),
        status: s.status,
        summary: s.evidenceSummary,
        evidence: s.supportingEvidence,
        keyMetric: s.keyMetric,
      })),
    };
  }
}

export const assessmentService = new AssessmentService();
