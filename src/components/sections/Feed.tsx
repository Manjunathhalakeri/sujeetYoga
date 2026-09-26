import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { images, type ImageKey } from '@/content/assets';
import { home } from '@/content/home';
import { siteConfig } from '@/content/siteConfig';

/**
 * RECENT / FEED — a horizontal run of images bleeding off the right edge.
 *
 * Composition: the heading holds a narrow left channel and the image rail runs
 * out of the container to the right, implying continuation rather than ending
 * neatly. On a phone that same rail becomes a real horizontal scroller with
 * scroll-snap — which is the one place a carousel is genuinely better than a
 * stack, and it costs no JavaScript.
 *
 * ⚠ NOT connected to Instagram. These are placeholder images reused from the
 * asset registry. Wiring a real feed needs either the Instagram Basic Display
 * API (access token, refresh job) or a manually curated list — a decision for a
 * later phase. Until then the section links nowhere and says so.
 */

// Deliberately reusing registry entries; these are replaced wholesale when real
// content arrives, so no new placeholder assets were introduced for this row.
const feedImages: ImageKey[] = [
  'practice',
  'space',
  'studioMono',
  'group',
  'stillnessMono',
  'portrait',
];

export function Feed() {
  const hasHandle = !home.feed.handle.startsWith('TODO');

  return (
    <Section id="recent" surface="alt" spacing="default" labelledBy="feed-heading">
      <Container>
        <div className="gap-block grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <Reveal>
              <SectionHeading
                id="feed-heading"
                eyebrow={home.feed.eyebrow}
                size="h2"
                mark
              >
                {home.feed.heading}
              </SectionHeading>
              <p className="mt-6">
                {hasHandle ? (
                  <span className="text-small text-stone">{home.feed.handle}</span>
                ) : (
                  <Badge tone="placeholder">{home.feed.handle}</Badge>
                )}
              </p>
              <p className="text-micro mt-4 max-w-[30ch] text-stone-400">
                Placeholder images. Not connected to a live feed.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Rail: starts at the container's left edge, runs past the right one. */}
      <Reveal className="mt-12">
        <ul
          className="pl-gutter flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-2 lg:gap-6 [&::-webkit-scrollbar]:hidden"
          // Align the first item with the page container on wide screens.
          style={{
            paddingInlineStart:
              'max(var(--spacing-gutter), calc((100vw - 77.5rem) / 2 + var(--spacing-gutter)))',
          }}
        >
          {feedImages.map((key, i) => (
            <li
              key={`${key}-${i}`}
              className="img-frame relative aspect-[4/5] w-[68vw] shrink-0 snap-start sm:w-[38vw] lg:w-[22vw] xl:w-[18vw]"
            >
              <Image
                src={images[key].src}
                alt=""
                fill
                sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 38vw, 68vw"
                className="object-cover"
              />
            </li>
          ))}
          {/* Trailing spacer so the last item can scroll clear of the edge. */}
          <li aria-hidden="true" className="w-gutter shrink-0" />
        </ul>
      </Reveal>
      <p className="sr-only">
        A row of photographs from {siteConfig.personName}&rsquo;s practice. Placeholder
        images.
      </p>
    </Section>
  );
}
