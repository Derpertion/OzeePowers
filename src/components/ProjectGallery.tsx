import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { SHOWCASE_IMAGES, ShowcaseImage } from '../data/companyData';

interface ProjectGalleryProps {
  onInquireSetup?: (setupTitle: string) => void;
}

type GalleryCategory = 'All' | 'Equipment' | 'Storage' | 'Installation' | 'Commercial';

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onInquireSetup }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeImage, setActiveImage] = useState<ShowcaseImage | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const skipFocusRestoreRef = useRef(false);

  // Move focus into the lightbox, contain Tab navigation, support Escape, and
  // restore focus to the card that opened it.
  useEffect(() => {
    if (!activeImage) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveImage(null);
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (current === first || current === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (skipFocusRestoreRef.current) {
        // The inquiry action moves focus to the contact form instead.
        skipFocusRestoreRef.current = false;
      } else {
        openerRef.current?.focus();
      }
      openerRef.current = null;
    };
  }, [activeImage]);

  const categories: GalleryCategory[] = ['All', 'Storage', 'Equipment', 'Installation', 'Commercial'];

  const filteredImages = SHOWCASE_IMAGES.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Camera className="w-4 h-4" />
              <span>Equipment & Installation Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2D5C] tracking-tight mt-1">
              Equipment & Site Gallery
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Photography of hybrid solar systems, high-density LiFePO4 battery storage racks, electrical
              switchgear, and rooftop installations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              onClick={() => setActiveImage(item)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActiveImage(item);
                }
              }}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-white bg-emerald-600/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Expand</span>
                  </span>
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative flex flex-col max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl text-white focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full h-full object-contain max-h-[65vh]"
              />

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveImage(null)}
                aria-label="Close image preview"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                {activeImage.category}
              </span>
            </div>

            {/* Modal Info Footer */}
            <div className="p-6 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
              <div className="space-y-1">
                <h3 id="gallery-lightbox-title" className="text-lg font-bold text-white">{activeImage.title}</h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {activeImage.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>OzeePower Project Equipment Reference</span>
                </div>
              </div>

              {onInquireSetup && (
                <button
                  type="button"
                  onClick={() => {
                    const title = activeImage.title;
                    skipFocusRestoreRef.current = true;
                    setActiveImage(null);
                    onInquireSetup(title);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Inquire About This Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
