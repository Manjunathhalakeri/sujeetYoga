import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/siteConfig';
import { canIndex, indexingBlockedBy } from '@/lib/seo';

/**
 * robots.txt, generated at build time.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ READ THIS BEFORE "FIXING" THE PRE-LAUNCH RULE TO `Disallow: /`.
 *
 * While the site is not ready, this file ALLOWS crawling. That looks like the
 * opposite of what it should do, and it is deliberate.
 *
 * robots.txt controls CRAWLING, not INDEXING — Google documents this
 * explicitly. The two come apart in a way that matters here:
 *
 *   `Disallow: /`  Googlebot never fetches the page, so it never reads the
 *                  `noindex` in the <head>. If the URL is discovered any other
 *                  way — a shared WhatsApp link, the GitHub repo, a directory
 *                  scraper — it can still be indexed, as a bare URL with no
 *                  snippet, and there is then no way to tell Google to drop it
 *                  short of Search Console. Blocking the crawl removes the
 *                  only instruction that actually works.
 *
 *   allow + noindex  Googlebot fetches the page, reads
 *                  `<meta name="robots" content="noindex, nofollow">` from
 *                  layout.tsx, and keeps it out of the index. This is the
 *                  supported mechanism, and it is self-healing: the tag
 *                  disappears the moment the content is real.
 *
 * So the pre-launch protection is the noindex tag in layout.tsx, NOT this
 * file. This file's job before launch is simply to stay out of the way of it.
 * If you want the site genuinely unreachable, use HTTP auth at the host — a
 * robots rule is not an access control and never has been.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Both states are derived from siteConfig via lib/seo, so launching is a data
 * edit. Nothing here needs touching.
 */
export default function robots(): MetadataRoute.Robots {
  if (!canIndex) {
    /*
     * Say so in the build log, every build.
     *
     * The failure this prevents is a quiet one: the site launches, weeks pass,
     * and nobody notices it was never indexable because nothing anywhere said
     * so out loud. A line in the deploy output is seen by whoever is watching
     * the deploy — which on launch day is somebody.
     */
    const blockers = indexingBlockedBy()
      .map((reason) => '      - ' + reason)
      .join('\n');
    console.warn(
      '\n  ⚠ robots.txt: this build is NOT indexable.\n' +
        blockers +
        '\n    Pages also carry <meta name="robots" content="noindex">.\n',
    );

    // Crawling allowed on purpose — see above. No sitemap advertised, because
    // its URLs are only as real as siteConfig.url.
    return {
      rules: { userAgent: '*', allow: '/' },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Internal design documentation. Already carries its own noindex; this
      // keeps it out of the crawl as well, since it is not content for
      // visitors and has no reason to consume crawl budget.
      disallow: '/design-system',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
