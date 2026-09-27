import { cn } from '@/lib/cn';
import { chakras, type Chakra as ChakraData } from '@/content/chakras';
import { circlePath, petalRing } from './petals';

/**
 * One chakra, drawn as a lotus ring.
 *
 * Thin gold line throughout; the traditional hue appears only as a small filled
 * bindu at the centre and a faint wash inside the inner circle. That keeps the
 * seven legible as a set on a dark ground — drawn at full saturation they stop
 * being artwork and become a row of traffic lights.
 *
 * Petal count comes from `content/chakras.ts` and is the traditional one.
 */
export interface ChakraProps {
  /** Which chakra, by id. */
  id: ChakraData['id'];
  /** Rendered size in px. The geometry is unitless and scales cleanly. */
  size?: number;
  /** Show the traditional tint, or draw in gold line only. */
  tinted?: boolean;
  className?: string;
  /** Give it an accessible name instead of hiding it. Rare — usually decorative. */
  title?: string;
}

const GOLD = 'var(--color-clay)';

export function Chakra({ id, size = 48, tinted = true, className, title }: ChakraProps) {
  const data = chakras.find((c) => c.id === id);
  if (!data) return null;

  const { renderPetals, tint } = data;
  // Crown is drawn as a dense double ring — see the note in chakras.ts.
  const isCrown = data.id === 'sahasrara';

  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={cn('overflow-visible', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {/* inner wash — the only place the traditional hue carries any area */}
      {tinted ? <path d={circlePath(15)} fill={tint} opacity={0.14} /> : null}

      <g fill="none" stroke={GOLD} strokeWidth={1.1} strokeLinejoin="round">
        <path d={petalRing(renderPetals, 16, 42)} opacity={0.75} />
        {isCrown ? <path d={petalRing(renderPetals, 26, 48)} opacity={0.4} /> : null}
        <path d={circlePath(15)} opacity={0.9} />
      </g>

      {/* bindu */}
      <circle r={2.4} fill={tinted ? tint : GOLD} />
    </svg>
  );
}

/**
 * The seven in ascending order — root at the left, crown at the right.
 *
 * The order is the point and must not be sorted or reversed; it is the
 * traditional progression up the spine, and it is also why this reads as a
 * single idea rather than seven ornaments.
 */
export function ChakraStrip({
  size = 44,
  className,
  showLabels = true,
}: {
  size?: number;
  className?: string;
  showLabels?: boolean;
}) {
  return (
    <ul className={cn('flex flex-wrap items-start justify-between gap-y-8', className)}>
      {chakras.map((c) => (
        <li
          key={c.id}
          className="flex min-w-16 flex-1 flex-col items-center gap-3 text-center"
        >
          <Chakra id={c.id} size={size} />
          {showLabels ? (
            <span className="flex flex-col gap-0.5">
              <span className="text-eyebrow text-bone-faint uppercase">{c.english}</span>
              <span className="text-micro font-display text-bone-dim">{c.sanskrit}</span>
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
