import React, { useState } from 'react';
import {
  GitCompare,
  TrendingUp,
  Sparkles,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import { whatIfService } from '../services/whatIfService';
import { WhatIfScenario } from '../types';
import { Button } from '../components/common/Button';
import { ScoreRing } from '../components/common/ScoreRing';

export const WhatIfPage: React.FC = () => {
  const scenarios = whatIfService.getScenarios();
  const [activeScenario, setActiveScenario] = useState<WhatIfScenario | null>(scenarios[0]);

  // Interactive Custom Simulator State
  const [addedMonths, setAddedMonths] = useState(3);
  const [reducedDebt, setReducedDebt] = useState(500);
  const [addedSavings, setAddedSavings] = useState(200);
  const [incomeWeeks, setIncomeWeeks] = useState(8);

  const customProjection = whatIfService.calculateCustomProjection({
    addedBusinessMonths: addedMonths,
    reducedMonthlyObligations: reducedDebt,
    additionalMonthlySavings: addedSavings,
    consistentIncomeWeeks: incomeWeeks,
  });

  const resetSliders = () => {
    setAddedMonths(0);
    setReducedDebt(0);
    setAddedSavings(0);
    setIncomeWeeks(0);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Signature Feature &bull; Predictive Sandbox
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            What could improve my financial readiness?
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Test business decisions before taking action. See projected point gains and the exact reasons why.
          </p>
        </div>
      </div>

      {/* Preset Scenario Cards (From Prompt) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recommended Growth Scenarios
          </h2>
          <span className="text-xs text-slate-500">
            Click any scenario to inspect its rationale
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((sc) => {
            const isSelected = activeScenario?.id === sc.id;
            return (
              <div
                key={sc.id}
                onClick={() => setActiveScenario(sc)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                      {sc.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      +{sc.scoreChange} pts
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {sc.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {sc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Readiness Shift
                    </span>
                    <div className="text-sm font-black text-slate-900">
                      {sc.baselineScore} &rarr; <span className="text-blue-600 font-extrabold">{sc.projectedScore}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600">
                    {isSelected ? 'Selected' : 'Inspect'} &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Scenario Spotlight Box */}
      {activeScenario && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900 shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Scenario Deep Dive</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeScenario.name}
              </h3>

              {/* The "Why?" Callout as specifically requested */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1.5 text-left">
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  Why does this improve your score?
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  "{activeScenario.why}"
                </p>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Timeframe</span>
                  <span className="font-semibold text-white">{activeScenario.timeframe}</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Recommended Action</span>
                  <span className="font-semibold text-white">{activeScenario.actionRequired}</span>
                </div>
              </div>
            </div>

            {/* Score Shift Meter */}
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-center min-w-[240px]">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Projected Readiness
              </div>
              <div className="text-5xl font-black text-white tracking-tight">
                {activeScenario.projectedScore}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Baseline: <span className="font-bold text-white">{activeScenario.baselineScore}</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{activeScenario.scoreChange} Points Increase</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Custom Simulator with Sliders */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Interactive Custom Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Combine multiple actions simultaneously to simulate your ideal 6-month roadmap.
            </p>
          </div>

          <button
            onClick={resetSliders}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Slider 1 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">Add Business Records (Invoices/Receipts)</span>
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {addedMonths} Months
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={addedMonths}
                onChange={(e) => setAddedMonths(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0 months</span>
                <span>3 months</span>
                <span>6 months (+48 pts)</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">Reduce Monthly Debt / Obligations</span>
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  GH₵ {reducedDebt} / mo
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="100"
                value={reducedDebt}
                onChange={(e) => setReducedDebt(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>GH₵ 0</span>
                <span>GH₵ 500</span>
                <span>GH₵ 1,000 (+35 pts)</span>
              </div>
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">Increase Weekly MoMo Vault Savings</span>
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  GH₵ {addedSavings} / mo
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="50"
                value={addedSavings}
                onChange={(e) => setAddedSavings(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>GH₵ 0</span>
                <span>GH₵ 250</span>
                <span>GH₵ 500 (+30 pts)</span>
              </div>
            </div>

            {/* Slider 4 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">Consistent MoMo Sales Streak</span>
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {incomeWeeks} Weeks
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="2"
                value={incomeWeeks}
                onChange={(e) => setIncomeWeeks(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0 weeks</span>
                <span>6 weeks</span>
                <span>12 weeks (+28 pts)</span>
              </div>
            </div>
          </div>

          {/* Interactive Projected Output Box */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 border border-slate-200 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Custom Projection
            </span>

            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-black text-slate-900">
                {customProjection.projectedScore}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 1000</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{customProjection.scoreChange} Combined Points</span>
            </div>

            <div className="text-xs text-slate-600">
              Projected Evidence Confidence:{' '}
              <strong className="text-emerald-700 font-bold">{customProjection.confidenceProjected}%</strong>
            </div>

            {/* Reasons list */}
            {customProjection.reasons.length > 0 && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-left space-y-1 text-xs">
                <div className="text-[10px] font-bold uppercase text-slate-400">Point Contributors:</div>
                {customProjection.reasons.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-700 text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
