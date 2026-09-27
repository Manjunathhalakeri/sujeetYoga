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

Dark, warm, pre-dawn. Tailwind's default palette is **deleted**
(`--color-*: initial`), so `bg-blue-500` does not exist and cannot drift in.

Every ratio below is computed, not estimated. Ratios are quoted against
**`ink-lifted`, the lightest surface** — the worst case — so anything that
passes here passes on every ground.

### Surfaces

| Token | Hex | Use |
| --- | --- | --- |
| `ink-deep` | `#0E0D0B` | Full-bleed bands, footer |
| `ink` | `#14120F` | Default page ground |
| `ink-raised` | `#1A1714` | Alternating sections |
| `ink-lifted` | `#201C18` | Reading-heavy pages — About, programme detail |

The ramp is deliberately **narrow**: adjacent surfaces sit ~1.05:1 apart and the
whole span is 1.15:1. A change of ground reads as a shift in light, not as a
panel dropped on the page. That is the difference between "pre-dawn" and
"dashboard".

### Text

| Token | Hex | Worst-case ratio | Verdict |
| --- | --- | --- | --- |
| `bone` | `#EDE7DD` | **13.76:1** | AAA — primary |
| `bone-dim` | `#ABA296` | **6.72:1** | AA — secondary |
| `bone-faint` | `#8B8379` | **4.53:1** | AA — tertiary and 12px labels |

`bone-faint` was solved to clear 4.5:1 rather than left as decorative: it sets
the 12px eyebrow labels, which are small text and get no large-text exemption.

### Accent and state

| Token | Hex | Worst case | Verdict |
| --- | --- | --- | --- |
| `sage` | `#9DB3A4` | 7.59:1 | AAA — accent type, links |
| `sage-deep` | `#5E7466` | 3.36:1 | Fills and marks — **not for text** |
| `clay` | `#C98A5E` | 5.87:1 | AA — accent type |
| `clay-deep` | `#905B39` | 3.02:1 | Fills and marks — **not for text** |
| `success` | `#8FBFA1` | 8.17:1 | AAA |
| `danger` | `#E08A72` | 6.49:1 | AA |

### Rules — two values, two different obligations

| Token | Hex | Ratio | Why |
| --- | --- | --- | --- |
| `hairline` | `#2E2A25` | 1.19:1 | **Decorative only.** WCAG 1.4.11 exempts purely decorative dividers, and keeping these near-invisible is what stops the page reading as a wireframe grid. |
| `line-strong` | `#6C6760` | 3.02:1 | **Form control borders.** An input underline *is* a UI component and must clear 3:1. |

Using `hairline` on an input would be a 1.19:1 boundary — a real failure that the
old light palette hid, because a dark rule on ivory happened to pass.

### Fills take dark text, never light

`bone` on `sage` is 1.81:1 — a fail. Every accent fill therefore takes `ink`
text, and the primary button is a **light fill with dark text** (`ink` on
`bone`, 15.2:1), hovering to `sage` (8.4:1). That mirrors the old
charcoal → moss hover rather than inventing a new gesture.

### `.on-dark` is gone

It existed to flip the focus ring and rule on the single dark band of a light
page. With every surface dark it would be a no-op threaded through every
`Section`, so it was removed rather than left as dead API. One focus ring
(`bone`) serves every ground.

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
