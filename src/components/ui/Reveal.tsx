'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { DISTANCE, DURATION, EASE, VIEWPORT } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * TIER 2 — the site's single scroll-reveal primitive.
 *
 * One fade plus a 16px rise, on the shared brand curve, fired once. Because
 * every section entrance routes through this one component, the page has a
 * consistent sense of weight and the whole behaviour can be retuned — or
 * switched off — in one file.
 *
 * Accessibility and resilience:
 * - Under prefers-reduced-motion the transform is dropped entirely and only a
 *   short opacity change remains.
 * - The element carries `data-reveal`, and layout.tsx ships a <noscript> rule
 *   that forces those elements visible, so copy is never trapped behind an
 *   animation that failed to run.
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
  as = 'div',
  delay = 0,
  distance = DISTANCE,
  className,
  children,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      data-reveal=""
      className={cn(className)}
      initial={{ opacity: 0, y: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reduced ? DURATION.quick : DURATION.base,
        ease: EASE,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children that are <RevealItem>. Used for program grids and
 * schedule rows, where a sequence reads as intent rather than as decoration.
 */
export function RevealGroup({
  as = 'div',
  stagger = 0.08,
  className,
  children,
}: {
  as?: ElementType;
  stagger?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  as = 'div',
  distance = DISTANCE,
  className,
  children,
}: {
  as?: ElementType;
  distance?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      data-reveal=""
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? DURATION.quick : DURATION.base, ease: EASE },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
