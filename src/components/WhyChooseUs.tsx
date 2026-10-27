import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Headphones,
  Sliders,
  Leaf,
  CheckCircle2,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/companyData';

export const WhyChooseUs: React.FC = () => {
  const getReasonIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Award className="w-6 h-6 text-emerald-600" />;
      case 1:
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 2:
        return <Users className="w-6 h-6 text-amber-600" />;
      case 3:
        return <Headphones className="w-6 h-6 text-emerald-700" />;
      case 4:
        return <Sliders className="w-6 h-6 text-indigo-600" />;
      case 5:
        return <Leaf className="w-6 h-6 text-emerald-600" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            The OzeePower Advantage
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mt-1">
            Why Choose OzeePower?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A relentless commitment to engineering precision, authentic Tier-1 equipment,
            and dependable after-sales warranty support across Central Luzon.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs mb-4">
                  {getReasonIcon(idx)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-xs font-semibold text-emerald-700 mb-3">"{item.description}"</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Brochure value proposition</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
