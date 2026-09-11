import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { evidenceService, UPLOAD_STEPS } from '../services/evidenceService';

export const UploadStatementPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);

  const handleStartProcessing = async (fileName: string) => {
    setSelectedFile(fileName);
    setIsProcessing(true);
    setIsFinished(false);

    try {
      await evidenceService.simulateStatementUpload(fileName, (stepIdx) => {
        setCurrentStepIndex(stepIdx);
      });
      setIsFinished(true);
    } catch {
      setIsProcessing(false);
    }
  };

  const sampleStatements = [
    { name: 'Ama_MTN_MoMo_Statement_Mar_Aug_2026.pdf', size: '1.8 MB', type: 'pdf' },
    { name: 'Amash_Kitchen_Telecel_Merchant_Ledger.csv', size: '420 KB', type: 'csv' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="py-5 px-6 sm:px-10 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="CapitalBridge" className="w-8 h-8" />
            <span className="font-bold text-slate-900 text-base">CapitalBridge</span>
          </NavLink>
          <NavLink to="/dashboard" className="text-xs text-slate-500 hover:text-slate-800">
            Skip to Dashboard &rarr;
          </NavLink>
        </div>
      </header>

      {/* Main Upload Box */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 sm:py-14">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Journey B &bull; Instant Evaluation
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Build your profile from your statement
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
            Upload your recent Mobile Money statement (PDF or CSV). Our deterministic assessment engine extracts patterns and creates your readiness score in seconds.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {!isProcessing && !isFinished ? (
            <>
              {/* Dropzone Area */}
              <div
                onClick={() => handleStartProcessing('Ama_MTN_MoMo_Statement_Mar_Aug_2026.pdf')}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 sm:p-10 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all duration-200 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Upload your Mobile Money statement
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Drag and drop your file here, or click to browse
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 text-slate-600 text-xs font-semibold">
                  <span>Supports: PDF, CSV, Excel &bull; Up to 25MB</span>
                </div>
              </div>

              {/* Sample Files for Hackathon Testing */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Or select pre-packaged demo statement
                  </span>
                  <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Ready for Testing
                  </span>
                </div>
                <div className="space-y-2">
                  {sampleStatements.map((sample) => (
                    <div
                      key={sample.name}
                      onClick={() => handleStartProcessing(sample.name)}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/50 flex items-center justify-between cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs">
                          {sample.type === 'pdf' ? (
                            <FileText className="w-4 h-4 text-rose-600" />
                          ) : (
                            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                            {sample.name}
                          </div>
                          <div className="text-[11px] text-slate-500">{sample.size} &bull; 6 Months Activity</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Select & Process &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : isProcessing && !isFinished ? (
            /* Multi-step Processing Animation */
            <div className="py-4 space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-2 animate-pulse">
                  <UploadCloud className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Processing Mobile Money Statement
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  {selectedFile}
                </p>
              </div>

              {/* Progress Steps List */}
              <div className="space-y-3 bg-slate-50 rounded-2xl p-5 border border-slate-200">
                {UPLOAD_STEPS.map((step, idx) => {
                  const isDone = currentStepIndex > idx;
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div
                      key={step.step}
                      className={`flex items-start gap-3 transition-all duration-300 ${
                        isCurrent
                          ? 'text-blue-900 font-semibold'
                          : isDone
                          ? 'text-slate-700'
                          : 'text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : isCurrent ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                            {step.step}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold">{step.label}</div>
                        <div className="text-[11px] text-slate-500">{step.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Finished Success State */
            <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Assessment Complete
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Your financial profile is ready.
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  328 transactions extracted across 6 months. Your Capital Readiness score has been established at <strong>742 / 1000</strong>.
                </p>
              </div>

              {/* Quick Result Preview */}
              <div className="max-w-sm mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-around">
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">Readiness</div>
                  <div className="text-2xl font-black text-slate-900">742</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Good foundation</div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">Confidence</div>
                  <div className="text-2xl font-black text-slate-900">86%</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Strong evidence</div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate('/dashboard')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View My Financial Dashboard
                </Button>
              </div>
            </div>
          )}

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Deterministic Calculation:</strong> Calculated using verifiable arithmetic formulas. No AI hallucination of credit scores.
            </span>
          </div>
        </div>
      </main>

      <footer className="py-5 text-center text-xs text-slate-400 bg-white border-t border-slate-200">
        CapitalBridge Statement Processing Engine &bull; Compliant with Ghanaian Data Protection Principles
      </footer>
    </div>
  );
};
