import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_INFO, CONTACT_PERSONS } from '../data/companyData';
import { submitInquiry } from '../lib/api';
import { InquiryFormData, ProjectType } from '../types';

interface ContactSectionProps {
  initialProjectType?: ProjectType;
  initialProduct?: string;
  initialEstimatedBill?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProjectType = 'residential',
  initialProduct = '',
  initialEstimatedBill = '',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: initialProjectType,
    location: 'Cabanatuan City, Nueva Ecija',
    preferredProduct: initialProduct,
    estimatedBill: initialEstimatedBill,
    message: '',
    consentToContact: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [emailNotificationSent, setEmailNotificationSent] = useState<boolean>(true);
  const [referenceId, setReferenceId] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        preferredProduct: initialProduct,
        message: prev.message || `I would like to request an estimate and consultation for ${initialProduct}.`,
      }));
    }
  }, [initialProduct]);

  useEffect(() => {
    if (initialEstimatedBill) {
      setFormData((prev) => ({
        ...prev,
        estimatedBill: initialEstimatedBill,
        message:
          prev.message ||
          `Our average monthly electricity bill is approx. ₱${Number(
            initialEstimatedBill
          ).toLocaleString()}. We are interested in solar sizing and quotations.`,
      }));
    }
  }, [initialEstimatedBill]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Please provide a valid name (minimum 2 characters).';
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.contact = 'Please provide at least an email address or mobile phone number.';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please provide a valid email address.';
      }
    }

    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 10) {
        errors.phone = 'Please provide a valid 11-digit Philippine mobile number (e.g. 0917-XXX-XXXX).';
      }
    }

    if (!formData.message.trim()) {
      errors.message = 'Please write a brief message or describe your energy inquiry.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Please provide at least a few details about your inquiry.';
    }

    if (!formData.consentToContact) {
      errors.consent = 'Your consent is required to allow our technical team to contact you.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await submitInquiry(formData, honeypotRef.current?.value ?? '');
      setReferenceId(result.id);
      setEmailNotificationSent(result.notificationSent);
      setSubmissionSuccess(true);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'The inquiry could not be sent. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    const summary = `OzeePower Consultation Inquiry (Ref: ${referenceId})
Name: ${formData.name}
Phone: ${formData.phone || 'N/A'}
Email: ${formData.email || 'N/A'}
Sector: ${formData.projectType.toUpperCase()}
Location: ${formData.location || 'N/A'}
Preferred Solution: ${formData.preferredProduct || 'General Solar Inquiry'}
Message: ${formData.message}`;

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const mailtoHref = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `[Inquiry ${referenceId || 'New'}] Solar Consultation - ${formData.name}`
  )}&body=${encodeURIComponent(
    `Hello OzeePower Technical Team,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nSector: ${formData.projectType}\nLocation: ${formData.location}\nSolution: ${formData.preferredProduct || 'General'}\n\nDetails:\n${formData.message}\n\nThank you!`
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Direct Contact & Consultation
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mt-1">
            Let's Build Your Solar Energy Solution.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Reach out directly to our technical coordinators, visit our Cabanatuan City office,
            or submit an inquiry for a free site assessment and engineering proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Brochure Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Phone Lines Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-brand-navy mb-4">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Brochure Contact Numbers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONTACT_PERSONS.map((person, idx) => (
                  <a
                    key={idx}
                    href={person.telUri}
                    className="group p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                        {person.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">{person.network}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-700 mt-1 group-hover:text-emerald-700">
                      {person.phone}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{person.role}</div>
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Click any contact above on mobile to place a direct phone call.
              </div>
            </div>

            {/* Email & Office Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Official Email
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-semibold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <div className="text-xs text-slate-500">Prompt responses for quotations and RFPs</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Visit Our Office
                  </div>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">
                    {COMPANY_INFO.address.line1}
                  </p>
                  <p className="text-xs text-slate-700">
                    {COMPANY_INFO.address.line2}
                  </p>
                  <p className="text-xs font-medium text-emerald-700">
                    {COMPANY_INFO.address.city} ({COMPANY_INFO.address.landmark})
                  </p>

                  <a
                    href={COMPANY_INFO.address.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors mt-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Office Hours
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5">{COMPANY_INFO.officeHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quotation & Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              {submissionSuccess ? (
                /* Success Feedback State */
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">Your Inquiry Has Been Received</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your inquiry
                    has been recorded and an OzeePower technical coordinator will contact you using the
                    details you provided.
                  </p>

                  {!emailNotificationSent && (
                    <div
                      role="status"
                      className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 max-w-md mx-auto flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>
                        Your inquiry is saved with reference{' '}
                        <strong className="font-mono">{referenceId}</strong>, but the email copy to our
                        team could not be delivered. To be sure we receive it, please call{' '}
                        <a
                          href={CONTACT_PERSONS[0].telUri}
                          className="font-semibold underline underline-offset-2"
                        >
                          {CONTACT_PERSONS[0].phone}
                        </a>{' '}
                        or email{' '}
                        <a
                          href={`mailto:${COMPANY_INFO.email}`}
                          className="font-semibold underline underline-offset-2"
                        >
                          {COMPANY_INFO.email}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reference Code:</span>
                      <span className="font-bold text-emerald-700">{referenceId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sector:</span>
                      <span className="text-slate-900 uppercase">{formData.projectType}</span>
                    </div>
                    {formData.preferredProduct && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Solution:</span>
                        <span className="text-slate-900">{formData.preferredProduct}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Inquiry Summary'}</span>
                    </button>

                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionSuccess(false);
                        setSubmissionError('');
                        setFormData((prev) => ({ ...prev, message: '' }));
                      }}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form complying with API_ROUTES.md contract */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Hidden spam trap: not shown, not focusable, not announced. */}
                  <div
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
                  >
                    <label htmlFor="inquiry-company">Company</label>
                    <input
                      ref={honeypotRef}
                      id="inquiry-company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
                      Request Free Consultation & Quotation
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out the form below. We will analyze your site and calculate your potential solar energy savings.
                    </p>
                  </div>

                  {formErrors.contact && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formErrors.contact}</span>
                    </div>
                  )}

                  {submissionError && (
                    <div
                      role="alert"
                      className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p>{submissionError}</p>
                        <p>
                          You can also call{' '}
                          <a
                            href={CONTACT_PERSONS[0].telUri}
                            className="font-semibold underline underline-offset-2"
                          >
                            {CONTACT_PERSONS[0].phone}
                          </a>{' '}
                          or email{' '}
                          <a
                            href={`mailto:${COMPANY_INFO.email}`}
                            className="font-semibold underline underline-offset-2"
                          >
                            {COMPANY_INFO.email}
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        placeholder="Juan Dela Cruz"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 ${
                          formErrors.name
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Mobile Phone */}
                    <div>
                      <label htmlFor="inquiry-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Mobile Phone Number
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        placeholder="0917-XXX-XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 ${
                          formErrors.phone
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="inquiry-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        placeholder="juan@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 ${
                          formErrors.email
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Project Sector */}
                    <div>
                      <label htmlFor="inquiry-projectType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Project Sector <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="inquiry-projectType"
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value as ProjectType })
                        }
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="residential">Residential Home</option>
                        <option value="commercial">Commercial Business</option>
                        <option value="industrial">Industrial Plant / Factory</option>
                        <option value="other">Other / Solar Farm / Agricultural</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Location / Municipality */}
                    <div>
                      <label htmlFor="inquiry-location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Site Location / Municipality
                      </label>
                      <input
                        id="inquiry-location"
                        type="text"
                        placeholder="Cabanatuan City, Nueva Ecija"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Preferred Solution / Equipment */}
                    <div>
                      <label htmlFor="inquiry-solution" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Equipment / Solution of Interest
                      </label>
                      <input
                        id="inquiry-solution"
                        type="text"
                        placeholder="e.g. Hybrid Solar, LiFePO4 Battery, ATS"
                        value={formData.preferredProduct || ''}
                        onChange={(e) => setFormData({ ...formData, preferredProduct: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Details & Monthly Electric Bill <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={3}
                      required
                      placeholder="Please mention your average monthly electric bill or specific energy needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 ${
                        formErrors.message
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentToContact}
                        onChange={(e) =>
                          setFormData({ ...formData, consentToContact: e.target.checked })
                        }
                        className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                      />
                      <span className="text-xs text-slate-600 leading-snug">
                        I agree to be contacted by an OzeePower engineer or technical coordinator regarding
                        this solar power quotation and site assessment inquiry. The details I submit will be
                        used only to respond to this inquiry.
                      </span>
                    </label>
                    {formErrors.consent && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.consent}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Used only to respond to your inquiry</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-sm transition-all"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Consultation Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
