import { CalendarDays, ExternalLink, Trophy } from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import { SMS_URL } from "@/config/links";
import {
  formatEventDate,
  placementLabel,
  recentResults,
  upcomingTournaments,
} from "@/lib/competition";

/**
 * Competition team section: where the academy is competing next, and who has
 * been on the podium.
 *
 * Renders NOTHING until src/lib/competition.ts has real data. An empty section
 * is worse than no section.
 */
export function CompetitionTeam({
  eyebrow = "06 — The Competition Team",
}: {
  eyebrow?: string;
}) {
  const upcoming = upcomingTournaments();
  const results = recentResults();

  if (upcoming.length === 0 && results.length === 0) return null;

  const twoUp = upcoming.length > 0 && results.length > 0;

  return (
    <section
      id="competition"
      className="border-t border-border px-6 py-20 md:px-12 md:py-32"
    >
      <SectionHeader
        eyebrow={eyebrow}
        title="We Compete Together"
        note="Competing is never required — but if you want it, you'll never travel alone. The team trains, cuts weight, and corners for each other."
      />

      <div className={`grid gap-6 ${twoUp ? "lg:grid-cols-2" : ""}`}>
        {upcoming.length > 0 && (
          <div className="border border-border bg-card p-8">
            <div className="flex items-center gap-3">
              <CalendarDays size={18} className="text-primary" />
              <h3 className="font-display text-xl">On The Calendar</h3>
            </div>

            <ul className="mt-6 space-y-5">
              {upcoming.map((event) => (
                <li
                  key={`${event.name}-${event.date}`}
                  className="border-t border-border pt-5"
                >
                  <div className="font-display text-[11px] tracking-[0.18em] text-primary">
                    {formatEventDate(event.date)} · {event.org}
                  </div>
                  <div className="mt-1.5 text-sm text-bone">{event.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {event.city}
                  </div>
                  {event.note && (
                    <p className="mt-2 text-xs text-muted-foreground/80">
                      {event.note}
                    </p>
                  )}
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-display text-[11px] tracking-[0.18em] text-primary hover:underline"
                    >
                      Event Details <ExternalLink size={11} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {results.length > 0 && (
          <div className="border border-border bg-card p-8">
            <div className="flex items-center gap-3">
              <Trophy size={18} className="text-primary" />
              <h3 className="font-display text-xl">On The Podium</h3>
            </div>

            <ul className="mt-6 space-y-5">
              {results.map((result) => (
                <li
                  key={`${result.athlete}-${result.event}-${result.date}`}
                  className="grid grid-cols-[auto_1fr] gap-5 border-t border-border pt-5"
                >
                  <div className="font-display text-2xl leading-none text-primary">
                    {placementLabel(result.placement)}
                  </div>
                  <div>
                    <div className="text-sm text-bone">{result.athlete}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {result.division}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground/80">
                      {result.event} · {formatEventDate(result.date)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Thinking about your first tournament? Talk to Professor Todd after any
        class, or{" "}
        <a href={SMS_URL} className="text-primary hover:underline">
          text the academy
        </a>
        . Everyone on this list started with a first one.
      </p>
    </section>
  );
}
