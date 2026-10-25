"use client";

import type { CSSProperties, ReactNode } from "react";

/** Card whose glow follows the pointer. */
export function Spot({
  children,
  accent,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  accent?: string;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={`spot ${className}`}
      style={{ "--accent": accent } as CSSProperties}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Tag>
  );
}
