import type { ImageKey } from './assets';

/**
 * PROGRAMMES — the business's offering, as data.
 *
 * Adding a programme means adding an object here. In a later phase this same
 * array will generate the /programs/[slug] detail pages, so `slug` must stay
 * stable once a page has been shared or indexed.
 *
 * ⚠ ALL CONTENT BELOW IS PLACEHOLDER.
 * No prices, durations, class sizes, levels or outcomes have been verified.
 * The shapes are real; the values are not. Replace them, then set
 * `isPlaceholder: false` on each entry.
 */

export interface Program {
  slug: string;
  /** Two-digit index shown in the editorial list. Purely visual. */
  index: string;
  title: string;
  /** One line. Shown in the homepage list — keep it under ~90 characters. */
  summary: string;
  /** Short metadata shown as badges. Leave an array empty to show none. */
  meta: string[];
  image: ImageKey;
  isPlaceholder: boolean;
}

export const programs: Program[] = [
  {
    slug: 'group-classes',
    index: '01',
    title: 'Group classes',
    summary:
      'Placeholder — regular weekly practice in a small group, for people building a steady routine.',
    meta: ['TODO: duration', 'TODO: level'],
    image: 'practice',
    isPlaceholder: true,
  },
  {
    slug: 'personal-sessions',
    index: '02',
    title: 'Personal sessions',
    summary:
      'Placeholder — one-to-one practice shaped around a single person, their history and their goals.',
    meta: ['TODO: duration', 'One to one'],
    image: 'studioMono',
    isPlaceholder: true,
  },
  {
    slug: 'kids-yoga',
    index: '03',
    title: 'Kids yoga',
    summary:
      'Placeholder — movement, breath and play for children, built around attention rather than performance.',
    meta: ['TODO: age range', 'TODO: duration'],
    image: 'group',
    isPlaceholder: true,
  },
  {
    slug: 'summer-camp',
    index: '04',
    title: 'Summer camp',
    summary:
      'Placeholder — a short intensive programme running through the school holidays.',
    meta: ['TODO: dates', 'TODO: age range'],
    image: 'landscape',
    isPlaceholder: true,
  },
  {
    slug: 'workshops',
    index: '05',
    title: 'Workshops & intensives',
    summary:
      'Placeholder — occasional deep-dives into a single theme, open to existing and new students.',
    meta: ['TODO: format', 'By schedule'],
    image: 'stillnessMono',
    isPlaceholder: true,
  },
];
