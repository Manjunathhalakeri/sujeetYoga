import { cn } from '@/lib/cn';

/**
 * A hairline. The site's primary device for separating content — it reads
 * more editorial than a shadow and costs nothing to render.
 */
export function Rule({ className }: { className?: string }) {
  return <hr className={cn('rule-t m-0 border-0', className)} />;
}

/**
 * A short accent mark used above section headings. 32px of clay, and the only
 * place the warm accent appears purely decoratively.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('bg-clay-400 block h-px w-8', className)} />
  );
}
