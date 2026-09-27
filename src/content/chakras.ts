/**
 * THE SEVEN CHAKRAS — as data.
 *
 * Petal counts are the traditional ones from the tantric texts, not invented:
 *
 *   Muladhara      4      Svadhisthana  6      Manipura   10
 *   Anahata       12      Vishuddha    16      Ajna        2
 *   Sahasrara   1000
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ON COLOUR — a deliberate design decision, recorded rather than hidden.
 *
 * The familiar rainbow assignment (red → violet) is a modern Western mapping
 * popularised in the 20th century; the classical sources describe the petals
 * quite differently. Both are recorded below, and neither is presented on the
 * site as doctrine.
 *
 * `traditional` is the widely-recognised hue. `tint` is that hue pulled toward
 * this site's warm, dark palette. Rendering the raw rainbow on a near-black
 * editorial page would read as a wellness-clipart sticker set and wreck the
 * restraint the rest of the design is built on — so the artwork is drawn in
 * gold line and carries `tint` only as a faint accent.
 *
 * Swap `tint` for `traditional` in the Chakra component if a louder treatment
 * is ever wanted; the data does not need to change.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ⚠ The `meaning` strings are one-word associations in the broadest common
 * usage. They are NOT a therapeutic claim, and nothing on this site should
 * present them as one.
 */

export interface Chakra {
  /** Stable key, used for React keys and any future routing. */
  id: string;
  /** Sanskrit name, transliterated. */
  sanskrit: string;
  /** Common English name. */
  english: string;
  /**
   * Traditional petal count. Sahasrara is described as thousand-petalled,
   * which cannot be drawn literally — see `renderPetals`.
   */
  petals: number;
  /**
   * What the artwork actually draws. Equal to `petals` except for Sahasrara,
   * where a thousand petals would be a grey disc; convention renders it as a
   * dense multi-ring instead.
   */
  renderPetals: number;
  /** Widely-recognised modern hue. Recorded for reference. */
  traditional: string;
  /** That hue pulled toward this palette. What the artwork uses. */
  tint: string;
  /** One-word association. Not a claim. */
  meaning: string;
}

export const chakras: Chakra[] = [
  {
    id: 'muladhara',
    sanskrit: 'Muladhara',
    english: 'Root',
    petals: 4,
    renderPetals: 4,
    traditional: '#C62828',
    tint: '#A85246',
    meaning: 'Ground',
  },
  {
    id: 'svadhisthana',
    sanskrit: 'Svadhisthana',
    english: 'Sacral',
    petals: 6,
    renderPetals: 6,
    traditional: '#EF6C00',
    tint: '#C07A45',
    meaning: 'Flow',
  },
  {
    id: 'manipura',
    sanskrit: 'Manipura',
    english: 'Solar plexus',
    petals: 10,
    renderPetals: 10,
    traditional: '#FBC02D',
    tint: '#C2A25C',
    meaning: 'Will',
  },
  {
    id: 'anahata',
    sanskrit: 'Anahata',
    english: 'Heart',
    petals: 12,
    renderPetals: 12,
    traditional: '#2E7D32',
    tint: '#6E9070',
    meaning: 'Openness',
  },
  {
    id: 'vishuddha',
    sanskrit: 'Vishuddha',
    english: 'Throat',
    petals: 16,
    renderPetals: 16,
    traditional: '#1565C0',
    tint: '#5E86A8',
    meaning: 'Voice',
  },
  {
    id: 'ajna',
    sanskrit: 'Ajna',
    english: 'Third eye',
    petals: 2,
    renderPetals: 2,
    traditional: '#4527A0',
    tint: '#6E6496',
    meaning: 'Insight',
  },
  {
    id: 'sahasrara',
    sanskrit: 'Sahasrara',
    english: 'Crown',
    petals: 1000,
    // A thousand petals renders as a solid ring at any real size. Convention
    // draws a dense ring instead; 32 reads as "countless" while staying legible.
    renderPetals: 32,
    traditional: '#7B1FA2',
    tint: '#94709E',
    meaning: 'Stillness',
  },
];
