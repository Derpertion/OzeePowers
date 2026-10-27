import React, { useState } from 'react';
import {
  MessageSquare,
  Compass,
  Boxes,
  Wrench,
  CheckCircle,
  Headset,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { PROCESS_STAGES } from '../data/companyData';

export const ProcessSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const activeStage = PROCESS_STAGES.find((s) => s.step === selectedStep) || PROCESS_STAGES[0];

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <MessageSquare className="w-5 h-5" />;
      case 2:
        return <Compass className="w-5 h-5" />;
      case 3:
        return <Boxes className="w-5 h-5" />;
      case 4:
        return <Wrench className="w-5 h-5" />;
      case 5:
        return <CheckCircle className="w-5 h-5" />;
      case 6:
        return <Headset className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            End-To-End Engineering
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-1 text-white">
            From Concept to Commissioning
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 mt-2">
            Professional Manpower. End-To-End Solutions.
          </p>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Every OzeePower installation follows a structured, code-compliant 6-stage engineering lifecycle
            to ensure safety, optimal generation yield, and long-term durability.
          </p>
        </div>

        {/* 6 Stage Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {PROCESS_STAGES.map((stage) => {
            const isSelected = stage.step === selectedStep;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setSelectedStep(stage.step)}
                className={`relative flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/50'
                    : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Step Number Badge */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-extrabold'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {stage.step}
                </div>

                <div
                  className={`p-2 rounded-lg mb-2 ${
                    isSelected ? 'text-emerald-300' : 'text-slate-400'
                  }`}
                >
                  {getStepIcon(stage.step)}
                </div>

                <div
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {stage.title}
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1.5 w-3 h-3 bg-emerald-400 rotate-45 rounded-xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div className="rounded-2xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 rounded-md border border-emerald-500/30">
                  Stage 0{activeStage.step} of 06
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Estimated Timeline: {activeStage.duration}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {activeStage.headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                "{activeStage.description}"
              </p>

              {/* Deliverables */}
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Stage Engineering Deliverables
                </h4>
                <div className="space-y-2">
                  {activeStage.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-700/60"
                    >
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Instruments & Workflow */}
            <div className="lg:col-span-5 space-y-4 bg-slate-900/60 p-5 rounded-xl border border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quality Controls & Safety Standards
              </h4>

              <ul className="space-y-2.5 text-xs text-slate-300">
                {activeStage.keyTools.map((tool, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="font-medium text-slate-200">{tool}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Certified installation practices</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  We enforce zero shortcuts: all installations strictly adhere to the Philippine Electrical
                  Code, utility net-metering interconnection rules, and certified wind load standards.
                </p>
              </div>

              {/* Next Step trigger */}
              <div className="pt-2 flex justify-between items-center text-xs">
                {activeStage.step < 6 ? (
                  <button
                    type="button"
                    onClick={() => setSelectedStep(activeStage.step + 1)}
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                  >
                    <span>Proceed to Stage 0{activeStage.step + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-emerald-400 font-semibold">
                    Complete Handover & Continuous Warranty Support
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
