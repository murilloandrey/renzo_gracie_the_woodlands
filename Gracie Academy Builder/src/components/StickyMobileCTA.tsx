import { Link } from "@tanstack/react-router";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-obsidian/95 p-3 backdrop-blur md:hidden">
      <Link to="/free-trial" className="btn-primary w-full">Claim Your Free Trial</Link>
    </div>
  );
}
