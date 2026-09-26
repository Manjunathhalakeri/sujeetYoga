import type { ImageKey } from './assets';

/**
 * WORKSHOPS & EVENTS
 *
 * Two arrays: `upcoming` and `past`. The page renders `past` only when it has
 * entries, so nothing has to change when the first workshop actually happens —
 * move the object from one array to the other.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ NO REAL WORKSHOP EXISTS YET.
 *
 * No event name, date, venue, price, capacity or outcome has been supplied, so
 * none is written here. The `upcoming` entries below are deliberately titled
 * "Workshop title — TODO" rather than being given invented names: a plausible
 * fake name is worse than an obvious blank, because it can be published by
 * accident and read as real.
 *
 * `past` is EMPTY and must stay empty until workshops have genuinely happened.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface Workshop {
  slug: string;
  /** TODO until the client supplies a real name. */
  title: string;
  /** Human-readable date. TODO values render as placeholder badges. */
  date: string;
  /** Optional machine-readable date (YYYY-MM-DD) for <time datetime>. */
  isoDate?: string;
  /** Duration or session count, e.g. "3 hours". */
  duration: string;
  /** Venue. TODO until supplied — never a guessed address. */
  location: string;
  /** One-paragraph description. */
  summary: string;
  /** Longer detail, optional. */
  body?: string[];
  /** Who it is open to. */
  audience: string;
  /** Booking state. */
  status: 'open' | 'waitlist' | 'closed' | 'tbc';
  image: ImageKey;
  isPlaceholder: boolean;
}

export const STATUS_LABEL: Record<Workshop['status'], string> = {
  open: 'Booking open',
  waitlist: 'Waitlist',
  closed: 'Closed',
  tbc: 'Dates to be confirmed',
};

export const upcomingWorkshops: Workshop[] = [
  {
    slug: 'workshop-1',
    title: 'Workshop title — TODO',
    date: 'TODO: date',
    duration: 'TODO: duration',
    location: 'TODO: location',
    audience: 'TODO: who it is open to',
    summary:
      'Placeholder summary. Two or three sentences describing what this workshop covers and what a participant will actually do. No outcome is promised.',
    status: 'tbc',
    image: 'stillnessMono',
    isPlaceholder: true,
  },
  {
    slug: 'workshop-2',
    title: 'Workshop title — TODO',
    date: 'TODO: date',
    duration: 'TODO: duration',
    location: 'TODO: location',
    audience: 'TODO: who it is open to',
    summary:
      'Placeholder summary. A second entry so the list layout can be reviewed against more than one item.',
    status: 'tbc',
    image: 'practice',
    isPlaceholder: true,
  },
];

/**
 * ⚠ EMPTY ON PURPOSE. The page hides this section entirely while the array is
 * empty. Do not add entries until workshops have actually taken place.
 */
export const pastWorkshops: Workshop[] = [];

/** Intro copy for the index page. All placeholder. */
export const workshopsIntro = {
  eyebrow: 'Workshops & events',
  heading: 'Longer sessions, one subject at a time.',
  lead: 'Placeholder. One sentence on what a workshop is for and how it differs from a weekly class.',
  body: [
    'Placeholder paragraph. How often workshops run and how they are announced.',
    'Placeholder paragraph. Whether prior experience is expected, and what to bring.',
  ],
  /** Shown when `upcomingWorkshops` is empty. */
  emptyState:
    'Nothing is scheduled at the moment. Placeholder copy — replace with how people should hear about the next one.',
};
