import type { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, note, id }: { eyebrow: string; title: string; note?: ReactNode; id?: string }) {
  return (
    <div id={id} className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="eyebrow mb-4">{eyebrow}</div>
        <h2 className="font-display text-5xl md:text-7xl">{title}</h2>
      </div>
      {note && <p className="max-w-sm text-sm text-muted-foreground md:text-right">{note}</p>}
    </div>
  );
}
