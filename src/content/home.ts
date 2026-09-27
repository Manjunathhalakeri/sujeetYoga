/**
 * HOMEPAGE COPY
 *
 * The homepage narrative, as data: Sujit → philosophy → practice → wellbeing →
 * programmes → community → connection. Every string here is editable without
 * touching a component.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ ALL COPY BELOW IS PLACEHOLDER, WRITTEN TO ESTABLISH TONE AND FIT.
 *
 * It deliberately makes NO factual claim. There are no certifications, no
 * years of experience, no student numbers, no lineage, no locations, no prices
 * and no outcomes — because none have been provided. Where a fact belongs, the
 * string says TODO rather than guessing at one.
 *
 * BRAND REFERENCE (supplied by the client, for direction only — NOT for
 * publication as fact):
 *   Instagram   @sujityoga_001
 *   Display     "Sujit yoga 18"
 *   Themes      Healing with yog (integration) · Yoga passionate ·
 *               Self believe · Naturopathy therapist
 *
 * These themes inform TONE ONLY. None of them is rendered on the site as a
 * qualification, title or claim, because none has been verified. In particular
 * "naturopathy therapist" is NOT shown as a credential, and no medical or
 * therapeutic benefit is stated anywhere on this page.
 *
 * TODO: confirm how the name should appear, and supply any titles the client
 * actually wishes to claim.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const home = {
  hero: {
    eyebrow: 'TODO: city, India',
    /** Split across lines deliberately — each entry is one rendered line. */
    headlineLines: ['Practice that', 'stays with you', 'off the mat.'],
    lead: 'Placeholder introduction. One or two sentences on what the practice is, who it is for, and what a person can expect to feel after it.',
    primaryCta: { label: 'Enquire about classes', href: '/contact' },
    secondaryCta: { label: 'Explore programmes', href: '/programs' },
    /** Small metadata rail under the hero. Facts go here once known. */
    rail: [
      { label: 'Practice', value: 'TODO: styles taught' },
      { label: 'Format', value: 'Group · Personal · Kids' },
      { label: 'Where', value: 'TODO: location' },
    ],
  },

  philosophy: {
    eyebrow: 'Philosophy',
    /** Set large, as a statement rather than a paragraph. */
    statement:
      'Yoga is not a performance. It is a slow conversation with the body, repeated often enough that it changes how you move through the rest of the day.',
    body: [
      'Placeholder paragraph. This is where the approach is described in the instructor’s own words — what is emphasised, what is not, and why.',
      'Placeholder paragraph. A second short passage on how a session is structured and what a beginner can expect on their first visit.',
    ],
  },

  /** The chakra strip section. Framing only — no therapeutic claim is made. */
  chakras: {
    eyebrow: 'The subtle body',
    heading: 'Seven centres, root to crown.',
    lead: 'Placeholder. One or two sentences on how the traditional map of the subtle body informs the practice — described as a lens, not as medicine.',
    note: 'Petal counts are the traditional ones. Colour follows the familiar modern mapping, drawn here in the palette rather than at full saturation.',
  },

  instructor: {
    eyebrow: 'Meet Sujit',
    heading: 'The practice is personal, so the teaching is too.',
    body: [
      'Placeholder biography. This is where Sujit’s own account of how the practice began belongs — in the first person, short, and specific.',
      'Placeholder paragraph. Teaching approach, who Sujit most often works with, and what he pays attention to in a room.',
    ],
    /** Rendered as a small ruled rail beside the portrait. */
    facts: [
      { label: 'Teaches', value: 'TODO: styles' },
      { label: 'Works with', value: 'TODO: who' },
      { label: 'Languages', value: 'TODO: languages' },
    ],
    /** Deliberately empty. Credentials will not be shown until verified. */
    credentials: [] as string[],
  },

  wellbeing: {
    eyebrow: 'Holistic wellbeing',
    heading: 'Movement is one part of it.',
    lead: 'Placeholder. A short statement on the wider view of wellbeing that sits behind the classes.',
    pillars: [
      {
        title: 'Breath',
        body: 'Placeholder — what breathwork means in this practice and why it comes first.',
      },
      {
        title: 'Strength',
        body: 'Placeholder — how strength is built slowly and what it protects against.',
      },
      {
        title: 'Stillness',
        body: 'Placeholder — the role of rest, and why the end of a session matters as much as the start.',
      },
      {
        title: 'Everyday life',
        body: 'Placeholder — how the practice is meant to show up away from the mat.',
      },
    ],
  },

  programs: {
    eyebrow: 'Programmes',
    heading: 'Ways to practise.',
    lead: 'Placeholder. One sentence framing the range below and how someone should choose between them.',
  },

  community: {
    eyebrow: 'Community',
    heading: 'In their words.',
    /** ⚠ NOT REAL REVIEWS. Structure only — see testimonials.ts. */
    note: 'Placeholder quotes. No real student feedback has been collected yet.',
  },

  feed: {
    eyebrow: 'Recent',
    heading: 'From the practice.',
    /** Real, client-supplied handle. The section still shows PLACEHOLDER
     *  imagery — how the feed itself is sourced (manual curation, a proper
     *  integration, or just a link out) is an open decision. */
    handle: '@sujityoga_001',
  },

  cta: {
    heading: 'Begin where you are.',
    lead: 'Placeholder. A closing line inviting a first conversation, with no pressure and no pricing implied.',
    primaryCta: { label: 'Send an enquiry', href: '/contact' },
    secondaryCta: { label: 'See the schedule', href: '/schedule' },
  },
} as const;
