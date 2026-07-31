import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

import type { Coach } from "@/lib/coaches";

type CoachDetailProps = {
  coach: Coach;
  onClose: () => void;
};

export function CoachDetail({ coach, onClose }: CoachDetailProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<Element | null>(null);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (returnFocusRef.current instanceof HTMLElement) {
        returnFocusRef.current.focus();
      }
    };
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-obsidian/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coach-detail-title"
        tabIndex={-1}
        className="relative max-h-[calc(100svh-2rem)] w-full max-w-2xl overflow-y-auto rounded-sm border border-input bg-obsidian-elev p-8 text-bone shadow-2xl md:p-10"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Close coach details"
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X size={20} />
        </button>

        {coach.badge && (
          <p className="font-display text-xs tracking-[0.2em] text-primary">
            {coach.badge}
          </p>
        )}
        <h2
          id="coach-detail-title"
          className="font-display mt-3 pr-10 text-4xl leading-tight md:text-5xl"
        >
          {coach.name}
        </h2>
        <p className="font-display mt-4 text-xs tracking-[0.18em] text-muted-foreground">
          {coach.role}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{coach.credential}</p>

        {coach.bio && (
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            {coach.bio}
          </p>
        )}

        {coach.photos && coach.photos.length > 0 && (
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {coach.photos.map((photo, index) => (
              <img
                key={photo}
                src={photo}
                alt={`${coach.name} action photo ${index + 1}`}
                loading="lazy"
                className="aspect-[4/3] w-64 shrink-0 object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
