/**
 * TESTIMONIALS
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ NONE OF THESE ARE REAL. NOT ONE.
 *
 * No student feedback has been collected, so nothing here can be attributed to
 * a person. These entries exist ONLY so the section has the right shape, length
 * and rhythm to design against.
 *
 * Every entry has `isPlaceholder: true`, and the UI renders a visible
 * "Placeholder" badge for any entry where that is true. Attribution is a
 * generic role, never a name — inventing a name for a review would be
 * fabricating a person.
 *
 * Before launch: either replace every entry with real, permissioned quotes, or
 * delete the array entirely. The homepage section hides itself when the array
 * is empty, so removing it is safe.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface Testimonial {
  id: string;
  quote: string;
  /** Role or context only. TODO: replace with a real, permissioned name. */
  attribution: string;
  isPlaceholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Placeholder quote. This is roughly the length a real testimonial should be — long enough to say something specific, short enough to read in one breath.',
    attribution: 'TODO: student, programme',
    isPlaceholder: true,
  },
  {
    id: 't2',
    quote:
      'Placeholder quote. A second example, slightly shorter, so the layout is tested against uneven lengths.',
    attribution: 'TODO: student, programme',
    isPlaceholder: true,
  },
  {
    id: 't3',
    quote:
      'Placeholder quote. A third, used to check the rhythm of the row and how it wraps on a narrow screen.',
    attribution: 'TODO: parent, kids programme',
    isPlaceholder: true,
  },
];
