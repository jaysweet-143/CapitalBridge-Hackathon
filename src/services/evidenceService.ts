import { EvidenceCategory, Transaction } from '../types';
import { mockEvidenceCategories, mockTransactions } from '../data/mockData';

export interface UploadProgressStep {
  step: number;
  label: string;
  detail: string;
}

export const UPLOAD_STEPS: UploadProgressStep[] = [
  { step: 1, label: 'Reading statement...', detail: 'Extracting cryptographic PDF header and transaction rows' },
  { step: 2, label: 'Organizing transactions...', detail: 'Categorizing merchant deposits, transfers, and utility payments' },
  { step: 3, label: 'Identifying income patterns...', detail: 'Detecting daily lunch turnover and corporate catering cash cycles' },
  { step: 4, label: 'Analyzing savings behaviour...', detail: 'Verifying weekly MoMo vault transfers and Susu lockups' },
  { step: 5, label: 'Assessing evidence quality...', detail: 'Calculating Evidence Confidence Index and data completeness' },
];

class EvidenceService {
  private categories: EvidenceCategory[] = [...mockEvidenceCategories];
  private transactions: Transaction[] = [...mockTransactions];

  getCategories(): EvidenceCategory[] {
    return this.categories;
  }

  getCategoryById(id: string): EvidenceCategory | undefined {
    return this.categories.find((c) => c.id === id);
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getConfidenceSummary() {
    return {
      score: 86,
      status: 'Strong supporting evidence',
      explanation: 'Your profile is supported by consistent transaction and savings evidence, but documentation coverage is still limited.',
      factors: [
        { name: 'Transaction depth', status: 'High', coverage: '6 consecutive months' },
        { name: 'Savings frequency', status: 'High', coverage: 'Weekly recurring' },
        { name: 'Supplier verification', status: 'Medium', coverage: '4 months of vendor orders' },
        { name: 'Official documentation', status: 'Low', coverage: '2 records on file' },
      ],
    };
  }

  async simulateStatementUpload(
    _fileName: string,
    onStepChange: (stepIndex: number) => void
  ): Promise<{ success: boolean; extractedTransactions: number; readinessScore: number }> {
    for (let i = 0; i < UPLOAD_STEPS.length; i++) {
      onStepChange(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    localStorage.setItem('cb_statement_uploaded', 'true');
    return {
      success: true,
      extractedTransactions: 328,
      readinessScore: 742,
    };
  }
}

export const evidenceService = new EvidenceService();
