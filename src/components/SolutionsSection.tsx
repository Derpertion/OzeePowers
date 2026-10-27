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
              Brochure Product Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mt-1">
              Complete Solar & Energy Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              From high-efficiency Tier-1 solar modules and smart hybrid inverters to LiFePO4 battery banks
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
              className="group flex flex-col justify-between rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 p-5"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:bg-emerald-50 transition-colors">
                    {getProductIcon(solution.id)}
                  </div>
                  {solution.badge && (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      {solution.badge}
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
                  {solution.subtitle}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-navy transition-colors leading-snug">
                  {solution.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {solution.description}
                </p>

                {/* Micro specs list */}
                <ul className="mt-4 space-y-1.5 border-t border-slate-200/70 pt-3">
                  {solution.features.slice(0, 2).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectProduct(solution)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:text-emerald-700 transition-colors py-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Specs</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(solution.title)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 rounded-lg transition-colors"
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
