import React, { useState } from 'react';
import { Menu, X, FileText, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeaderProps {
  onOpenBrochure: () => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBrochure, onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-emerald-600 rounded-md py-1"
          >
            <div className="relative w-9 h-9 rounded-lg bg-brand-navy flex items-center justify-center text-white shadow-xs overflow-hidden">
              {/* Custom clean SVG logo resembling brochure sun & leaf mark */}
              <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="6" fill="#F59E0B" />
                <path
                  d="M18 4V8M18 28V32M4 18H8M28 18H32M8.1 8.1L10.9 10.9M25.1 25.1L27.9 27.9M8.1 27.9L10.9 25.1M25.1 10.9L27.9 8.1"
                  stroke="#FBBF24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M17 19C17 13 24 12 24 12C24 12 25 19 19 21C18 21.3 17 20 17 19Z"
                  fill="#22C55E"
                />
              </svg>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold tracking-tight text-brand-navy">
                Ozee<span className="text-emerald-600">Power</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (single line, clean text with hover underline) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a
              href="#solutions"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Solutions
            </a>
            <a
              href="#process"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Process
            </a>
            <a
              href="#sectors"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Sectors
            </a>
            <a
              href="#why-us"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Why OzeePower
            </a>
            <a
              href="#brands"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Brands
            </a>
            <a
              href="#contact"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action & Brochure preview button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBrochure}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Inspect original company brochure"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Brochure</span>
            </button>

            <a
              href="#contact"
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Get Free Quote</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <a
              href="#solutions"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Complete Solutions
            </a>
            <a
              href="#process"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Project Process
            </a>
            <a
              href="#sectors"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Homes, Businesses, Industries
            </a>
            <a
              href="#why-us"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Why Choose OzeePower
            </a>
            <a
              href="#brands"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Trusted Equipment Brands
            </a>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Contact & Location
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                onOpenBrochure();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              View Official Brochure
            </button>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              <PhoneCall className="w-4 h-4" />
              Get Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
