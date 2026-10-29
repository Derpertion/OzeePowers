import React, { useState } from 'react';
import { Home, Building2, Factory, Calculator, ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';
import { CUSTOMER_SECTORS } from '../data/companyData';
import { ProjectType } from '../types';

interface SectorsSectionProps {
  onApplyEstimate: (projectType: ProjectType, billAmount: number, recommendedKw: number) => void;
}

export const SectorsSection: React.FC<SectorsSectionProps> = ({ onApplyEstimate }) => {
  const [activeTab, setActiveTab] = useState<ProjectType>('residential');
  const [monthlyBill, setMonthlyBill] = useState<number>(8000);

  const selectSector = (sectorId: ProjectType) => {
    setActiveTab(sectorId);
    if (sectorId === 'residential') setMonthlyBill(8000);
    if (sectorId === 'commercial') setMonthlyBill(35000);
    if (sectorId === 'industrial') setMonthlyBill(150000);
  };

  // Approximate solar sizing logic based on Philippine Meralco / NEECO electric tariff rates (~₱12.5 per kWh)
  // 1 kWp in the Philippines produces ~110-125 kWh/month
  const kwhConsumed = Math.round(monthlyBill / 12.5);
  let recommendedKw = Number((kwhConsumed / 115).toFixed(1));
  if (recommendedKw < 2.5) recommendedKw = 2.5;
  if (activeTab === 'commercial' && recommendedKw < 10) recommendedKw = 15;
  if (activeTab === 'industrial' && recommendedKw < 50) recommendedKw = 60;

  const estimatedPanels = Math.ceil((recommendedKw * 1000) / 550);
  const estimatedRoofArea = Math.round(estimatedPanels * 2.6); // ~2.6 sqm per 550W panel with spacing
  const estimatedMonthlySavings = Math.round(monthlyBill * 0.75); // ~75% daytime self-consumption/net-metering
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;

  const getSectorIcon = (id: ProjectType) => {
    switch (id) {
      case 'residential':
        return <Home className="w-5 h-5" />;
      case 'commercial':
        return <Building2 className="w-5 h-5" />;
      case 'industrial':
        return <Factory className="w-5 h-5" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  return (
    <section id="sectors" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Tailored Energy Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2D5C] tracking-tight mt-1">
            Powering Homes, Businesses, Industries.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Engineered solar installations matching the unique load curves, roof structures, and financial goals
            of residential properties, commercial enterprises, and industrial plants.
          </p>
        </div>

        {/* 3 Core Sector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CUSTOMER_SECTORS.map((sector) => {
            const isSelected = activeTab === sector.id;
            return (
              <div
                key={sector.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Select ${sector.title}`}
                onClick={() => selectSector(sector.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectSector(sector.id);
                  }
                }}
                className={`group flex flex-col justify-between rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                  isSelected
                    ? 'bg-white border-emerald-500 shadow-lg ring-2 ring-emerald-500/80'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Real Sector Installation Image */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
                    
                    {/* Floating Sector Icon & Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-md transition-colors shadow-xs ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900/80 text-white border border-white/20'
                        }`}
                      >
                        {getSectorIcon(sector.id)}
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-mono font-bold text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                        {sector.typicalCapacity}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        {sector.id.toUpperCase()} APPLICATION
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {sector.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-semibold text-emerald-700 mb-2">{sector.tagline}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{sector.description}</p>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Primary Brochure Benefits
                      </div>
                      {sector.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="font-medium">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Ideal for: </span>
                        {sector.idealFor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Solar Sizing & Savings Estimator */}
        <div className="relative rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm overflow-hidden">
          {/* Subtle Solar Panel Grid Backdrop Watermark */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-[0.06] overflow-hidden hidden md:block z-0" aria-hidden="true">
            <img
              src="/assets/aistudio/Solar_panels4.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B2D5C]">
                  Quick Solar Sizing & Savings Estimator
                </h3>
                <p className="text-xs text-slate-500">
                  Select your sector and monthly electric bill to estimate system capacity and roof requirements.
                </p>
              </div>
            </div>

            {/* Sector switcher inside estimator */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('residential');
                  setMonthlyBill(8000);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'residential' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('commercial');
                  setMonthlyBill(35000);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'commercial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Commercial
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('industrial');
                  setMonthlyBill(150000);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'industrial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Industrial
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
            {/* Input Range Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="bill-range" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Average Monthly Electricity Bill
                  </label>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0B2D5C] font-mono tabular-nums">
                    ₱{monthlyBill.toLocaleString()}
                  </span>
                </div>

                <input
                  id="bill-range"
                  type="range"
                  min={activeTab === 'residential' ? 3000 : activeTab === 'commercial' ? 15000 : 50000}
                  max={activeTab === 'residential' ? 40000 : activeTab === 'commercial' ? 150000 : 500000}
                  step={activeTab === 'residential' ? 500 : activeTab === 'commercial' ? 2500 : 10000}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
                />

                <div className="flex justify-between text-[11px] text-slate-600 mt-2 font-mono">
                  <span>
                    ₱{activeTab === 'residential' ? '3,000' : activeTab === 'commercial' ? '15,000' : '50,000'}
                  </span>
                  <span>
                    ₱{activeTab === 'residential' ? '40,000+' : activeTab === 'commercial' ? '150,000+' : '500,000+'}
                  </span>
                </div>
              </div>

              {/* Bill preset quick buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  Quick Bill Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(activeTab === 'residential'
                    ? [5000, 8000, 15000, 25000]
                    : activeTab === 'commercial'
                    ? [20000, 35000, 60000, 100000]
                    : [80000, 150000, 250000, 400000]
                  ).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMonthlyBill(val)}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded-md border transition-colors ${
                        monthlyBill === val
                          ? 'bg-[#0B2D5C] text-white border-[#0B2D5C]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ₱{val.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                <span className="font-semibold text-slate-700">Note: </span>
                Calculations assume average Philippine solar insolation (4.5 peak sun-hours/day). Exact solar harvest
                depends on roof orientation, tilt angle, shading, and local utility net-metering interconnection.
              </div>
            </div>

            {/* Output Calculation Cards */}
            <div className="lg:col-span-6 bg-slate-50 p-6 rounded-xl border border-slate-200/80 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-600">Recommended Size</div>
                  <div className="text-xl font-extrabold text-[#0B2D5C] font-mono tabular-nums mt-0.5">
                    {recommendedKw} kWp
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-600">Approx. Panels</div>
                  <div className="text-xl font-extrabold text-slate-800 font-mono tabular-nums mt-0.5">
                    ~{estimatedPanels} pcs
                  </div>
                  <div className="text-[10px] text-slate-600">550W+ modules</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-semibold text-slate-600">Roof Area Required</div>
                  <div className="text-xl font-extrabold text-slate-800 font-mono tabular-nums mt-0.5">
                    ~{estimatedRoofArea} m²
                  </div>
                  <div className="text-[10px] text-slate-600">Unshaded roof</div>
                </div>
              </div>

              {/* Estimated Savings Banner */}
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    <TrendingDown className="w-4 h-4" />
                    <span>Illustrative Savings Estimate</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-900 font-mono tabular-nums mt-0.5">
                    ~₱{estimatedMonthlySavings.toLocaleString()} <span className="text-xs font-normal text-emerald-700">/ mo</span>
                  </div>
                  <div className="text-xs text-emerald-700">
                    ~₱{estimatedAnnualSavings.toLocaleString()} illustrative savings per year
                  </div>
                  <div className="text-[10px] text-emerald-700/80 pt-1">
                    Illustrative only. Actual savings depend on usage, tariff, and net-metering approval.
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={() => onApplyEstimate(activeTab, monthlyBill, recommendedKw)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors shrink-0"
                >
                  <span>Apply to Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
