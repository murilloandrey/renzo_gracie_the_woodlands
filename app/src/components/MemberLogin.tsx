import { ExternalLink } from "lucide-react";

import { MEMBER_PORTAL_URL, TEL_URL } from "@/config/links";

/**
 * Header "Member Login" link.
 *
 * Points existing members straight at the gym's Zen Planner portal so they can
 * book classes, check their account, and pay — without you having to build or
 * maintain any of that.
 *
 * If MEMBER_PORTAL_URL is not set yet, this degrades to a call link instead of
 * rendering a dead `href="#"`.
 */
export function MemberLogin({ className = "" }: { className?: string }) {
  const base = `font-display tracking-[0.18em] hover:text-primary ${className}`;

  if (!MEMBER_PORTAL_URL) {
    return (
      <a
        href={TEL_URL}
        className={base}
        title="Call the academy for portal access"
      >
        Member Login
      </a>
    );
  }

  return (
    <a
      href={MEMBER_PORTAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 ${base}`}
    >
      Member Login
      <ExternalLink size={12} aria-hidden="true" />
      <span className="sr-only">
        (opens the Zen Planner member portal in a new tab)
      </span>
    </a>
  );
}
