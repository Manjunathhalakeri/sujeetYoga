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

export const siteConfig = {
  /** The brand is the person. TODO: confirm the correct spelling of the name
   *  (taken from the repository name) and whether a surname should be shown. */
  name: 'Sujit',
  /** Shown beside the wordmark in the header. TODO: confirm wording. */
  wordmarkSuffix: 'Yoga',
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

  social: {
    /** TODO: real profile URLs. Remove any the business does not use. */
    instagram: null as string | null,
    youtube: null as string | null,
    facebook: null as string | null,
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
