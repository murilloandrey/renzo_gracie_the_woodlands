import { useEffect, useState } from "react";

import {
  describeWhen,
  formatTime,
  getLiveStatus,
  type LiveStatus,
} from "@/lib/schedule";

/**
 * Live "what's happening on the mat right now" band.
 *
 * Reads the gym's local clock (America/Chicago) against the weekly schedule.
 * No backend, no network call. Drop it directly above the schedule grid.
 */
export function TrainingNow({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getLiveStatus());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  // Render nothing on the first paint so the server-rendered / prerendered
  // markup never disagrees with the client clock.
  if (!status) return null;

  const { current, next } = status;
  const live = Boolean(current);

  return (
    <div
      className={`flex flex-col gap-3 rounded-sm border border-input bg-obsidian-elev px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
            live ? "animate-pulse bg-primary" : "bg-muted-foreground/50"
          }`}
          aria-hidden="true"
        />

        <div>
          <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
            {live ? "ON THE MAT NOW" : "NEXT ON THE MAT"}
          </p>

          {live && current ? (
            <p className="mt-1 text-sm text-bone">
              <span className="font-semibold">{current.title}</span>
              <span className="text-muted-foreground">
                {" · until "}
                {formatTime(current.end)}
                {current.coach ? ` · ${current.coach}` : ""}
              </span>
            </p>
          ) : next ? (
            <p className="mt-1 text-sm text-bone">
              <span className="font-semibold">{next.title}</span>
              <span className="text-muted-foreground">
                {` · ${describeWhen(status)} at ${formatTime(next.start)}`}
                {next.coach ? ` · ${next.coach}` : ""}
              </span>
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              See the weekly schedule for class times.
            </p>
          )}
        </div>
      </div>

      <a
        href="#schedule"
        className="shrink-0 text-xs font-semibold tracking-[0.15em] text-primary hover:underline"
      >
        FULL SCHEDULE
      </a>
    </div>
  );
}
