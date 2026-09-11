import { WhatIfScenario } from '../types';
import { mockWhatIfScenarios } from '../data/mockData';

class WhatIfService {
  getScenarios(): WhatIfScenario[] {
    return mockWhatIfScenarios;
  }

  calculateCustomProjection(options: {
    addedBusinessMonths: number;
    reducedMonthlyObligations: number;
    additionalMonthlySavings: number;
    consistentIncomeWeeks: number;
  }): {
    baselineScore: number;
    projectedScore: number;
    scoreChange: number;
    confidenceProjected: number;
    reasons: string[];
  } {
    const baselineScore = 742;
    const baselineConfidence = 86;

    let pointsGained = 0;
    let confidenceGained = 0;
    const reasons: string[] = [];

    if (options.addedBusinessMonths > 0) {
      const pts = Math.min(48, options.addedBusinessMonths * 15);
      pointsGained += pts;
      confidenceGained += Math.min(8, options.addedBusinessMonths * 2.5);
      reasons.push(`+${pts} pts from ${options.addedBusinessMonths} months of verified commercial transaction receipts`);
    }

    if (options.reducedMonthlyObligations > 0) {
      const pts = Math.min(35, Math.round((options.reducedMonthlyObligations / 100) * 6));
      pointsGained += pts;
      reasons.push(`+${pts} pts from reducing recurring obligations by GH₵ ${options.reducedMonthlyObligations}/month`);
    }

    if (options.additionalMonthlySavings > 0) {
      const pts = Math.min(30, Math.round((options.additionalMonthlySavings / 100) * 4));
      pointsGained += pts;
      confidenceGained += 3;
      reasons.push(`+${pts} pts from adding GH₵ ${options.additionalMonthlySavings}/month to emergency reserves`);
    }

    if (options.consistentIncomeWeeks > 0) {
      const pts = Math.min(28, Math.round(options.consistentIncomeWeeks * 3.2));
      pointsGained += pts;
      reasons.push(`+${pts} pts from ${options.consistentIncomeWeeks} weeks of uninterrupted MoMo turnover`);
    }

    const projectedScore = Math.min(960, baselineScore + pointsGained);
    const confidenceProjected = Math.min(98, Math.round(baselineConfidence + confidenceGained));

    return {
      baselineScore,
      projectedScore,
      scoreChange: projectedScore - baselineScore,
      confidenceProjected,
      reasons,
    };
  }
}

export const whatIfService = new WhatIfService();
