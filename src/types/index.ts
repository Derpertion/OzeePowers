export type ProjectType = 'residential' | 'commercial' | 'industrial' | 'other';

export interface ProductSolution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'generation' | 'inverter-storage' | 'protection-safety' | 'accessories';
  badge?: string;
  features: string[];
  specs: { label: string; value: string }[];
  recommendedBrands: string[];
  image: string;
  imageAlt: string;
}

export interface ProcessStage {
  step: number;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  keyTools: string[];
  duration: string;
  image?: string;
}

export interface CustomerSector {
  id: ProjectType;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  typicalCapacity: string;
  idealFor: string;
  image: string;
}

export interface TrustedBrand {
  name: string;
  category: 'Panels' | 'Inverters' | 'Batteries' | 'Protection & Switchgear';
  origin: string;
  tagline: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
  telUri: string;
  role: string;
  network: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectType;
  location: string;
  preferredProduct?: string;
  estimatedBill?: string;
  message: string;
  consentToContact: boolean;
}
