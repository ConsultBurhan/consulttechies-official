"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroFlow } from "./HeroFlow";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-h]", { yPercent: 105, duration: 1, ease: "power4.out", stagger: 0.08, delay: 0.5 });
      gsap.from("[data-f]", { opacity: 0, y: 16, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 0.9 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 55% at 85% 35%, color-mix(in srgb, var(--teal) 12%, transparent), transparent 70%)" }}
      />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h1 className="display t-hero max-w-[11ch]">
            {["We build the", "systems your", "business runs on."].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <span data-h className={`block ${i === 2 ? "grad-text" : ""}`}>{l}</span>
              </span>
            ))}
          </h1>
          <p data-f className="lede mt-8 max-w-[34rem]">
            WhatsApp, AI, CRM and DevOps from one team, wired together so a customer message turns into real work in the
            systems behind it.
          </p>
          <div data-f className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="btn btn-primary">
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <Link href="#areas" className="link text-sm">
              See what we do
            </Link>
          </div>
        </div>
        <div data-f>
          <HeroFlow />
        </div>
      </div>
    </section>
  );
}
