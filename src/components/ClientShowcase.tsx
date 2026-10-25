"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allClients, clientGroups } from "@/lib/clients";

gsap.registerPlugin(ScrollTrigger);

const ClientRing = dynamic(() => import("./ClientRing"), { ssr: false });

const noop = () => () => {};
const useClient = <T,>(get: () => T, server: T) => useSyncExternalStore(noop, get, () => server);
const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};
const countries = new Set(allClients.map((c) => c.place).filter(Boolean)).size;

const stats = [
  { n: allClients.length, label: "client brands", color: "var(--orange)" },
  { n: clientGroups.length, label: "sectors", color: "var(--red)" },
  { n: countries, label: "countries", color: "var(--teal)" },
];

/** Highlighted figures over a 3D ring of client logos. */
export function ClientShowcase() {
  const gl = useClient(hasWebGL, false);
  const calm = useClient(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, false);
  const [front, setFront] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const numbers = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (calm) return;
    const ctx = gsap.context(() => {
      numbers.current.forEach((el, i) => {
        if (!el) return;
        const o = { v: 0 };
        gsap.to(o, {
          v: stats[i].n,
          duration: 1.6,
          ease: "power3.out",
          delay: i * 0.15,
          onUpdate: () => (el.textContent = String(Math.round(o.v))),
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
        el.textContent = "0";
      });
    }, root);
    return () => ctx.revert();
  }, [calm]);

  const c = allClients[front] ?? allClients[0];

  return (
    <div ref={root} className="relative">
      <div className="container-x">
        <dl className="grid grid-cols-3 overflow-hidden rounded-[2rem] border border-line bg-ink-2/60 backdrop-blur-sm">
          {stats.map((s, i) => (
            <div key={s.label} className="relative px-4 py-8 text-center sm:px-8 sm:py-12 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-line">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
              <dt className="eyebrow order-2 mt-3">{s.label}</dt>
              <dd className="display text-[clamp(3.2rem,11vw,8rem)] leading-none" style={{ color: s.color }}>
                <span ref={(el) => { numbers.current[i] = el; }}>{s.n}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {gl && (
        <div className="relative mt-6 h-[420px] sm:h-[520px]">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(45% 50% at 50% 55%, color-mix(in srgb, var(--teal) 14%, transparent), transparent 70%)" }}
          />
          <div className="absolute inset-0" aria-hidden="true">
            <ClientRing calm={calm} onFront={setFront} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center">
            <p className="display text-2xl">{c.name}</p>
            <p className="eyebrow mt-1">Drag to turn · {c.place ?? "Worldwide"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
