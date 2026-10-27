/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SolutionsSection } from './components/SolutionsSection';
import { ProcessSection } from './components/ProcessSection';
import { SectorsSection } from './components/SectorsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BrandsSection } from './components/BrandsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BrochureModal } from './components/BrochureModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductSolution, ProjectType } from './types';

export default function App() {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<ProductSolution | null>(null);
  const [inquiryProjectType, setInquiryProjectType] = useState<ProjectType>('residential');
  const [inquiryProduct, setInquiryProduct] = useState<string>('');
  const [inquiryBill, setInquiryBill] = useState<string>('');

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBrochure = () => {
    setIsBrochureModalOpen(true);
  };

  const handleCloseBrochure = () => {
    setIsBrochureModalOpen(false);
  };

  const handleSelectProduct = (product: ProductSolution) => {
    setActiveProductModal(product);
  };

  const handleSelectForQuote = (productTitle: string) => {
    setInquiryProduct(productTitle);
    scrollToContact();
  };

  const handleOpenConsultation = (productName?: string) => {
    if (productName) {
      setInquiryProduct(productName);
    }
    scrollToContact();
  };

  const handleApplyEstimate = (
    projectType: ProjectType,
    billAmount: number,
    recommendedKw: number
  ) => {
    setInquiryProjectType(projectType);
    setInquiryBill(billAmount.toString());
    setInquiryProduct(`Estimated ${recommendedKw} kWp Solar System`);
    scrollToContact();
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-brand-surface text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <Header
        onOpenBrochure={handleOpenBrochure}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Page Flow */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero onOpenBrochure={handleOpenBrochure} />

        {/* Complete Solar & Energy Solutions (8 Product Categories) */}
        <SolutionsSection
          onSelectProduct={handleSelectProduct}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 6-Stage Engineering Process */}
        <ProcessSection />

        {/* Customer Sectors (Homes, Businesses, Industries + Interactive Estimator) */}
        <SectorsSection onApplyEstimate={handleApplyEstimate} />

        {/* 6 Reasons Why Choose OzeePower */}
        <WhyChooseUs />

        {/* Reliable & Trusted Equipment Brands */}
        <BrandsSection />

        {/* Direct Contacts, Location, and Validated Inquiry Form */}
        <ContactSection
          initialProjectType={inquiryProjectType}
          initialProduct={inquiryProduct}
          initialEstimatedBill={inquiryBill}
        />
      </main>

      {/* Footer */}
      <Footer onOpenBrochure={handleOpenBrochure} />

      {/* Modals */}
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={handleCloseBrochure}
      />

      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onSelectForQuote={handleSelectForQuote}
      />
    </div>
  );
}
