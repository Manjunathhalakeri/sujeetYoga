/**
 * ARTWORK REGISTRY
 *
 * The photography registry in `assets.ts` answers "where did this file come
 * from and may we use it". This file answers the same question for the drawn
 * artwork, so the content/UI split holds for both: a component may not invent
 * a motif, it renders one declared here.
 *
 * Everything below is **drawn as SVG in this repository** — geometry generated
 * from the data in `chakras.ts`, no traced sources, no downloaded assets, no
 * image requests, nothing to license. That is deliberate: clipart lotus sets
 * are the fastest way to make a wellness site look bought rather than designed,
 * and most carry licence terms nobody reads.
 *
 * Because it is geometry rather than files, the artwork also costs nothing to
 * recolour and scales to any size without a second export.
 */

export type ArtworkKey = 'mandala' | 'chakraStrip' | 'chakra' | 'om' | 'lotusDivider';

export interface Artwork {
  /** Component that renders it. */
  component: string;
  /** What it is, for whoever picks it up next. */
  description: string;
  /** Where it is used today. */
  usedOn: string[];
  /** Anything a future editor must not get wrong. */
  note?: string;
}

export const artwork: Record<ArtworkKey, Artwork> = {
  mandala: {
    component: 'components/art/Mandala',
    description:
      'Concentric petal rings with a bindu centre. Six rings, petal counts rising outward, drawn in thin line only.',
    usedOn: ['Homepage hero — background, very low opacity'],
    note: 'Decorative and aria-hidden. It must stay faint enough that hero type never competes with it: anything above ~6% opacity starts to fight the headline.',
  },
  chakraStrip: {
    component: 'components/art/ChakraStrip',
    description:
      'The seven chakras in ascending order, root to crown, as a horizontal row of lotus rings.',
    usedOn: ['Homepage — between Philosophy and Instructor'],
    note: 'Order is fixed and meaningful: root first, crown last. Do not sort or reverse it.',
  },
  chakra: {
    component: 'components/art/Chakra',
    description:
      'A single chakra as a lotus ring, petal count and tint taken from content/chakras.ts.',
    usedOn: ['ChakraStrip', 'Homepage Wellbeing pillars'],
    note: 'Petal counts are traditional. See the colour note in chakras.ts before changing any hue.',
  },
  om: {
    component: 'components/art/Om',
    description:
      'The character U+0950 ॐ, set in a system Devanagari face and coloured as artwork.',
    usedOn: ['Homepage — final call to action'],
    note: 'NOT drawn as SVG, and that was a decision rather than a shortcut. Three hand-authored bezier versions were rendered at 200px and compared; none read as ॐ. A bad approximation of a sacred symbol is worse than none, so this sets the real character. If a device ever renders tofu, load Anek Devanagari — the sibling of the body face already in use. See the component for the full note.',
  },
  lotusDivider: {
    component: 'components/art/LotusDivider',
    description:
      'A hairline rule interrupted at its centre by a small open lotus. Replaces a plain Rule where a section break should feel like a breath rather than a cut.',
    usedOn: ['Homepage Philosophy', 'Homepage final CTA', 'About — close'],
    note: 'Use sparingly. It is punctuation, not decoration: a page with more than two or three stops feeling composed and starts feeling ornamented.',
  },
};
