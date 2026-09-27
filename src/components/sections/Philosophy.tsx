import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Mark } from '@/components/ui/Rule';
import { LotusDivider } from '@/components/art/LotusDivider';
import { Reveal } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { Figure } from '@/components/ui/Figure';
import { images } from '@/content/assets';
import { home } from '@/content/home';

/**
 * PHILOSOPHY — the statement section.
 *
 * Composition: the statement is indented into columns 4–12, leaving an empty
 * left channel occupied only by a short eyebrow and accent mark. That empty
 * channel is the point — it gives the statement somewhere to breathe and sets
 * up the offset rhythm the rest of the page follows.
 *
 * The photograph is deliberately narrow, monochrome and pushed low, so it reads
 * as a margin note rather than as a second focal point competing with the type.
 */
export function Philosophy() {
  const { philosophy } = home;

  return (
    <Section id="philosophy" spacing="loose" labelledBy="philosophy-heading">
      <Container>
        <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
          {/* Left channel — kept almost empty on purpose. */}
          <div className="lg:col-span-3">
            <Reveal>
              <Mark className="mb-5" />
              <Eyebrow>{philosophy.eyebrow}</Eyebrow>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal delay={0.05}>
              <h2
                id="philosophy-heading"
                className="text-display-2 font-display max-w-[19ch] text-balance"
              >
                {philosophy.statement}
              </h2>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <LotusDivider className="mt-section" />
        </Reveal>

        {/* Body copy and the margin image, offset from each other vertically. */}
        <div className="mt-section gap-block grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4 lg:col-start-3 lg:-mt-16">
            <ImageReveal>
              <Figure
                src={images.stillnessMono.src}
                alt={images.stillnessMono.alt}
                ratio="editorial"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </ImageReveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="space-y-6">
                {philosophy.body.map((paragraph) => (
                  <p key={paragraph} className="max-w-copy text-bone-dim">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
