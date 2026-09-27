/**
 * Petal geometry shared by every piece of artwork.
 *
 * One function generates every lotus ring on the site, so a chakra, the
 * mandala's rings and the divider's flower are literally the same shape at
 * different counts and radii. That is what makes the set read as one hand
 * rather than as five separate drawings.
 */

/**
 * Build `count` petals evenly around a circle.
 *
 * Each petal is two mirrored quadratic curves meeting at a tip — the simplest
 * construction that still reads as a lotus petal rather than an almond. Petals
 * are emitted as separate subpaths so a single `<path>` can draw a whole ring.
 *
 * @param count  number of petals
 * @param inner  radius where the petal starts
 * @param outer  radius of the petal tip
 * @param width  angular half-width of the petal, in degrees
 */
export function petalRing(
  count: number,
  inner: number,
  outer: number,
  width = 360 / (count * 2.6),
): string {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const at = (r: number, deg: number) =>
    `${(r * Math.cos(rad(deg))).toFixed(2)} ${(r * Math.sin(rad(deg))).toFixed(2)}`;

  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = (360 / count) * i - 90; // start at 12 o'clock
    // base-left -> tip (bulging out one side), tip -> base-right (the mirror)
    parts.push(
      `M ${at(inner, a - width)}` +
        ` Q ${at(outer * 0.82, a - width * 1.5)} ${at(outer, a)}` +
        ` Q ${at(outer * 0.82, a + width * 1.5)} ${at(inner, a + width)}`,
    );
  }
  return parts.join(' ');
}

/** A plain circle as path data, so rings and petals can share one <path>. */
export function circlePath(r: number): string {
  return `M ${-r} 0 a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0`;
}
