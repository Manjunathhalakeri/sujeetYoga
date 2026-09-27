import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The site's image treatment.
 *
 * Decisions encoded here, so no page has to re-litigate them:
 * - Square corners. Sharp edges read editorial; rounded photography reads
 *   template. The only radius in the system is 2px, on controls.
 * - A warm `ivory-300` ground shows while the image loads, so the layout never
 *   flashes white and the reveal animation has something to wipe over.
 * - A 6% inset hairline keeps high-key photography from bleeding into the page.
 * - Named aspect ratios, so crops stay consistent across the site and the box is
 *   reserved before the image arrives (no layout shift).
 * - `sizes` is required for non-`fill` use in spirit: a sensible default is
 *   provided, but every call site should pass the real value so the browser
 *   downloads the smallest adequate file.
 */

export type FigureRatio =
  | 'portrait' /* 3:4 — the house crop for people */
  | 'editorial' /* 4:5 — tall, magazine-like */
  | 'tall' /* 2:3 — hero side panels */
  | 'landscape' /* 3:2 — environments */
  | 'wide' /* 16:9 — full-bleed bands */
  | 'square'
  | 'auto'; /* caller controls height, e.g. a full-height hero */

const ratios: Record<FigureRatio, string> = {
  portrait: 'aspect-[3/4]',
  editorial: 'aspect-[4/5]',
  tall: 'aspect-[2/3]',
  landscape: 'aspect-[3/2]',
  wide: 'aspect-[16/9]',
  square: 'aspect-square',
  auto: '',
};

export interface FigureProps {
  src: string;
  /** Empty string is valid and correct for purely decorative imagery. */
  alt: string;
  ratio?: FigureRatio;
  /** Responsive sizes hint. Pass the real layout width — it controls file size. */
  sizes?: string;
  /** Only for above-the-fold imagery, and at most one per page. */
  priority?: boolean;
  /** Visible caption. Renders a <figcaption>. */
  caption?: ReactNode;
  /** Photographer/source credit. Small, quiet, sits under the caption. */
  credit?: ReactNode;
  /** Applied to the image frame. */
  className?: string;
  /** Applied to the outer <figure>. */
  wrapperClassName?: string;
  /** Slight warm wash, for photography that needs tying to the palette. */
  warm?: boolean;
  /**
   * Warm duotone grade. ON by default — it is what unifies stock placeholders
   * with the client's phone photography and ties both to the palette. Set
   * false only where true colour genuinely matters.
   */
  duotone?: boolean;
}

export function Figure({
  src,
  alt,
  ratio = 'portrait',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  caption,
  credit,
  className,
  wrapperClassName,
  warm = false,
  duotone = true,
}: FigureProps) {
  return (
    <figure className={cn('m-0', wrapperClassName)}>
      <div
        className={cn('img-frame', duotone && 'img-duotone', ratios[ratio], className)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="h-full w-full object-cover"
        />
        {warm ? (
          <span
            aria-hidden="true"
            className="bg-clay/[0.05] absolute inset-0 mix-blend-multiply"
          />
        ) : null}
      </div>

      {caption || credit ? (
        <figcaption className="text-micro text-bone-dim mt-3">
          {caption}
          {credit ? (
            <span className="text-bone-faint">
              {caption ? ' · ' : null}
              {credit}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
