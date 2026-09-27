import { cn } from '@/lib/cn';

/**
 * Om — the actual character, U+0950 ॐ, set in a Devanagari face.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHY THIS IS NOT DRAWN AS SVG, HAVING TRIED
 *
 * The first version of this component hand-authored ॐ as bezier paths, so it
 * could share the artwork's stroke weight and gold. Three iterations were
 * rendered at 200px and compared: none of them read as ॐ. They read as
 * decorative squiggles — recognisable as "something Indian" and as nothing
 * more.
 *
 * A bad approximation of a sacred symbol is worse than no symbol. Anyone who
 * reads Devanagari sees it immediately, and the failure mode is not "slightly
 * off" but "disrespectful or amateurish".
 *
 * So this sets the real character instead. It is authentic by construction,
 * costs no font download, and cannot be subtly wrong.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Coverage: every platform that matters ships a Devanagari face — Nirmala UI
 * and Mangal on Windows, Kohinoor and Devanagari Sangam MN on macOS/iOS, Noto
 * on Android. Verified in-browser that even a `monospace` request falls back to
 * a real Devanagari glyph rather than tofu.
 *
 * If a device ever does render tofu, the fix is to load **Anek Devanagari** via
 * next/font. That is the sibling of the body face already in use, with matching
 * proportions and vertical metrics — which is precisely why Anek was chosen for
 * this project in the first place.
 *
 * Decorative by default: `aria-hidden`, because a screen reader announcing the
 * character adds nothing the surrounding copy does not already say. Pass
 * `title` to expose it deliberately.
 */

/** Ordered so the most typographically considered faces win where present. */
const DEVANAGARI_STACK = [
  "'Noto Serif Devanagari'",
  "'Noto Sans Devanagari'",
  "'Nirmala UI'",
  "'Kohinoor Devanagari'",
  "'Devanagari Sangam MN'",
  "'Mangal'",
  'serif',
].join(', ');

export function Om({
  size = 64,
  className,
  title,
}: {
  /** Rendered size in px — this is the font size of the glyph. */
  size?: number;
  className?: string;
  /** Provide to expose it to assistive tech; omit to keep it decorative. */
  title?: string;
}) {
  return (
    <span
      className={cn('text-clay inline-block leading-none select-none', className)}
      style={{ fontFamily: DEVANAGARI_STACK, fontSize: size }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {'ॐ'}
    </span>
  );
}
