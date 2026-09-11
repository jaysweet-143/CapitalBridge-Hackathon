import { FinancialPassport } from '../types';
import { mockFinancialPassport } from '../data/mockData';

export interface PassportSharingPreferences {
  shareAggregatedTurnover: boolean;
  maskIndividualBalances: boolean;
  includeWomanOwnedBadge: boolean;
  includeEvidenceConfidence: boolean;
  allowLenderVerification: boolean;
}

class PassportService {
  private passport: FinancialPassport = { ...mockFinancialPassport };

  getPassport(): FinancialPassport {
    return this.passport;
  }

  getSharingPreferences(): PassportSharingPreferences {
    const stored = localStorage.getItem('cb_passport_privacy');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // default
      }
    }
    return {
      shareAggregatedTurnover: true,
      maskIndividualBalances: true,
      includeWomanOwnedBadge: true,
      includeEvidenceConfidence: true,
      allowLenderVerification: true,
    };
  }

  saveSharingPreferences(prefs: PassportSharingPreferences): void {
    localStorage.setItem('cb_passport_privacy', JSON.stringify(prefs));
  }

  generateShareUrl(): string {
    return `https://capitalbridge.gh/verify/${this.passport.reference}`;
  }
}

export const passportService = new PassportService();
