/**
 * ABOUT PAGE COPY
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ ALL COPY BELOW IS PLACEHOLDER.
 *
 * Written to establish structure, length and tone. It asserts NOTHING. There
 * are no qualifications, no training lineage, no years of practice, no student
 * numbers, no locations, no therapeutic or medical claims.
 *
 * Brand reference supplied by the client (direction only, not for publication
 * as fact): Instagram @sujityoga_001, display name "Sujit yoga 18", themes of
 * healing with yog (integration), yoga passion, self-belief, naturopathy.
 *
 * The `credentials` and `training` arrays are intentionally EMPTY. The page
 * renders an explicit "not supplied yet" marker rather than inventing entries.
 * Fill them only with what the client can evidence.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const about = {
  header: {
    eyebrow: 'About',
    heading: 'A practice built around the person in front of me.',
    lead: 'Placeholder. One or two sentences introducing Sujit and the approach, in a voice that sounds like a person rather than a brochure.',
    meta: [
      { label: 'Practice', value: 'TODO: styles taught' },
      { label: 'Based in', value: 'TODO: location' },
      { label: 'Languages', value: 'TODO: languages' },
    ],
  },

  /** The personal story. Kept as an array so paragraphs can be added freely. */
  story: {
    eyebrow: 'The story',
    heading: 'How the practice began.',
    body: [
      'Placeholder paragraph. This is where Sujit describes, in the first person, how he came to yoga — the circumstances, not a CV.',
      'Placeholder paragraph. What changed as the practice became regular, and what he noticed in himself before he ever taught anyone else.',
      'Placeholder paragraph. The decision to teach, and what he wanted teaching to feel like for the people who came.',
    ],
  },

  /** Teaching approach, as a short ruled list rather than prose. */
  approach: {
    eyebrow: 'Approach',
    heading: 'What a session is actually like.',
    lead: 'Placeholder framing sentence for the points below.',
    points: [
      {
        title: 'We start where you are',
        body: 'Placeholder — how a first session is assessed and paced, with no assumption of prior experience.',
      },
      {
        title: 'Breath before shape',
        body: 'Placeholder — why the breath leads and what that changes about how a posture is taught.',
      },
      {
        title: 'Adjusted, not corrected',
        body: 'Placeholder — how adjustments are offered, and consent around physical contact.',
      },
      {
        title: 'Rest is part of it',
        body: 'Placeholder — the role of stillness at the end of a session and why it is not optional.',
      },
    ],
  },

  /** Wider wellbeing view. Mirrors the homepage pillars without repeating them. */
  wellbeing: {
    eyebrow: 'Beyond the mat',
    heading: 'Yoga as one part of living well.',
    body: [
      'Placeholder paragraph. The broader view of wellbeing that informs the teaching — movement, rest, breath and routine.',
      'Placeholder paragraph. What this does and does not mean in practice.',
    ],
    /** ⚠ Deliberate, explicit disclaimer. Do not remove without legal review. */
    disclaimer:
      'Placeholder notice. This practice is not medical treatment and makes no therapeutic claim. TODO: confirm the wording the client wants here.',
  },

  /**
   * ⚠ EMPTY ON PURPOSE. Nothing is claimed until the client evidences it.
   * Add entries as plain strings once verified.
   */
  credentials: [] as string[],
  training: [] as string[],

  cta: {
    heading: 'Come and practise.',
    lead: 'Placeholder closing line inviting a first conversation.',
  },
} as const;
