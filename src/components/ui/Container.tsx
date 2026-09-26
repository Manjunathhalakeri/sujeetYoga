import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The horizontal layout contract for the whole site.
 *
 * Gutters are fluid (`--spacing-gutter`), so there is no breakpoint-by-breakpoint
 * padding to maintain. `width` selects a reading measure rather than a pixel
 * value, which keeps line length — the thing that actually matters for an
 * editorial layout — consistent across pages.
 */
export type ContainerWidth = 'prose' | 'measure' | 'page' | 'bleed' | 'full';

const widths: Record<ContainerWidth, string> = {
  /** ~62ch. Body copy. */
  prose: 'max-w-copy',
  /** Wider intro/lead copy and two-column text. */
  measure: 'max-w-measure',
  /** Default content width (1240px). */
  page: 'max-w-page',
  /** Near-full-width imagery (1536px). */
  bleed: 'max-w-bleed',
  /** Edge-to-edge; gutters still applied. */
  full: 'max-w-none',
};

export interface ContainerProps {
  as?: ElementType;
  width?: ContainerWidth;
  /** Drop the horizontal gutter — for full-bleed media inside a padded parent. */
  flush?: boolean;
  className?: string;
  children: ReactNode;
}

export function Container({
  as: Tag = 'div',
  width = 'page',
  flush = false,
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full', widths[width], !flush && 'px-gutter', className)}
    >
      {children}
    </Tag>
  );
}
