'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { DURATION, EASE, EASE_IN_OUT } from '@/lib/motion';
import { navigation, siteConfig } from '@/content/siteConfig';

/**
 * HEADER
 *
 * Sits transparent over the hero and gains an ivory ground plus a hairline once
 * the page scrolls — so the hero photography is never boxed in by a bar, but the
 * navigation stays readable over everything below it.
 *
 * The desktop layout is deliberately not centred: wordmark hard left, links and
 * the call to action hard right, nothing in the middle. That matches the
 * asymmetric composition of the page rather than fighting it.
 *
 * Mobile is a full-screen overlay rather than a dropdown. On a phone a short
 * list of five links reads better as a page than as a panel, and it gives the
 * links a comfortable touch target without cramping.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Ground appears after the first screenful of hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the overlay is open: lock the page behind it and allow Escape to close.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color]',
        'duration-[var(--dur-slow)]',
        // Fully opaque, not translucent. A 95% ivory with a blur let headlines
        // ghost through the bar as they scrolled under it, which read as a
        // rendering fault rather than as a material.
        scrolled && !open
          ? 'rule-b bg-ivory'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="text-h4 font-display rounded-xs tracking-[-0.01em] whitespace-nowrap"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.wordmark.lead}
          <span className="text-stone"> {siteConfig.wordmark.trail}</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'link-underline text-small rounded-xs py-2 transition-colors',
                  active ? 'text-charcoal' : 'text-stone hover:text-charcoal',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href={siteConfig.cta.primaryHref} size="sm">
            Enquire
          </Button>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          // min-h-11 / min-w-11 keeps this at the 44px minimum touch target.
          // Measured at 36px before this, which is below the comfortable
          // threshold on a phone.
          className="text-eyebrow -mr-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs px-3 uppercase lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="bg-ivory fixed inset-0 top-0 z-50 flex flex-col lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: DURATION.slow, ease: EASE_IN_OUT }}
          >
            <Container className="flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <span className="text-h4 font-display">
                {siteConfig.wordmark.lead}
                <span className="text-stone"> {siteConfig.wordmark.trail}</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-eyebrow -mr-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs px-3 uppercase"
                autoFocus
              >
                Close
              </button>
            </Container>

            <Container className="flex flex-1 flex-col justify-center">
              <nav aria-label="Primary (mobile)">
                <ul>
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.href}
                      className="rule-b"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: DURATION.base,
                        ease: EASE,
                        delay: reduced ? 0 : 0.06 + i * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        // Closing here rather than in an effect on `pathname`:
                        // navigating to the current route fires no path change,
                        // which would leave the overlay stuck open.
                        onClick={() => setOpen(false)}
                        className="text-display-2 font-display block py-5"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10">
                <Button
                  href={siteConfig.cta.primaryHref}
                  size="lg"
                  block
                  onClick={() => setOpen(false)}
                >
                  {siteConfig.cta.primaryLabel}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
