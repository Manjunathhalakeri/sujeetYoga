import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Vertical rhythm + surface tone in one place.
 *
 * Alternating `surface` is how the page gets its structure — a shift in ground
 * tone and a hairline rule, rather than cards with shadows.
 *
 * All four surfaces are dark and sit within a 1.15:1 luminance band, so moving
 * between them reads as a change in light rather than as a panel. Text colour
 * is therefore the same on all of them and no component needs an `isDark` prop.
 *
 * Names describe the light level, not a hue, so the scale still makes sense if
 * the palette is retuned later.
 */
export type SectionSurface = 'ink' | 'raised' | 'lifted' | 'deep' | 'none';

const surfaces: Record<SectionSurface, string> = {
  /** Default page ground. */
  ink: 'bg-ink text-bone',
  /** Alternating band — the workhorse for breaking up a long page. */
  raised: 'bg-ink-raised tone-shift text-bone',
  /** Reading-heavy sections: long prose on About and programme detail pages.
   *  The lightest ground, which lifts body copy off the page slightly. */
  lifted: 'bg-ink-lifted tone-shift text-bone',
  /** Deepest ground — full-bleed bands and the footer. */
  deep: 'bg-ink-deep text-bone',
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
  /** Render as another element — e.g. `footer`. Keeps the spacing/surface
   *  system available to landmarks that are not <section>. */
  as?: ElementType;
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
  as: Tag = 'section',
  id,
  surface = 'ink',
  spacing = 'default',
  ruled = false,
  labelledBy,
  label,
  className,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(surfaces[surface], spacings[spacing], ruled && 'rule-t', className)}
    >
      {children}
    </Tag>
  );
}
