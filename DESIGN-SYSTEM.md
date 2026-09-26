# Design system

Phase 2 deliverable. Everything visual on this site resolves to a token defined
in `src/styles/tokens.css`. No component contains a raw colour, size or duration.

Run `npm run dev` and open **http://localhost:3000/design-system** to see it all
rendered.

---

## Where things live

```
src/
  styles/
    tokens.css        colours, type scale, spacing, radii, motion — the source of truth
    base.css          element defaults, focus rings, prefers-reduced-motion
    utilities.css     rule-t, img-frame, link-underline, nums-tabular, tap-44
  lib/
    cn.ts             class merging, taught our custom token scales
    motion.ts         easing, durations, variants — the only place timings live
  components/ui/      Container Section SectionHeading Eyebrow Rule Button
                      TextLink Badge Figure Field Reveal ImageReveal
  content/
    siteConfig.ts     every business fact, all placeholders marked TODO
    assets.ts         every image, with source, licence and replacement briefing
```

---

## Colour

Fifteen values. Tailwind's default palette is **deleted** at the token layer
(`--color-*: initial`), so `bg-blue-500` does not exist and cannot drift in.

| Token | Hex | Use | Contrast on ivory |
| --- | --- | --- | --- |
| `ivory` | `#F6F3EE` | Page ground | — |
| `ivory-100` | `#FBF9F6` | Raised surface | — |
| `ivory-300` | `#EFEAE2` | Alternating section | — |
| `sand` | `#E4DCD0` | Filled dividers | — |
| `hairline` | `#D8D2C7` | 1px rules | — |
| `stone-400` | `#9A948B` | Decorative only — **never body text** | 2.6:1 |
| `stone` | `#6E6A63` | Secondary text | **4.86:1** AA |
| `charcoal` | `#1B1A18` | Primary text | **15.5:1** AAA |
| `moss` | `#3F5148` | Accent, links on light | **7.6:1** AAA |
| `moss-900` | `#232E28` | Dark section ground | — |
| `moss-200` | `#A9B5AC` | Secondary text on dark | **6.6:1** on moss-900 |
| `clay` | `#9E5430` | Warm accent text | **5.0:1** AA |
| `clay-400` | `#C08A64` | Decorative marks only | 2.9:1 |
| `success` | `#35604A` | Success state | AA |
| `danger` | `#9B3A2B` | Error state | AA |

Every pair used for text meets WCAG AA. The two values that do not are labelled
decorative-only in the token file.

**Dark surfaces are a tone change, not a theme.** `<Section surface="moss">` adds
an `.on-dark` class that re-points `--focus-ring` and `--rule`, so nested
components adapt without an `isDark` prop threaded through the tree.

---

## Typography

Two families, both self-hosted by `next/font` — no runtime request to Google, no
layout shift, no third-party connection.

**Display — Fraunces.** A variable old-style serif with optical-size, softness
and `wonk` axes. High contrast and slightly idiosyncratic, which is what keeps
headings from reading as a default template serif. Latin only.

**Text/UI — Anek Latin.** From Ek Type, an Indian foundry. Chosen for what
happens next: Anek is a *superfamily* whose siblings — Anek Devanagari, Anek
Kannada, Anek Tamil, Anek Telugu — share identical proportions, weights and
vertical metrics. Adding Sanskrit, Hindi or Kannada copy later means loading a
sibling and scoping it with `:lang()`. No redesign, no mismatch between scripts,
and no third display face, per the agreed rule.

Scale — fluid, but every step **capped**, so a large display never produces a
headline that has to be scanned rather than read:

| Token | Size | Line height | Tracking |
| --- | --- | --- | --- |
| `text-display-1` | 44 → 84px | 0.98 | −0.02em |
| `text-display-2` | 36 → 56px | 1.04 | −0.018em |
| `text-h2` | 30 → 42px | 1.12 | −0.015em |
| `text-h3` | 21 → 26px | 1.22 | −0.01em |
| `text-h4` | 18px | 1.35 | −0.005em |
| `text-lead` | 17 → 21px | 1.55 | — |
| `text-body` | 17px | 1.65 | — |
| `text-small` | 15px | 1.6 | — |
| `text-micro` | 13px | 1.5 | 0.01em |
| `text-eyebrow` | 12px | 1 | 0.18em, uppercase |

Headings carry **no default size**. Every heading opts into a scale step
explicitly, so visual hierarchy is independent of DOM depth — and
`<SectionHeading level={2} size="display-2">` lets the document outline stay
correct while the design does what it wants.

---

## Layout

| Token | Width | Use |
| --- | --- | --- |
| `max-w-copy` | 34rem | Body copy, ~62ch |
| `max-w-measure` | 42rem | Lead paragraphs |
| `max-w-page` | 77.5rem | Default content |
| `max-w-bleed` | 96rem | Wide imagery |

Spacing is fluid `clamp()` rather than per-breakpoint values, so there is one
rhythm to maintain instead of five:

- `--spacing-gutter` — `clamp(1.25rem, 5vw, 3.5rem)`
- `--spacing-block` — `clamp(1.75rem, 4vw, 3rem)`
- `--spacing-section` — `clamp(4rem, 9vw, 7.5rem)`
- `--spacing-section-lg` — `clamp(5.5rem, 13vw, 11rem)`

Radii are capped at **2px / 3px / full**. The large rounded-card look is not
expressible. Shadows are capped at two near-invisible values; depth comes from
hairline rules and ground-tone shifts.

---

## Motion

One curve, four durations, sixteen pixels of travel. All in `src/lib/motion.ts`.

```
ease-brand   cubic-bezier(0.22, 1, 0.36, 1)
quick        200ms   hover, focus, press
base         400ms   the default for everything
slow         700ms   menus, larger layout shifts
reveal      1100ms   hero mask reveal only
distance      16px   entrance travel
```

`--default-transition-duration` and `--default-transition-timing-function` are
set at the token layer, so every Tailwind `transition-*` utility is on-brand by
default rather than by remembering.

**Three tiers:**

- **Tier 1 — CSS, no JS.** Hover, focus, press, link underlines. ~90% of all
  interaction.
- **Tier 2 — `<Reveal>` / `<RevealGroup>`.** One fade plus a 16px rise, fired
  once. Every section entrance routes through this single component, so the page
  has one consistent sense of weight.
- **Tier 3 — `<ImageReveal>`.** A mask wipe plus a 6% scale settle on one curve,
  so the two moves read as a single physical gesture. Hero only, plus at most one
  editorial moment per page.

**Reduced motion** is handled twice over: a blanket `@media
(prefers-reduced-motion: reduce)` rule in `base.css`, and a `useReducedMotion`
branch in every animated component that drops transforms entirely rather than
merely shortening them.

**Resilience:** reveals start at `opacity: 0`. `layout.tsx` ships a `<noscript>`
rule that forces `[data-reveal]` visible, so copy is never trapped behind an
animation that failed to run.

---

## Interaction states

`<Button>` covers default, hover, active, focus, disabled and loading.
`<Field>` covers default, hover, focus, filled, disabled and invalid.
`<FormNotice>` covers success and error at form level.

Tactility is a 1px downward nudge on press plus a ground-tone shift on hover.
Nothing scales, nothing glows.

Loading is communicated with **text**, not a spinner — it survives
`prefers-reduced-motion` and is announced via `aria-busy`.

Focus is invisible to pointer users and always visible to keyboard users
(`:focus-visible`), and the ring colour flips automatically on dark surfaces.

Touch targets: every button size clears 44px; `sm` only *looks* smaller. The
`tap-44` utility expands small controls' hit area without changing their visual
size.

---

## Content and assets

`src/content/siteConfig.ts` holds every business fact. `src/content/assets.ts`
holds every image with its source, licence and a plain-language briefing for
whoever replaces it.

**Nothing in either file is a real business claim.** No certifications,
qualifications, testimonials, reviews, student counts, awards, prices, addresses
or phone numbers have been invented. `siteConfig.isPlaceholder` is `true`, which
also sets `robots: noindex` site-wide so placeholder content cannot be indexed.
Flip it to `false` once the real content is in.

Placeholder photography is Unsplash stock. Every image was **opened and visually
checked** before being added, so the `alt` text describes what is actually in the
frame. Photographer credits are deliberately *not* recorded, because they were
not verified — they must be looked up before launch if credits are to be shown.

---

## Commands

```
npm run dev         dev server
npm run build       production build
npm run typecheck   tsc --noEmit
npm run lint        eslint
npm run format      prettier --write .
```

## Toolchain notes

- **TypeScript is pinned to `^6`**, not 7. `typescript-eslint` (pulled in by
  `eslint-config-next`) does not support the TS 7 API yet.
- **ESLint is pinned to `^9`**, not 10. `eslint-config-next@16` ships native flat
  config but its bundled scope manager is incompatible with ESLint 10.
- The `next/typescript` ESLint preset is omitted for the same
  `typescript-eslint` reason. Type errors are caught by `next build` and
  `npm run typecheck` instead, so nothing is lost.

Revisit all three once the upstream packages catch up.
