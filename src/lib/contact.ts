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
 *   email     hello@example.com
 *
 * WhatsApp is now a real, client-supplied number, so `whatsappUrl()` returns a
 * live link. The guard around it is kept rather than deleted: if the number is
 * ever cleared or reverted to a placeholder, every CTA on the site falls back
 * to the enquiry form instead of silently shipping a dead `wa.me` link.
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
  /** The reader-facing spelling, or null while the number is a placeholder. */
  get whatsappDisplay(): string | null {
    return contactState.whatsapp ? siteConfig.contact.whatsappDisplay : null;
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

/** The standard enquiry deep link, with the site's one agreed opening message. */
export function enquiryWhatsappUrl(): string | null {
  return whatsappUrl(siteConfig.cta.whatsappMessage);
}

/**
 * THE PRIMARY CALL TO ACTION — resolved in one place, used by every surface.
 *
 * Every primary button on the site asks this function where it goes and what it
 * says, so "what is the main thing we want a visitor to do" is a single
 * decision in the data rather than eight independent decisions in eight files.
 *
 * It degrades rather than breaks: with no WhatsApp number the same button
 * points at the enquiry form. No surface has to handle a null.
 */
export interface PrimaryAction {
  href: string;
  label: string;
  /** Short label, for the header. */
  shortLabel: string;
  /** Lets a caller show the WhatsApp icon only when it is actually WhatsApp. */
  isWhatsapp: boolean;
}

export function primaryAction(): PrimaryAction {
  const wa = enquiryWhatsappUrl();
  if (wa) {
    return {
      href: wa,
      label: siteConfig.cta.whatsappLabel,
      shortLabel: siteConfig.cta.whatsappLabelShort,
      isWhatsapp: true,
    };
  }
  return {
    href: siteConfig.cta.primaryHref,
    label: siteConfig.cta.primaryLabel,
    shortLabel: siteConfig.cta.primaryLabel,
    isWhatsapp: false,
  };
}
