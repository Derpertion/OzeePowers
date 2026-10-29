import React, { useState } from 'react';
import {
  Sun,
  Zap,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeroProps {
  onOpenBrochure: () => void;
}

const HERO_FEATURED_ASSETS = [
  {
    id: 'hybrid',
    shortLabel: 'Hybrid',
    title: 'Hybrid System & Storage',
    tag: 'Integrated BESS',
    image: '/assets/aistudio/Hybrid_solar_system.jpg',
    description: 'Hybrid inverter with modular LiFePO4 battery cabinet and real-time telemetry.',
  },
  {
    id: 'turnkey',
    shortLabel: 'Install',
    title: 'Turnkey Wall Installation',
    tag: 'Clean Workmanship',
    image: '/assets/aistudio/Complete_inverter.jpg',
    description: 'Smart inverter, battery module, and neat IP65 combiner box.',
  },
  {
    id: 'panels',
    shortLabel: 'Panels',
    title: 'High-Efficiency PV Modules',
    tag: 'High Efficiency Monocrystalline',
    image: '/assets/aistudio/Tier1_panels.jpg',
    description: 'High conversion efficiency N-Type/P-Type panels with mounting rails.',
  },
  {
    id: 'brochure',
    shortLabel: 'Brochure',
    title: 'Official Brochure',
    tag: 'Brochure Reference',
    image: '/assets/aistudio/Brochure_Details_125752f2.jpg',
    description: 'Complete product catalog, 6-stage engineering process, and contact hotlines.',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBrochure }) => {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number>(0);
  const currentAsset = HERO_FEATURED_ASSETS[selectedAssetIndex];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Real Solar Array Panoramic Photographic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <img
          src="/assets/aistudio/Solar_panels1.jpg"
          alt=""
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Deep architectural gradients ensuring high contrast, readability, and brand depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-[#0B2D5C]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Radiant ambient glow effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Trust kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-emerald-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Cabanatuan City, Nueva Ecija</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Central Luzon & Beyond</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-semibold">Quality Solar Equipment</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Powering a <span className="text-amber-400">Brighter</span> and{' '}
              <span className="text-emerald-400">Sustainable Future.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
              {COMPANY_INFO.subTagline} Complete engineering, quality equipment supply, and
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
                <span>View Full Brochure</span>
              </button>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
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

          {/* Right Column: Interactive Hardware & Installation Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 p-5 border border-white/15 shadow-2xl backdrop-blur-md">
              {/* Card top banner with active item title */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-200">{currentAsset.title}</span>
                </div>
                {currentAsset.id === 'brochure' ? (
                  <button
                    type="button"
                    onClick={onOpenBrochure}
                    className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Enlarge</span>
                  </button>
                ) : (
                  <span className="text-emerald-400 font-mono text-[11px] font-semibold">
                    {currentAsset.tag}
                  </span>
                )}
              </div>

              {/* Main Image Display */}
              <div
                onClick={() => {
                  if (currentAsset.id === 'brochure') onOpenBrochure();
                }}
                className={`group relative mt-3 rounded-xl overflow-hidden border border-white/10 shadow-inner bg-slate-950 ${
                  currentAsset.id === 'brochure' ? 'cursor-pointer' : ''
                }`}
              >
                <img
                  src={currentAsset.image}
                  alt={currentAsset.title}
                  className="w-full h-64 sm:h-72 object-cover object-center transition-all duration-300 group-hover:scale-102"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-xs font-bold text-amber-300">{currentAsset.tag}</span>
                  <p className="text-xs text-slate-200 mt-0.5 line-clamp-2">
                    {currentAsset.description}
                  </p>
                </div>
              </div>

              {/* Thumbnail Selector Tabs */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {HERO_FEATURED_ASSETS.map((asset, idx) => {
                  const isActive = idx === selectedAssetIndex;
                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => setSelectedAssetIndex(idx)}
                      className={`relative rounded-lg overflow-hidden border p-1 text-left transition-all ${
                        isActive
                          ? 'border-emerald-400 ring-1 ring-emerald-400 bg-white/10'
                          : 'border-white/10 hover:border-white/30 bg-white/5 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={asset.image}
                        alt={asset.title}
                        className="w-full h-12 object-cover rounded-md"
                      />
                      <div className="mt-1 text-[10px] font-bold text-slate-200 truncate">
                        {asset.shortLabel}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Specs ribbon */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>OzeePower Equipment</span>
                </span>
                <a
                  href="#gallery"
                  className="text-xs text-slate-300 hover:text-white underline underline-offset-2"
                >
                  View All Photos →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Motto Banner at Bottom of Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl backdrop-blur-md">
          {/* Solar Panel Texture Background */}
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <img
              src="/assets/aistudio/Solar_panels4.jpg"
              alt=""
              loading="lazy"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-slate-950/90 to-emerald-950/95" />
          </div>

          <div className="relative z-10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
      </div>
    </section>
  );
};
