import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/siteConfig';
import { programs } from '@/content/programs';

/**
 * sitemap.xml, generated at build time.
 *
 * Programme URLs come from content/programs.ts — the same source
 * generateStaticParams uses — so adding a programme adds its sitemap entry
 * automatically. A hand-maintained list here would silently drift the first
 * time someone adds a programme and does not think about SEO.
 *
 * /design-system is deliberately absent: it is internal documentation, not a
 * page for visitors.
 *
 * ── On what is NOT here ────────────────────────────────────────────────────
 *
 * No `changeFrequency` and no `priority`. Google ignores both outright, and
 * has said so for years; they survive in most sitemaps as cargo cult. Emitting
 * them would suggest this file carries information that it does not.
 *
 * No `lastModified` either, which is the less obvious omission. The only date
 * available at build time is the build itself, so every page would claim to
 * have changed on every deploy — including deploys that only touched CSS. A
 * lastmod that is wrong on most pages is worse than no lastmod: Google weighs
 * the signal by how accurate it has proven, so a blanket build date teaches it
 * to distrust the whole file. Add real per-page dates here if the content ever
 * grows a `updatedAt` field worth trusting.
 *
 * While siteConfig.url is still a placeholder these URLs point at
 * example.com. That is harmless — robots.txt does not advertise this file
 * before launch, and nothing submits it — and it means the sitemap is exercised
 * on every build now rather than running for the first time on launch day.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/about',
    '/programs',
    '/schedule',
    '/workshops',
    '/contact',
    ...programs.map((program) => `/programs/${program.slug}`),
  ];

  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }));
}
