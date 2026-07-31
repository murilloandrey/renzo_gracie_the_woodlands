import { useState } from "react";
import { Play, ShieldAlert } from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import { TECHNIQUES, hasTechniques, type Technique } from "@/lib/techniques";

/**
 * Click-to-load YouTube facade.
 *
 * A real <iframe> pulls roughly half a megabyte of YouTube player on page load,
 * even if nobody presses play. This renders a poster frame and only mounts the
 * iframe after a click, which keeps the page fast for the 95% who never watch.
 */
function VideoFacade({ videoId, label }: { videoId: string; label: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        title={label}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play: ${label}`}
      className="group relative block h-full w-full overflow-hidden"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover grayscale brightness-50 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-90"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="rounded-full border border-bone/40 bg-obsidian/50 p-4 backdrop-blur-sm transition-transform group-hover:scale-110">
          <Play size={26} className="text-bone" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}

function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <article className="flex flex-col border border-border bg-card">
      {technique.videoId && (
        <div className="aspect-video border-b border-border">
          <VideoFacade
            videoId={technique.videoId}
            label={`${technique.name} — Renzo Gracie The Woodlands`}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="font-display text-[10px] tracking-[0.18em] text-primary">
          {technique.category} · {technique.level}
        </div>

        <h3 className="font-display mt-3 text-2xl">{technique.name}</h3>
        {technique.altName && (
          <p className="mt-1 text-xs italic text-muted-foreground">
            {technique.altName}
          </p>
        )}

        <p className="mt-4 text-sm text-muted-foreground">
          {technique.summary}
        </p>
      </div>
    </article>
  );
}

export function TechniqueShowcase({
  eyebrow = "07 — How We Teach",
}: {
  eyebrow?: string;
}) {
  if (!hasTechniques()) return null;

  return (
    <section
      id="how-we-teach"
      className="border-t border-border px-6 py-20 md:px-12 md:py-32"
    >
      <SectionHeader
        eyebrow={eyebrow}
        title="Technique, Not Tricks"
        note="Every class is built around named, repeatable technique — taught slowly, drilled with a partner, and corrected by a coach. Here's a sample of what your first months look like."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TECHNIQUES.map((technique) => (
          <TechniqueCard key={technique.name} technique={technique} />
        ))}
      </div>

      {/* Safety notice. Keep this visible — it is the responsible thing to do and
          it also reassures the exact parent who is nervous about signing a kid up. */}
      <aside className="mt-10 flex gap-4 border border-border bg-card p-6">
        <ShieldAlert
          size={18}
          className="mt-0.5 shrink-0 text-primary"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-display text-xs tracking-[0.18em]">
            Train Responsibly
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            These pages describe techniques taught in a supervised class. They
            are not an instructional guide. Joint locks and chokes can cause
            injury and should only ever be practised on the mats, with a
            qualified coach present and a partner who has agreed to train. Tap
            early, tap often, and release the moment your partner taps. Never
            use these techniques on someone who is not training with you.
          </p>
        </div>
      </aside>
    </section>
  );
}
