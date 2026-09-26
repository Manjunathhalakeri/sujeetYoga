import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mark } from '@/components/ui/Rule';
import { Reveal } from '@/components/ui/Reveal';
import { home } from '@/content/home';

/**
 * FINAL CTA
 *
 * The one section allowed to be simple. After a page of offset columns, the
 * close is a single large statement holding the left two-thirds, with the
 * actions directly beneath it — quiet, and easy to act on.
 *
 * Kept on the ivory ground rather than dark: the wellbeing band is already the
 * page's dark moment, and a second one here would make the footer feel like a
 * third. Rhythm is the reason, not decoration.
 */
export function FinalCta() {
  const { cta } = home;

  return (
    <Section id="enquire" surface="alt" spacing="loose" labelledBy="cta-heading">
      <Container>
        <div className="grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-8">
            <Reveal>
              <Mark className="mb-6" />
              <h2
                id="cta-heading"
                className="text-display-1 font-display optical-left max-w-[16ch] text-balance"
              >
                {cta.heading}
              </h2>
              <p className="text-lead text-stone mt-7 max-w-[42ch]">{cta.lead}</p>

              <div className="mt-11 flex flex-wrap items-center gap-4">
                <Button
                  href={cta.primaryCta.href}
                  size="lg"
                  icon={<ArrowRight size={17} strokeWidth={1.75} />}
                >
                  {cta.primaryCta.label}
                </Button>
                <Button href={cta.secondaryCta.href} variant="quiet">
                  {cta.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
