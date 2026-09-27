'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import {
  DISTANCE,
  DURATION,
  EASE,
  MOTION_QUERIES,
  REVEAL_START,
  gsap,
  useGSAP,
  type MotionConditions,
} from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * TIER 2 — the site's single scroll-reveal primitive.
 *
 * One fade plus a 16px rise, on the shared brand curve, fired once. Because
 * every section entrance routes through this one component, the page has a
 * consistent sense of weight and the whole behaviour can be retuned — or
 * switched off — in one file.
 *
 * Accessibility and resilience, both unchanged by the move to GSAP:
 * - `gsap.matchMedia()` runs a separate branch under prefers-reduced-motion
 *   that drops the transform entirely and only fades. When the query stops
 *   matching, GSAP reverts that branch automatically.
 * - The element carries `data-reveal`, and layout.tsx ships a <noscript> rule
 *   forcing those elements visible, so copy is never trapped behind an
 *   animation that failed to run.
 *
 * Note on the starting state: GSAP sets it in `useGSAP`, which runs in
 * useLayoutEffect — before paint. There is therefore no flash of fully-visible
 * content before the tween starts, which is the usual hazard when moving a
 * reveal from a declarative library to an imperative one.
 */
export interface RevealProps {
  as?: ElementType;
  /** Seconds. Use for deliberate sequencing; prefer RevealGroup for lists. */
  delay?: number;
  /** Override the travel distance in px. Keep it small. */
  distance?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({
  as: Tag = 'div',
  delay = 0,
  distance = DISTANCE,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES, (ctx) => {
        const { reduced } = ctx.conditions as unknown as MotionConditions;

        gsap.fromTo(
          el,
          { autoAlpha: 0, y: reduced ? 0 : distance },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduced ? DURATION.quick : DURATION.base,
            ease: EASE,
            delay: reduced ? 0 : delay,
            scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal="" className={cn(className)}>
      {children}
    </Tag>
  );
}

/**
 * Staggers direct children marked by <RevealItem>. Used for programme grids and
 * schedule rows, where a sequence reads as intent rather than as decoration.
 *
 * Under Motion this was parent/child variants; GSAP does it with one tween over
 * the collected children and a `stagger`, which is both simpler and a single
 * ScrollTrigger instead of one per item.
 */
export function RevealGroup({
  as: Tag = 'div',
  stagger = 0.08,
  scrub = false,
  className,
  children,
}: {
  as?: ElementType;
  stagger?: number;
  /**
   * Tie the stagger to scroll position instead of playing it once on entry.
   *
   * DESKTOP ONLY, and silently ignored elsewhere: scrubbing a long list on a
   * phone means the rows are only readable at the scroll position that happens
   * to resolve them, which is worse than simply showing them. Mobile and
   * reduced-motion both fall back to the one-shot stagger.
   */
  scrub?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>('[data-reveal-item]');
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES, (ctx) => {
        const { reduced, desktop } = ctx.conditions as unknown as MotionConditions;
        const useScrub = scrub && desktop && !reduced;

        gsap.fromTo(
          items,
          useScrub
            ? // A scrubbed row is only as visible as the scroll position makes
              // it, so it must never start fully hidden: if a trigger is even
              // slightly mispositioned — stale after a font swap, say — a row
              // at 0 is simply missing content. Starting at 0.25 means the
              // worst case is "dim", not "gone". Same reasoning as ScrubSweep.
              { autoAlpha: 0.25, y: DISTANCE }
            : { autoAlpha: 0, y: reduced ? 0 : DISTANCE },
          useScrub
            ? {
                autoAlpha: 1,
                y: 0,
                // ease 'none' is mandatory on a scrub: any other curve breaks
                // the 1:1 mapping between scroll position and progress.
                ease: 'none',
                stagger: stagger * 4,
                scrollTrigger: {
                  trigger: el,
                  // Resolves across the list's own height, so a row lands as it
                  // reaches a comfortable reading position rather than all at
                  // once when the list first appears.
                  start: 'top 82%',
                  end: 'bottom 70%',
                  scrub: 0.7,
                  // Recompute start/end on every refresh. Without it the values
                  // are cached from creation time, and this list sits below a
                  // pinned hero whose spacer changes every position beneath it.
                  invalidateOnRefresh: true,
                },
              }
            : {
                autoAlpha: 1,
                y: 0,
                duration: reduced ? DURATION.quick : DURATION.base,
                ease: EASE,
                stagger: reduced ? 0 : stagger,
                scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
              },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}

/**
 * A child of RevealGroup. Carries no animation of its own — the group tweens it
 * — but keeps `data-reveal` so the noscript fallback still covers it.
 */
export function RevealItem({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType;
  /** Accepted for call-site compatibility; the group controls the distance. */
  distance?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-reveal="" data-reveal-item="" className={cn(className)}>
      {children}
    </Tag>
  );
}
