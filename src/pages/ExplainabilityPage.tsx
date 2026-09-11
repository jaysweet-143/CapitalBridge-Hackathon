import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HelpCircle,
  ShieldAlert,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Layers,
} from 'lucide-react';
import { assessmentService } from '../services/assessmentService';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const ExplainabilityPage: React.FC = () => {
  const breakdown = assessmentService.getScoreBreakdown();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Explainability & Methodology
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Why is my readiness 742?
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Transparent, deterministic scoring based on your real activity. No opaque black-box AI scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/what-if">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Simulate Score Improvements
            </Button>
          </NavLink>
        </div>
      </div>

      {/* Prominent Methodology Badge & Disclaimer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wide text-[11px] bg-amber-200/70 px-2 py-0.5 rounded">
              Prototype Financial-Readiness Methodology
            </span>
            <span className="text-amber-700 font-semibold">Version 1.2</span>
          </div>
          <p className="leading-relaxed text-amber-800/90">
            CapitalBridge does <strong>not</strong> claim this is a statistically validated bank default probability model or traditional credit bureau rating. It is an explainable financial-readiness benchmark designed specifically for Ghanaian informal and micro-enterprises to structure their evidence for potential capital providers.
          </p>
        </div>
      </div>

      {/* Signal Weights Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Deterministic Signal Weights (100 Point Baseline)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every signal maps to concrete, verifiable evidence records.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Raw Score: 88 / 100 &bull; Normalized: 742 / 1000</span>
          </div>
        </div>

        {/* Detailed Breakdown List */}
        <div className="space-y-4">
          {breakdown.signals.map((signal) => (
            <div
              key={signal.id}
              className="p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-slate-50/60 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                    {signal.score}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{signal.name}</h3>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Weight: {signal.maxScore} points &bull; Key Metric: {signal.keyMetric}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-900">
                    {signal.score} / {signal.maxScore} pts ({signal.percentage}%)
                  </span>
                  <Badge status={signal.status}>{signal.status}</Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    signal.status === 'Strong'
                      ? 'bg-emerald-500'
                      : signal.status === 'Moderate'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${signal.percentage}%` }}
                />
              </div>

              {/* Underlying Grounded Evidence */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 space-y-2 text-xs">
                <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">
                  Supporting Evidence from Ama's Kitchen:
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {signal.summary}
                </p>
                <div className="space-y-1 pt-1">
                  {signal.evidence.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
