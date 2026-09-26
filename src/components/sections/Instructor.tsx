import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { Figure } from '@/components/ui/Figure';
import { Badge } from '@/components/ui/Badge';
import { TextLink } from '@/components/ui/TextLink';
import { images } from '@/content/assets';
import { home } from '@/content/home';
import { siteConfig } from '@/content/siteConfig';

/**
 * MEET SUJIT — the section that makes the brand a person rather than a studio.
 *
 * Composition: portrait on the LEFT this time, inverting the hero's weighting so
 * the eye is not walked down a single edge of the page. The portrait is pushed
 * DOWN relative to the text, and a narrow facts rail runs beneath it — the same
 * rail device as the hero, reused rather than reinvented.
 *
 * Credentials are rendered only if `home.instructor.credentials` has entries.
 * That array is deliberately empty: no qualification will be displayed until a
 * real one is supplied.
 */
export function Instructor() {
  const { instructor } = home;

  return (
    <Section
      id="instructor"
      surface="alt"
      spacing="loose"
      labelledBy="instructor-heading"
    >
      <Container>
        <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
          {/* Portrait — offset downward so the two columns do not align. */}
          <div className="lg:col-span-5 lg:mt-24">
            <ImageReveal>
              <Figure
                src={images.portrait.src}
                alt={images.portrait.alt}
                ratio="editorial"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </ImageReveal>

            <Reveal delay={0.08}>
              <dl className="bg-hairline mt-8 grid grid-cols-1 gap-px">
                {instructor.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="bg-ivory-300 flex items-baseline justify-between gap-6 py-3"
                  >
                    <dt className="text-eyebrow text-stone-400 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-small text-charcoal">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Text — starts higher than the portrait. */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <SectionHeading
                id="instructor-heading"
                eyebrow={instructor.eyebrow}
                size="display-2"
                mark
              >
                {instructor.heading}
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-10 space-y-6">
                {instructor.body.map((paragraph) => (
                  <p key={paragraph} className="max-w-copy text-stone">
                    {paragraph}
                  </p>
                ))}
              </div>

              {instructor.credentials.length > 0 ? (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {instructor.credentials.map((c) => (
                    <li key={c}>
                      <Badge tone="moss">{c}</Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                // Explicit, visible, and honest: nothing has been claimed.
                <p className="mt-8">
                  <Badge tone="placeholder">
                    No credentials shown — none supplied yet
                  </Badge>
                </p>
              )}

              <p className="mt-10">
                <TextLink href="/about">Read more about {siteConfig.name}</TextLink>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
