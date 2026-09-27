'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DURATION, EASE } from '@/lib/motion';
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
 */
export function Hero() {
  const reduced = useReducedMotion();
  const { hero } = home;

  // Line masks cannot be expressed with the shared <Reveal>, so the hero uses
  // its own variants. This is the one component allowed to.
  const line = {
    hidden: reduced ? { opacity: 0 } : { y: '110%' },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: reduced ? DURATION.quick : DURATION.slow,
        ease: EASE,
        delay: reduced ? 0 : 0.15 + i * 0.09,
      },
    }),
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="pb-section relative overflow-hidden pt-[calc(var(--header-h)+2rem)] lg:pt-[calc(var(--header-h)+4rem)] lg:pb-0"
    >
      <Container className="lg:grid lg:min-h-[86vh] lg:grid-cols-12 lg:items-center lg:gap-x-10">
        {/* ---------------- Type ---------------- */}
        <div className="lg:pb-section relative z-10 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.base, ease: EASE }}
          >
            <Eyebrow className="text-clay">{hero.eyebrow}</Eyebrow>
          </motion.div>

          <h1
            id="hero-heading"
            className="text-hero font-display optical-left mt-6 text-balance"
          >
            {hero.headlineLines.map((text, i) => (
              // Each line gets its own mask so the reveal reads as typesetting.
              <span key={text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  // data-reveal is what the <noscript> rule in layout.tsx
                  // targets. Without it a failed or blocked script would leave
                  // the h1 — the page's most important text and its LCP
                  // element — permanently hidden behind its own mask.
                  data-reveal=""
                  className="block"
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.base,
              ease: EASE,
              delay: reduced ? 0 : 0.5,
            }}
          >
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
          </motion.div>
        </div>

        {/* ---------------- Photograph ----------------
            Bleeds to the right edge of the viewport at lg and above by
            escaping the container gutter. Below lg it becomes a normal
            full-width block under the type. */}
        <div className="mt-14 lg:col-span-6 lg:mt-0 lg:self-stretch">
          <motion.div
            // The image starts BELOW the header rather than at the section top.
            // Running it to the very top put the navigation on top of
            // photography, where stone-on-photo failed contrast and looked
            // accidental. Starting at --header-h keeps the right-edge bleed but
            // leaves the nav on the ivory ground.
            className="img-frame img-duotone vignette relative aspect-[4/5] w-full sm:aspect-[3/2] lg:absolute lg:top-[var(--header-h)] lg:right-0 lg:bottom-0 lg:aspect-auto lg:h-auto lg:w-[48vw]"
            initial={
              reduced ? { opacity: 0 } : { opacity: 1, clipPath: 'inset(0 0 100% 0)' }
            }
            animate={
              reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
            }
            transition={{
              duration: reduced ? DURATION.base : DURATION.reveal,
              ease: EASE,
              delay: reduced ? 0 : 0.1,
            }}
          >
            <motion.div
              className="h-full w-full"
              initial={reduced ? undefined : { scale: 1.06 }}
              animate={reduced ? undefined : { scale: 1 }}
              transition={{
                duration: reduced ? 0 : DURATION.reveal,
                ease: EASE,
                delay: reduced ? 0 : 0.1,
              }}
            >
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                fill
                // The only priority image on the page — it is the LCP element.
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
