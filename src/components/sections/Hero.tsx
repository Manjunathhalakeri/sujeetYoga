'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DURATION, EASE, gsap, useGSAP } from '@/lib/motion';
import { Mandala } from '@/components/art/Mandala';
import { images } from '@/content/assets';
import { home } from '@/content/home';

/**
 * HERO — asymmetric, image bleeding to the right edge.
 *
 * Composition:
 * - A 12-column grid. Type occupies columns 1–6; the photograph occupies 7–12
 *   and runs to the right edge of the viewport, not to the container edge, so
 *   the page opens against a bleed rather than a boxed image.
 * - The image is taller than the type block and is pushed down slightly, so the
 *   two masses sit off-axis. Symmetry here is what makes a hero look like a
 *   template.
 * - A metadata rail sits under the type, low and quiet, giving the page
 *   somewhere to put facts once they exist.
 *
 * Motion (Tier 3, the only place on the page it is used at this weight):
 * - The headline animates line by line, each line rising out of its own
 *   overflow-hidden mask — so the words appear to be revealed rather than moved.
 * - The photograph unmasks upward while settling from a 6% over-scale.
 * Both run once, on load, on the shared brand curve. Under reduced motion the
 * masks and transforms are dropped and only opacity remains.
 *
 * One timeline drives the whole opening rather than five independently delayed
 * tweens — which is the main thing GSAP buys here. The sequence is expressed as
 * positions on a timeline instead of arithmetic on `delay`, so retiming the
 * hero means moving one label, not recalculating four numbers.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { hero } = home;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };
          const tl = gsap.timeline({ defaults: { ease: EASE } });

          if (reduced) {
            // Everything resolves as a plain fade, nothing moves.
            tl.fromTo(
              [
                '[data-hero-eyebrow]',
                '[data-hero-line]',
                '[data-hero-body]',
                '[data-hero-media]',
              ],
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: DURATION.quick, stagger: 0.04 },
            );
            return;
          }

          tl.fromTo(
            '[data-hero-eyebrow]',
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: DURATION.base },
            0,
          )
            // Each line rises out of its own mask. yPercent, not y, so the
            // travel scales with the line height rather than a fixed pixel.
            .fromTo(
              '[data-hero-line]',
              { yPercent: 110 },
              { yPercent: 0, duration: DURATION.slow, stagger: 0.09 },
              0.15,
            )
            .fromTo(
              '[data-hero-body]',
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: DURATION.base },
              0.5,
            )
            // Mask and scale share a start and a curve, so they read as one
            // gesture rather than two effects.
            .fromTo(
              '[data-hero-media]',
              { clipPath: 'inset(0% 0% 100% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.reveal },
              0.1,
            )
            .fromTo(
              '[data-hero-media-inner]',
              { scale: 1.06 },
              { scale: 1, duration: DURATION.reveal },
              0.1,
            );

          /* ---------------- scroll choreography (P4) ----------------
             The hero pins for 70% of a viewport. Short on purpose: a hero that
             holds for a full screen reads as a broken scroll on the very first
             gesture, which is the worst possible first impression.

             While pinned, the photograph drifts up and the type drifts down and
             fades — they separate, which is what sells depth. ease 'none' on a
             scrub is mandatory; any other curve breaks the 1:1 mapping between
             scroll position and progress. */
          gsap
            .timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: root.current,
                start: 'top top',
                end: '+=70%',
                pin: true,
                scrub: 0.6,
                // This is the first ScrollTrigger on the page; keep refresh
                // order top-to-bottom so pin spacing is calculated correctly.
                refreshPriority: 1,
              },
            })
            // Animate children of the pinned element, never the pinned element.
            .to('[data-hero-media-inner]', { yPercent: -12, scale: 1.06 }, 0)
            .to('[data-hero-type]', { y: 40, autoAlpha: 0.15 }, 0);

          /* Mandala: one very slow revolution, 4 minutes per turn.
             Ambient motion, which the system otherwise forbids — included at
             explicit request. `ease: 'none'` so it never appears to speed up or
             slow down, which is what would make it noticeable. It lives only in
             the no-preference branch, so reduced motion gets a static mandala. */
          gsap.to('[data-hero-mandala]', {
            rotation: 360,
            duration: 240,
            repeat: -1,
            ease: 'none',
            transformOrigin: '50% 50%',
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-heading"
      className="pb-section relative overflow-hidden pt-[calc(var(--header-h)+2rem)] lg:pt-[calc(var(--header-h)+4rem)] lg:pb-0"
    >
      {/* Mandala, behind everything. Anchored to the left of the type block and
          allowed to bleed off the top and left edges, so it reads as a partial
          impression rather than a badge centred on the page. Kept at 4.5%: the
          hero is the one place where nothing may compete with the headline. */}
      <div
        aria-hidden="true"
        data-hero-mandala=""
        className="pointer-events-none absolute -top-[18%] -left-[26%] z-0 h-[clamp(26rem,62vw,52rem)] w-[clamp(26rem,62vw,52rem)] opacity-[0.045] sm:-left-[14%] lg:-top-[24%] lg:left-[-10%]"
      >
        <Mandala />
      </div>

      <Container className="relative z-10 lg:grid lg:min-h-[86vh] lg:grid-cols-12 lg:items-center lg:gap-x-10">
        {/* ---------------- Type ---------------- */}
        <div data-hero-type="" className="lg:pb-section relative z-10 lg:col-span-6">
          <div data-hero-eyebrow="" data-reveal="">
            <Eyebrow className="text-clay">{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            id="hero-heading"
            className="text-hero font-display optical-left mt-6 text-balance"
          >
            {hero.headlineLines.map((text) => (
              // Each line gets its own mask so the reveal reads as typesetting.
              <span key={text} className="block overflow-hidden pb-[0.06em]">
                <span
                  // data-reveal is what the <noscript> rule in layout.tsx
                  // targets. Without it a failed or blocked script would leave
                  // the h1 — the page's most important text and its LCP
                  // element — permanently hidden behind its own mask.
                  data-reveal=""
                  data-hero-line=""
                  className="block"
                >
                  {text}
                </span>
              </span>
            ))}
          </h1>

          <div data-hero-body="" data-reveal="">
            <p className="text-lead text-bone-dim mt-8 max-w-[38ch]">{hero.lead}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                href={hero.primaryCta.href}
                size="lg"
                icon={<ArrowRight size={17} strokeWidth={1.75} />}
              >
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="quiet">
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* Metadata rail — quiet, factual, low in the composition. */}
            <dl className="rule-t mt-14 grid grid-cols-2 gap-x-8 gap-y-5 pt-6 sm:grid-cols-3">
              {hero.rail.map((item) => (
                <div key={item.label}>
                  <dt className="text-eyebrow text-bone-faint uppercase">{item.label}</dt>
                  <dd className="text-small text-bone mt-1.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ---------------- Photograph ----------------
            Bleeds to the right edge of the viewport at lg and above by
            escaping the container gutter. Below lg it becomes a normal
            full-width block under the type. */}
        <div className="mt-14 lg:col-span-6 lg:mt-0 lg:self-stretch">
          <div
            // The image starts BELOW the header rather than at the section top.
            // Running it to the very top put the navigation on top of
            // photography, where stone-on-photo failed contrast and looked
            // accidental. Starting at --header-h keeps the right-edge bleed but
            // leaves the nav on the ivory ground.
            data-hero-media=""
            data-reveal=""
            className="img-frame img-duotone vignette relative aspect-[4/5] w-full sm:aspect-[3/2] lg:absolute lg:top-[var(--header-h)] lg:right-0 lg:bottom-0 lg:aspect-auto lg:h-auto lg:w-[48vw]"
          >
            <div data-hero-media-inner="" className="h-full w-full">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                fill
                // The only priority image on the page — it is the LCP element.
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
