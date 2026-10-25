import Link from "next/link";
import type { CSSProperties } from "react";
import { areas, type Area } from "@/lib/specializations";
import { AreaVisual } from "./AreaVisual";
import { IconBadge, icons, type IconName } from "./ui";

export const areaIcon: Record<Area["key"], IconName> = { whatsapp: "chat", ai: "spark", crm: "contacts", devops: "gear" };

/** Placement in the bento: WhatsApp leads wide beside AI; CRM and DevOps split the second row. */
const LAYOUT: Record<Area["key"], string> = {
  whatsapp: "md:col-span-2 lg:col-span-4",
  ai: "md:col-span-2 lg:col-span-2",
  crm: "lg:col-span-3",
  devops: "lg:col-span-3",
};

function AreaCard({ a }: { a: Area }) {
  const wide = a.key === "whatsapp";
  return (
    <Link
      href={`/services#${a.key}`}
      className={`card card-hover card-glow group flex flex-col overflow-hidden p-6 md:p-7 ${LAYOUT[a.key]}`}
      style={{ "--accent": a.accent } as CSSProperties}
    >
      <div className={`relative flex flex-1 flex-col gap-6 ${wide ? "md:grid md:grid-cols-[1fr_1fr] md:content-center md:items-center md:gap-8" : ""}`}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <IconBadge icon={areaIcon[a.key]} color={a.accent} />
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
            >
              {icons.arrow}
            </span>
          </div>
          <h3 className="display mt-6 text-[1.5rem] tracking-[-0.02em]">{a.title}</h3>
          <p className="mt-2 text-[0.97rem] leading-relaxed text-muted">{a.headline}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {a.capabilities.slice(0, 3).map((c) => (
              <li key={c.title} className="chip">{c.title}</li>
            ))}
          </ul>
        </div>
        <div className={wide ? "" : "mt-auto"}>
          <AreaVisual k={a.key} accent={a.accent} />
        </div>
      </div>
    </Link>
  );
}

export function AreaBento() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
      {areas.map((a) => (
        <AreaCard key={a.key} a={a} />
      ))}
    </div>
  );
}
