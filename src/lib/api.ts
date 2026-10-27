import type { InquiryFormData } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

interface InquiryApiResponse {
  id: string;
  message: string;
  notificationSent: boolean;
}

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
  };
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function submitInquiry(
  payload: InquiryFormData,
  honeypot = ''
): Promise<InquiryApiResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/v1/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim() || null,
        phone: payload.phone.trim() || null,
        projectType: payload.projectType,
        location: payload.location.trim() || null,
        preferredProduct: payload.preferredProduct?.trim() || null,
        estimatedBill: payload.estimatedBill || null,
        message: payload.message.trim(),
        consentToContact: payload.consentToContact,
        // Hidden spam trap; real visitors leave this empty.
        company: honeypot,
      }),
    });
  } catch {
    throw new ApiError(
      'We could not reach the inquiry service. Please check your connection or call us directly.',
      0
    );
  }

  const data = (await response.json().catch(() => null)) as (InquiryApiResponse & ApiErrorBody) | null;

  if (!response.ok) {
    throw new ApiError(
      data?.error?.message ?? `The inquiry could not be sent (HTTP ${response.status}).`,
      response.status
    );
  }

  if (!data?.id) {
    throw new ApiError('The inquiry service returned an incomplete response.', response.status);
  }

  return {
    id: data.id,
    message: data.message ?? 'Your inquiry has been received.',
    // Treat a missing flag as "not emailed" so the UI never over-promises.
    notificationSent: data.notificationSent === true,
  };
}
