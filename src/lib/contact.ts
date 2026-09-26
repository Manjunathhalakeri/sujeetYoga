import { siteConfig } from '@/content/siteConfig';

/**
 * CONTACT HELPERS
 *
 * One job: make it impossible to render a placeholder as though it were a real
 * contact detail. Every contact surface on the site asks these functions first,
 * so a fake phone number can never become a clickable `tel:` link and a fake
 * WhatsApp number can never become a `wa.me` deep link.
 *
 * The placeholders in siteConfig are deliberately recognisable:
 *   phone     +910000000000
 *   whatsapp  910000000000
 *   email     hello@example.com
 */

/** A phone/WhatsApp value that is still the placeholder. */
function isPlaceholderNumber(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  // All zeros after the country code, or too short to be a real number.
  return /^0+$/.test(digits.slice(2)) || digits.length < 8;
}

export const contactState = {
  get email(): string | null {
    const v = siteConfig.contact.email;
    return v.endsWith('@example.com') ? null : v;
  },
  get phone(): string | null {
    const v = siteConfig.contact.phone;
    return isPlaceholderNumber(v) ? null : v;
  },
  get whatsapp(): string | null {
    const v = siteConfig.contact.whatsapp;
    return isPlaceholderNumber(v) ? null : v;
  },
  get address(): string | null {
    return siteConfig.contact.address;
  },
  get instagram() {
    return siteConfig.social.instagram;
  },
};

/**
 * wa.me deep link, or null while the number is a placeholder.
 * `text` pre-fills the message — keep it short; long text is truncated by
 * WhatsApp on some clients.
 */
export function whatsappUrl(text?: string): string | null {
  const number = contactState.whatsapp;
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** `tel:` link, or null while the number is a placeholder. */
export function telUrl(): string | null {
  const number = contactState.phone;
  return number ? `tel:${number}` : null;
}

/** `mailto:` link, or null while the address is a placeholder. */
export function mailtoUrl(subject?: string): string | null {
  const email = contactState.email;
  if (!email) return null;
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}
