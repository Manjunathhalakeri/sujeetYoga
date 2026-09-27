import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PrimaryCta } from '@/components/ui/PrimaryCta';
import { Badge } from '@/components/ui/Badge';
import { Figure } from '@/components/ui/Figure';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { images } from '@/content/assets';
import { about } from '@/content/about';
import { siteConfig } from '@/content/siteConfig';

export const metadata: Metadata = {
  title: `About ${siteConfig.personName}`,
  description:
    'Placeholder description for the About page. TODO: replace once the real biography is supplied.',
  alternates: { canonical: '/about' },
};

/**
 * ABOUT — the page that carries the person.
 *
 * Composition continues the homepage's alternating rhythm rather than starting
 * a new one: portrait right (the homepage put it left), approach as a ruled
 * list with a sticky heading, and a dark wellbeing band before the close.
 *
 * Credentials are rendered from `about.credentials`, which is empty. Rather
 * than hiding the section, the page states plainly that nothing has been
 * supplied — that is more honest than a silent omission and makes the gap
 * obvious to whoever fills it in.
 */
export default function AboutPage() {
  const hasCredentials = about.credentials.length > 0 || about.training.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={about.header.eyebrow}
        heading={about.header.heading}
        lead={about.header.lead}
        meta={[...about.header.meta]}
      />

      {/* ---------------- Story: portrait RIGHT, inverting the homepage ------- */}
      {/* `lifted` is the lightest ground in the ramp. Long prose sits on it so
          body copy is raised slightly out of the page, which matters more on
          dark than on light: light-on-dark text blooms, and a fractionally
          lighter ground reduces the halo. */}
      <Section surface="lifted" spacing="loose" labelledBy="story-heading">
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading
                  id="story-heading"
                  eyebrow={about.story.eyebrow}
                  size="display-2"
                  mark
                >
                  {about.story.heading}
                </SectionHeading>
                <div className="mt-10 space-y-6">
                  {about.story.body.map((p) => (
                    <p key={p} className="max-w-copy text-bone-dim">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Offset down so the columns do not align. */}
            <div className="lg:col-span-5 lg:col-start-8 lg:mt-20">
              <ImageReveal>
                <Figure
                  src={images.portrait.src}
                  alt={images.portrait.alt}
                  ratio="editorial"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  credit="Placeholder photography"
                />
              </ImageReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Approach: sticky heading + ruled list --------------- */}
      <Section spacing="loose" labelledBy="approach-heading">
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <Reveal>
                  <SectionHeading
                    id="approach-heading"
                    eyebrow={about.approach.eyebrow}
                    size="display-2"
                    mark
                    lead={about.approach.lead}
                  >
                    {about.approach.heading}
                  </SectionHeading>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <RevealGroup as="ul" className="rule-t" stagger={0.07}>
                {about.approach.points.map((point, i) => (
                  <RevealItem as="li" key={point.title} className="rule-b py-7">
                    <div className="flex items-start gap-5 sm:gap-8">
                      <span className="text-eyebrow nums-tabular text-bone-faint mt-1.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-h3 font-display">{point.title}</h3>
                        <p className="text-small text-bone-dim mt-2 max-w-[48ch]">
                          {point.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Wellbeing + the honest credentials block ------------ */}
      <Section surface="deep" spacing="loose" labelledBy="wellbeing-heading">
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading
                  id="wellbeing-heading"
                  eyebrow={about.wellbeing.eyebrow}
                  size="display-2"
                  mark
                >
                  <span>{about.wellbeing.heading}</span>
                </SectionHeading>
                <div className="mt-10 space-y-6">
                  {about.wellbeing.body.map((p) => (
                    <p key={p} className="max-w-copy text-bone-dim">
                      {p}
                    </p>
                  ))}
                </div>
                {/* Explicit non-claim. Kept visually quiet but always present. */}
                <p className="text-micro text-bone-dim/80 rule-t mt-10 max-w-[52ch] pt-5">
                  {about.wellbeing.disclaimer}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.08}>
                {/* Same treatment as the programme details rail: the outline
                    heading is hidden, the visible label is not a heading. */}
                <h3 className="sr-only">Training and credentials</h3>
                <p aria-hidden="true" className="text-eyebrow text-bone-dim uppercase">
                  Training &amp; credentials
                </p>
                {hasCredentials ? (
                  <ul className="mt-5 space-y-3">
                    {[...about.credentials, ...about.training].map((c) => (
                      <li key={c} className="text-small rule-b pb-3">
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5">
                    <Badge tone="placeholder">None supplied yet</Badge>
                    <p className="text-micro text-bone-dim/80 mt-4 max-w-[34ch]">
                      No qualifications are listed because none have been provided.
                      Nothing will be shown here until it can be evidenced.
                    </p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Close ---------------------------------------------- */}
      <Section surface="raised" spacing="loose">
        <Container>
          <div className="lg:w-8/12">
            <Reveal>
              {/* display-2, not display-1. On interior pages the page title is
                  itself display-1, so a display-1 closing CTA tied with the h1
                  and flattened the hierarchy. The homepage can use display-1
                  here only because its hero sits a step above at --text-hero. */}
              <h2 className="text-display-2 font-display optical-left max-w-[16ch] text-balance">
                {about.cta.heading}
              </h2>
              <p className="text-lead text-bone-dim mt-7 max-w-[40ch]">
                {about.cta.lead}
              </p>
              <div className="mt-11 flex flex-wrap items-center gap-4">
                <PrimaryCta size="lg" />
                <Button href="/contact" variant="quiet">
                  {siteConfig.cta.primaryLabel}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
