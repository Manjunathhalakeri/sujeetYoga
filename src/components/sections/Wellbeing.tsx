import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { images } from '@/content/assets';
import { home } from '@/content/home';

/**
 * HOLISTIC WELLBEING — the page's one full-bleed moment.
 *
 * A wide band of photography runs edge to edge, then the dark moss section
 * carries four pillars as a ruled list. This is the only full-bleed image on
 * the homepage; using it once makes it an event rather than a device.
 *
 * The pillars are a two-column ruled list rather than four cards — same reason
 * as the programmes section. The heading stays in a narrow left channel so the
 * asymmetry holds even on the dark ground.
 */
export function Wellbeing() {
  const { wellbeing } = home;

  return (
    <>
      {/* Full-bleed band. Fixed viewport-relative height so it reads as a
          horizon line between two sections rather than as a hero. */}
      <div className="bg-ink-raised relative h-[38vh] min-h-56 w-full overflow-hidden md:h-[52vh]">
        <Image
          src={images.landscape.src}
          alt={images.landscape.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Section
        id="wellbeing"
        surface="deep"
        spacing="loose"
        labelledBy="wellbeing-heading"
      >
        <Container>
          <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading
                  id="wellbeing-heading"
                  eyebrow={wellbeing.eyebrow}
                  size="display-2"
                  mark
                >
                  <span>{wellbeing.heading}</span>
                </SectionHeading>
                <p className="text-lead text-bone-dim mt-6 max-w-[34ch]">
                  {wellbeing.lead}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <RevealGroup as="ul" className="rule-t" stagger={0.07}>
                {wellbeing.pillars.map((pillar, i) => (
                  <RevealItem as="li" key={pillar.title} className="rule-b py-7">
                    <div className="flex items-start gap-5 sm:gap-8">
                      <span className="text-eyebrow nums-tabular text-bone-dim/70 mt-1.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-h3 font-display">{pillar.title}</h3>
                        <p className="text-small text-bone-dim mt-2 max-w-[48ch]">
                          {pillar.body}
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
    </>
  );
}
