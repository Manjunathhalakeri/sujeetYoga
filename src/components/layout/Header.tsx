'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Container } from '@/components/ui/Container';
import { PrimaryCta } from '@/components/ui/PrimaryCta';
import { cn } from '@/lib/cn';
import { DURATION, EASE, EASE_IN_OUT, gsap, useGSAP } from '@/lib/motion';
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
  /**
   * GSAP has no AnimatePresence, so the overlay's exit is handled explicitly:
   * `mounted` keeps the node in the tree while the closing tween plays, and the
   * tween's onComplete unmounts it. That is the whole of what AnimatePresence
   * was doing here.
   */
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Mounting happens in the handler, not in an effect on `open`: the node has
  // to exist before the opening tween runs, and deriving it from state in an
  // effect is both a render-order hazard and a lint error.
  const openMenu = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const pathname = usePathname();

  // Ground appears after the first screenful of hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Open and close the overlay.
   *
   * `matchMedia` gives the reduced-motion branch for free: when the query
   * matches, the panel and its links resolve as a plain fade with no travel,
   * and GSAP reverts the branch automatically if the preference changes.
   *
   * The closing tween owns the unmount — `setMounted(false)` runs in
   * onComplete, so the node survives exactly as long as its exit animation.
   */
  useGSAP(
    () => {
      const el = overlayRef.current;
      if (!mounted || !el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };
          const items = el.querySelectorAll<HTMLElement>('[data-menu-item]');

          if (open) {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: reduced ? 0 : -12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: reduced ? DURATION.quick : DURATION.slow,
                ease: EASE_IN_OUT,
              },
            );
            gsap.fromTo(
              items,
              { autoAlpha: 0, y: reduced ? 0 : 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: reduced ? DURATION.quick : DURATION.base,
                ease: EASE,
                delay: reduced ? 0 : 0.06,
                stagger: reduced ? 0 : 0.05,
              },
            );
          } else {
            gsap.to(el, {
              autoAlpha: 0,
              y: reduced ? 0 : -12,
              duration: reduced ? DURATION.quick : DURATION.slow,
              ease: EASE_IN_OUT,
              onComplete: () => setMounted(false),
            });
          }
        },
      );

      return () => mm.revert();
    },
    { dependencies: [open, mounted], scope: overlayRef },
  );

  // While the overlay is open: lock the page behind it and allow Escape to close.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeMenu]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color]',
        // 400ms, not 700. The ground fades in as you scroll past the hero, and
        // at --dur-slow there was a visible window where headings passed
        // under a half-transparent bar and became hard to read.
        'duration-[var(--dur-base)]',
        // Fully opaque, not translucent. A 95% ivory with a blur let headlines
        // ghost through the bar as they scrolled under it, which read as a
        // rendering fault rather than as a material.
        scrolled && !open
          ? 'rule-b bg-ink'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="text-h4 font-display tap-44 rounded-xs tracking-[-0.01em] whitespace-nowrap"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.wordmark.lead}
          <span className="text-bone-dim"> {siteConfig.wordmark.trail}</span>
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
                  active ? 'text-bone' : 'text-bone-dim hover:text-bone',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Short label here only — the header has no room for the full
              sentence, and the icon plus "WhatsApp" still names the
              destination before it is tapped. */}
          <PrimaryCta size="sm" short />
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => (open ? closeMenu() : openMenu())}
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

      {mounted ? (
        <div
          id="mobile-menu"
          ref={overlayRef}
          className="bg-ink fixed inset-0 top-0 z-50 flex flex-col lg:hidden"
        >
          <Container className="flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <span className="text-h4 font-display">
              {siteConfig.wordmark.lead}
              <span className="text-bone-dim"> {siteConfig.wordmark.trail}</span>
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
                {navigation.map((item) => (
                  <li key={item.href} data-menu-item="" className="rule-b">
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
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10">
              {/* Closes the overlay as it goes: the link opens WhatsApp in a
                  new tab, so without this the menu would still be covering the
                  site on return. */}
              <PrimaryCta size="lg" block onClick={() => setOpen(false)} />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
