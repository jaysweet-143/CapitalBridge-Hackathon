import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Store,
  PiggyBank,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="CapitalBridge" className="w-10 h-10" />
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                CapitalBridge
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Ghanaian SME Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NavLink
              to="/dashboard"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors hidden sm:block"
            >
              Demo Dashboard
            </NavLink>
            <NavLink to="/onboarding">
              <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started
              </Button>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Turn your financial activity into financial opportunity</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight lg:leading-tight">
            Your financial activity tells a story.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-600">
              CapitalBridge makes it visible.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Build a financial profile from your everyday financial activity, understand your readiness, and be prepared when opportunity comes.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <NavLink to="/onboarding" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                className="w-full shadow-md hover:shadow-lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Build My Financial Profile
              </Button>
            </NavLink>
            <NavLink to="/upload-statement" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">
                I Need Capital Now
              </Button>
            </NavLink>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Free simulated prototype for Ghanaian entrepreneurs &bull; No bank account required
          </p>
        </div>

        {/* Visual Flowchart Diagram */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 relative">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                How CapitalBridge Works
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                From Everyday Activity to Verified Readiness
              </h2>
            </div>

            {/* Diagram Grid */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative">
              {/* Step 1: Input Evidence Sources */}
              <div className="w-full lg:w-1/3 grid grid-cols-2 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">MoMo Activity</div>
                    <div className="text-[10px] text-slate-500">MTN / Telecel</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Store className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">Business Sales</div>
                    <div className="text-[10px] text-slate-500">Daily receipts</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <PiggyBank className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">Savings & Susu</div>
                    <div className="text-[10px] text-slate-500">Vault cushions</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">Records & Invoices</div>
                    <div className="text-[10px] text-slate-500">Permits & supply</div>
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex flex-col items-center justify-center text-blue-600 font-bold">
                <span className="text-xs hidden lg:block uppercase font-bold tracking-widest text-slate-400 mb-1">Bridge</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-600 rotate-90 lg:rotate-0" />
                </div>
              </div>

              {/* Step 2: CapitalBridge Core Engine */}
              <div className="w-full lg:w-1/4 p-5 bg-gradient-to-b from-indigo-950 to-slate-900 text-white rounded-2xl border border-indigo-900 shadow-md text-center">
                <div className="inline-flex p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-2">
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-sm font-bold tracking-tight text-white">
                  CapitalBridge
                </h3>
                <p className="text-[11px] text-slate-300 mt-1">
                  Deterministic readiness calculation & evidence confidence scoring
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Explainable Engine</span>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex flex-col items-center justify-center text-blue-600 font-bold">
                <span className="text-xs hidden lg:block uppercase font-bold tracking-widest text-slate-400 mb-1">Result</span>
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-600 rotate-90 lg:rotate-0" />
                </div>
              </div>

              {/* Step 3: Outputs */}
              <div className="w-full lg:w-1/3 flex flex-col gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between shadow-2xs">
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">Financial Readiness</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">742 / 1000 &bull; Good foundation</div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                    86% Conf.
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between shadow-2xs">
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">Financial Passport</div>
                    <div className="text-[10px] text-slate-500">Verified shareable credential</div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">
                    CB-GH-2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Start now or when you need capital */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Two Flexible Journeys
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Start now, or start when you need capital.
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              You should not have to wait until you urgently need a loan before starting to build financial evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Journey A */}
            <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200/80 hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    Journey A
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Continuous Build</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Build my profile over time
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  For entrepreneurs who do not need capital today. Connect your Mobile Money once with explicit consent, and CapitalBridge quietly builds and organizes your financial evidence as you operate.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Connect your MoMo account once (MTN, Telecel, AT)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Continuous tracking of sales, expenses, and savings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ready with months of evidence when expansion comes</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <NavLink to="/connect-momo">
                  <Button variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Connect My MoMo
                  </Button>
                </NavLink>
              </div>
            </div>

            {/* Journey B */}
            <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200/80 hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                    Journey B
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Instant Evaluation</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  I need capital now
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  For businesses with an immediate financing requirement. Upload your recent PDF or CSV statement, and our engine will extract patterns and generate your readiness assessment in minutes.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Upload your 3-6 month MoMo statement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant extraction of income, savings, and debt ratio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Generate an immediate shareable Financial Passport</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <NavLink to="/upload-statement">
                  <Button variant="outline" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Upload Statement
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Ama Mensah section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-indigo-800/80">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 font-black text-3xl flex items-center justify-center shrink-0 shadow-md">
                AM
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold mb-2">
                  <Store className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Case Study &bull; Osu, Accra</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Designed for entrepreneurs like Ama Mensah
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Ama operates <strong>Ama's Kitchen</strong> in Osu. She receives MoMo payments from daily lunch rush patrons, buys bulk produce at Makola, and saves weekly in a Susu group. When she eventually needs <strong>GH₵ 8,000</strong> to expand inventory, her financial evidence is already structured and verified.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <NavLink to="/dashboard">
                    <Button variant="secondary" size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
                      Explore Ama's Live Profile
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning / Disclaimer */}
      <footer className="mt-auto py-10 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Important Product Positioning</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            CapitalBridge is <strong>not</strong> a bank, lender, credit bureau, loan approval engine, or investment custodian. CapitalBridge is the independent bridge between everyday financial activity and access to capital. Built for the GirlCode Hackathon.
          </p>
          <div className="text-[11px] text-slate-400">
            &copy; 2026 CapitalBridge. All rights reserved. Accra, Ghana.
          </div>
        </div>
      </footer>
    </div>
  );
};
