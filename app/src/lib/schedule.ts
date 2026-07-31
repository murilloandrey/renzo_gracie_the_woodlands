/**
 * Single source of truth for the weekly class schedule.
 *
 * Phase 2: this module is the ONLY thing that has to change when the schedule
 * moves to Supabase. Swap `WEEKLY_SCHEDULE` for a fetched array and every
 * consumer (the schedule grid, the "on the mat now" band, the JSON-LD opening
 * hours, the free-trial day picker) updates at once.
 */

export const GYM_TIMEZONE = "America/Chicago";

export type Discipline = "bjj" | "muay-thai" | "kids" | "mma";

/** 0 = Sunday ... 6 = Saturday, matching Date#getDay(). */
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ClassSlot = {
  day: DayIndex;
  /** Minutes from midnight, gym-local. */
  start: number;
  end: number;
  title: string;
  coach: string | null;
  discipline: Discipline;
};

export const DAY_LABELS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  bjj: "BJJ",
  "muay-thai": "Muay Thai",
  kids: "Kids",
  mma: "MMA",
};

/** "5:00 AM" -> 300 */
function t(label: string): number {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(label.trim());
  if (!match) throw new Error(`Bad time literal: ${label}`);
  const [, h, m, meridiem] = match;
  let hours = Number(h) % 12;
  if (meridiem.toUpperCase() === "PM") hours += 12;
  return hours * 60 + Number(m);
}

function slot(
  day: DayIndex,
  start: string,
  end: string,
  title: string,
  coach: string | null,
  discipline: Discipline,
): ClassSlot {
  return { day, start: t(start), end: t(end), title, coach, discipline };
}

const MON = 1;
const TUE = 2;
const WED = 3;
const THU = 4;
const FRI = 5;
const SAT = 6;

export const WEEKLY_SCHEDULE: ClassSlot[] = [
  // Monday
  slot(MON, "5:00 AM", "6:00 AM", "Adult BJJ No-Gi", "Vinnie", "bjj"),
  slot(MON, "6:30 AM", "7:30 AM", "Adult Muay Thai", "Phillipe", "muay-thai"),
  slot(
    MON,
    "8:30 AM",
    "9:30 AM",
    "All-Ages Muay Thai",
    "Phillipe",
    "muay-thai",
  ),
  slot(MON, "11:00 AM", "12:00 PM", "Adult BJJ Gi", "Todd / Alex", "bjj"),
  slot(MON, "5:00 PM", "6:00 PM", "Kids BJJ Gi 7+", "Nathan / Vinny", "kids"),
  slot(MON, "6:00 PM", "7:00 PM", "Teen BJJ", "Nathan / Vinny", "kids"),
  slot(MON, "6:00 PM", "8:00 PM", "Adult BJJ", "Fadi", "bjj"),

  // Tuesday
  slot(TUE, "11:00 AM", "12:00 PM", "Adult BJJ No-Gi", "Todd / Alex", "bjj"),
  slot(TUE, "5:00 PM", "6:00 PM", "Kids BJJ Gi 7+", "Nathan / Vinny", "kids"),
  slot(TUE, "6:00 PM", "7:00 PM", "Adult Muay Thai", "Phillipe", "muay-thai"),
  slot(
    TUE,
    "7:00 PM",
    "8:00 PM",
    "Beginner Adult/Teen BJJ No-Gi",
    "Eddie / Nathan / Vinny",
    "bjj",
  ),

  // Wednesday
  slot(WED, "5:00 AM", "6:00 AM", "Adult BJJ Gi", "Vinnie", "bjj"),
  slot(WED, "6:30 AM", "7:30 AM", "Adult Muay Thai", "Phillipe", "muay-thai"),
  slot(
    WED,
    "8:30 AM",
    "9:30 AM",
    "All-Ages Muay Thai",
    "Phillipe",
    "muay-thai",
  ),
  slot(WED, "11:00 AM", "12:00 PM", "Adult BJJ Gi", "Todd / Alex", "bjj"),
  slot(WED, "5:00 PM", "6:00 PM", "Kids BJJ Gi 7+", "Nathan / Vinny", "kids"),
  slot(WED, "6:00 PM", "7:00 PM", "Teen BJJ", "Nathan / Vinny", "kids"),
  slot(WED, "6:00 PM", "8:00 PM", "Adult BJJ", "Fadi", "bjj"),

  // Thursday
  slot(THU, "11:00 AM", "12:00 PM", "Adult BJJ No-Gi", "Todd / Alex", "bjj"),
  slot(THU, "5:00 PM", "6:00 PM", "Kids BJJ Gi 7+", "Nathan / Vinny", "kids"),
  slot(THU, "6:00 PM", "7:00 PM", "Adult Muay Thai", "Phillipe", "muay-thai"),
  slot(
    THU,
    "7:00 PM",
    "8:00 PM",
    "Beginner Adult/Teen BJJ No-Gi",
    "Eddie / Nathan / Vinny",
    "bjj",
  ),

  // Friday
  slot(FRI, "5:00 AM", "6:00 AM", "Adult BJJ Rotating", "Vinnie", "bjj"),
  slot(FRI, "6:30 AM", "7:30 AM", "Adult Muay Thai", "Phillipe", "muay-thai"),
  slot(
    FRI,
    "8:30 AM",
    "9:30 AM",
    "All-Ages Muay Thai",
    "Phillipe",
    "muay-thai",
  ),
  slot(FRI, "11:00 AM", "12:00 PM", "Open Mat (Gi & No-Gi)", null, "bjj"),
  slot(FRI, "5:00 PM", "6:00 PM", "Kids BJJ Gi 7+", "Nathan / Vinny", "kids"),
  slot(FRI, "6:00 PM", "7:30 PM", "MMA All Ages", "Ollie", "mma"),

  // Saturday
  slot(SAT, "8:00 AM", "9:30 AM", "Adult BJJ Open Mat", "Fadi", "bjj"),
  slot(
    SAT,
    "10:00 AM",
    "11:00 AM",
    "Kids BJJ Competition Class",
    "Nathan / Vinny",
    "kids",
  ),
];

/** 300 -> "5:00 AM" */
export function formatTime(minutes: number): string {
  const total = ((minutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const meridiem = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${meridiem}`;
}

/** Current day + minutes-from-midnight in the gym's timezone, not the visitor's. */
export function gymNow(now: Date = new Date()): {
  day: DayIndex;
  minutes: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: GYM_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const day = DAY_LABELS.indexOf(get("weekday") as (typeof DAY_LABELS)[number]);
  // hourCycle h23 can yield "24" at midnight in some engines.
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));

  return {
    day: (day === -1 ? 0 : day) as DayIndex,
    minutes: hour * 60 + minute,
  };
}

export type LiveStatus = {
  /** A class happening right now, if any. */
  current: ClassSlot | null;
  /** The next class to start, searching forward up to 7 days. */
  next: ClassSlot | null;
  /** Whether `next` starts later today (gym-local). */
  nextIsToday: boolean;
  /** Calendar days between today and `next`: 0 = today, 1 = tomorrow, ... */
  dayOffset: number | null;
  /** Minutes until `next` starts. */
  minutesUntilNext: number | null;
};

export function getLiveStatus(now: Date = new Date()): LiveStatus {
  const { day, minutes } = gymNow(now);

  const current =
    WEEKLY_SCHEDULE.filter(
      (s) => s.day === day && s.start <= minutes && minutes < s.end,
    ).sort((a, b) => a.end - b.end)[0] ?? null;

  for (let offset = 0; offset < 8; offset += 1) {
    const targetDay = ((day + offset) % 7) as DayIndex;
    const candidates = WEEKLY_SCHEDULE.filter(
      (s) => s.day === targetDay && (offset > 0 || s.start > minutes),
    ).sort((a, b) => a.start - b.start);

    if (candidates.length > 0) {
      const next = candidates[0];
      return {
        current,
        next,
        nextIsToday: offset === 0,
        dayOffset: offset,
        minutesUntilNext: offset * 1440 + next.start - minutes,
      };
    }
  }

  return {
    current,
    next: null,
    nextIsToday: false,
    dayOffset: null,
    minutesUntilNext: null,
  };
}

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** Human label for when `next` starts: "in 25 min", "Tonight", "Tomorrow", "Monday". */
export function describeWhen(status: LiveStatus): string {
  const { next, minutesUntilNext, dayOffset } = status;
  if (!next || minutesUntilNext === null || dayOffset === null) return "";

  if (minutesUntilNext <= 90) {
    const rounded = Math.max(1, Math.round(minutesUntilNext / 5) * 5);
    return `in ${rounded} min`;
  }
  if (dayOffset === 0) return next.start >= 16 * 60 ? "Tonight" : "Today";
  if (dayOffset === 1) return "Tomorrow";
  return WEEKDAY_NAMES[next.day];
}
