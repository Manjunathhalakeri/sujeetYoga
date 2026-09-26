import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Rule, Mark } from '@/components/ui/Rule';
import { Button } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { Badge } from '@/components/ui/Badge';
import { Figure } from '@/components/ui/Figure';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ImageReveal } from '@/components/ui/ImageReveal';
import { TextField, TextAreaField, SelectField, FormNotice } from '@/components/ui/Field';
import { images } from '@/content/assets';

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
};

/* A local helper for this reference page only — not part of the design system. */
function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rule-t py-8">
      <Eyebrow className="mb-6">{label}</Eyebrow>
      {children}
    </div>
  );
}

const palette = [
  { name: 'ivory', hex: '#F6F3EE', note: 'Page ground' },
  { name: 'ivory-100', hex: '#FBF9F6', note: 'Raised surface' },
  { name: 'ivory-300', hex: '#EFEAE2', note: 'Alternating section' },
  { name: 'sand', hex: '#E4DCD0', note: 'Filled dividers' },
  { name: 'hairline', hex: '#D8D2C7', note: 'Rules on light' },
  { name: 'stone-400', hex: '#9A948B', note: 'Decorative only' },
  { name: 'stone', hex: '#6E6A63', note: 'Secondary type · 4.86:1' },
  { name: 'charcoal', hex: '#1B1A18', note: 'Primary type · 15.5:1' },
  { name: 'moss-200', hex: '#A9B5AC', note: 'Type on dark · 6.6:1' },
  { name: 'moss', hex: '#3F5148', note: 'Accent · 7.6:1' },
  { name: 'moss-900', hex: '#232E28', note: 'Dark ground' },
  { name: 'clay', hex: '#9E5430', note: 'Warm accent · 5.0:1' },
  { name: 'clay-400', hex: '#C08A64', note: 'Decorative only' },
  { name: 'success', hex: '#35604A', note: 'Success state' },
  { name: 'danger', hex: '#9B3A2B', note: 'Error state' },
];

const typeScale = [
  { cls: 'text-display-1', label: 'display-1', spec: '44 → 84px · 0.98 · −0.02em' },
  { cls: 'text-display-2', label: 'display-2', spec: '36 → 56px · 1.04 · −0.018em' },
  { cls: 'text-h2', label: 'h2', spec: '30 → 42px · 1.12' },
  { cls: 'text-h3', label: 'h3', spec: '21 → 26px · 1.22' },
  { cls: 'text-h4', label: 'h4', spec: '18px · 1.35' },
];

export default function DesignSystemPage() {
  return (
    <div>
      {/* ---------------------------------------------------------------- */}
      <Section spacing="loose">
        <Container>
          <SectionHeading
            level={1}
            size="display-1"
            mark
            eyebrow="Phase 2 · Reference"
            lead="The visual language, in one page. Nothing here is a marketing layout — it is the set of decisions every page is built from. Palette, scale, spacing, states and motion all read from tokens, so changing a value here changes the whole site."
          >
            Design system
          </SectionHeading>

          <div className="mt-10 flex flex-wrap gap-2">
            <Badge tone="placeholder">All content is placeholder</Badge>
            <Badge tone="neutral">Fraunces + Anek Latin</Badge>
            <Badge tone="moss">Tailwind v4 tokens</Badge>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="colour" surface="alt" labelledBy="colour-h">
        <Container>
          <SectionHeading
            id="colour-h"
            eyebrow="01"
            lead="Fifteen values, and Tailwind's default palette is deleted at the token layer — a stray utility class simply will not compile. Contrast ratios against the ivory ground are noted where the colour is used for text; every text pair meets WCAG AA."
          >
            Colour
          </SectionHeading>

          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {palette.map((c) => (
              <li key={c.name}>
                <div
                  className="img-frame aspect-[4/3]"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                <p className="text-small mt-3 font-medium">{c.name}</p>
                <p className="text-micro nums-tabular text-stone-400 uppercase">
                  {c.hex}
                </p>
                <p className="text-micro text-stone">{c.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="type" labelledBy="type-h">
        <Container>
          <SectionHeading
            id="type-h"
            eyebrow="02"
            lead="Two families. Fraunces sets Latin headings; Anek Latin sets everything else and has script siblings ready for Devanagari or Kannada without a redesign. Every step is fluid but capped, so a 27-inch display never gets a headline that has to be scanned rather than read."
          >
            Typography
          </SectionHeading>

          <div className="mt-14">
            {typeScale.map((t) => (
              <Spec key={t.label} label={`${t.label} — ${t.spec}`}>
                <p className={`${t.cls} font-display`}>Practice, not performance</p>
              </Spec>
            ))}

            <Spec label="lead — 17 → 21px · 1.55">
              <p className="text-lead max-w-measure text-stone">
                Lead paragraphs sit under a heading and carry the section&rsquo;s idea in
                one or two sentences. They are set in stone rather than charcoal so the
                heading keeps the hierarchy.
              </p>
            </Spec>

            <Spec label="body — 17px · 1.65 · max 62ch">
              <p className="max-w-copy">
                Body copy is set at seventeen pixels with a generous line height and a
                measure of roughly sixty-two characters. Long-form reading is the thing an
                editorial layout has to get right, and it is mostly a question of measure
                and leading rather than of anything decorative. Inline links look{' '}
                <TextLink href="/design-system" variant="inline">
                  like this
                </TextLink>{' '}
                — underlined by default, retracting on hover.
              </p>
            </Spec>

            <Spec label="small · micro · eyebrow · tabular numerals">
              <p className="text-small">
                Small — 15px, used for metadata and dense rows.
              </p>
              <p className="text-micro text-stone mt-2">
                Micro — 13px, for captions, credits and legal text.
              </p>
              <Eyebrow className="mt-4">Eyebrow — 12px, 0.18em tracking</Eyebrow>
              <p className="nums-tabular text-h3 font-display mt-4">
                06:30 · 07:45 · 18:00
              </p>
              <p className="text-micro text-stone mt-1">
                Tabular numerals, so schedule columns align.
              </p>
            </Spec>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="layout" surface="alt" labelledBy="layout-h">
        <Container>
          <SectionHeading
            id="layout-h"
            eyebrow="03"
            lead="Gutters and section padding are fluid clamps rather than per-breakpoint values, so there is one rhythm to maintain instead of five."
          >
            Layout &amp; spacing
          </SectionHeading>

          <div className="mt-14 space-y-4">
            {[
              { name: 'copy', w: 'max-w-copy', note: '34rem · body measure, ~62ch' },
              { name: 'measure', w: 'max-w-measure', note: '42rem · lead copy' },
              { name: 'page', w: 'max-w-page', note: '77.5rem · default content' },
              { name: 'bleed', w: 'max-w-bleed', note: '96rem · wide imagery' },
            ].map((c) => (
              <div key={c.name}>
                <div className={`${c.w} rule-t rule-b rule-l rule-r bg-sand/40 h-9`} />
                <p className="text-micro text-stone mt-2">
                  <span className="text-charcoal">{c.name}</span> — {c.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              [
                '--spacing-gutter',
                'clamp(1.25rem, 5vw, 3.5rem)',
                'Horizontal page gutter',
              ],
              ['--spacing-block', 'clamp(1.75rem, 4vw, 3rem)', 'Gap between blocks'],
              [
                '--spacing-section',
                'clamp(4rem, 9vw, 7.5rem)',
                'Section vertical padding',
              ],
            ].map(([token, value, note]) => (
              <div key={token} className="rule-t pt-4">
                <p className="text-small font-medium">{token}</p>
                <p className="text-micro nums-tabular text-stone mt-1">{value}</p>
                <p className="text-micro mt-1 text-stone-400">{note}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="controls" labelledBy="controls-h">
        <Container>
          <SectionHeading
            id="controls-h"
            eyebrow="04"
            lead="Every state from the brief, in one place: default, hover, active, focus, disabled and loading. Press feedback is a one-pixel nudge and a ground-tone shift — nothing scales, nothing glows."
          >
            Buttons &amp; links
          </SectionHeading>

          <div className="mt-14 space-y-10">
            <Spec label="Primary · sizes sm / md / lg">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Enquire</Button>
                <Button size="md">Enquire</Button>
                <Button size="lg" icon={<ArrowRight size={17} strokeWidth={1.75} />}>
                  Enquire about classes
                </Button>
              </div>
            </Spec>

            <Spec label="Secondary · Quiet">
              <div className="flex flex-wrap items-center gap-6">
                <Button variant="secondary">View schedule</Button>
                <Button
                  variant="quiet"
                  icon={<ArrowRight size={16} strokeWidth={1.75} />}
                >
                  All programmes
                </Button>
              </div>
            </Spec>

            <Spec label="Disabled · Loading">
              <div className="flex flex-wrap items-center gap-4">
                <Button disabled>Unavailable</Button>
                <Button variant="secondary" disabled>
                  Unavailable
                </Button>
                <Button loading loadingLabel="Sending…">
                  Send enquiry
                </Button>
              </div>
              <p className="text-micro max-w-copy text-stone mt-4">
                Loading is communicated with text rather than a spinner, so it survives
                <code className="mx-1">prefers-reduced-motion</code> and is announced by
                screen readers via <code>aria-busy</code>.
              </p>
            </Spec>

            <Spec label="Tab through these — focus is always visible">
              <div className="flex flex-wrap items-center gap-6">
                <TextLink href="/design-system">Standalone link</TextLink>
                <TextLink href="/design-system" variant="inline">
                  Inline link
                </TextLink>
                <Badge tone="neutral">Beginner</Badge>
                <Badge tone="moss">60 min</Badge>
                <Badge tone="clay">Ages 6–12</Badge>
                <Badge tone="placeholder">Placeholder</Badge>
              </div>
            </Spec>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="dark" surface="moss" labelledBy="dark-h">
        <Container>
          <SectionHeading
            id="dark-h"
            eyebrow="05"
            lead="Dark sections are a tone change, not a theme. The .on-dark class re-points the focus-ring and rule custom properties, so nested components adapt without an isDark prop threaded through the tree."
          >
            <span className="text-ivory">Dark surface</span>
          </SectionHeading>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button tone="dark">Book a session</Button>
            <Button tone="dark" variant="secondary">
              See the schedule
            </Button>
            <Button
              tone="dark"
              variant="quiet"
              icon={<ArrowRight size={16} strokeWidth={1.75} />}
            >
              Read more
            </Button>
            <Badge tone="dark">On dark</Badge>
          </div>

          <Rule className="mt-12" />
          <p className="text-small max-w-copy text-moss-200 mt-6">
            Secondary text on this ground uses moss-200 at 6.6:1. The hairline above uses
            the dark rule variant automatically.
          </p>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="media" surface="alt" labelledBy="media-h">
        <Container>
          <SectionHeading
            id="media-h"
            eyebrow="06"
            lead="Square corners, a warm loading ground, a 6% inset hairline, and named crops. Sharp edges are the single fastest way to not look like a template."
          >
            Image treatment
          </SectionHeading>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Figure
              src={images.portrait.src}
              alt={images.portrait.alt}
              ratio="editorial"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              caption="editorial — 4:5"
              credit="Unsplash · placeholder"
            />
            <Figure
              src={images.practice.src}
              alt={images.practice.alt}
              ratio="portrait"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              caption="portrait — 3:4"
              credit="Unsplash · placeholder"
            />
            <Figure
              src={images.group.src}
              alt={images.group.alt}
              ratio="landscape"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              caption="landscape — 3:2, warm wash"
              credit="Unsplash · placeholder"
              warm
            />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="motion" labelledBy="motion-h">
        <Container>
          <SectionHeading
            id="motion-h"
            eyebrow="07"
            lead="One curve, four durations, sixteen pixels of travel. Scroll and reload to see these fire — each one runs once and then never again."
          >
            Motion
          </SectionHeading>

          <div className="mt-14 space-y-12">
            <Spec label="Tier 3 — mask reveal (hero only)">
              <ImageReveal trigger="inView" className="max-w-2xl">
                <Figure
                  src={images.landscape.src}
                  alt={images.landscape.alt}
                  ratio="wide"
                  sizes="(min-width: 768px) 42rem, 100vw"
                />
              </ImageReveal>
            </Spec>

            <Spec label="Tier 2 — staggered reveal (grids, schedule rows)">
              <RevealGroup className="bg-hairline grid gap-px sm:grid-cols-3">
                {['Morning practice', 'Personal sessions', 'Kids programme'].map((t) => (
                  <RevealItem key={t} className="bg-ivory p-8">
                    <p className="text-h3 font-display">{t}</p>
                    <p className="text-small text-stone mt-3">
                      Placeholder — real programme copy replaces this.
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Spec>

            <Spec label="Motion tokens">
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['ease-brand', 'cubic-bezier(.22, 1, .36, 1)'],
                  ['quick', '200ms — hover, press'],
                  ['base', '400ms — the default'],
                  ['slow', '700ms — menus'],
                  ['reveal', '1100ms — hero only'],
                  ['distance', '16px — entrance travel'],
                ].map(([k, v]) => (
                  <div key={k} className="rule-t pt-3">
                    <dt className="text-small font-medium">{k}</dt>
                    <dd className="text-micro nums-tabular text-stone">{v}</dd>
                  </div>
                ))}
              </dl>
            </Spec>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section id="forms" surface="alt" labelledBy="forms-h">
        <Container width="measure">
          <SectionHeading
            id="forms-h"
            eyebrow="08"
            lead="Ruled underlines rather than boxes. Labels, hints and errors are wired to their control by the component, so an unlabelled input cannot be rendered by mistake."
          >
            Forms
          </SectionHeading>

          <div className="mt-14 space-y-10">
            <TextField
              id="ds-name"
              name="name"
              label="Your name"
              required
              placeholder="Full name"
            />
            <TextField
              id="ds-email"
              name="email"
              type="email"
              label="Email"
              required
              hint="We reply from a real inbox — never a mailing list."
              placeholder="you@example.com"
            />
            <SelectField
              id="ds-interest"
              name="interest"
              label="I am interested in"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Choose one
              </option>
              <option>Regular classes</option>
              <option>Personal sessions</option>
              <option>Kids programme</option>
            </SelectField>
            <TextAreaField
              id="ds-message"
              name="message"
              label="Anything we should know"
              placeholder="Injuries, experience, preferred timings…"
            />
            <TextField
              id="ds-error"
              name="error-demo"
              label="Field in an error state"
              required
              defaultValue="not-an-email"
              error="Enter a valid email address."
            />
            <TextField
              id="ds-disabled"
              name="disabled-demo"
              label="Disabled field"
              disabled
              defaultValue="Unavailable"
            />

            <div className="space-y-4">
              <FormNotice tone="success">
                Thank you — your enquiry has been received. Placeholder copy.
              </FormNotice>
              <FormNotice tone="error">
                Something went wrong. Please try again, or write to us directly.
              </FormNotice>
            </div>

            <Button block size="lg">
              Send enquiry
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section surface="moss" spacing="loose">
        <Container>
          <Reveal>
            <Mark className="mb-6" />
            <p className="text-display-2 font-display text-ivory max-w-[18ch]">
              Phase 2 complete. The homepage is next.
            </p>
            <p className="text-lead max-w-measure text-moss-200 mt-6">
              Every token, primitive and state above is in place. Nothing on this page is
              a real business claim.
            </p>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
