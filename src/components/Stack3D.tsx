"use client";

import type { CSSProperties, ReactNode } from "react";
export { glyphs } from "./icons";

export type Layer = { key: string; label: string; color: string; glyph: ReactNode };

const ROW = 92;

/**
 * Tilted trays stacked in perspective, joined by a vertical beam.
 * `active` raises one tray; `packet` places a glowing dot on a tray (null hides it);
 * `side` renders the readable text beside each tray, so labels never sit on a tilted surface.
 */
export function Stack3D({
  layers,
  active,
  packet = null,
  lit = () => false,
  side,
  onSelect,
}: {
  layers: Layer[];
  active: number | null;
  packet?: number | null;
  lit?: (i: number) => boolean;
  side: (i: number) => ReactNode;
  onSelect?: (i: number) => void;
}) {
  return (
    <div className="relative" style={{ height: layers.length * ROW + 40 }}>
      {/* beam through the tray centres */}
      <span
        aria-hidden="true"
        className="absolute w-px bg-gradient-to-b from-transparent via-[var(--line-strong)] to-transparent"
        style={{ left: "calc(25% + 2px)", top: 10, bottom: 10 }}
      />
      {packet !== null && (
        <span
          aria-hidden="true"
          className="absolute z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[top,box-shadow] duration-700 ease-[cubic-bezier(0.5,0,0.2,1)]"
          style={{
            left: "calc(25% + 2.5px)",
            top: 20 + packet * ROW + ROW / 2,
            boxShadow: `0 0 0 5px color-mix(in srgb, ${layers[packet].color} 35%, transparent), 0 0 26px 6px ${layers[packet].color}`,
          }}
        />
      )}
      <ol className="relative">
        {layers.map((l, i) => {
          const on = active === i || lit(i);
          const Row = onSelect ? "button" : "div";
          return (
            <li key={l.key} style={{ height: ROW, marginTop: i === 0 ? 20 : 0 }}>
              <Row
                {...(onSelect ? { type: "button" as const, onClick: () => onSelect(i), "aria-pressed": active === i } : {})}
                className={`grid h-full w-full grid-cols-[50%_1fr] items-center gap-4 text-left ${onSelect ? "cursor-pointer" : ""}`}
              >
                <span className="floaty relative block h-full" style={{ animationDelay: `${i * -1.4}s`, perspective: 700 }}>
                  <span
                    className="tray absolute inset-x-0 top-1/2 grid h-[118px] place-items-center rounded-[18px] transition-[transform,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={
                      {
                        "--c": l.color,
                        transform: `translateY(-50%) rotateX(58deg) translateZ(${active === i ? 26 : 0}px)`,
                        boxShadow: on ? `0 28px 40px -18px ${l.color}` : "0 18px 30px -22px var(--glass-shadow)",
                        opacity: on ? 1 : 0.62,
                      } as CSSProperties
                    }
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: l.color, color: "#0a0d12" }}>
                      {l.glyph}
                    </span>
                  </span>
                </span>
                <span className="block min-w-0">{side(i)}</span>
              </Row>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
