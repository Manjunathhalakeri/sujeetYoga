/**
 * SCHEDULE
 *
 * The weekly timetable as data. Adding, moving or cancelling a session is an
 * edit here — no component changes.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⚠ NO REAL CLASS TIMES EXIST YET. Every `time` below reads "TODO:" and renders
 * as a visible placeholder badge rather than as a real time. Nothing here is a
 * commitment to run a class.
 *
 * To fill this in: replace each `time` with a real value (24-hour, e.g.
 * "06:30 – 07:30"), set `status`, and set `isPlaceholder: false` on that entry.
 * Days with no sessions render an explicit "no scheduled sessions" line rather
 * than being hidden, so the week always reads as a complete week.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { Program } from './programs';

export type SessionStatus = 'scheduled' | 'full' | 'cancelled' | 'tbc';

export interface Session {
  id: string;
  /** 24-hour range, e.g. "06:30 – 07:30". "TODO:" values render as placeholders. */
  time: string;
  /** Display name. Should match a programme title where one applies. */
  programme: string;
  /** Optional link into the programme detail page. */
  programmeSlug?: Program['slug'];
  /** Who the session is for, e.g. "All levels", "Ages 6–12". */
  audience: string;
  status: SessionStatus;
  /** Short note — room, entrance, what to bring. Optional. */
  note?: string;
  isPlaceholder: boolean;
}

export interface ScheduleDay {
  /** Full day name, used as the heading. */
  day: string;
  /** Three-letter form for the compact desktop rail. */
  short: string;
  sessions: Session[];
}

export const STATUS_LABEL: Record<SessionStatus, string> = {
  scheduled: 'Open',
  full: 'Full',
  cancelled: 'Cancelled',
  tbc: 'To be confirmed',
};

export const schedule: ScheduleDay[] = [
  {
    day: 'Monday',
    short: 'Mon',
    sessions: [
      {
        id: 'mon-1',
        time: 'TODO: time',
        programme: 'Group classes',
        programmeSlug: 'group-classes',
        audience: 'TODO: level',
        status: 'tbc',
        isPlaceholder: true,
      },
      {
        id: 'mon-2',
        time: 'TODO: time',
        programme: 'Personal sessions',
        programmeSlug: 'personal-sessions',
        audience: 'By arrangement',
        status: 'tbc',
        note: 'Placeholder note. Personal sessions are arranged directly.',
        isPlaceholder: true,
      },
    ],
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    sessions: [
      {
        id: 'tue-1',
        time: 'TODO: time',
        programme: 'Group classes',
        programmeSlug: 'group-classes',
        audience: 'TODO: level',
        status: 'tbc',
        isPlaceholder: true,
      },
    ],
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    sessions: [
      {
        id: 'wed-1',
        time: 'TODO: time',
        programme: 'Group classes',
        programmeSlug: 'group-classes',
        audience: 'TODO: level',
        status: 'tbc',
        isPlaceholder: true,
      },
      {
        id: 'wed-2',
        time: 'TODO: time',
        programme: 'Kids yoga',
        programmeSlug: 'kids-yoga',
        audience: 'TODO: age range',
        status: 'tbc',
        isPlaceholder: true,
      },
    ],
  },
  {
    day: 'Thursday',
    short: 'Thu',
    sessions: [
      {
        id: 'thu-1',
        time: 'TODO: time',
        programme: 'Group classes',
        programmeSlug: 'group-classes',
        audience: 'TODO: level',
        status: 'tbc',
        isPlaceholder: true,
      },
    ],
  },
  {
    day: 'Friday',
    short: 'Fri',
    sessions: [
      {
        id: 'fri-1',
        time: 'TODO: time',
        programme: 'Group classes',
        programmeSlug: 'group-classes',
        audience: 'TODO: level',
        status: 'tbc',
        isPlaceholder: true,
      },
      {
        id: 'fri-2',
        time: 'TODO: time',
        programme: 'Kids yoga',
        programmeSlug: 'kids-yoga',
        audience: 'TODO: age range',
        status: 'tbc',
        isPlaceholder: true,
      },
    ],
  },
  {
    day: 'Saturday',
    short: 'Sat',
    sessions: [
      {
        id: 'sat-1',
        time: 'TODO: time',
        programme: 'Workshops & intensives',
        programmeSlug: 'workshops',
        audience: 'Open to all',
        status: 'tbc',
        note: 'Placeholder note. Workshops run to their own dates.',
        isPlaceholder: true,
      },
    ],
  },
  {
    // Deliberately empty, to exercise the "no sessions" state.
    day: 'Sunday',
    short: 'Sun',
    sessions: [],
  },
];

/** Notes shown beneath the timetable. TODO: confirm or replace. */
export const scheduleNotes: string[] = [
  'Placeholder note. How to reserve a place, and how much notice is needed.',
  'Placeholder note. What to do if you need to cancel.',
  'Placeholder note. Arrival time before a session starts.',
];

/** True while any session is still unfilled — drives the page-level notice. */
export const scheduleIsPlaceholder = schedule.some((d) =>
  d.sessions.some((s) => s.isPlaceholder),
);
