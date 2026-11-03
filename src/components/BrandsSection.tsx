import React, { useState } from 'react';
import { TRUSTED_BRANDS } from '../data/companyData';
import { BrandCategory } from '../types';
import { Info } from 'lucide-react';

export const BrandsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BrandCategory | 'All'>('All');

  const categories: (BrandCategory | 'All')[] = ['All', 'Panels', 'Inverters', 'Batteries', 'Protection & Switchgear'];

  const filteredBrands = TRUSTED_BRANDS.filter((brand) => {
    if (selectedCategory === 'All') return true;
    return brand.categories.includes(selectedCategory);
  });

  return (
    <section id="brands" className="py-16 lg:py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Global Equipment Manufacturers
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
            We Use Reliable & Trusted Brands
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 mt-2">
            More Trusted Brands & Quality Solutions Available
          </p>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            We source equipment from established solar panel manufacturers, inverter innovators, and global
            electrical switchgear brands.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBrands.map((brand, idx) => (
            <div
              key={idx}
              title={brand.name}
              className="flex flex-col overflow-hidden rounded-xl bg-slate-800/80 border border-slate-700 shadow-sm text-center hover:border-emerald-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-full h-24 flex items-center justify-center bg-white p-4">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-3">
                <div className="text-[10px] uppercase font-bold text-emerald-400 mb-1">
                  {brand.categories.join(' · ')}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  {brand.tagline}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand note compliant with SOURCE_OF_TRUTH.md */}
        <div className="mt-10 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 max-w-3xl mx-auto flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-200">Equipment & Warranty Notice: </span>
            <span>
              All equipment brand selections are tailored to specific project specifications, roof orientation,
              and utility distribution requirements. Manufacturer warranty cards are handed over at commissioning.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
