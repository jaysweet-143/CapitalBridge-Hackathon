import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { mockUser, mockFinancialProfile, mockFinancialSignals, cashflowMonthlyData, mockTransactions } from '../data/mockData';
import { ScoreRing } from '../components/common/ScoreRing';
import { ConfidenceBar } from '../components/common/ConfidenceBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Greeting & Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Overview
            </span>
            <span className="text-xs text-slate-400">&bull;</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Updated 11 Sep 2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Good morning, {mockUser.firstName}.
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Your financial profile is growing. 6 months of verified activity recorded.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <NavLink to="/what-if">
            <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
              What-If Simulator
            </Button>
          </NavLink>
          <NavLink to="/passport">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Financial Passport
            </Button>
          </NavLink>
        </div>
      </div>

      {/* Primary KPI Row: Readiness Gauge + Confidence Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Readiness Card (742 / 1000) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Assessment
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Capital Readiness
              </h2>
            </div>
            <Badge status="Good foundation">Good foundation</Badge>
          </div>

          <div className="py-6 flex flex-col sm:flex-row items-center justify-around gap-6">
            <ScoreRing
              score={mockFinancialProfile.readinessScore}
              maxScore={1000}
              size={180}
              statusLabel="Good foundation"
              showStatus={false}
            />

            <div className="space-y-3 text-left max-w-xs">
              <div>
                <div className="text-xs font-semibold text-slate-400">CURRENT POSITION</div>
                <div className="text-sm text-slate-700 mt-0.5 leading-relaxed">
                  Your profile demonstrates stable cash servicing capacity for financing up to <strong>GH₵ 8,000 &ndash; GH₵ 12,000</strong>.
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Methodology:</span>
                <span className="font-semibold text-slate-700">Prototype v1.2</span>
              </div>

              <NavLink
                to="/readiness"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 pt-1"
              >
                Why is my readiness 742? &rarr;
              </NavLink>
            </div>
          </div>

          {/* Profile History Progression Pill */}
          <div className="mt-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Profile History (Continuous Growth)</span>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-slate-400">
                Jun: <strong className="text-slate-600">698</strong>
              </span>
              <span className="text-slate-300">&rarr;</span>
              <span className="text-slate-400">
                Jul: <strong className="text-slate-600">715</strong>
              </span>
              <span className="text-slate-300">&rarr;</span>
              <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-bold">
                Aug: 742 (+44)
              </span>
            </div>
          </div>
        </div>

        {/* Evidence Confidence Card (86%) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Reliability Metric
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                Evidence Confidence
              </h2>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              86% Verified
            </span>
          </div>

          <div className="py-4">
            <ConfidenceBar score={mockFinancialProfile.overallEvidenceConfidence} showDetails={true} />
            <p className="mt-4 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              Your profile is supported by consistent transaction and savings evidence, but documentation coverage is still limited.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">328 transactions verified</span>
            <NavLink to="/evidence" className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              Explore evidence records &rarr;
            </NavLink>
          </div>
        </div>
      </div>

      {/* Financial Signals Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Deterministic Breakdown
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Financial Signals
            </h2>
          </div>
          <NavLink to="/readiness" className="text-xs font-bold text-blue-600 hover:text-blue-700">
            View methodology weights &rarr;
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockFinancialSignals.map((signal) => (
            <div
              key={signal.id}
              className="p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{signal.name}</span>
                  <Badge status={signal.status}>{signal.status}</Badge>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-black text-slate-900">
                    {signal.score}
                    <span className="text-xs font-normal text-slate-400">/{signal.maxScore}</span>
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    &bull; {signal.keyMetric}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                  {signal.evidenceSummary}
                </p>
              </div>

              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    signal.status === 'Strong'
                      ? 'bg-emerald-500'
                      : signal.status === 'Moderate'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${(signal.score / signal.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cashflow Trend Chart & Recent MoMo Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Income / Cashflow Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Operating Cash Flow
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Monthly Turnover vs. Outflows (GH₵)
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span>Inflows (Sales)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span>Operating Outflows</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflowMonthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `GH₵ ${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`GH₵ ${Number(val).toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#incomeColor)"
                  name="Inflow"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#expenseColor)"
                  name="Outflow"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Consistent positive net monthly margin averaging <strong>GH₵ 3,200</strong> per month over the last 5 months.
          </p>
        </div>

        {/* Recent Transactions Preview */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Recent MoMo Feed</h3>
              <NavLink to="/evidence" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                View All
              </NavLink>
            </div>

            <div className="space-y-3">
              {mockTransactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between text-xs">
                  <div className="overflow-hidden pr-2">
                    <div className="font-semibold text-slate-900 truncate">
                      {tx.description}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {tx.transactionDate} &bull; {tx.category}
                    </div>
                  </div>
                  <div
                    className={`font-bold shrink-0 ${
                      tx.transactionType === 'income'
                        ? 'text-emerald-600'
                        : 'text-slate-700'
                    }`}
                  >
                    {tx.transactionType === 'income' ? '+' : '-'}GH₵ {tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <NavLink to="/coach" className="block">
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 hover:bg-indigo-100/70 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs font-bold text-indigo-950">Ask AI Coach</div>
                    <div className="text-[10px] text-indigo-700">How to prepare for GH₵ 8,000?</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
