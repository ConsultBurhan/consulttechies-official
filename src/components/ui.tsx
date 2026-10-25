import type { CSSProperties, ReactNode } from "react";
import { glyphs } from "./icons";

const svg = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Small line icons, shared across sections. */
export const icons = {
  ...glyphs,
  shield: <svg {...svg} aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></svg>,
  search: <svg {...svg} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  pen: <svg {...svg} aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="m13 7 4 4" /></svg>,
  code: <svg {...svg} aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>,
  check: <svg {...svg} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>,
  rocket: <svg {...svg} aria-hidden="true"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 5-9 12-9 0 7-5 11-9 12z" /><circle cx="14.5" cy="9.5" r="1.5" /></svg>,
  loop: <svg {...svg} aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5" /></svg>,
  arrow: <svg {...svg} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  compass: <svg {...svg} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2z" /></svg>,
};

export type IconName = keyof typeof icons;

/** Rounded square badge holding an icon, tinted with an accent. */
export function IconBadge({ icon, color, size = 44 }: { icon: IconName; color: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[14px] border"
      style={{
        width: size,
        height: size,
        color,
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
      }}
    >
      {icons[icon]}
    </span>
  );
}

export function Card({
  children,
  accent,
  className = "",
  hover = true,
  glow = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  accent?: string;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag className={`card ${hover ? "card-hover" : ""} ${glow ? "card-glow" : ""} ${className}`} style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
