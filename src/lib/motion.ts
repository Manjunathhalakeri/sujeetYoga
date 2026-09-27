'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

/**
 * MOTION TOKENS — now GSAP.
 *
 * One easing curve, four durations, one travel distance. Every animated
 * component reads from here, so the whole site shares a single sense of weight
 * and the timing can be retuned globally in one edit.
 *
 * Rule of the system, unchanged: motion is only ever used for entrance, state
 * change, and navigation. Never idle, never ambient, never decorative.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THE EASE IS A CustomEase AND NOT `power4.out`
 *
 * The CSS layer (`--ease-brand`, and every Tailwind `transition-*` utility)
 * uses cubic-bezier(0.22, 1, 0.36, 1). GSAP's `power4.out` is very close to it
 * but not identical, and hover states sit right next to entrance animations all
 * over this site. Two curves that are nearly the same read as a mistake rather
 * than as a choice.
 *
 * CustomEase takes the exact same four control points, so JavaScript and CSS
 * motion are provably the same curve. It ships in the gsap package — no extra
 * dependency.
 * ────────────────────────────────────────────────────────────────────────────
 */

// Register once, at module load, before any component runs a tween.
// useGSAP is registered too so GSAP knows about its cleanup lifecycle.
gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

/** The one curve. Identical to --ease-brand in tokens.css. */
export const EASE = CustomEase.create('brand', '0.22, 1, 0.36, 1');

/** Symmetric curve, only for things that move and come back (menus). */
export const EASE_IN_OUT = CustomEase.create('brandInOut', '0.65, 0, 0.35, 1');

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

/**
 * Where a scroll reveal fires.
 *
 * Motion's `viewport={{ margin: '0px 0px -12% 0px' }}` shrank the bottom of the
 * viewport by 12%, so an element had to clear that line before animating.
 * ScrollTrigger's equivalent is `start: 'top 88%'` — the element's top reaching
 * 88% of the way down the viewport. Same trigger point, different spelling.
 */
export const REVEAL_START = 'top 88%';

/** Applied to every reveal so the whole site shares one entrance feel. */
export const revealVars = {
  duration: DURATION.base,
  ease: EASE,
} as const;

/**
 * Recalculate trigger positions once webfonts have actually landed.
 *
 * next/font uses `display: swap`, so the first paint measures against the
 * fallback face. Any ScrollTrigger created before the real face arrives is
 * anchored to the wrong pixel positions — most visibly on long display
 * headings, where the metric difference is tens of pixels.
 *
 * Viewport resize is refreshed automatically by ScrollTrigger; font loading is
 * not, so this is the one refresh worth wiring by hand.
 */
if (typeof document !== 'undefined' && 'fonts' in document) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, useGSAP };
