import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Small uppercase label above a heading. Carries the section's category so the
 * heading itself can stay short and editorial.
 *
 * Rendered as a <p> by default, never as a heading — it is not part of the
 * document outline.
 */
export function Eyebrow({
  as: Tag = 'p',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn('text-eyebrow text-stone uppercase', className)}>{children}</Tag>
  );
}
