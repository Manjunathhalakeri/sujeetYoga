import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Small metadata tag — level, age group, duration, "Placeholder".
 *
 * The only component in the system allowed a full radius, because at this size
 * a pill reads as a label rather than as a card.
 */
export type BadgeTone = 'neutral' | 'sage' | 'clay' | 'placeholder';

const tones: Record<BadgeTone, string> = {
  // Borders use line-strong, not the decorative hairline: a badge outline is a
  // component boundary and has to clear 3:1.
  neutral: 'border-line-strong text-bone-dim',
  sage: 'border-sage/40 text-sage',
  clay: 'border-clay/40 text-clay',
  // Deliberately conspicuous: marks content that is not real yet.
  placeholder: 'border-dashed border-clay/60 text-clay',
};

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'text-micro inline-flex items-center rounded-full border px-2.5 py-1 leading-none tracking-[0.1em] uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
