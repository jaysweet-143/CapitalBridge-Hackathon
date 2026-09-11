import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Smartphone,
  UploadCloud,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const ChoosePathPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="py-6 px-6 sm:px-10 border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="CapitalBridge" className="w-8 h-8" />
            <span className="font-bold text-slate-900 text-base">CapitalBridge</span>
          </NavLink>
          <NavLink to="/dashboard" className="text-xs text-slate-500 hover:text-slate-800">
            Skip to Dashboard &rarr;
          </NavLink>
        </div>
      </header>

      {/* Main Choice Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:py-16 flex flex-col justify-center">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Onboarding
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            How would you like to start?
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Choose the path that fits your timeline. Both paths create your verified CapitalBridge financial profile.
          </p>
        </div>

        {/* Two Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Path A */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-slate-200 hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Smartphone className="w-7 h-7" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Journey A
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Recommended for Growth
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Build my profile over time
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Connect your MoMo and let CapitalBridge organize your financial activity as you go.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Connect MTN, Telecel, or AT wallet once</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Builds evidence quietly in the background</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full readiness profile ready when you need capital</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <NavLink to="/connect-momo" className="block">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Connect My MoMo
                </Button>
              </NavLink>
            </div>
          </div>

          {/* Path B */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-slate-200 hover:border-indigo-600 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Journey B
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" /> Instant Processing
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                I need capital now
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Upload your recent Mobile Money statement and create your financial profile immediately.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Supports PDF and CSV statement downloads</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Deterministic score generated in 10 seconds</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Generate an immediate shareable Financial Passport</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <NavLink to="/upload-statement" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-slate-300 hover:bg-slate-50"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Upload Statement
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Your data remains 100% under your control &bull; Bank-grade encryption</span>
        </div>
      </footer>
    </div>
  );
};
