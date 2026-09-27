import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { images } from '@/content/assets';
import { programs } from '@/content/programs';
import { siteConfig } from '@/content/siteConfig';

export const metadata: Metadata = {
  title: 'Programmes',
  description:
    'Placeholder description for the programmes index. TODO: replace once real programme details are supplied.',
  alternates: { canonical: '/programs' },
};

/**
 * PROGRAMMES INDEX
 *
 * The homepage shows the same programmes as a compact list beside a sticky
 * heading. Here they get the full page width, a larger image for each, and
 * alternating image placement so the eye is not walked down one edge.
 *
 * Still not a card grid — each programme is a full-width row, which keeps the
 * editorial character and means a sixth programme costs one data object rather
 * than a layout decision.
 */
export default function ProgramsIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        heading="Ways to practise."
        lead="Placeholder. One sentence framing the range below and how someone should choose between them."
        meta={[
          { label: 'Programmes', value: String(programs.length) },
          { label: 'Enquiries', value: 'TODO: response time' },
        ]}
      />

      <Section spacing="none" className="pb-section">
        <Container>
          <RevealGroup as="ul" className="rule-t" stagger={0.06}>
            {programs.map((program, i) => (
              <RevealItem as="li" key={program.slug} className="rule-b">
                <Link
                  href={`/programs/${program.slug}`}
                  className="group grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-14"
                >
                  {/* Alternating: odd rows put the image on the right. */}
                  <div
                    className={
                      i % 2 === 0
                        ? 'lg:order-1 lg:col-span-5'
                        : 'lg:order-2 lg:col-span-5 lg:col-start-8'
                    }
                  >
                    <div className="img-frame relative aspect-[3/2]">
                      <Image
                        src={images[program.image].src}
                        alt={images[program.image].alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover transition-transform duration-[var(--dur-slow)] group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div
                    className={
                      i % 2 === 0
                        ? 'lg:order-2 lg:col-span-6 lg:col-start-7'
                        : 'lg:order-1 lg:col-span-6'
                    }
                  >
                    <span className="text-eyebrow nums-tabular text-bone-faint block">
                      {program.index}
                    </span>
                    {/* A real <h2>, not a styled span. This is the index page
                        for programmes, so each programme must appear in the
                        document outline — otherwise screen-reader heading
                        navigation skips straight from the page title to the
                        closing CTA, and the page has no structure. A heading
                        inside an anchor is valid flow content in HTML5. */}
                    <span className="mt-3 flex items-start justify-between gap-4">
                      <h2 className="text-display-2 font-display group-hover:text-sage transition-colors">
                        {program.title}
                      </h2>
                      <ArrowUpRight
                        size={22}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="group-hover:text-sage text-bone-faint mt-2 shrink-0 transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                    <span className="text-lead text-bone-dim mt-5 block max-w-[46ch]">
                      {program.summary}
                    </span>
                    <span className="mt-6 flex flex-wrap items-center gap-2">
                      {program.meta.map((m) => (
                        <Badge key={m} tone="neutral">
                          {m}
                        </Badge>
                      ))}
                      {program.isPlaceholder ? (
                        <Badge tone="placeholder">Placeholder</Badge>
                      ) : null}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section surface="raised" spacing="loose">
        <Container>
          <Reveal className="lg:w-8/12">
            {/* display-2, not display-1. On interior pages the page title is
                itself display-1, so a display-1 closing CTA tied with the h1
                and flattened the hierarchy. The homepage can use display-1
                here only because its hero sits a step above at --text-hero. */}
            <h2 className="text-display-2 font-display optical-left max-w-[17ch] text-balance">
              Not sure which one fits?
            </h2>
            <p className="text-lead text-bone-dim mt-7 max-w-[40ch]">
              Placeholder. A line inviting a conversation rather than a booking.
            </p>
            <div className="mt-11">
              <Button href={siteConfig.cta.primaryHref} size="lg">
                {siteConfig.cta.primaryLabel}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
