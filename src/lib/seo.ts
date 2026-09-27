import { siteConfig } from '@/content/siteConfig';

/**
 * ONE ANSWER TO "MAY SEARCH ENGINES INDEX THIS YET?"
 *
 * Same guardrail pattern as lib/contact.ts: the question is asked in one place
 * so no surface has to remember to check, and going live is a data edit rather
 * than a code change.
 *
 * TWO independent conditions must both hold, because there are two separate
 * ways to publish something embarrassing:
 *
 *   1. The content is still placeholder. Indexing "TODO: email address" under
 *      a real teacher's name is hard to undo — removal from Google is slow,
 *      and the cached snippet outlives the fix.
 *   2. The production domain is still unknown. While siteConfig.url is
 *      example.com, every canonical URL and OG image points at a domain the
 *      client does not own. That is worse than having no canonical at all,
 *      and a sitemap full of example.com URLs is worse still.
 *
 * Requiring both means flipping `isPlaceholder` to false without setting the
 * real domain does NOT open the site to crawlers. That mistake is likely
 * precisely because the two edits live in different parts of siteConfig.
 */

/*
 * Both widened to `boolean` deliberately.
 *
 * siteConfig is declared `as const`, so `isPlaceholder` has the literal type
 * `true`, not `boolean`. Left alone, TypeScript would narrow every "we are
 * live" branch below to dead code: the live path would never be type-checked,
 * and an error on it would not surface until the day someone flips the flag —
 * which is the worst possible day to find out.
 */
const placeholderContent: boolean = siteConfig.isPlaceholder;
const placeholderDomain: boolean = siteConfig.url.includes('example.com');

/** True only once the content is real AND the domain is real. */
export const canIndex: boolean = !placeholderContent && !placeholderDomain;

/** Which condition is still blocking, for the robots.txt comment and for humans. */
export function indexingBlockedBy(): string[] {
  const reasons: string[] = [];
  if (placeholderContent) reasons.push('siteConfig.isPlaceholder is true');
  if (placeholderDomain) reasons.push('siteConfig.url is still a placeholder domain');
  return reasons;
}
