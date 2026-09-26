/**
 * MOTION TOKENS
 *
 * One easing curve, four durations, one travel distance. Every animated
 * component reads from here, so the whole site shares a single sense of
 * weight and the timing can be retuned globally in one edit.
 *
 * Rule of the system: motion is only ever used for entrance, state change,
 * and navigation. Never idle, never ambient, never decorative.
 */

import type { Transition, Variants } from 'motion/react';

/** The one curve. Fast out of the gate, long gentle settle. */
export const EASE = [0.22, 1, 0.36, 1] as const satisfies [
  number,
  number,
  number,
  number,
];

/** Symmetric curve, only for things that move and come back (menus, accordions). */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const satisfies [
  number,
  number,
  number,
  number,
];

export const DURATION = {
  /** Hover, focus, button press. */
  quick: 0.2,
  /** The default for almost everything. */
  base: 0.4,
  /** Menus, larger layout shifts. */
  slow: 0.7,
  /** Hero image reveal only. */
  reveal: 1.1,
} as const;

/** Entrance travel. Deliberately small — premium motion is short, not far. */
export const DISTANCE = 16;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

export const transitionSlow: Transition = {
  duration: DURATION.slow,
  ease: EASE,
};

/** Viewport trigger shared by all scroll reveals: fires slightly early so the
 *  animation is already settling by the time the element is comfortably read. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/** Reduced-motion substitute: state changes, but nothing moves. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.quick, ease: EASE } },
};

/** Parent wrapper that walks its children in sequence. */
export function staggerParent(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Hero image: an unmasking wipe plus a slow scale settle. Tier 3. */
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    scale: 1,
    transition: { duration: DURATION.reveal, ease: EASE },
  },
};

/** Hero headline, animated per line. Tier 3. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: DURATION.slow, ease: EASE },
  },
};
