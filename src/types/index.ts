export type SignalStatus = 'Strong' | 'Moderate' | 'Needs improvement';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  businessName: string;
  businessType: string;
  isWomanOwnedBusiness: boolean;
  location: string;
  yearsInBusiness: number;
}

export interface FinancialProfile {
  id: string;
  userId: string;
  readinessScore: number;
  readinessStatus: string;
  overallEvidenceConfidence: number;
  assessmentVersion: string;
  lastAssessedAt: string;
  scoreHistory: {
    month: string;
    score: number;
    evidenceConfidence: number;
  }[];
}

export interface FinancialSignal {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  status: SignalStatus;
  evidenceSummary: string;
  supportingEvidence: string[];
  keyMetric: string;
}

export interface EvidenceRecord {
  id: string;
  date: string;
  title: string;
  amount?: number;
  source: string;
  type: string;
  verificationStatus: 'verified' | 'pending' | 'flagged';
  notes?: string;
}

export interface EvidenceCategory {
  id: string;
  title: string;
  coverage: string;
  status: SignalStatus;
  source: string;
  recordCount: number;
  description: string;
  records: EvidenceRecord[];
}

export interface Transaction {
  id: string;
  transactionDate: string;
  transactionType: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  source: 'MTN Mobile Money' | 'Telecel Cash' | 'AirtelTigo Money' | 'Cash Receipt' | 'Bank';
  reference: string;
}

export interface WhatIfScenario {
  id: string;
  name: string;
  category: string;
  description: string;
  baselineScore: number;
  projectedScore: number;
  scoreChange: number;
  why: string;
  timeframe: string;
  actionRequired: string;
}

export interface ImprovementTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface ImprovementPlanItem {
  id: string;
  priority: number;
  title: string;
  description: string;
  recommendedAction: string;
  potentialBenefit: string;
  estimatedImpact: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Open' | 'Completed';
  dueDate: string;
  tasks: ImprovementTask[];
}

export interface FinancialPassport {
  reference: string;
  businessName: string;
  ownerName: string;
  businessType: string;
  location: string;
  capitalReadinessScore: number;
  readinessStatus: string;
  evidenceConfidence: number;
  evidenceCoverage: string;
  lastUpdated: string;
  signals: {
    name: string;
    status: SignalStatus;
  }[];
  monthlyAverageRevenue: number;
  monthlyAverageExpenses: number;
  savingsTrackRecord: string;
  shareToken: string;
  isShared: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  contextHighlight?: string;
}

export interface MomoProvider {
  id: 'mtn' | 'telecel' | 'airteltigo';
  name: string;
  brandColor: string;
  bgLight: string;
  logoBadge: string;
  description: string;
  isPopular?: boolean;
}
