import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { images } from '@/content/assets';
import { isTodo } from '@/content/programs';
import {
  STATUS_LABEL,
  pastWorkshops,
  upcomingWorkshops,
  workshopsIntro,
  type Workshop,
} from '@/content/workshops';
import { siteConfig } from '@/content/siteConfig';

export const metadata: Metadata = {
  title: 'Workshops & events',
  description:
    'Placeholder description for workshops and events. TODO: replace once real workshop details are supplied.',
  alternates: { canonical: '/workshops' },
};

/**
 * WORKSHOPS — an editorial events index.
 *
 * Structure: header → introduction → upcoming → past (only when it exists) → CTA.
 *
 * Each upcoming workshop is a full-width entry with its image held in a narrow
 * left column and its detail rail on the right — a different arrangement from
 * the programmes index (which alternates sides) so the two index pages do not
 * read as the same template twice.
 *
 * The `past` section renders only when `pastWorkshops` has entries. It is empty
 * today and must stay empty until workshops have genuinely happened; an empty
 * "past events" list would imply a history that does not exist.
 */

function WorkshopEntry({ workshop }: { workshop: Workshop }) {
  const detail = [
    { label: 'Date', value: workshop.date },
    { label: 'Duration', value: workshop.duration },
    { label: 'Where', value: workshop.location },
    { label: 'Open to', value: workshop.audience },
  ];

  return (
    <article className="gap-block grid py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-14">
      <div className="lg:col-span-4">
        <ImageReveal>
          <div className="img-frame relative aspect-[4/5]">
            <Image
              src={images[workshop.image].src}
              alt={images[workshop.image].alt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
        </ImageReveal>
      </div>

      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={workshop.status === 'open' ? 'sage' : 'placeholder'}>
            {STATUS_LABEL[workshop.status]}
          </Badge>
          {workshop.isPlaceholder ? <Badge tone="placeholder">Placeholder</Badge> : null}
        </div>

        <h3 className="text-display-2 font-display mt-5 text-balance">
          {workshop.title}
        </h3>

        <p className="text-lead text-bone-dim mt-5 max-w-[46ch]">{workshop.summary}</p>

        {workshop.body?.map((p) => (
          <p key={p} className="text-bone-dim max-w-copy mt-4">
            {p}
          </p>
        ))}

        <div className="mt-8">
          <Button href="/contact" variant="secondary">
            Enquire about this workshop
          </Button>
        </div>
      </div>

      {/* Detail rail — the device reused from the hero, About and programme pages. */}
      <div className="lg:col-span-3">
        <dl className="rule-t pt-6">
          {detail.map((d) => (
            <div key={d.label} className="mb-5 last:mb-0">
              <dt className="text-eyebrow text-bone-faint uppercase">{d.label}</dt>
              <dd className="text-small text-bone mt-1.5">
                {isTodo(d.value) ? <Badge tone="placeholder">{d.value}</Badge> : d.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function WorkshopsPage() {
  const hasUpcoming = upcomingWorkshops.length > 0;
  const hasPast = pastWorkshops.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={workshopsIntro.eyebrow}
        heading={workshopsIntro.heading}
        lead={workshopsIntro.lead}
        meta={[
          {
            label: 'Upcoming',
            value: hasUpcoming ? String(upcomingWorkshops.length) : '—',
          },
          { label: 'Announced via', value: 'TODO: how' },
        ]}
      />

      {/* ---------------- Introduction ---------------------------------------- */}
      <Section spacing="none" className="pb-section">
        <Container>
          <div className="grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-6 lg:col-start-6">
              <Reveal>
                <div className="space-y-6">
                  {workshopsIntro.body.map((p) => (
                    <p key={p} className="max-w-copy text-bone-dim">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Upcoming -------------------------------------------- */}
      <Section surface="raised" spacing="loose" labelledBy="upcoming-heading">
        <Container>
          <Reveal>
            <SectionHeading
              id="upcoming-heading"
              eyebrow="Upcoming"
              size="display-2"
              mark
            >
              What&rsquo;s coming up.
            </SectionHeading>
          </Reveal>

          {hasUpcoming ? (
            <RevealGroup className="rule-t mt-12" stagger={0.08}>
              {upcomingWorkshops.map((workshop) => (
                <RevealItem key={workshop.slug} className="rule-b">
                  <WorkshopEntry workshop={workshop} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal className="mt-12">
              <div className="rule-t max-w-measure pt-10">
                <p className="text-lead text-bone-dim">{workshopsIntro.emptyState}</p>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* ---------------- Past — rendered only if it genuinely exists --------- */}
      {hasPast ? (
        <Section spacing="loose" labelledBy="past-heading">
          <Container>
            <Reveal>
              <SectionHeading id="past-heading" eyebrow="Archive" size="display-2" mark>
                Previously.
              </SectionHeading>
            </Reveal>
            <RevealGroup as="ul" className="rule-t mt-12" stagger={0.05}>
              {pastWorkshops.map((workshop) => (
                <RevealItem as="li" key={workshop.slug} className="rule-b py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="text-h3 font-display">{workshop.title}</h3>
                    <span className="text-small text-bone-dim nums-tabular">
                      {workshop.date}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      {/* ---------------- CTA — centred, as a deliberate reset ---------------- */}
      <Section surface="deep" spacing="loose">
        <Container>
          <Reveal>
            <div className="max-w-measure mx-auto text-center">
              <h2 className="text-display-2 font-display text-balance">
                Want to hear about the next one?
              </h2>
              <p className="text-lead text-bone-dim mx-auto mt-6 max-w-[38ch]">
                Placeholder. A line about how people are told when a workshop is
                announced.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  {siteConfig.cta.primaryLabel}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
