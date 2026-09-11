import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConfidenceBarProps {
  score: number; // e.g. 86
  showDetails?: boolean;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ score, showDetails = true }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Evidence Confidence Index
            </div>
            <div className="text-xs text-slate-500">
              Reliability & depth of underlying records
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-slate-900">{score}%</span>
          <div className="text-[11px] font-semibold text-emerald-600">
            Strong supporting evidence
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>

      {showDetails && (
        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[11px] text-slate-600">
          <div className="bg-slate-50 rounded-lg py-1 px-2 border border-slate-100">
            <div className="font-bold text-slate-900">6 Months</div>
            <div>Transaction Depth</div>
          </div>
          <div className="bg-slate-50 rounded-lg py-1 px-2 border border-slate-100">
            <div className="font-bold text-slate-900">328 Verified</div>
            <div>Mobile Money Records</div>
          </div>
          <div className="bg-slate-50 rounded-lg py-1 px-2 border border-slate-100">
            <div className="font-bold text-slate-900">Weekly</div>
            <div>Savings Frequency</div>
          </div>
        </div>
      )}
    </div>
  );
};
