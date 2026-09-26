import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';
import { Mark } from './Rule';

/**
 * The standard section opener: optional accent mark, eyebrow, heading, lead.
 *
 * The heading *level* is a prop and independent of the visual *size*, so the
 * document outline can stay correct (one h1 per page, h2 for sections) without
 * the design being forced to follow it. This is the single most common place
 * that heading hierarchy gets broken, so the component makes it explicit.
 */
export interface SectionHeadingProps {
  /** Semantic level. Use 1 only for the page's single main heading. */
  level?: 1 | 2 | 3;
  /** Visual size, chosen independently of `level`. */
  size?: 'display-1' | 'display-2' | 'h2' | 'h3';
  /** Needed so the parent <Section> can reference it via aria-labelledby. */
  id?: string;
  eyebrow?: ReactNode;
  /** Short intro paragraph under the heading. Constrained to a readable measure. */
  lead?: ReactNode;
  /** Show the clay accent mark above the eyebrow. */
  mark?: boolean;
  align?: 'start' | 'center';
  /** Slot for a trailing link, e.g. "View all programmes". */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

const sizeClasses = {
  'display-1': 'text-display-1',
  'display-2': 'text-display-2',
  h2: 'text-h2',
  h3: 'text-h3',
} as const;

export function SectionHeading({
  level = 2,
  size = 'h2',
  id,
  eyebrow,
  lead,
  mark = false,
  align = 'start',
  action,
  className,
  children,
}: SectionHeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';

  return (
    <header
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {mark ? <Mark className={cn('mb-5', align === 'center' && 'mx-auto')} /> : null}

      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}

      {/* The action sits on the heading row at desktop and drops below at mobile,
          so the heading always gets the full column width on a phone. */}
      <div
        className={cn(
          'flex flex-col gap-6',
          action && 'md:flex-row md:items-end md:justify-between md:gap-12',
        )}
      >
        <Tag
          id={id}
          className={cn(
            sizeClasses[size],
            'font-display max-w-[24ch] text-balance',
            align === 'center' && 'mx-auto',
          )}
        >
          {children}
        </Tag>

        {action ? <div className="shrink-0 md:pb-2">{action}</div> : null}
      </div>

      {lead ? (
        <p
          className={cn(
            'text-lead max-w-measure text-stone mt-6',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
