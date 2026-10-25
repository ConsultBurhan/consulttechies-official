"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { site, whatsappLink } from "@/lib/site";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const noop = () => () => {};
const useClient = <T,>(get: () => T, server: T) => useSyncExternalStore(noop, get, () => server);
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const gl = useClient(hasWebGL, false);
  const calm = useClient(prefersReduced, false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = prefersReduced();
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (stage.current) io.observe(stage.current);

    let ctx: gsap.Context | undefined;
    if (!reduce) {
      ctx = gsap.context(() => {
        gsap.from("[data-h]", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.09, delay: 0.9 });
        gsap.from("[data-f]", { opacity: 0, y: 20, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 1.4 });
        gsap.from(stage.current, { opacity: 0, scale: 0.9, duration: 1.6, ease: "power3.out", delay: 0.9 });
      }, root);
    }
    return () => {
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 40%, rgb(29 188 191 / .16), transparent 70%), radial-gradient(45% 40% at 20% 80%, rgb(241 127 42 / .14), transparent 70%)",
        }}
      />
      <div
        ref={stage}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-25 md:w-[58%] md:opacity-100 md:pointer-events-auto"
      >
        {gl ? (
          visible || calm ? <HeroScene calm={calm} /> : null
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-72 w-72 rounded-full" style={{ background: "var(--grad)", filter: "blur(70px)", opacity: 0.45 }} />
          </div>
        )}
      </div>

      <div className="container-x">
        <p data-f className="eyebrow mb-6">
          Udaipur · Austin · Serving Kuwait, Europe &amp; beyond
        </p>
        <h1 className="display max-w-[14ch] text-[clamp(2.6rem,6.3vw,6rem)]">
          {["We build the", "systems your", "business runs on."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]">
              <span data-h className={`block ${i === 2 ? "grad-text" : ""}`}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p data-f className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          WhatsApp business solutions, practical AI, CRM and customer engagement, and the DevOps behind your websites
          and apps, delivered by one team for brands like Kout Food Group, Burger King and the European Union Agency
          for Asylum.
        </p>
        <div data-f className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Start a project <span aria-hidden="true">→</span>
          </Link>
          <Link href="/expertise" className="btn btn-ghost">
            Our expertise
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            WhatsApp us
          </a>
        </div>

        <dl data-f className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4 border-t border-line pt-6">
          {[
            ["4", "core specializations"],
            ["14", "services"],
            ["15", "client brands"],
            [`${site.founded}`, "founded"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="display text-4xl">{n}</dt>
              <dd className="eyebrow mt-1">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
