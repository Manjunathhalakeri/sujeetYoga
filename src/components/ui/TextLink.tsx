import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Inline and standalone links.
 *
 * `inline` — for links inside body copy — keeps a visible underline by default,
 * because colour alone is not a sufficient affordance, and retracts it on hover.
 * `standalone` — navigation and calls to action, where context already makes the
 * link obvious — draws the underline in on hover instead.
 */
export interface TextLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  href: string;
  variant?: 'inline' | 'standalone';
  className?: string;
  children: ReactNode;
}

export function TextLink({
  href,
  variant = 'standalone',
  className,
  children,
  rel,
  ...rest
}: TextLinkProps) {
  const classes = cn(
    'rounded-xs transition-colors',
    variant === 'inline'
      ? 'link-underline-retract text-bone hover:text-sage'
      : 'link-underline',
    className,
  );

  const isExternalProtocol = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternalProtocol) {
    return (
      <a
        {...rest}
        href={href}
        rel={rel ?? (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...rest} href={href} className={classes}>
      {children}
    </Link>
  );
}
