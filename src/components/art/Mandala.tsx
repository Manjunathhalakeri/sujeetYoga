import { cn } from '@/lib/cn';
import { circlePath, petalRing } from './petals';

/**
 * Large concentric mandala, for use behind the hero.
 *
 * Six petal rings with counts rising outward (8, 12, 16, 24, 32, 48), plus
 * plain circles between them and a bindu at the centre. Line only — no fills —
 * so at the very low opacity it is used at, it reads as an impression of
 * structure rather than as a graphic sitting on the page.
 *
 * Purely decorative: `aria-hidden`, and it carries no meaning the copy does not
 * already carry.
 *
 * ⚠ Opacity is the whole game here. Above roughly 6% it starts to compete with
 * the hero headline, and the hero is the one place on the site where nothing
 * may compete with the type.
 */
export function Mandala({
  className,
  strokeOpacity = 1,
}: {
  className?: string;
  strokeOpacity?: number;
}) {
  const rings: Array<[count: number, inner: number, outer: number, op: number]> = [
    [8, 10, 26, 0.9],
    [12, 26, 44, 0.75],
    [16, 44, 64, 0.6],
    [24, 64, 86, 0.5],
    [32, 86, 112, 0.4],
    [48, 112, 142, 0.3],
  ];

  return (
    <svg
      viewBox="-160 -160 320 320"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="var(--color-clay)"
        strokeWidth={0.7}
        strokeLinejoin="round"
        opacity={strokeOpacity}
      >
        {rings.map(([count, inner, outer, op]) => (
          <path key={count} d={petalRing(count, inner, outer)} opacity={op} />
        ))}
        {[10, 26, 44, 64, 86, 112, 142, 152].map((r) => (
          <path key={r} d={circlePath(r)} opacity={0.35} />
        ))}
      </g>
      <circle r={3} fill="var(--color-clay)" opacity={0.6} />
    </svg>
  );
}
