import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Class merging, taught our design tokens.
 *
 * tailwind-merge resolves conflicts by class *group*. Out of the box it only
 * knows Tailwind's stock scales, so with our custom tokens it cannot tell a
 * font size from a text colour — it saw `text-body text-bone` as two
 * font sizes and silently dropped the size. Every button on the site rendered
 * without its type scale as a result.
 *
 * Registering the custom scales below fixes that, and keeps the guarantee we
 * actually want: a `className` passed to a component reliably overrides the
 * component's own utility of the same kind.
 *
 * ⚠ When a token is added to styles/tokens.css, add it here too.
 */

const FONT_SIZES = [
  'hero',
  'display-1',
  'display-2',
  'h2',
  'h3',
  'h4',
  'lead',
  'body',
  'small',
  'micro',
  'eyebrow',
] as const;

const COLORS = [
  'ink',
  'ink-deep',
  'ink-raised',
  'ink-lifted',
  'bone',
  'bone-dim',
  'bone-faint',
  'hairline',
  'line-strong',
  'sage',
  'sage-deep',
  'clay',
  'clay-deep',
  'success',
  'danger',
] as const;

const CONTAINERS = ['copy', 'measure', 'page', 'bleed'] as const;

const SPACING = ['gutter', 'block', 'section', 'section-lg'] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...FONT_SIZES] }],
      'text-color': [{ text: [...COLORS] }],
      'bg-color': [{ bg: [...COLORS] }],
      'border-color': [{ border: [...COLORS] }],
      'max-w': [{ 'max-w': [...CONTAINERS] }],
      p: [{ p: [...SPACING] }],
      px: [{ px: [...SPACING] }],
      py: [{ py: [...SPACING] }],
      pt: [{ pt: [...SPACING] }],
      pb: [{ pb: [...SPACING] }],
      m: [{ m: [...SPACING] }],
      mx: [{ mx: [...SPACING] }],
      my: [{ my: [...SPACING] }],
      gap: [{ gap: [...SPACING] }],
    },
  },
});

/**
 * Merge class names, with later Tailwind utilities winning over earlier
 * conflicting ones. Needed because CSS source order — not string order —
 * decides the winner otherwise, which would make `className` overrides on
 * components unreliable.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
