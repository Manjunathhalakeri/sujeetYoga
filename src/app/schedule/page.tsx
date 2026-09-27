import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PrimaryCta } from '@/components/ui/PrimaryCta';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PageHeader } from '@/components/sections/PageHeader';
import { isTodo } from '@/content/programs';
import {
  STATUS_LABEL,
  schedule,
  scheduleIsPlaceholder,
  scheduleNotes,
  type Session,
} from '@/content/schedule';
import { siteConfig } from '@/content/siteConfig';

export const metadata: Metadata = {
  title: 'Schedule',
  description:
    'Placeholder description for the weekly schedule. TODO: replace once real class times are supplied.',
  alternates: { canonical: '/schedule' },
};

const statusTone = {
  scheduled: 'sage',
  full: 'neutral',
  cancelled: 'clay',
  tbc: 'placeholder',
} as const;

/**
 * SCHEDULE — an editorial week, not a timetable widget.
 *
 * Why this shape rather than a grid/table:
 * - A seven-column grid forces every day to the width of the busiest one and
 *   collapses into an unreadable mess on a phone. A studio week is not
 *   symmetrical, so the layout should not pretend it is.
 * - Instead each day is a horizontal band: the day name holds the left channel
 *   (the same device as the programmes and About pages), and its sessions run
 *   as ruled rows on the right. Scanning down the left edge gives you the week;
 *   scanning right gives you a day.
 * - The same structure works at every width. On mobile it stacks into
 *   day → sessions with the time leading each row, which is genuinely designed
 *   rather than a shrunk table.
 *
 * Times use tabular numerals so the column aligns optically once real values
 * replace the placeholders.
 */

function SessionRow({ session }: { session: Session }) {
  const time = isTodo(session.time) ? null : session.time;

  return (
    <div className="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-12 sm:items-baseline">
      {/* Time leads on every screen size. */}
      <div className="sm:col-span-3">
        {time ? (
          <span className="text-h4 font-display nums-tabular">{time}</span>
        ) : (
          <Badge tone="placeholder">{session.time}</Badge>
        )}
      </div>

      <div className="sm:col-span-5">
        {/* tap-44 gives the 18px link a 44px hit area without changing its
            size. Rows carry py-6, so the expanded area cannot collide with the
            neighbouring session. */}
        {session.programmeSlug ? (
          <Link
            href={`/programs/${session.programmeSlug}`}
            className="link-underline hover:text-sage tap-44 rounded-xs transition-colors"
          >
            {session.programme}
          </Link>
        ) : (
          <span>{session.programme}</span>
        )}
        {session.note ? (
          <p className="text-micro text-bone-faint mt-1.5 max-w-[42ch]">{session.note}</p>
        ) : null}
      </div>

      <div className="text-small text-bone-dim sm:col-span-2">
        {isTodo(session.audience) ? (
          <Badge tone="placeholder">{session.audience}</Badge>
        ) : (
          session.audience
        )}
      </div>

      <div className="sm:col-span-2 sm:text-right">
        <Badge tone={statusTone[session.status]}>{STATUS_LABEL[session.status]}</Badge>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        heading="The week, at a glance."
        lead="Placeholder. One sentence explaining how the week runs and how to reserve a place."
        meta={[
          { label: 'Updated', value: 'TODO: date' },
          { label: 'Booking', value: 'TODO: how to book' },
        ]}
      >
        {scheduleIsPlaceholder ? (
          <Badge tone="placeholder">No real class times supplied yet</Badge>
        ) : null}
      </PageHeader>

      <Section spacing="none" className="pb-section">
        <Container>
          {/* One heading names the whole timetable for assistive tech; each day
              below is an h2 so the week can be navigated by heading. */}
          <h2 className="sr-only">Weekly schedule</h2>

          <RevealGroup className="rule-t" stagger={0.05}>
            {schedule.map((day) => (
              <RevealItem key={day.day} className="rule-b">
                <div className="grid gap-y-4 py-8 lg:grid-cols-12 lg:gap-x-10">
                  {/* Day name holds the left channel. */}
                  <div className="lg:col-span-3">
                    <h3 className="text-h3 font-display lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                      {day.day}
                      <span className="text-eyebrow text-bone-faint mt-1 block uppercase">
                        {day.short}
                      </span>
                    </h3>
                  </div>

                  <div className="lg:col-span-9">
                    {day.sessions.length > 0 ? (
                      <div className="divide-hairline divide-y">
                        {day.sessions.map((session) => (
                          <SessionRow key={session.id} session={session} />
                        ))}
                      </div>
                    ) : (
                      // Explicit rather than hidden: a missing day would read as
                      // an oversight, a stated one reads as a rest day.
                      <p className="text-small text-bone-faint py-6">
                        No scheduled sessions.
                      </p>
                    )}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Notes — centred, because after a long left-weighted list a centred
              block is a stronger reset than yet another offset column. */}
          <Reveal className="mt-section">
            <div className="max-w-measure mx-auto text-center">
              <h2 className="text-eyebrow text-bone-faint uppercase">Good to know</h2>
              <ul className="mt-6 space-y-3">
                {scheduleNotes.map((note) => (
                  <li key={note} className="text-small text-bone-dim">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section surface="raised" spacing="loose">
        <Container>
          <Reveal>
            <div className="max-w-measure mx-auto text-center">
              <h2 className="text-display-2 font-display text-balance">
                Want a place in a class?
              </h2>
              <p className="text-lead text-bone-dim mx-auto mt-6 max-w-[38ch]">
                Placeholder. A line inviting an enquiry rather than implying online
                booking exists.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <PrimaryCta size="lg" />
                <Button href="/contact" variant="quiet">
                  {siteConfig.cta.primaryLabel}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
