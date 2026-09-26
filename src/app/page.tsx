import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Instructor } from '@/components/sections/Instructor';
import { Programs } from '@/components/sections/Programs';
import { Wellbeing } from '@/components/sections/Wellbeing';
import { Community } from '@/components/sections/Community';
import { Feed } from '@/components/sections/Feed';
import { FinalCta } from '@/components/sections/FinalCta';
import { siteConfig } from '@/content/siteConfig';

export const metadata: Metadata = {
  // The homepage overrides the title template so it does not read
  // "Home · Sujit" — the default from layout.tsx is already correct here.
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.shortDescription}`,
  },
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

/**
 * HOMEPAGE
 *
 * Narrative order, as agreed:
 *   Sujit → philosophy → practice → wellbeing → programmes → community → connection
 *
 * Composition notes for whoever edits this next — the rhythm is deliberate and
 * alternating, and it is the thing that keeps the page from reading as a
 * template. Section by section, where the weight sits:
 *
 *   Hero        type left  · photograph bleeding right   · ivory
 *   Philosophy  statement indented right, empty left channel · ivory
 *   Instructor  portrait LEFT and dropped · text right   · ivory-300
 *   Programmes  sticky heading left · ruled list right    · ivory
 *   Wellbeing   full-bleed band, then heading left · pillars right · moss
 *   Community   heading left · pull quotes right, offset  · ivory
 *   Feed        heading left · image rail bleeding right  · ivory-300
 *   Final CTA   single left-weighted statement            · ivory-300
 *
 * The weight never sits in the same place twice in a row, and no section is
 * centred. Ground tone alternates ivory / ivory-300 with one dark moment.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Instructor />
      <Programs />
      <Wellbeing />
      <Community />
      <Feed />
      <FinalCta />
    </>
  );
}
