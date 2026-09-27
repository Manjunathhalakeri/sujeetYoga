import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/TextLink';
import { images } from '@/content/assets';
import { programs } from '@/content/programs';
import { home } from '@/content/home';

/**
 * PROGRAMMES — a ruled editorial list, deliberately NOT a card grid.
 *
 * A grid of equal cards is the single most template-looking pattern on the web,
 * and it would flatten five quite different offerings into five identical
 * rectangles. A ruled list instead:
 * - gives each programme a full-width line of the page, like a contents page;
 * - lets the index numerals carry the rhythm;
 * - degrades to a clean stacked list on a phone with no layout work;
 * - adds a thumbnail that appears only on hover at desktop, so the imagery is
 *   an enhancement rather than five more boxes competing for attention.
 *
 * The heading sits in a sticky left column so it stays with the list while it
 * scrolls — reinforcing the asymmetry rather than sitting centred above it.
 */
export function Programs() {
  return (
    <Section id="programs" spacing="loose" labelledBy="programs-heading">
      <Container>
        <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Reveal>
                <SectionHeading
                  id="programs-heading"
                  eyebrow={home.programs.eyebrow}
                  size="display-2"
                  mark
                  lead={home.programs.lead}
                >
                  {home.programs.heading}
                </SectionHeading>
                <p className="mt-8">
                  <TextLink href="/programs">View all programmes</TextLink>
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <RevealGroup as="ul" className="rule-t" stagger={0.06}>
              {programs.map((program) => (
                <RevealItem as="li" key={program.slug} className="rule-b">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="group relative flex items-start gap-5 py-7 transition-colors sm:gap-8"
                  >
                    <span className="text-eyebrow nums-tabular text-bone-faint mt-2 shrink-0">
                      {program.index}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-4">
                        <span className="text-h3 font-display group-hover:text-sage transition-colors">
                          {program.title}
                        </span>
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="group-hover:text-sage text-bone-faint mt-1.5 shrink-0 transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>

                      <span className="text-small text-bone-dim mt-2 block max-w-[46ch]">
                        {program.summary}
                      </span>

                      <span className="mt-4 flex flex-wrap items-center gap-2">
                        {program.meta.map((m) => (
                          <Badge key={m} tone="neutral">
                            {m}
                          </Badge>
                        ))}
                        {program.isPlaceholder ? (
                          <Badge tone="placeholder">Placeholder</Badge>
                        ) : null}
                      </span>
                    </span>

                    {/* Desktop-only hover thumbnail. Hidden from assistive tech —
                        it is decorative, and the row is already fully labelled. */}
                    <span
                      aria-hidden="true"
                      className="img-frame img-duotone pointer-events-none absolute top-1/2 right-0 hidden h-28 w-40 -translate-y-1/2 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100 xl:block"
                    >
                      <Image
                        src={images[program.image].src}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
