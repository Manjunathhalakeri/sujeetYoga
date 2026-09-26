import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Mark } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/**
 * INTERIOR PAGE HEADER — the opener every page except the homepage uses.
 *
 * Deliberately NOT the hero:
 * - `display-1` (84px cap), never `--text-hero` (100px). The hero size belongs
 *   to the homepage alone, so interior pages never compete with it.
 * - No photography and no mask reveal. Interior pages open on type and space;
 *   imagery starts below the fold where it supports the content rather than
 *   announcing it.
 *
 * It keeps the page's asymmetry: heading in the left seven columns, an optional
 * metadata rail in the right three, and an empty channel between them.
 */
export interface PageHeaderProps {
  eyebrow?: ReactNode;
  /** Short supporting sentence under the heading. */
  lead?: ReactNode;
  /** Optional label/value rail, right-aligned at desktop. */
  meta?: { label: string; value: ReactNode }[];
  /** Extra content under the lead, e.g. buttons. */
  children?: ReactNode;
  className?: string;
  heading: ReactNode;
}

export function PageHeader({
  eyebrow,
  heading,
  lead,
  meta,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('pb-section pt-[calc(var(--header-h)+4rem)]', className)}>
      <Container>
        <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Mark className="mb-5" />
              {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
              <h1 className="text-display-1 font-display optical-left max-w-[16ch] text-balance">
                {heading}
              </h1>
              {lead ? (
                <p className="text-lead text-stone mt-7 max-w-[44ch]">{lead}</p>
              ) : null}
              {children ? <div className="mt-10">{children}</div> : null}
            </Reveal>
          </div>

          {meta && meta.length > 0 ? (
            <div className="lg:col-span-3 lg:col-start-10">
              <Reveal delay={0.08}>
                <dl className="rule-t pt-6">
                  {meta.map((item) => (
                    <div key={item.label} className="mb-5 last:mb-0">
                      <dt className="text-eyebrow text-stone-400 uppercase">
                        {item.label}
                      </dt>
                      <dd className="text-small text-charcoal mt-1.5">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
