import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The site's only button.
 *
 * Every state in the brief is expressed here: default, hover, active, focus,
 * disabled, loading, and — via `tone` — the inverse treatment on dark surfaces.
 *
 * Tactility comes from two cheap, non-showy signals: a 1px downward nudge on
 * press, and a ground-tone shift on hover. No scale, no shadow bloom, no glow;
 * those read as SaaS rather than as a premium editorial brand.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'quiet';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base = cn(
  'relative inline-flex items-center justify-center gap-2.5 text-center align-middle',
  'rounded-xs font-sans font-medium tracking-[0.01em]',
  'transition-[background-color,border-color,color,translate]',
  // Press feedback. Neutralised automatically under prefers-reduced-motion by
  // the blanket transition override in base.css.
  'active:translate-y-px',
  // Disabled is dimmed: the action is unavailable.
  'disabled:pointer-events-none disabled:opacity-45',
  'aria-disabled:pointer-events-none aria-disabled:opacity-45',
  // Loading is NOT dimmed. The action is live and in progress, so it keeps full
  // contrast and only loses interactivity — dimming it looked identical to
  // disabled, which read as "broken" rather than "working".
  'aria-busy:pointer-events-none aria-busy:cursor-progress aria-busy:opacity-100',
);

const sizes: Record<ButtonSize, string> = {
  // Every size clears a 44px touch target; sm only looks smaller.
  sm: 'min-h-11 px-4 text-small',
  md: 'min-h-12 px-6 text-small',
  lg: 'min-h-14 px-8 text-body',
};

/**
 * One set, no `tone`. The prop used to answer "am I sitting on a light or a
 * dark surface"; every surface is dark now, so it had one real value and one
 * that rendered ink-on-ink.
 *
 * Primary is a light fill with dark text — the inverse of the old light theme.
 * `ink` on `bone` is 15.2:1, and the hover shifts the fill to `sage`, keeping
 * ink text at 8.4:1 while carrying a little brand colour. That mirrors the old
 * charcoal -> moss hover rather than inventing a new gesture.
 */
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-bone text-ink hover:bg-sage',
  secondary: 'border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/[0.06]',
  // The underline sits on the label span so it hugs the text, not the padding box.
  quiet: 'px-0 text-bone hover:text-sage',
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the parent width — the default for mobile form actions. */
  block?: boolean;
  /** Trailing icon, e.g. an arrow. Rendered aria-hidden. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
    /** Swaps the label for `loadingLabel` and sets aria-busy. */
    loading?: boolean;
    loadingLabel?: string;
  };

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    loading?: never;
    loadingLabel?: never;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

function classes({ variant = 'primary', size = 'md', block, className }: CommonProps) {
  return cn(
    base,
    sizes[size],
    variants[variant],
    variant === 'quiet' && 'min-h-11',
    block ? 'w-full' : 'w-auto',
    className,
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    block,
    icon,
    className,
    children,
    ...rest
  } = props;

  const shared: CommonProps = { variant, size, block, className, children };

  const label = (
    <>
      <span className={cn(variant === 'quiet' && 'link-underline')}>{children}</span>
      {icon ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, rel, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      };
    const isExternalProtocol = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternalProtocol) {
      return (
        <a
          {...anchorRest}
          href={href}
          rel={rel ?? (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          className={classes(shared)}
        >
          {label}
        </a>
      );
    }

    return (
      <Link {...anchorRest} href={href} className={classes(shared)}>
        {label}
      </Link>
    );
  }

  const {
    loading = false,
    loadingLabel = 'Working…',
    disabled,
    type = 'button',
    ...buttonRest
  } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    loadingLabel?: string;
  };

  return (
    <button
      {...buttonRest}
      type={type}
      // Deliberately not `disabled` when loading: a disabled button is removed
      // from the tab order, which would move focus unexpectedly mid-submit.
      // aria-busy + pointer-events-none conveys it without that side effect.
      disabled={disabled}
      aria-busy={loading || undefined}
      className={classes(shared)}
    >
      {/* Text, not a spinner, is the primary loading signal: it survives
          prefers-reduced-motion and is announced by screen readers. */}
      {loading ? loadingLabel : label}
    </button>
  );
}
