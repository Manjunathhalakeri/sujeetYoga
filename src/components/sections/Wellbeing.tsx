import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Mark } from '@/components/ui/Rule';
import { Chakra } from '@/components/art/Chakra';
import type { Chakra as ChakraData } from '@/content/chakras';
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
/** Which chakra marks which pillar, ascending. Four pillars, so root to heart. */
const SPINE: ChakraData['id'][] = ['muladhara', 'svadhisthana', 'manipura', 'anahata'];

export function Wellbeing() {
  const { wellbeing } = home;

  return (
    <>
      {/* Full-bleed band. Fixed viewport-relative height so it reads as a
          horizon line between two sections rather than as a hero. */}
      <div className="img-duotone vignette bg-ink-raised relative h-[38vh] min-h-56 w-full overflow-hidden md:h-[52vh]">
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
          {/* Heading is centred and the pillars fall into a spine beneath it —
              replacing the narrow-left-channel + ruled-list device this section
              used to share with Programmes, About/Approach and Schedule.
              Four items on a centre line, alternating side, reads as a path up
              the body, which is what the section is actually about. */}
          <Reveal>
            <div className="max-w-measure mx-auto text-center">
              <Mark className="mx-auto mb-5" />
              <Eyebrow className="mb-4">{wellbeing.eyebrow}</Eyebrow>
              <h2
                id="wellbeing-heading"
                className="text-display-2 font-display text-balance"
              >
                {wellbeing.heading}
              </h2>
              <p className="text-lead text-bone-dim mx-auto mt-6 max-w-[38ch]">
                {wellbeing.lead}
              </p>
            </div>
          </Reveal>

          <RevealGroup as="ul" className="mt-section relative" stagger={0.09}>
            {/* The spine. Hidden below lg, where the alternation collapses and
                a centre line would have nothing to centre. */}
            <span
              aria-hidden="true"
              className="bg-hairline absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
            />

            {wellbeing.pillars.map((pillar, i) => {
              const left = i % 2 === 0;
              return (
                <RevealItem
                  as="li"
                  key={pillar.title}
                  className="relative grid gap-4 py-8 lg:grid-cols-2 lg:gap-x-16 lg:py-10"
                >
                  {/* Chakra mark sits on the spine at desktop, inline on mobile.
                      Ascending order: pillar 1 takes the root, pillar 4 the heart. */}
                  <span
                    aria-hidden="true"
                    className="bg-ink-deep relative z-10 flex h-12 w-12 items-center justify-center rounded-full lg:absolute lg:top-10 lg:left-1/2 lg:-translate-x-1/2"
                  >
                    <Chakra id={SPINE[i] ?? 'muladhara'} size={40} />
                  </span>

                  <div
                    className={
                      left
                        ? 'lg:col-start-1 lg:pr-10 lg:text-right'
                        : 'lg:col-start-2 lg:pl-10'
                    }
                  >
                    <h3 className="text-h3 font-display">{pillar.title}</h3>
                    <p
                      className={
                        'text-small text-bone-dim mt-2 max-w-[44ch]' +
                        (left ? ' lg:ml-auto' : '')
                      }
                    >
                      {pillar.body}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
