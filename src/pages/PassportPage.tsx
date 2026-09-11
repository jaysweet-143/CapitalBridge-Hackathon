import React, { useState } from 'react';
import {
  ShieldAlert,
  Share2,
  Download,
  CheckCircle2,
  Lock,
  QrCode,
  Copy,
  ExternalLink,
  Building2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { passportService, PassportSharingPreferences } from '../services/passportService';
import { mockFinancialPassport, mockUser } from '../data/mockData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const PassportPage: React.FC = () => {
  const passport = passportService.getPassport();
  const [privacyPrefs, setPrivacyPrefs] = useState<PassportSharingPreferences>(
    passportService.getSharingPreferences()
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleTogglePref = (key: keyof PassportSharingPreferences) => {
    const updated = { ...privacyPrefs, [key]: !privacyPrefs[key] };
    setPrivacyPrefs(updated);
    passportService.saveSharingPreferences(updated);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(passportService.generateShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      window.print();
    }, 800);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Controls Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Portable Credential
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Financial Passport
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            A verified summary of your financial activity that you can share with partner lenders and suppliers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulateDownload}
            isLoading={isDownloading}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Download PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            leftIcon={<Share2 className="w-4 h-4" />}
          >
            Share Passport
          </Button>
        </div>
      </div>

      {/* Main Premium Passport Physical Card */}
      <div className="max-w-3xl mx-auto bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-indigo-500/30 relative overflow-hidden print:border print:text-black print:bg-white">
        {/* Decorative Watermark Pattern */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Passport Header */}
        <div className="relative pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img src="/logo.svg" alt="CapitalBridge" className="w-12 h-12" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
                Official Credential
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                CAPITALBRIDGE FINANCIAL PASSPORT
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="font-mono text-xs font-bold text-slate-400">REF: {passport.reference}</span>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center sm:justify-end gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Financial Record</span>
            </div>
          </div>
        </div>

        {/* Passport Body: Profile Info & Scores */}
        <div className="relative py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/10">
          {/* Owner & Business Info */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Business Owner</span>
              <h3 className="text-2xl font-black text-white tracking-tight">{passport.ownerName}</h3>
              <p className="text-sm font-semibold text-indigo-300">{passport.businessName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Industry Sector</span>
                <span className="font-medium text-slate-200">{passport.businessType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-medium text-slate-200">{passport.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Evidence Coverage</span>
                <span className="font-medium text-slate-200">{passport.evidenceCoverage}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Updated</span>
                <span className="font-medium text-slate-200">{passport.lastUpdated}</span>
              </div>
            </div>

            {privacyPrefs.includeWomanOwnedBadge && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Woman-Owned Enterprise</span>
              </div>
            )}
          </div>

          {/* Scores Badges */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Capital Readiness
              </span>
              <div className="text-4xl font-black text-white mt-1">
                {passport.capitalReadinessScore}
              </div>
              <div className="text-[11px] font-bold text-emerald-400 mt-0.5">
                {passport.readinessStatus}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Scale 0 &ndash; 1000</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Evidence Confidence
              </span>
              <div className="text-4xl font-black text-emerald-400 mt-1">
                {passport.evidenceConfidence}%
              </div>
              <div className="text-[11px] font-bold text-slate-300 mt-0.5">
                Strong Supporting Data
              </div>
              <div className="text-[10px] text-slate-400 mt-1">High verification tier</div>
            </div>
          </div>
        </div>

        {/* Profile Indicators Grid */}
        <div className="relative py-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Profile Indicators
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {passport.signals.map((sig, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
              >
                <span className="text-xs text-slate-300 truncate pr-1">{sig.name}</span>
                <span
                  className={`text-xs font-bold shrink-0 ${
                    sig.status === 'Strong'
                      ? 'text-emerald-400'
                      : sig.status === 'Moderate'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {sig.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Passport Footer */}
        <div className="relative pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Cryptographically sealed &bull; Verifiable by authorized partners</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            verify.capitalbridge.gh/{passport.reference}
          </div>
        </div>
      </div>

      {/* Privacy Controls Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Lock className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">
            Privacy Controls &bull; Choose What to Share
          </h3>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          You retain complete ownership of your financial records. Configure what lenders and suppliers see when they scan your passport token.
        </p>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="font-bold text-slate-900">Share Aggregated Turnover & Net Margin</div>
              <div className="text-[11px] text-slate-500">Shows monthly income volume without listing specific customers.</div>
            </div>
            <input
              type="checkbox"
              checked={privacyPrefs.shareAggregatedTurnover}
              onChange={() => handleTogglePref('shareAggregatedTurnover')}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="font-bold text-slate-900">Mask Individual Wallet Balances</div>
              <div className="text-[11px] text-slate-500">Only proves cash flow consistency rather than disclosing exact current balance.</div>
            </div>
            <input
              type="checkbox"
              checked={privacyPrefs.maskIndividualBalances}
              onChange={() => handleTogglePref('maskIndividualBalances')}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="font-bold text-slate-900">Include Woman-Owned Enterprise Badge</div>
              <div className="text-[11px] text-slate-500">Qualifies Ama's Kitchen for gender-lens grant facilities and concessions.</div>
            </div>
            <input
              type="checkbox"
              checked={privacyPrefs.includeWomanOwnedBadge}
              onChange={() => handleTogglePref('includeWomanOwnedBadge')}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Share Passport Modal */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share Financial Passport"
        subtitle={`Reference: ${passport.reference}`}
      >
        <div className="space-y-5 text-center">
          {/* Simulated QR Code */}
          <div className="w-40 h-40 mx-auto p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-xs flex flex-col items-center justify-center">
            <QrCode className="w-32 h-32 text-slate-900" />
          </div>
          <p className="text-xs text-slate-500">
            Lenders or suppliers can scan this QR code to verify Ama's Kitchen's readiness profile directly.
          </p>

          {/* Share Link Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={passportService.generateShareUrl()}
              className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 rounded-xl border border-slate-300 text-slate-700"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyLink}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Secure 30-day token active. You can revoke access at any time.</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
