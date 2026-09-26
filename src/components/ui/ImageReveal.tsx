'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASE, VIEWPORT } from '@/lib/motion';
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
 * Wrap a <Figure> (or any media) with it. Under prefers-reduced-motion the mask
 * and the scale are both dropped and the image simply fades.
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
  up: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
  down: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
  right: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
} as const;

export function ImageReveal({
  trigger = 'inView',
  delay = 0,
  direction = 'up',
  className,
  children,
}: ImageRevealProps) {
  const reduced = useReducedMotion();
  const mask = masks[direction];

  const transition = {
    duration: reduced ? DURATION.base : DURATION.reveal,
    ease: EASE,
    delay: reduced ? 0 : delay,
  };

  const hidden = reduced ? { opacity: 0 } : { opacity: 1, clipPath: mask.from };

  const shown = reduced ? { opacity: 1 } : { opacity: 1, clipPath: mask.to };

  const animationProps =
    trigger === 'load' ? { animate: shown } : { whileInView: shown, viewport: VIEWPORT };

  return (
    <motion.div
      data-reveal=""
      className={cn('relative overflow-hidden', className)}
      initial={hidden}
      transition={transition}
      {...animationProps}
    >
      <motion.div
        initial={reduced ? undefined : { scale: 1.06 }}
        transition={transition}
        {...(trigger === 'load'
          ? { animate: reduced ? undefined : { scale: 1 } }
          : {
              whileInView: reduced ? undefined : { scale: 1 },
              viewport: VIEWPORT,
            })}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
