'use client';

import { useRef, type ReactNode } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGSAP } from '@/lib/motion';
import { cn } from '@/lib/cn';

gsap.registerPlugin(SplitText);

/**
 * TEXT SWEEP — words resolve from dim to full as you scroll past them.
 *
 * This is the one place SplitText genuinely earns its keep. The hero's lines
 * come from data (`home.ts`), so splitting them at runtime would override an
 * editorial decision. Here the statement is a single long string whose line
 * breaks depend entirely on wrapping — which only the browser knows, and which
 * changes with viewport, font loading and text size. Splitting it by hand is
 * not possible; splitting it at runtime is exactly the problem SplitText solves.
 *
 * Licensing: SplitText ships in the public `gsap` package under GSAP's standard
 * "no charge" licence — no separate download, no key. Verified before use.
 *
 * Behaviour: words start at low opacity and resolve in a staggered sweep tied
 * to scroll position. Reading a sentence is already a left-to-right sweep, so
 * this amplifies something the reader is doing rather than imposing a new
 * motion on top of it.
 *
 * ⚠ SplitText rewrites the DOM of its target, wrapping every word in a span.
 * Two consequences handled below:
 *  - `revert()` on cleanup, so React never re-renders over GSAP's own markup.
 *  - The original text stays intact for assistive tech because the wrapper
 *    spans contain the same text nodes; nothing is duplicated or hidden.
 */
export function ScrubSweep({
  children,
  className,
  /** Opacity the words start from. Not zero — unreadable text is not a style. */
  from = 0.18,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };

          // Reduced motion gets the text plainly. No split, no sweep, no DOM
          // rewrite at all — the cheapest and calmest possible branch.
          if (reduced) {
            gsap.set(el, { autoAlpha: 1 });
            return;
          }

          const split = new SplitText(el, {
            type: 'words',
            wordsClass: 'sweep-word',
          });

          gsap.fromTo(
            split.words,
            { opacity: from },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.4,
              scrollTrigger: {
                trigger: el,
                // Begins once the statement is comfortably in view and
                // completes before it leaves, so the sweep tracks reading
                // rather than racing ahead of it.
                start: 'top 78%',
                end: 'bottom 55%',
                scrub: 0.8,
              },
            },
          );

          // Hand the DOM back to React exactly as it was found.
          return () => split.revert();
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal="" className={cn(className)}>
      {children}
    </div>
  );
}
