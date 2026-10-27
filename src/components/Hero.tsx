import React from 'react';
import { Sun, Zap, BatteryCharging, ArrowRight, ShieldCheck, MapPin, Eye } from 'lucide-react';
import { COMPANY_INFO, CORE_PILLARS } from '../data/companyData';

interface HeroProps {
  onOpenBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBrochure }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-brand-navy to-slate-900 text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Subtle decorative grid mesh background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Radiant glow effect behind hero headline */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Trust kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-emerald-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Cabanatuan City, Nueva Ecija</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Central Luzon & Beyond</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Powering a <span className="text-amber-400">Brighter</span> and{' '}
              <span className="text-emerald-400">Sustainable Future.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
              {COMPANY_INFO.subTagline} Complete engineering, equipment supply, and
              professional installation from concept to commissioning.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
              >
                <span>Request Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 rounded-lg transition-all whitespace-nowrap"
              >
                <span>Explore Solutions</span>
              </a>

              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white transition-colors underline underline-offset-4 decoration-emerald-400/50 hover:decoration-emerald-400 whitespace-nowrap"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>View Brochure Details</span>
              </button>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-md bg-amber-500/20 text-amber-400 shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">Clean Energy</h2>
                  <p className="text-xs text-slate-300 mt-0.5">Zero-emission power</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">Reliable Power</h2>
                  <p className="text-xs text-slate-300 mt-0.5">24/7 backup security</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="p-2 rounded-md bg-blue-500/20 text-blue-400 shrink-0">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">Smart Systems</h2>
                  <p className="text-xs text-slate-300 mt-0.5">Hybrid & LiFePO4 storage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Card with Brochure Reference */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 p-5 border border-white/15 shadow-2xl backdrop-blur-md">
              {/* Top card header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-200">Complete Solar & Energy Solutions</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenBrochure}
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </button>
              </div>

              {/* Brochure Preview Thumbnail with interactive overlay */}
              <div
                onClick={onOpenBrochure}
                className="group relative mt-3 rounded-lg overflow-hidden cursor-pointer border border-white/10 shadow-inner bg-slate-950"
              >
                <img
                  src={COMPANY_INFO.brochureAssetPath}
                  alt="OzeePower official brochure showing products, process, and contact numbers"
                  className="w-full h-64 sm:h-72 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-bold text-amber-300">Brochure Reference</span>
                  <p className="text-xs text-slate-200">
                    Click to examine full brochure, brand partners & contact numbers
                  </p>
                </div>
              </div>

              {/* Quick specs ticker below thumbnail */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <div className="font-mono font-bold text-amber-400">TIER 1</div>
                  <div className="text-[11px] text-slate-300">PV Modules</div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <div className="font-mono font-bold text-emerald-400">LiFePO4</div>
                  <div className="text-[11px] text-slate-300">Safe Storage</div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <div className="font-mono font-bold text-blue-400">PEC Ready</div>
                  <div className="text-[11px] text-slate-300">Code Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Motto Banner at Bottom of Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-xl bg-emerald-950/60 border border-emerald-500/30 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <span className="text-sm sm:text-base font-bold tracking-wide text-white uppercase">
              {COMPANY_INFO.motto}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 whitespace-nowrap">
            <span>Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Procurement</span>
            <span aria-hidden="true">·</span>
            <span>Installation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
