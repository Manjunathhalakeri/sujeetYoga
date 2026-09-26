/**
 * ASSET REGISTRY — every image on the site is declared here, once.
 *
 * Why a registry rather than inline URLs: when the studio's real photography
 * arrives, replacing it is a single edit per entry. No component holds a URL,
 * no crop is hard-coded into a layout, and nothing is built around a specific
 * image that would be awkward to swap.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ ALL IMAGES BELOW ARE DEVELOPMENT PLACEHOLDERS.
 *
 * They are stock photographs from Unsplash, used to evaluate composition,
 * crops and colour. Every one was opened and visually checked before being
 * added, so the `alt` text and `describes` fields reflect what is actually in
 * the frame — they are not guesses.
 *
 * Licensing: the Unsplash License permits free commercial use without
 * attribution, and permits hot-linking images.unsplash.com. Attribution is
 * nonetheless good practice. The photographers' names are NOT recorded here
 * because they were not verified — they must be looked up on Unsplash before
 * launch if credits are to be displayed. No credit is invented.
 *
 * TO REPLACE WITH REAL PHOTOGRAPHY:
 *   1. Drop files into /public/images/
 *   2. Change `src` to e.g. '/images/hero.jpg'
 *   3. Rewrite `alt` to describe the real photograph
 *   4. Set `isPlaceholder: false`
 *   5. Once every entry is real, delete the `remotePatterns` block in
 *      next.config.ts so no external image host is trusted in production.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface ImageAsset {
  /** Next/Image source. A remote URL today; a /images/… path once real. */
  src: string;
  /**
   * Alt text. Describes the image for someone who cannot see it.
   * Set to '' when the image is purely decorative and the surrounding copy
   * already carries the meaning.
   */
  alt: string;
  /** Plain-language note for whoever replaces this image: what to shoot. */
  briefing: string;
  source: 'unsplash' | 'pexels' | 'pixabay' | 'owned';
  sourceUrl: string;
  license: string;
  isPlaceholder: boolean;
}

/** Unsplash serves the correct size from query params; Next/Image handles the rest. */
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  /** Wide, low-light, strongly composed. Reviewed: silhouetted figure in a low
   *  lunge with one arm overhead, against a pink and blue dusk sky by water. */
  hero: {
    src: unsplash('1544367567-0f2fcb009e0b'),
    alt: 'A person in a low lunge with one arm reaching overhead, silhouetted against a dusk sky.',
    briefing:
      'Replace with a wide, low-light photograph of the instructor practising. Silhouette or strong backlight works best — the hero headline sits over the left third, so keep that area uncluttered.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    license: 'Unsplash License',
    isPlaceholder: true,
  },

  /** Reviewed: backlit seated meditation on a wooden deck, palm fronds and
   *  low sun behind. Warm, tropical, reads as an Indian/South Asian setting. */
  portrait: {
    src: unsplash('1506126613408-eca07ce68773'),
    alt: 'A person seated cross-legged in meditation on a wooden deck at sunrise, framed by palm leaves.',
    briefing:
      'Replace with a portrait-orientation photograph of the instructor, natural light, calm setting. Used in the About and Instructor sections at a 4:5 crop.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    license: 'Unsplash License',
    isPlaceholder: true,
  },

  /** Reviewed: woman in extended side angle pose on a forest path, dappled
   *  natural light, soft green background. Authentic, unposed-looking. */
  practice: {
    src: unsplash('1607914660217-754fdd90041d'),
    alt: 'A person holding an extended side angle pose on a forest path in dappled daylight.',
    briefing:
      'Replace with a real class or practice photograph. Landscape 3:2. Natural light, no studio flash.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1607914660217-754fdd90041d',
    license: 'Unsplash License',
    isPlaceholder: true,
  },

  /** Reviewed: small group standing in tree pose on a beach under soft
   *  overcast light. Used where a group/community idea is needed. */
  group: {
    src: unsplash('1545205597-3d9d02c29597'),
    alt: 'A small group standing in tree pose on a beach under soft overcast light.',
    briefing:
      'Replace with a photograph of an actual group class. Backs-to-camera or wide framing avoids needing model releases from every student.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
    license: 'Unsplash License',
    isPlaceholder: true,
  },

  /** Reviewed: a single figure in tree pose on a mountain ridge at sunrise,
   *  layered hills receding into haze. Wide, quiet, lots of negative space. */
  landscape: {
    src: unsplash('1524863479829-916d8e77f114'),
    alt: 'A single figure in tree pose on a ridge at sunrise, with layered hills fading into haze behind.',
    briefing:
      'Replace with a wide environmental photograph — the studio space, or the landscape around it. Needs large areas of negative space for overlaid text.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114',
    license: 'Unsplash License',
    isPlaceholder: true,
  },
  /** Reviewed: black-and-white studio shot, a figure in downward dog on a mat in
   *  an empty hall, low raking light on a wooden floor. Quiet and anatomical. */
  studioMono: {
    src: unsplash('1599901860904-17e6ed7083a0'),
    alt: 'A person in downward-facing dog on a mat in an empty studio, in black and white.',
    briefing:
      'Replace with a real photograph from the studio. Monochrome is used deliberately here to separate the programme imagery from the warmer lifestyle photography.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0',
    license: 'Unsplash License',
    isPlaceholder: true,
  },

  /** Reviewed: black-and-white overhead of a figure folded forward into child's
   *  pose, arms extended, dark ground. Reads as stillness rather than exercise. */
  stillnessMono: {
    src: unsplash('1593810450967-f9c42742e326'),
    alt: "A person folded forward in child's pose with arms extended, in black and white.",
    briefing:
      'Replace with a still, restful photograph. This sits beside the philosophy copy, so it must read as stillness, not as effort.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1593810450967-f9c42742e326',
    license: 'Unsplash License',
    isPlaceholder: true,
  },

  /** Reviewed: a low timber-and-tile building at dusk, warm lantern light,
   *  planting and trees around a courtyard. Stands in for the studio space. */
  space: {
    src: unsplash('1531971589569-0d9370cbe1e5'),
    alt: 'A low timber building at dusk, lit from within, surrounded by planting and trees.',
    briefing:
      'Replace with a photograph of the actual space — exterior, courtyard or practice room. Shoot at dusk or in soft morning light; hard midday sun will not match the rest of the set.',
    source: 'unsplash',
    sourceUrl: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5',
    license: 'Unsplash License',
    isPlaceholder: true,
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
