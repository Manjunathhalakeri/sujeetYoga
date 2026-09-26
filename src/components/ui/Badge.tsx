import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Small metadata tag — level, age group, duration, "Placeholder".
 *
 * The only component in the system allowed a full radius, because at this size
 * a pill reads as a label rather than as a card.
 */
export type BadgeTone = 'neutral' | 'moss' | 'clay' | 'placeholder' | 'dark';

const tones: Record<BadgeTone, string> = {
  neutral: 'border-hairline text-stone',
  moss: 'border-moss/30 text-moss',
  clay: 'border-clay/30 text-clay',
  dark: 'border-ivory/25 text-moss-200',
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
