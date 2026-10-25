"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { delivery } from "@/lib/specializations";

gsap.registerPlugin(ScrollTrigger);

/** Sticky heading on the left; steps on the right ignite as they pass the reading line. */
export function DeliveryTimeline() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const items = Array.from(ol.children) as HTMLElement[];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((i) => i.classList.add("is-on"));
      return;
    }
    const ctx = gsap.context(() => {
      items.forEach((li) =>
        ScrollTrigger.create({
          trigger: li,
          start: "top 62%",
          end: "bottom 62%",
          toggleClass: { targets: li, className: "is-on" },
        }),
      );
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ol, start: "top 62%", end: "bottom 62%", scrub: true } },
      );
    }, ol);
    return () => ctx.revert();
  }, []);

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20">
      <div className="md:sticky md:top-32 md:self-start">
        <p className="eyebrow mb-4">How we deliver</p>
        <h2 className="display text-[clamp(2.2rem,4.6vw,4rem)]">
          From first call to <span className="grad-text">running in production.</span>
        </h2>
        <p className="mt-6 max-w-sm leading-relaxed text-muted">
          Every engagement is scoped to your objective, systems, data and support needs. Anything that depends on
          third-party platforms, approvals or AI model capability is confirmed in discovery, not assumed.
        </p>
      </div>
      <div className="relative">
        <span aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-line" />
        <span ref={fill} aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-orange via-red to-teal" />
        <ol ref={list} className="relative space-y-16 md:space-y-24">
          {delivery.map(([t, d], i) => (
            <li key={t} className="step group grid grid-cols-[40px_1fr] gap-6 opacity-40 transition-opacity duration-500 [&.is-on]:opacity-100">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-ink text-xs font-mono transition-colors duration-500 group-[.is-on]:border-orange group-[.is-on]:bg-orange group-[.is-on]:text-black">
                0{i + 1}
              </span>
              <div>
                <h3 className="display text-3xl md:text-4xl">{t}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
