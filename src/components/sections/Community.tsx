import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { testimonials } from '@/content/testimonials';
import { home } from '@/content/home';

/**
 * COMMUNITY — testimonials, set as pull quotes rather than cards.
 *
 * Composition: the first quote is given a full, oversized treatment across the
 * right nine columns; the remaining two sit beneath it in a narrower pair,
 * offset so the block is not a tidy row of three. Quotes are separated by
 * hairlines only — no boxes, no avatars, no star ratings.
 *
 * ⚠ The quotes are placeholders and each one renders a visible badge saying so.
 * If `testimonials` is emptied, this section removes itself entirely, which is
 * the correct behaviour until real, permissioned quotes exist.
 */
export function Community() {
  if (testimonials.length === 0) return null;

  const [featured, ...rest] = testimonials;
  if (!featured) return null;

  return (
    <Section id="community" spacing="loose" labelledBy="community-heading">
      <Container>
        <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <Reveal>
              <SectionHeading
                id="community-heading"
                eyebrow={home.community.eyebrow}
                size="h2"
                mark
              >
                {home.community.heading}
              </SectionHeading>
              <p className="text-micro text-stone mt-6">{home.community.note}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <figure className="rule-b pb-10">
                <blockquote>
                  <p className="text-display-2 font-display text-balance">
                    <span aria-hidden="true" className="text-clay-400">
                      “
                    </span>
                    {featured.quote}
                    <span aria-hidden="true" className="text-clay-400">
                      ”
                    </span>
                  </p>
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="text-small text-stone">{featured.attribution}</span>
                  {featured.isPlaceholder ? (
                    <Badge tone="placeholder">Placeholder</Badge>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>

            {rest.length > 0 ? (
              <RevealGroup className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {rest.map((t, i) => (
                  // Second quote is nudged down so the pair is not level.
                  <RevealItem key={t.id} className={i === 1 ? 'sm:mt-12' : undefined}>
                    <figure>
                      <blockquote>
                        <p className="text-h3 font-display text-balance">{t.quote}</p>
                      </blockquote>
                      <figcaption className="mt-5 flex flex-wrap items-center gap-3">
                        <span className="text-micro text-stone">{t.attribution}</span>
                        {t.isPlaceholder ? (
                          <Badge tone="placeholder">Placeholder</Badge>
                        ) : null}
                      </figcaption>
                    </figure>
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
