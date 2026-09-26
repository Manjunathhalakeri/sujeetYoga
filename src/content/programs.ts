import type { ImageKey } from './assets';

/**
 * PROGRAMMES — the offering, as data.
 *
 * This file is the whole programme system. Adding a programme means adding one
 * object below: it appears in the homepage list, on /programs, and gets its own
 * statically-generated /programs/[slug] page with its own metadata. No new
 * component or route is written.
 *
 * `slug` is the published URL and must stay stable once a page has been shared
 * or indexed. Changing one breaks links; add a redirect instead.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ ALL CONTENT BELOW IS PLACEHOLDER.
 * No prices, durations, class sizes, levels, age ranges, dates or outcomes have
 * been supplied. The shapes are real; the values are not. Any field whose value
 * begins "TODO:" renders as a visible placeholder badge in the UI.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface Program {
  slug: string;
  /** Two-digit index for the editorial list. Purely visual. */
  index: string;
  title: string;
  /** One line for list views. Keep under ~90 characters. */
  summary: string;
  /** Short metadata badges shown in list views. */
  meta: string[];
  image: ImageKey;
  isPlaceholder: boolean;

  /* ---- detail-page fields ---- */

  /** Longer intro, shown as the lead on the detail page. */
  intro: string;
  /** Body paragraphs. */
  body: string[];
  /** "What to expect" — a short ruled list. */
  expect: { title: string; body: string }[];
  /** Who the programme suits. Plain statements, no outcome claims. */
  suitedTo: string[];
  /** Label/value rail on the detail page. TODO values render as placeholders. */
  details: { label: string; value: string }[];
  /** Optional secondary image for the detail page. */
  secondaryImage?: ImageKey;
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
    secondaryImage: 'studioMono',
    isPlaceholder: true,
    intro:
      'Placeholder introduction. Two sentences describing the rhythm of a regular group class and who tends to come to it.',
    body: [
      'Placeholder paragraph. How a typical class is structured from arrival to close.',
      'Placeholder paragraph. How the group is kept small enough that individual adjustment is still possible.',
    ],
    expect: [
      {
        title: 'Arriving',
        body: 'Placeholder — what to bring, what to wear, and how early to arrive.',
      },
      {
        title: 'The practice',
        body: 'Placeholder — the shape of the session and how intensity is paced.',
      },
      {
        title: 'Closing',
        body: 'Placeholder — how a session ends and how long rest lasts.',
      },
    ],
    suitedTo: [
      'Placeholder — people new to a regular practice.',
      'Placeholder — people returning after a break.',
      'Placeholder — people who prefer practising alongside others.',
    ],
    details: [
      { label: 'Duration', value: 'TODO: duration' },
      { label: 'Level', value: 'TODO: level' },
      { label: 'Group size', value: 'TODO: group size' },
      { label: 'Fees', value: 'TODO: fees' },
    ],
  },
  {
    slug: 'personal-sessions',
    index: '02',
    title: 'Personal sessions',
    summary:
      'Placeholder — one-to-one practice shaped around a single person, their history and their goals.',
    meta: ['TODO: duration', 'One to one'],
    image: 'studioMono',
    secondaryImage: 'stillnessMono',
    isPlaceholder: true,
    intro:
      'Placeholder introduction. What one-to-one work makes possible that a group class cannot.',
    body: [
      'Placeholder paragraph. How the first session is used to understand history, movement and constraints.',
      'Placeholder paragraph. How the practice is then built and revised over time.',
    ],
    expect: [
      {
        title: 'First conversation',
        body: 'Placeholder — what is discussed before any practice begins.',
      },
      {
        title: 'Building the practice',
        body: 'Placeholder — how a sequence is put together for one person.',
      },
      {
        title: 'Between sessions',
        body: 'Placeholder — what is practised independently, and how much.',
      },
    ],
    suitedTo: [
      'Placeholder — people who want the practice built around them.',
      'Placeholder — people working around a specific limitation. TODO: confirm wording — no therapeutic claim should be implied.',
      'Placeholder — people who prefer to practise privately.',
    ],
    details: [
      { label: 'Duration', value: 'TODO: duration' },
      { label: 'Format', value: 'One to one' },
      { label: 'Location', value: 'TODO: location' },
      { label: 'Fees', value: 'TODO: fees' },
    ],
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
    intro:
      'Placeholder introduction. How yoga for children differs from yoga for adults, in one or two sentences.',
    body: [
      'Placeholder paragraph. How sessions are structured around play and attention span.',
      'Placeholder paragraph. What parents are asked about beforehand, and how they are kept informed.',
    ],
    expect: [
      {
        title: 'Play first',
        body: 'Placeholder — how movement is introduced through games rather than instruction.',
      },
      {
        title: 'Breath and calm',
        body: 'Placeholder — simple breathing introduced at an age-appropriate level.',
      },
      {
        title: 'Finishing',
        body: 'Placeholder — how a session winds down before pick-up.',
      },
    ],
    suitedTo: [
      'Placeholder — children in the stated age range.',
      'Placeholder — no prior experience needed.',
    ],
    details: [
      { label: 'Ages', value: 'TODO: age range' },
      { label: 'Duration', value: 'TODO: duration' },
      { label: 'Group size', value: 'TODO: group size' },
      { label: 'Fees', value: 'TODO: fees' },
    ],
  },
  {
    slug: 'summer-camp',
    index: '04',
    title: 'Summer camp',
    summary:
      'Placeholder — a short intensive programme running through the school holidays.',
    meta: ['TODO: dates', 'TODO: age range'],
    image: 'landscape',
    secondaryImage: 'space',
    isPlaceholder: true,
    intro:
      'Placeholder introduction. What the camp covers and how it differs from weekly classes.',
    body: [
      'Placeholder paragraph. The daily shape of the camp.',
      'Placeholder paragraph. What children take away from it, described without promising outcomes.',
    ],
    expect: [
      {
        title: 'Each day',
        body: 'Placeholder — the daily timetable in outline.',
      },
      {
        title: 'Across the week',
        body: 'Placeholder — how the programme builds day to day.',
      },
      {
        title: 'Practicalities',
        body: 'Placeholder — drop-off, pick-up, food and what to bring.',
      },
    ],
    suitedTo: [
      'Placeholder — children in the stated age range.',
      'Placeholder — families looking for structured holiday activity.',
    ],
    details: [
      { label: 'Dates', value: 'TODO: dates' },
      { label: 'Ages', value: 'TODO: age range' },
      { label: 'Daily hours', value: 'TODO: hours' },
      { label: 'Fees', value: 'TODO: fees' },
    ],
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
    intro:
      'Placeholder introduction. What a workshop covers that a regular class does not have time for.',
    body: [
      'Placeholder paragraph. How themes are chosen and how often workshops run.',
      'Placeholder paragraph. Whether prior experience is expected.',
    ],
    expect: [
      {
        title: 'One theme',
        body: 'Placeholder — the depth a single subject is taken to.',
      },
      {
        title: 'Longer format',
        body: 'Placeholder — how the extended session is paced.',
      },
      {
        title: 'Taking it home',
        body: 'Placeholder — what participants leave with.',
      },
    ],
    suitedTo: [
      'Placeholder — existing students wanting more depth.',
      'Placeholder — visitors attending a single session.',
    ],
    details: [
      { label: 'Format', value: 'TODO: format' },
      { label: 'Duration', value: 'TODO: duration' },
      { label: 'Next date', value: 'TODO: date' },
      { label: 'Fees', value: 'TODO: fees' },
    ],
  },
];

/** Lookup used by the detail route. */
export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

/** True when a value is still an unfilled placeholder. Drives the UI badges. */
export function isTodo(value: string): boolean {
  return value.trimStart().startsWith('TODO:');
}
