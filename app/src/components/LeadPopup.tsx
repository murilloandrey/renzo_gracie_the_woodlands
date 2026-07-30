import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { POPUP_CONFIG, POPUP_ENABLED, offer } from "@/config/offer";
import { isValidEmail, submitLead } from "@/lib/leads";
import { SMS_URL } from "@/config/links";

const DISMISSED_KEY = "rgw.lead.dismissedAt";
const SUBMITTED_KEY = "rgw.lead.submitted";

function storage(): Storage | null {
  try {
    // Safari private mode throws on access.
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Has this visitor already submitted, or dismissed recently? */
function shouldSuppress(): boolean {
  const store = storage();
  if (!store) return false;

  if (store.getItem(SUBMITTED_KEY) === "1") return true;

  const dismissedAt = Number(store.getItem(DISMISSED_KEY) ?? 0);
  if (!dismissedAt) return false;

  const ageDays = (Date.now() - dismissedAt) / 86_400_000;
  return ageDays < POPUP_CONFIG.dismissDays;
}

function pathSuppressed(): boolean {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return POPUP_CONFIG.suppressOnPaths.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<Element | null>(null);
  const firedRef = useRef(false);

  const fire = useCallback(() => {
    if (firedRef.current) return;
    // Re-check at fire time, not mount time, so client-side navigation to
    // /free-trial between mount and trigger still suppresses correctly.
    if (pathSuppressed() || shouldSuppress()) return;
    firedRef.current = true;
    returnFocusRef.current = document.activeElement;
    setOpen(true);
  }, []);

  // Triggers: dwell, scroll depth, exit intent. First one wins.
  useEffect(() => {
    if (!POPUP_ENABLED) return;
    if (pathSuppressed() || shouldSuppress()) return;

    const timer = window.setTimeout(fire, POPUP_CONFIG.dwellMs);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= POPUP_CONFIG.scrollFraction) fire();
    };

    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null && event.clientY <= 0) fire();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (POPUP_CONFIG.exitIntent && finePointer) {
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [fire]);

  const close = useCallback(() => {
    setOpen(false);
    storage()?.setItem(DISMISSED_KEY, String(Date.now()));
    if (returnFocusRef.current instanceof HTMLElement)
      returnFocusRef.current.focus();
  }, []);

  // Escape to close, Tab trapped inside, focus the input on open, lock scroll.
  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

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
      if (!focusable || focusable.length === 0) return;

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
    };
  }, [open, close]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "submitting") return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("That email doesn't look right — mind checking it?");
      return;
    }

    setStatus("submitting");
    const result = await submitLead({
      email,
      source: "popup",
      offerCode: offer.code,
    });

    if (result.ok) {
      storage()?.setItem(SUBMITTED_KEY, "1");
      setStatus("success");
      return;
    }

    setStatus("error");
    setMessage(
      result.reason === "network"
        ? "Couldn't reach us just now. Try again, or text us and we'll sort it out."
        : "Something went wrong on our end. Text us and we'll get you booked.",
    );
  }

  if (!POPUP_ENABLED || !open) return null;

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
        aria-labelledby="lead-popup-title"
        className="relative w-full max-w-md rounded-sm border border-input bg-obsidian-elev p-8 text-bone shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-bone"
        >
          <X size={18} />
        </button>

        {status === "success" ? (
          <div className="text-center">
            <h2 id="lead-popup-title" className="font-display text-3xl">
              {offer.successHeadline}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              {offer.successBody}
            </p>
            <button
              type="button"
              onClick={close}
              className="btn-primary mt-8 w-full"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="font-display text-xs tracking-[0.2em] text-primary">
              NEW STUDENTS
            </p>
            <h2
              id="lead-popup-title"
              className="font-display mt-3 text-3xl leading-tight"
            >
              {offer.headline}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{offer.body}</p>

            <form onSubmit={onSubmit} noValidate className="mt-6">
              <label htmlFor="lead-email" className="sr-only">
                Email address
              </label>
              <input
                ref={inputRef}
                id="lead-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="you@email.com"
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "lead-error" : undefined}
                className="w-full rounded-sm border border-input bg-obsidian px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />

              {status === "error" && (
                <p
                  id="lead-error"
                  role="alert"
                  className="mt-2 text-xs text-primary"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary mt-4 w-full disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : offer.cta}
              </button>
            </form>

            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              {offer.finePrint}{" "}
              <a href={SMS_URL} className="underline hover:text-bone">
                Or just text us.
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
