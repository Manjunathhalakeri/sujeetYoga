/**
 * ENQUIRY CONTRACT
 *
 * Deliberately separate from the form component so a backend can be added
 * later without touching any UI:
 *
 *   - `EnquiryPayload`  the shape that will be POSTed
 *   - `validateEnquiry` pure validation, reusable on the server unchanged
 *   - `EnquirySubmitter` the single seam the UI depends on
 *
 * The form imports the TYPE, not an implementation. To connect a backend,
 * write a submitter that POSTs and pass it in — no component changes:
 *
 *   const submit: EnquirySubmitter = async (payload) => {
 *     const res = await fetch('/api/enquiry', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(payload),
 *     });
 *     return res.ok ? { ok: true } : { ok: false, error: 'Please try again.' };
 *   };
 *
 * ⚠ NO BACKEND EXISTS YET. The default submitter below does not send anything.
 */

export interface EnquiryPayload {
  name: string;
  email: string;
  /** Phone or WhatsApp. Optional. */
  phone: string;
  /** Programme slug, or '' for a general enquiry. */
  programme: string;
  message: string;
  /**
   * Anti-spam honeypot. Hidden from real users; a non-empty value means a bot.
   * Carried in the payload so server-side checking needs no extra plumbing.
   */
  company?: string;
}

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

export type EnquiryResult = { ok: true } | { ok: false; error: string };

export type EnquirySubmitter = (payload: EnquiryPayload) => Promise<EnquiryResult>;

/**
 * Validation. Pure and dependency-free so the same function can run in the
 * browser for instant feedback and on the server for actual trust — client-side
 * validation is a convenience, never a security control.
 */
export function validateEnquiry(payload: EnquiryPayload): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};

  const name = payload.name.trim();
  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length > 100) errors.name = 'That name is too long.';

  const email = payload.email.trim();
  if (!email) {
    errors.email = 'We need an email address to reply to.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  // Optional, but if given it must look like a number.
  const phone = payload.phone.trim();
  if (phone && !/^[+()\d\s-]{7,20}$/.test(phone)) {
    errors.phone = 'Enter a valid phone or WhatsApp number, or leave this blank.';
  }

  const message = payload.message.trim();
  if (!message) errors.message = 'Please add a short message.';
  else if (message.length > 2000)
    errors.message = 'Please keep this under 2000 characters.';

  return errors;
}

export function hasErrors(errors: EnquiryFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

export const emptyEnquiry: EnquiryPayload = {
  name: '',
  email: '',
  phone: '',
  programme: '',
  message: '',
  company: '',
};

/**
 * The default submitter: it sends nothing and says so.
 *
 * This is intentional. Rendering a success message for a form that silently
 * discards the enquiry would be worse than an honest failure — someone would
 * believe they had made contact when they had not.
 *
 * TO PREVIEW THE SUCCESS STATE during design review, temporarily return
 * `{ ok: true }` from this function. Remember to revert.
 */
export const notConnectedSubmitter: EnquirySubmitter = async () => {
  return {
    ok: false,
    error:
      'This form is not connected yet, so nothing was sent. Please use the direct contact details above.',
  };
};
