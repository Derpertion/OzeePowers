import React, { useState } from 'react';
import {
  Sun,
  Cpu,
  RefreshCw,
  BatteryCharging,
  ToggleRight,
  ShieldAlert,
  Zap,
  Cable,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PRODUCT_SOLUTIONS } from '../data/companyData';
import { ProductSolution } from '../types';

interface SolutionsSectionProps {
  onSelectProduct: (product: ProductSolution) => void;
  onOpenConsultation: (productName?: string) => void;
}

type FilterCategory = 'all' | 'generation' | 'inverter-storage' | 'protection-safety' | 'accessories';

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  onSelectProduct,
  onOpenConsultation,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredSolutions = PRODUCT_SOLUTIONS.filter((sol) => {
    if (activeFilter === 'all') return true;
    return sol.category === activeFilter;
  });

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'solar-panels':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'inverters':
        return <Cpu className="w-5 h-5 text-blue-500" />;
      case 'hybrid-systems':
        return <RefreshCw className="w-5 h-5 text-emerald-500" />;
      case 'battery-storage':
        return <BatteryCharging className="w-5 h-5 text-emerald-600" />;
      case 'ats-switches':
        return <ToggleRight className="w-5 h-5 text-indigo-500" />;
      case 'surge-protection':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'electrical-protection':
        return <Zap className="w-5 h-5 text-blue-600" />;
      case 'cables-conduits':
        return <Cable className="w-5 h-5 text-slate-700" />;
      default:
        return <Sun className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section id="solutions" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Verified Brochure Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2D5C] tracking-tight mt-1">
              Complete Solar & Energy Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              From high-efficiency solar modules and smart hybrid inverters to LiFePO4 battery banks
              and code-compliant electrical protection.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (8)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('generation')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === 'generation'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Panels
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('inverter-storage')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === 'inverter-storage'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inverters & BESS
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('protection-safety')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === 'protection-safety'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Protection & ATS
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('accessories')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === 'accessories'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cabling & Conduits
            </button>
          </div>
        </div>

        {/* 8 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {filteredSolutions.map((solution) => (
            <div
              key={solution.id}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Product Image Header with Badges */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={solution.image}
                    alt={solution.imageAlt || solution.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Floating Badge */}
                  {solution.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-emerald-950 bg-emerald-300/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-xs">
                      {solution.badge}
                    </span>
                  )}

                  {/* Icon and Subtitle Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/20">
                      {getProductIcon(solution.id)}
                      <span className="line-clamp-1">{solution.subtitle}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B2D5C] transition-colors leading-snug">
                    {solution.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Micro specs list */}
                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {solution.features.slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/60">
                <button
                  type="button"
                  onClick={() => onSelectProduct(solution)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B2D5C] hover:text-emerald-700 transition-colors py-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(solution.title)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 rounded-lg transition-colors border border-emerald-200/60"
                >
                  <span>Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
