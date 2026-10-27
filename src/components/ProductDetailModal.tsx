import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { ProductSolution } from '../types';

interface ProductDetailModalProps {
  product: ProductSolution | null;
  onClose: () => void;
  onSelectForQuote: (productTitle: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectForQuote,
}) => {
  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Tag className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">{product.subtitle}</span>
            </div>
            <h2 id="product-modal-title" className="text-xl font-bold text-slate-900 mt-0.5">
              {product.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Badge & Description */}
          <div>
            {product.badge && (
              <span className="inline-block px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-md mb-3">
                {product.badge}
              </span>
            )}
            <p className="text-slate-700 leading-relaxed text-base">{product.description}</p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Engineering Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-800 font-medium leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Technical Specifications & Compliance
            </h3>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <tbody>
                  {product.specs.map((spec, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50 border-t border-slate-100'}
                    >
                      <th scope="row" className="px-4 py-2.5 font-semibold text-slate-600 w-1/3">
                        {spec.label}
                      </th>
                      <td className="px-4 py-2.5 font-medium text-slate-900 font-mono">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Brands */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tested & Trusted Manufacturer Brands
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.recommendedBrands.map((brand, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold text-slate-800 bg-slate-100 rounded-md border border-slate-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Includes Philippine Electrical Code compliance</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectForQuote(product.title);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors"
          >
            <span>Request Quote for {product.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
