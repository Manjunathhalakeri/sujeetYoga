import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { LotusDivider } from '@/components/art/LotusDivider';
import { ChakraStrip } from '@/components/art/Chakra';
import { home } from '@/content/home';

/**
 * THE SUBTLE BODY — the seven chakras as a strip.
 *
 * Composition: **centred**, on purpose. By this point the page has used a
 * narrow-left-channel-plus-right-column arrangement three times; a centred,
 * symmetrical band is the strongest available contrast to it and gives the eye
 * somewhere flat to rest between two dense sections. Symmetry earns its place
 * here precisely because nothing either side of it is symmetrical.
 *
 * The artwork is decorative — every chakra is `aria-hidden` — and the names
 * beneath carry the meaning for anyone not seeing it.
 *
 * ⚠ Framing only. Nothing here states or implies a health outcome.
 */
export function Chakras() {
  const { chakras: copy } = home;

  return (
    <Section
      id="subtle-body"
      surface="raised"
      spacing="loose"
      labelledBy="chakras-heading"
    >
      <Container>
        <Reveal>
          <div className="max-w-measure mx-auto text-center">
            <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
            <h2 id="chakras-heading" className="text-display-2 font-display text-balance">
              {copy.heading}
            </h2>
            <p className="text-lead text-bone-dim mx-auto mt-6 max-w-[40ch]">
              {copy.lead}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <LotusDivider className="mt-14" />
        </Reveal>

        <Reveal delay={0.1}>
          <ChakraStrip className="mt-14 gap-x-6" />
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-micro text-bone-faint mx-auto mt-14 max-w-[52ch] text-center">
            {copy.note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
