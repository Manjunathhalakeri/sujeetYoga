import type { Metadata } from 'next';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Mark } from '@/components/ui/Rule';
import { LotusDivider } from '@/components/art/LotusDivider';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Figure } from '@/components/ui/Figure';
import { TextLink } from '@/components/ui/TextLink';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { images } from '@/content/assets';
import { getProgram, isTodo, programs } from '@/content/programs';
import { siteConfig } from '@/content/siteConfig';

/**
 * PROGRAMME DETAIL — one reusable template for every programme.
 *
 * This route is the whole point of the /programs/[slug] architecture: adding a
 * programme to content/programs.ts produces a fully-formed, statically
 * generated, individually indexable page with no further work.
 *
 * - `generateStaticParams` prerenders every slug at build time.
 * - `generateMetadata` gives each programme its own title, description and
 *   canonical URL, which is what makes "kids yoga" findable on its own terms.
 * - `dynamicParams = false` returns a 404 for any slug not in the data, rather
 *   than rendering an empty shell.
 *
 * Any detail value still reading "TODO:" renders as a visible placeholder badge
 * instead of as though it were a real fact.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};

  return {
    title: program.title,
    // Placeholder copy until real programme text exists; never fabricated.
    description: program.summary,
    alternates: { canonical: `/programs/${program.slug}` },
    openGraph: {
      title: `${program.title} · ${siteConfig.name}`,
      description: program.summary,
      images: [{ url: images[program.image].src }],
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const index = programs.findIndex((p) => p.slug === program.slug);
  const next = programs[(index + 1) % programs.length];

  return (
    <>
      <PageHeader
        eyebrow={
          <TextLink href="/programs" className="text-bone-dim hover:text-bone">
            <ArrowLeft
              size={13}
              strokeWidth={1.75}
              className="mr-1.5 inline align-[-1px]"
            />
            All programmes
          </TextLink>
        }
        heading={program.title}
        lead={program.intro}
      >
        <div className="flex flex-wrap items-center gap-2">
          {program.meta.map((m) => (
            <Badge key={m} tone="neutral">
              {m}
            </Badge>
          ))}
          {program.isPlaceholder ? <Badge tone="placeholder">Placeholder</Badge> : null}
        </div>
      </PageHeader>

      {/* ---------------- Lead image, bleeding right ------------------------- */}
      <Section spacing="none" className="pb-section">
        <Container flush width="full">
          <div className="pl-gutter lg:pl-[max(var(--spacing-gutter),calc((100vw-77.5rem)/2+var(--spacing-gutter)))]">
            <ImageReveal>
              <Figure
                src={images[program.image].src}
                alt={images[program.image].alt}
                ratio="wide"
                sizes="100vw"
                className="vignette"
                credit="Placeholder photography"
              />
            </ImageReveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Body + details rail -------------------------------- */}
      {/* Reading surface — see the note on About. */}
      <Section surface="lifted" spacing="default" labelledBy="about-program">
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 id="about-program" className="sr-only">
                  About {program.title}
                </h2>
                <div className="space-y-6">
                  {program.body.map((p) => (
                    <p key={p} className="max-w-copy text-bone-dim">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Details rail — the same device used in the hero and About page. */}
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.06}>
                {/* The heading that carries the document outline is hidden and
                    properly named; the visible 12px word is an editorial label,
                    not a heading. A 12px h2 sitting between an 84px h1 and 56px
                    siblings was semantically convenient but structurally wrong. */}
                <h2 className="sr-only">Programme details</h2>
                <p
                  aria-hidden="true"
                  className="text-eyebrow rule-t text-bone-faint pt-6 uppercase"
                >
                  Details
                </p>
                <dl className="mt-5">
                  {program.details.map((d) => (
                    <div
                      key={d.label}
                      className="rule-b flex items-baseline justify-between gap-6 py-3"
                    >
                      <dt className="text-small text-bone-dim">{d.label}</dt>
                      <dd className="text-small text-bone text-right">
                        {isTodo(d.value) ? (
                          <Badge tone="placeholder">{d.value}</Badge>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8">
                  <Button href="/contact" block>
                    Enquire about {program.title.toLowerCase()}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- What to expect ------------------------------------- */}
      {/* Horizontal steps, not the left-channel + ruled-list device used on
          Programmes, About/Approach and Schedule. `expect` is always a short
          ordered sequence, so laying it left-to-right with lotus dividers
          between the stages says "this is what happens in order" far more
          directly than a stacked list, and it breaks a pattern that had begun
          to read as a template. Collapses to a stack below md. */}
      <Section surface="raised" spacing="loose" labelledBy="expect-heading">
        <Container>
          <Reveal>
            <div className="max-w-measure mx-auto text-center">
              <Mark className="mx-auto mb-5" />
              <Eyebrow className="mb-4">What to expect</Eyebrow>
              <h2
                id="expect-heading"
                className="text-display-2 font-display text-balance"
              >
                A session, start to finish.
              </h2>
            </div>
          </Reveal>

          <RevealGroup
            as="ol"
            className="mt-section grid gap-y-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-y-0"
            stagger={0.09}
          >
            {program.expect.map((item, i) => (
              <Fragment key={item.title}>
                {i > 0 ? (
                  <li aria-hidden="true" className="hidden self-center px-4 md:block">
                    <LotusDivider className="w-16" petals={6} />
                  </li>
                ) : null}
                <RevealItem as="li" className="text-center md:px-4">
                  <span className="text-eyebrow nums-tabular text-bone-faint block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-h3 font-display mt-3">{item.title}</h3>
                  <p className="text-small text-bone-dim mx-auto mt-3 max-w-[32ch]">
                    {item.body}
                  </p>
                </RevealItem>
              </Fragment>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------- Who it suits + optional second image --------------- */}
      <Section spacing="loose" labelledBy="suited-heading">
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            {program.secondaryImage ? (
              <div className="lg:col-span-5 lg:mt-16">
                <ImageReveal>
                  <Figure
                    src={images[program.secondaryImage].src}
                    alt={images[program.secondaryImage].alt}
                    ratio="editorial"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </ImageReveal>
              </div>
            ) : null}

            <div
              className={
                program.secondaryImage ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-8'
              }
            >
              <Reveal>
                <SectionHeading
                  id="suited-heading"
                  eyebrow="Who it suits"
                  size="display-2"
                  mark
                >
                  Is this the right fit?
                </SectionHeading>
                <ul className="rule-t mt-10">
                  {program.suitedTo.map((s) => (
                    <li key={s} className="rule-b text-bone-dim py-4">
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-micro text-bone-faint mt-6 max-w-[46ch]">
                  Placeholder guidance. If you are unsure, say so in an enquiry — no
                  experience is assumed.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Next programme + CTA ------------------------------- */}
      <Section surface="deep" spacing="loose">
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Reveal>
                {/* display-2: the page h1 is already display-1. */}
                <h2 className="text-display-2 font-display optical-left max-w-[16ch] text-balance">
                  Begin where you are.
                </h2>
                <div className="mt-11 flex flex-wrap items-center gap-4">
                  <Button
                    href="/contact"
                    size="lg"
                    icon={<ArrowRight size={17} strokeWidth={1.75} />}
                  >
                    {siteConfig.cta.primaryLabel}
                  </Button>
                </div>
              </Reveal>
            </div>

            {next && next.slug !== program.slug ? (
              <div className="lg:col-span-4 lg:col-start-9">
                <Reveal delay={0.06}>
                  <p className="text-eyebrow text-bone-dim rule-t pt-6 uppercase">
                    Next programme
                  </p>
                  <Link
                    href={`/programs/${next.slug}`}
                    className="group mt-4 block rounded-xs"
                  >
                    <span className="text-h3 font-display group-hover:text-bone-dim transition-colors">
                      {next.title}
                    </span>
                    <span className="text-small text-bone-dim mt-2 block">
                      {next.summary}
                    </span>
                  </Link>
                </Reveal>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
