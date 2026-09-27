import type { Metadata, Viewport } from 'next';
import { Fraunces, Anek_Latin } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/content/siteConfig';
import './globals.css';

/**
 * TYPOGRAPHY — two families, both self-hosted by next/font (no request to
 * Google at runtime, no layout shift, no third-party connection).
 *
 * Display: FRAUNCES. A variable "old-style" serif with optical-size, softness
 * and `wonk` axes. High contrast and a little idiosyncratic, which is what
 * keeps headings from reading as a default template serif. Latin only — see
 * the note on Indic scripts below.
 *
 * Text/UI: ANEK LATIN. From Ek Type, an Indian foundry. Chosen specifically
 * for what happens next: Anek is a *superfamily* whose siblings — Anek
 * Devanagari, Anek Kannada, Anek Tamil, Anek Telugu and more — share identical
 * proportions, weights and vertical metrics. Adding Sanskrit, Hindi or Kannada
 * copy later means loading a sibling and scoping it with :lang(), with no
 * redesign and no visual mismatch between scripts.
 *
 * Per the agreed rule: Fraunces is used for Latin headings only. If Indic
 * content is introduced, headings in that script fall back to the Anek sibling
 * rather than a third display face being added.
 */

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const anek = Anek_Latin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anek',
});

export const metadata: Metadata = {
  // TODO: replace once the production domain is known (siteConfig.url).
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // Placeholder content must never be indexed. Flipped automatically when
  // siteConfig.isPlaceholder becomes false.
  robots: siteConfig.isPlaceholder ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#f6f3ee',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${anek.variable}`}>
      <head>
        {/* Resilience: scroll reveals start at opacity 0. If JavaScript never
            runs, this guarantees the content is still readable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only-focusable bg-bone text-ink text-small absolute top-4 left-4 z-50 px-4 py-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
