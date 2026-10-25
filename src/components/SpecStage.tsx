"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { areas } from "@/lib/specializations";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned scrollytelling: the viewport stays put while the four core
 * specializations take turns. Stacked, un-pinned list below md.
 */
export function SpecStage() {
  const outer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 768px)");
    let st: ScrollTrigger | undefined;
    const build = () => {
      st?.kill();
      if (!mq.matches) return;
      st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setProgress(self.progress);
          setActive(Math.min(areas.length - 1, Math.floor(self.progress * areas.length)));
        },
      });
    };
    build();
    mq.addEventListener("change", build);
    return () => {
      mq.removeEventListener("change", build);
      st?.kill();
    };
  }, []);

  const jump = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * (i + 0.5)) / areas.length, behavior: "smooth" });
  };

  const a = areas[active];

  return (
    <>
      {/* desktop: pinned stage */}
      <div ref={outer} className="relative hidden md:block" style={{ height: `${areas.length * 85 + 15}vh` }}>
        <div
          className="sticky top-0 flex h-screen items-center overflow-hidden"
          style={{ "--accent": a.accent } as CSSProperties}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-[background] duration-700"
            style={{ background: `radial-gradient(55% 60% at 80% 50%, color-mix(in srgb, ${a.accent} 16%, transparent), transparent 70%)` }}
          />
          <span
            aria-hidden="true"
            className="display pointer-events-none absolute -bottom-[0.18em] right-[2vw] select-none text-[clamp(14rem,34vw,34rem)] leading-none text-white/[0.035]"
          >
            {a.n}
          </span>

          <div className="container-x relative grid h-full grid-cols-[minmax(0,300px)_1fr] gap-16 pt-28 pb-12">
            {/* index rail */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="eyebrow mb-3">Core specializations</p>
                <h2 id="spec-h" className="display text-[clamp(2rem,3.4vw,3.2rem)]">
                  Four things we do <span className="grad-text">exceptionally well.</span>
                </h2>
              </div>
              <ol className="relative mt-10 space-y-1 border-l border-line pl-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-px top-0 w-px origin-top"
                  style={{ height: "100%", background: a.accent, transform: `scaleY(${progress})`, transition: "background .5s" }}
                />
                {areas.map((x, i) => (
                  <li key={x.key}>
                    <button
                      onClick={() => jump(i)}
                      aria-current={i === active}
                      className={`flex w-full items-baseline gap-3 py-2 text-left transition ${i === active ? "text-white" : "text-muted hover:text-white"}`}
                    >
                      <span className="eyebrow" style={{ color: i === active ? x.accent : undefined }}>{x.n}</span>
                      <span className={`display text-xl ${i === active ? "" : "font-medium"}`}>{x.short}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* chapters */}
            <div className="relative">
              {areas.map((x, i) => (
                <article
                  key={x.key}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                    i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"
                  } ${i === active ? "" : "pointer-events-none"}`}
                >
                  <p className="eyebrow" style={{ color: x.accent }}>{x.kicker}</p>
                  <h3 className="display mt-4 max-w-[15ch] text-[clamp(2.6rem,5.2vw,5rem)]">{x.headline}</h3>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{x.intro}</p>
                  <ul className="mt-8 grid max-w-2xl gap-x-10 gap-y-3 lg:grid-cols-2">
                    {x.highlights.map((h) => (
                      <li key={h} className="flex gap-3 border-t border-line pt-3 text-sm leading-snug">
                        <span aria-hidden="true" style={{ color: x.accent }}>→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                    <Link href={`/expertise#${x.key}`} tabIndex={i === active ? 0 : -1} className="btn btn-ghost">
                      Explore {x.short} →
                    </Link>
                    <p className="max-w-xs text-sm text-muted"><span className="text-white">Outcome.</span> {x.outcome}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* mobile: stacked */}
      <div className="container-x space-y-14 md:hidden">
        <div>
          <p className="eyebrow mb-3">Core specializations</p>
          <h2 className="display text-[clamp(2.2rem,9vw,3rem)]">
            Four things we do <span className="grad-text">exceptionally well.</span>
          </h2>
        </div>
        {areas.map((x) => (
          <article key={x.key} className="border-t pt-6" style={{ borderColor: x.accent }}>
            <p className="eyebrow" style={{ color: x.accent }}>{x.n} · {x.kicker}</p>
            <h3 className="display mt-3 text-3xl">{x.headline}</h3>
            <p className="mt-4 text-muted">{x.intro}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {x.highlights.map((h) => (
                <li key={h} className="flex gap-3"><span aria-hidden="true" style={{ color: x.accent }}>→</span>{h}</li>
              ))}
            </ul>
            <Link href={`/expertise#${x.key}`} className="btn btn-ghost mt-6">Explore {x.short} →</Link>
          </article>
        ))}
      </div>
    </>
  );
}
