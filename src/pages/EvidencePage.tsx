import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  UploadCloud,
  FileText,
  Calendar,
  Layers,
} from 'lucide-react';
import { evidenceService } from '../services/evidenceService';
import { EvidenceCategory } from '../types';
import { Badge } from '../components/common/Badge';
import { ConfidenceBar } from '../components/common/ConfidenceBar';
import { Button } from '../components/common/Button';
import { Drawer } from '../components/common/Drawer';

export const EvidencePage: React.FC = () => {
  const categories = evidenceService.getCategories();
  const confidence = evidenceService.getConfidenceSummary();
  const [selectedCategory, setSelectedCategory] = useState<EvidenceCategory | null>(null);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Evidence Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Financial Evidence Categories
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Verified records from connected Mobile Money wallets, receipts, Susu savings, and registered permits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<UploadCloud className="w-4 h-4" />}
            onClick={() => setSelectedCategory(categories[4])} // Open documentation upload
          >
            Add Evidence
          </Button>
        </div>
      </div>

      {/* Large Evidence Confidence Index Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900 shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Evidence Confidence Index</span>
            </div>
            <div className="flex items-baseline justify-center lg:justify-start gap-3">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {confidence.score}%
              </span>
              <span className="text-emerald-400 font-bold text-sm">
                {confidence.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {confidence.explanation}
            </p>
          </div>

          <div className="w-full lg:w-96 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2.5 text-xs">
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              Coverage Signals
            </div>
            {confidence.factors.map((f, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                <span className="text-slate-300">{f.name}</span>
                <span className="font-semibold text-emerald-300">{f.coverage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            5 Grounded Evidence Categories
          </h2>
          <span className="text-xs text-slate-500">
            Total 502 records structured
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-500/50 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {cat.title}
                      </h3>
                      <div className="text-[11px] text-slate-400">Source: {cat.source}</div>
                    </div>
                  </div>
                  <Badge status={cat.status}>{cat.status}</Badge>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Coverage</span>
                    <span className="font-bold text-slate-800">{cat.coverage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Verified Records</span>
                    <span className="font-bold text-slate-800">{cat.recordCount} items</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  View Evidence Records
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Drawer for Inspecting Records */}
      <Drawer
        isOpen={Boolean(selectedCategory)}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.title || 'Evidence Category'}
        subtitle={`Source: ${selectedCategory?.source} • ${selectedCategory?.coverage} coverage`}
      >
        {selectedCategory && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Category Status</span>
                <Badge status={selectedCategory.status}>{selectedCategory.status}</Badge>
              </div>
              <p className="text-xs text-slate-600">{selectedCategory.description}</p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Logged Records ({selectedCategory.records.length})
              </div>

              {selectedCategory.records.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between">
                    <div className="font-bold text-xs text-slate-900">{rec.title}</div>
                    {rec.amount && (
                      <span className="font-black text-xs text-slate-900">
                        GH₵ {rec.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {rec.date}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {rec.verificationStatus}
                    </span>
                  </div>
                  {rec.notes && (
                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                      {rec.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedCategory.id === 'documentation' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 space-y-2 text-xs">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Opportunity to improve</span>
                </div>
                <p>
                  Uploading formal supplier invoices or wholesale grain receipts will lift your Documentation score from 8/15 to 13/15.
                </p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};
