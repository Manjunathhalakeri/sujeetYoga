import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Vertical rhythm + surface tone in one place.
 *
 * Alternating `surface` is how the page gets its structure — a shift in ground
 * tone and a hairline rule, rather than cards with shadows. The `.on-dark`
 * class on dark surfaces re-points the focus-ring and rule custom properties,
 * so nested components adapt without needing an `isDark` prop threaded down.
 */
export type SectionSurface = 'ivory' | 'alt' | 'moss' | 'none';

const surfaces: Record<SectionSurface, string> = {
  ivory: 'bg-ivory text-charcoal',
  alt: 'bg-ivory-300 text-charcoal',
  moss: 'on-dark bg-moss-900 text-ivory',
  none: '',
};

export type SectionSpacing = 'none' | 'tight' | 'default' | 'loose';

const spacings: Record<SectionSpacing, string> = {
  none: '',
  tight: 'py-block',
  default: 'py-section',
  loose: 'py-section-lg',
};

export interface SectionProps {
  id?: string;
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  /** Draw a hairline along the top edge — use instead of a tone change when
   *  two adjacent sections share a ground. */
  ruled?: boolean;
  /** id of the heading that names this section, for screen readers. */
  labelledBy?: string;
  /** Accessible name when there is no visible heading to point at. */
  label?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  surface = 'ivory',
  spacing = 'default',
  ruled = false,
  labelledBy,
  label,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(surfaces[surface], spacings[spacing], ruled && 'rule-t', className)}
    >
      {children}
    </section>
  );
}
