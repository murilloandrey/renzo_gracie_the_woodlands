import type { Coach } from "@/lib/coaches";
import { coachInitial } from "@/lib/coaches";

type CoachCardProps = {
  coach: Coach;
  onSelect: (coach: Coach) => void;
};

export function CoachCard({ coach, onSelect }: CoachCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(coach)}
      aria-label={`View details for ${coach.name}`}
      className="group w-full overflow-hidden border border-border bg-card text-left transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
    >
      <div className="relative aspect-[3/4] overflow-hidden border-b border-border bg-card">
        {coach.photoUrl ? (
          <img
            src={coach.photoUrl}
            alt={coach.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center bg-card"
            aria-hidden="true"
          >
            <span className="font-display text-8xl text-muted-foreground/30 md:text-9xl">
              {coachInitial(coach.name)}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
        {coach.badge && (
          <span className="absolute right-3 top-3 border border-bone/60 bg-obsidian/70 px-2 py-1 font-display text-[10px] tracking-[0.18em] text-bone backdrop-blur-sm">
            {coach.badge}
          </span>
        )}
      </div>
      <div className="p-5 md:p-7">
        <h3 className="font-display text-2xl leading-none md:text-3xl">
          {coach.name}
        </h3>
        <div className="mt-3 font-display text-[10px] tracking-[0.18em] text-muted-foreground">
          {coach.role}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{coach.credential}</p>
      </div>
    </button>
  );
}
