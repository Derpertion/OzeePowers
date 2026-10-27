import React from 'react';
import { FileText, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO, CONTACT_PERSONS } from '../data/companyData';

interface FooterProps {
  onOpenBrochure: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrochure }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Motto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white shadow-xs">
                <svg viewBox="0 0 36 36" className="w-5 h-5" fill="none">
                  <circle cx="18" cy="18" r="6" fill="#F59E0B" />
                  <path
                    d="M17 19C17 13 24 12 24 12C24 12 25 19 19 21C18 21.3 17 20 17 19Z"
                    fill="#22C55E"
                  />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Ozee<span className="text-emerald-400">Power</span>
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              {COMPANY_INFO.subTagline}
            </p>

            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
              {COMPANY_INFO.motto}
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Official Brochure Details</span>
              </button>
            </div>
          </div>

          {/* Col 2: Solutions Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Solar Panels
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Hybrid Inverters
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  LiFePO4 Batteries
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Automatic Transfer Switch
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Surge Protection (SPD)
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Electrical Switchgear
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors & Process */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                  Residential Homes
                </a>
              </li>
              <li>
                <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                  Commercial Business
                </a>
              </li>
              <li>
                <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                  Industrial Facilities
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-emerald-400 transition-colors">
                  6-Stage Process
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-emerald-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-emerald-400 transition-colors">
                  Equipment Brands
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Recap */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Cabanatuan City Office
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.line2},{' '}
                  {COMPANY_INFO.address.city} ({COMPANY_INFO.address.landmark})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {CONTACT_PERSONS.map((p, i) => (
                    <a
                      key={i}
                      href={p.telUri}
                      className="hover:text-white transition-colors"
                      title={p.role}
                    >
                      {p.name}: <span className="font-mono">{p.phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-2xl text-center md:text-left">
            Disclaimer: Savings calculations and sizing models are indicative estimates based on Philippine peak sun hours.
            All project bids are subject to formal on-site structural and electrical inspection complying with the Philippine Electrical Code (PEC).
          </p>

          <p className="whitespace-nowrap font-medium text-slate-300">
            &copy; 2026 {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
