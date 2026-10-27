import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative flex flex-col w-full max-w-5xl h-[92vh] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              OP
            </div>
            <div>
              <h2 id="brochure-modal-title" className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Official OzeePower Company Brochure
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Brochure Reference</span>
                <span aria-hidden="true">·</span>
                <span>Complete Solar & Energy Solutions</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-1 text-slate-700">
              <button
                type="button"
                onClick={handleZoomOut}
                aria-label="Zoom out"
                disabled={zoomLevel <= 0.75}
                className="p-1.5 hover:bg-slate-100 rounded disabled:opacity-40 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono font-medium min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                aria-label="Zoom in"
                disabled={zoomLevel >= 2.5}
                className="p-1.5 hover:bg-slate-100 rounded disabled:opacity-40 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                aria-label="Reset zoom"
                className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-500 hover:text-slate-900"
                title="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <a
              href={COMPANY_INFO.brochureAssetPath}
              download="OzeePower-Official-Brochure.jpg"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={COMPANY_INFO.brochureAssetPath}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close brochure modal"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Viewer */}
        <div className="relative flex-1 overflow-auto bg-slate-900/95 p-4 sm:p-8 flex items-center justify-center">
          <div
            className="transition-transform duration-200 origin-center max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={COMPANY_INFO.brochureAssetPath}
              alt="OzeePower Official Brochure detailing solar panels, inverters, hybrid systems, LiFePO4 battery, ATS, electrical protection and contacts"
              className="max-h-[75vh] w-auto object-contain rounded-md shadow-2xl mx-auto ring-1 ring-white/10"
              loading="eager"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Official company material &copy; 2026 {COMPANY_INFO.name}. Office: GM Commercial Bldg, Cabanatuan City.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Inquiries: info@ozeepower.com.ph</span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
            >
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
