import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { mockMomoService } from '../services/mockMomoService';
import { mockUser } from '../data/mockData';

export const ConnectMomoPage: React.FC = () => {
  const navigate = useNavigate();
  const providers = mockMomoService.getProviders();

  const [selectedProvider, setSelectedProvider] = useState<'mtn' | 'telecel' | 'airteltigo'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState(mockUser.phone);
  const [hasConsented, setHasConsented] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsented) {
      setErrorMessage('You must review and grant explicit consent to proceed.');
      return;
    }
    setErrorMessage('');
    setIsConnecting(true);

    try {
      await mockMomoService.simulateConnect(selectedProvider, phoneNumber, (step) => {
        setConnectionStep(step);
      });
      navigate('/dashboard');
    } catch {
      setErrorMessage('Simulation failed. Please retry.');
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="py-5 px-6 sm:px-10 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="CapitalBridge" className="w-8 h-8" />
            <span className="font-bold text-slate-900 text-base">CapitalBridge</span>
          </NavLink>
          <div className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Simulated Integration Prototype</span>
          </div>
        </div>
      </header>

      {/* Form Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 sm:py-14">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Journey A &bull; Continuous Bridge
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Build your financial record automatically
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
            Connect your Mobile Money account and, with your permission, CapitalBridge can organize your financial activity over time.
          </p>
        </div>

        <form onSubmit={handleConnect} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              1. Select Mobile Money Provider
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {providers.map((p) => {
                const isSelected = selectedProvider === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">{p.logoBadge}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{p.name}</div>
                    {p.isPopular && (
                      <span className="mt-2 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded self-start">
                        Most Popular in Ghana
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              2. Ghanaian MoMo Wallet Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                placeholder="+233 24 412 8904"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              In this prototype, we simulate sending an authorization prompt to this number.
            </p>
          </div>

          {/* What data will be used? Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">What data will be used?</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Read-Only Bridge
              </span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Incoming transactions</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Outgoing transactions</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Transaction dates</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Transaction categories</span>
              </li>
              <li className="flex items-center gap-1.5 sm:col-span-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Account activity patterns</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Privacy guarantee:</strong> You control your data. CapitalBridge only uses information you authorize.
              </span>
            </div>
          </div>

          {/* Explicit Consent Checkbox */}
          <div className="flex items-start gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <input
              type="checkbox"
              id="consent"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
              I give explicit consent for CapitalBridge to organize and analyze my permitted Mobile Money transactions to build and update my Financial Readiness Profile.
            </label>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Simulation Progress Animation */}
          {isConnecting && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-900">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>Simulating Mobile Money Bridge Connection...</span>
              </div>
              <p className="text-xs text-blue-700 font-medium">{connectionStep}</p>
            </div>
          )}

          {/* Connect Button */}
          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="w-full"
            isLoading={isConnecting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isConnecting ? 'Connecting Bridge...' : 'Connect Securely'}
          </Button>

          {/* Alternative Link */}
          <div className="text-center pt-2 text-xs text-slate-500">
            <span>Don't want to connect now? </span>
            <NavLink to="/upload-statement" className="font-semibold text-blue-600 hover:text-blue-700 underline">
              Upload a statement instead
            </NavLink>
          </div>
        </form>
      </main>

      <footer className="py-5 text-center text-xs text-slate-400 bg-white border-t border-slate-200">
        CapitalBridge Prototype &bull; Simulated MTN MoMo, Telecel Cash & AirtelTigo Integration
      </footer>
    </div>
  );
};
