/**
 * SITE CONFIG — the business's single source of truth.
 *
 * Everything in this file is intended to be edited by a non-developer. No UI
 * component contains a business fact; they all read from here.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ EVERY VALUE MARKED `TODO` IS A PLACEHOLDER AND IS NOT REAL.
 *
 * No certifications, qualifications, testimonials, reviews, student counts,
 * awards, prices, addresses or phone numbers have been invented. Where a real
 * value is unknown, the field holds an obvious placeholder and `isPlaceholder`
 * is true, which makes the UI render a visible "Placeholder" badge. Replace the
 * values, then flip the flags to false.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface SocialProfile {
  /** Platform name, e.g. "Instagram". */
  label: string;
  /** Shown to the reader, e.g. "@sujityoga_001". */
  handle: string;
  url: string;
}

export const siteConfig = {
  /**
   * THE BRAND NAME. Use this wherever the site names itself — titles, metadata,
   * copyright, aria-labels, structured data.
   *
   * ⚠ The Instagram handle is NOT the brand and must never stand in for it.
   *     Brand      → "Sujit Yoga"
   *     Instagram  → "@sujityoga_001"
   */
  name: 'Sujit Yoga',

  /**
   * THE PERSON. Used only in running prose where the human is meant, e.g.
   * "Read more about Sujit". Never used as the site's name.
   * TODO: confirm whether a full name, surname or honorific should be shown.
   * None is assumed here.
   */
  personName: 'Sujit',

  /**
   * The wordmark is set in two tones in the header and footer, so the two
   * halves are declared explicitly rather than derived by splitting `name` —
   * splitting on a space would break the moment the name gains a third word.
   * lead + trail must always read as `name`.
   */
  wordmark: { lead: 'Sujit', trail: 'Yoga' },
  /** TODO: 2–5 words. Appears after the name in the browser tab. */
  shortDescription: 'Yoga & wellbeing',
  /** TODO: one sentence, used as the default meta description. */
  description:
    'Placeholder description. Replace with one clear sentence describing the practice, who it is for, and where it is.',

  /** TODO: production domain, no trailing slash. Required for canonical URLs and OG images. */
  url: 'https://example.com',

  /** TODO: city / area, used in page titles and local SEO. */
  locality: 'City',
  region: 'State',
  country: 'IN',

  contact: {
    /** TODO: real enquiry inbox. */
    email: 'hello@example.com',
    /** TODO: real number in E.164 format, e.g. +919876543210. */
    phone: '+910000000000',
    /** TODO: WhatsApp number in E.164 without the +, for wa.me links. */
    whatsapp: '910000000000',
    /** TODO: full street address, or leave null if the studio is not public. */
    address: null as string | null,
  },

  /**
   * Social profiles. `handle` is shown to the reader, `url` is where it points.
   * The handle is presented as a handle — never as the brand name.
   * Set an entry to null for a platform the client does not use.
   */
  social: {
    /** Client-supplied and externally verifiable. */
    instagram: {
      label: 'Instagram',
      handle: '@sujityoga_001',
      url: 'https://instagram.com/sujityoga_001',
    } as SocialProfile | null,
    youtube: null as SocialProfile | null,
    facebook: null as SocialProfile | null,
  },

  /** Default CTA wording, so campaign copy can be changed without touching components. */
  /** Shown in the footer. TODO: confirm or remove. */
  footerNote: 'Placeholder. A short closing line about the practice belongs here.',

  cta: {
    primaryLabel: 'Enquire about classes',
    primaryHref: '/contact',
    secondaryLabel: 'Explore programmes',
    secondaryHref: '/programs',
  },

  /**
   * Master switch. While true, placeholder content renders with a visible
   * badge so nothing unverified can be mistaken for a real business claim.
   * Set to false only once every TODO above has been replaced.
   */
  isPlaceholder: true,
} as const;

export type SiteConfig = typeof siteConfig;

/** Primary navigation. Order here is the order in the header and footer. */
export const navigation = [
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '/programs' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Contact', href: '/contact' },
] as const;
