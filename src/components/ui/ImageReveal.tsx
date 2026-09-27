'use client';

import { useRef, type ReactNode } from 'react';
import { DURATION, EASE, REVEAL_START, gsap, useGSAP } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * TIER 3 — the mask reveal.
 *
 * An unmasking wipe from the bottom edge, with the image settling from a 6%
 * over-scale at the same time. The two moves on one curve read as a single
 * physical gesture rather than as two effects.
 *
 * This is the most expressive animation in the system and is used sparingly:
 * the hero image, and at most one editorial moment per page.
 *
 * Under prefers-reduced-motion the mask and the scale are both dropped and the
 * image simply fades — same behaviour as before the GSAP migration.
 */
export interface ImageRevealProps {
  /** `load` for the hero, `inView` for anything below the fold. */
  trigger?: 'load' | 'inView';
  /** Seconds. */
  delay?: number;
  /** Wipe direction. `up` unmasks from the bottom edge upward. */
  direction?: 'up' | 'down' | 'right';
  className?: string;
  children: ReactNode;
}

const masks = {
  up: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
  down: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  right: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
} as const;

export function ImageReveal({
  trigger = 'inView',
  delay = 0,
  direction = 'up',
  className,
  children,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mask = masks[direction];

  useGSAP(
    () => {
      const outer = ref.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };

          const common = {
            duration: reduced ? DURATION.base : DURATION.reveal,
            ease: EASE,
            delay: reduced ? 0 : delay,
            ...(trigger === 'inView'
              ? { scrollTrigger: { trigger: outer, start: REVEAL_START, once: true } }
              : {}),
          };

          if (reduced) {
            // No mask, no scale — just resolve the fade.
            gsap.fromTo(outer, { autoAlpha: 0 }, { autoAlpha: 1, ...common });
            return;
          }

          gsap.fromTo(
            outer,
            { autoAlpha: 1, clipPath: mask.from },
            { clipPath: mask.to, ...common },
          );
          gsap.fromTo(inner, { scale: 1.06 }, { scale: 1, ...common });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div data-reveal="" ref={ref} className={cn('relative overflow-hidden', className)}>
      <div ref={innerRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
