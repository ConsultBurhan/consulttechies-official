"use client";

import { useEffect, useRef, useState } from "react";
import { clientGroups, logoSrc, type Client } from "@/lib/clients";

type Group = (typeof clientGroups)[number];

/** One logo tile. Offsets and sizes vary per position so a sector never looks like a grid. */
function Logo({ c, i, accent, big }: { c: Client; i: number; accent: string; big: boolean }) {
  const body = (
    <>
      <span className={`block overflow-hidden rounded-[1.6rem] bg-[#f4f1ec] p-5 transition-transform duration-500 group-hover:scale-[1.03] ${big ? "h-40 w-56" : "h-32 w-44"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc(c)} alt={`${c.name} logo`} loading="lazy" className="h-full w-full object-contain" />
      </span>
      <span className="mt-3 block pl-1">
        <span className="display block text-lg leading-tight">{c.name}</span>
        <span className="mt-0.5 block text-xs text-muted">
          {c.note}
          {c.place ? ` · ${c.place}` : ""}
        </span>
      </span>
      <span aria-hidden="true" className="absolute -bottom-1 left-1 h-px w-0 transition-all duration-500 group-hover:w-12" style={{ background: accent }} />
    </>
  );
  const cls = `group relative block ${big ? "w-56" : "w-44"} ${i % 2 ? "md:translate-y-10" : "md:-translate-y-6"}`;
  return c.url ? (
    <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.name} (opens website in a new tab)`} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function Panel({ g }: { g: Group }) {
  return (
    <div className="grid h-full items-center gap-10 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12">
      <div>
        <span className="display block text-[clamp(5rem,12vw,10rem)] leading-none" style={{ color: g.accent, opacity: 0.9 }}>
          {g.n}
        </span>
        <h2 className="display mt-4 text-3xl md:text-4xl">{g.title}</h2>
        <p className="mt-3 max-w-xs text-muted">{g.line}</p>
        <p className="eyebrow mt-6">{g.clients.length} {g.clients.length === 1 ? "client" : "clients"}</p>
      </div>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-12 md:gap-x-6">
        {g.clients.map((c, i) => (
          <li key={c.id}>
            <Logo c={c} i={i} accent={g.accent} big={i === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Desktop: the viewport pins and the five sectors slide past horizontally. Mobile: plain stacked sections. */
export function ClientSectors() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = clientGroups.length;

  // Progress comes from the section's live position on every scroll frame, so it stays correct when the
  // 3D ring or images above it change the page height after load.
  useEffect(() => {
    const el = outer.current;
    const tr = track.current;
    if (!el || !tr) return;
    const mq = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!mq.matches) {
        tr.style.transform = "";
        tr.style.opacity = "";
        tr.style.visibility = "";
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      // hold on the first and last group for a beat, slide through the sectors in between
      const HOLD = 0.1;
      const p = Math.min(1, Math.max(0, (raw - HOLD) / (1 - 2 * HOLD)));
      tr.style.transform = `translate3d(${-p * (n - 1) * 100}vw,0,0)`;
      // invisible until the section is essentially pinned, so group 01 never peeks in under the ring
      tr.style.opacity = String(Math.min(1, Math.max(0, 1 - r.top / (vh * 0.12))));
      tr.style.visibility = r.top > vh * 0.12 ? "hidden" : "visible";
      setActive(Math.min(n - 1, Math.round(p * (n - 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, [n]);

  const jump = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const frac = 0.1 + (0.8 * i) / (n - 1);
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + span * frac, behavior: "smooth" });
  };

  return (
    <>
      {/* desktop: pinned horizontal walk */}
      <div ref={outer} className="relative hidden md:block" style={{ height: `${n * 100 + 40}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div ref={track} className="flex h-full will-change-transform" style={{ width: `${n * 100}vw` }}>
            {clientGroups.map((g) => (
              <section key={g.key} aria-label={g.title} className="h-full w-screen shrink-0 pt-28 pb-24">
                <div className="container-x h-full">
                  <Panel g={g} />
                </div>
              </section>
            ))}
          </div>
          <div className="container-x absolute inset-x-0 bottom-8 left-1/2 -translate-x-1/2">
            <ol className="flex items-center gap-3">
              {clientGroups.map((g, i) => (
                <li key={g.key} className="flex-1">
                  <button onClick={() => jump(i)} aria-current={i === active} className="group block w-full text-left">
                    <span className="block h-[3px] overflow-hidden rounded-full bg-fg/10">
                      <span className="block h-full rounded-full transition-all duration-700" style={{ width: i <= active ? "100%" : "0%", background: g.accent }} />
                    </span>
                    <span className={`eyebrow mt-2 block transition ${i === active ? "text-text" : "group-hover:text-text"}`}>{g.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* mobile: stacked */}
      <div className="container-x space-y-20 md:hidden">
        {clientGroups.map((g) => (
          <section key={g.key} aria-label={g.title}>
            <Panel g={g} />
          </section>
        ))}
      </div>
    </>
  );
}
