import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText,
  PiggyBank,
  Receipt,
} from 'lucide-react';
import { improvementService } from '../services/improvementService';
import { ImprovementPlanItem } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const ImprovementPage: React.FC = () => {
  const [plan, setPlan] = useState<ImprovementPlanItem[]>(improvementService.getPlan());
  const [overallProgress, setOverallProgress] = useState(improvementService.getOverallProgress());

  const handleToggle = (itemId: string, taskId: string) => {
    const updated = improvementService.toggleTask(itemId, taskId);
    setPlan(updated);
    setOverallProgress(improvementService.getOverallProgress());
  };

  const getPriorityIcon = (priority: number) => {
    switch (priority) {
      case 1:
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 2:
        return <PiggyBank className="w-5 h-5 text-emerald-600" />;
      case 3:
        return <Receipt className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            Actionable Roadmap
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Your 30-day readiness plan
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Prioritized steps to lift Ama's Kitchen from 742 toward prime capital readiness.
          </p>
        </div>

        {/* Overall Completion Progress */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 min-w-[200px] text-right">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-500">Plan Progress</span>
            <span className="text-blue-600">{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Prioritized Action Cards */}
      <div className="space-y-5">
        {plan.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all space-y-4"
          >
            {/* Top row: Priority badge + Title + Impact */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  {getPriorityIcon(item.priority)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Priority {item.priority}
                    </span>
                    <Badge status={item.status}>{item.status}</Badge>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    {item.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Impact</span>
                  <span
                    className={`font-bold ${
                      item.estimatedImpact === 'High'
                        ? 'text-emerald-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {item.estimatedImpact} Impact
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Date</span>
                  <span className="font-semibold text-slate-700">{item.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Description & Potential Benefit */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 text-xs text-slate-600 space-y-2">
                <p className="leading-relaxed">{item.description}</p>
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900">
                  <span className="font-bold">Recommended action: </span>
                  {item.recommendedAction}
                </div>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-slate-400">Potential Benefit</span>
                <span className="text-sm font-bold text-emerald-700 mt-0.5">
                  {item.potentialBenefit}
                </span>
              </div>
            </div>

            {/* Interactive Task Checklist */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                Verification Steps (Click to mark complete):
              </span>
              <div className="space-y-2">
                {item.tasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleToggle(item.id, t.id)}
                    className={`p-3 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                      t.completed
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={t.completed}
                      readOnly
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer pointer-events-none"
                    />
                    <span className={`text-xs ${t.completed ? 'line-through text-slate-400 font-normal' : 'font-medium'}`}>
                      {t.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
