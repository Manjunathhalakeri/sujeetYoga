import { cn } from '@/lib/cn';
import { petalRing } from './petals';

/**
 * A hairline interrupted at its centre by a small open lotus.
 *
 * Drop-in alternative to `<Rule>` for the places where a section break should
 * feel like a breath rather than a cut. The rules either side are the same
 * hairline `Rule` uses, so it sits in the existing system rather than beside it.
 *
 * ⚠ Punctuation, not decoration. Two or three per page reads as composed; more
 * than that and the page starts to feel ornamented, which is precisely what the
 * design set out not to be. Where a break is purely structural, `<Rule>` is
 * still the right answer.
 */
export function LotusDivider({
  className,
  petals = 8,
}: {
  className?: string;
  /** Petal count of the centre flower. Eight reads open at small sizes. */
  petals?: number;
}) {
  return (
    <div
      className={cn('flex items-center gap-5', className)}
      role="separator"
      aria-orientation="horizontal"
    >
      <span className="rule-t h-px flex-1" />
      <svg
        viewBox="-50 -50 100 100"
        width={26}
        height={26}
        className="shrink-0 overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d={petalRing(petals, 12, 42)}
          fill="none"
          stroke="var(--color-clay)"
          strokeWidth={2.4}
          strokeLinejoin="round"
          opacity={0.8}
        />
        <circle r={4} fill="var(--color-clay)" opacity={0.85} />
      </svg>
      <span className="rule-t h-px flex-1" />
    </div>
  );
}
