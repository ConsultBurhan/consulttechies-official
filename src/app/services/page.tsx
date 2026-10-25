import { PageTransition } from "@/components/PageTransition";
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PageHeader } from "@/components/PageHeader";
import { OfferingTile } from "@/components/ServiceIndex";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { AreaVisual } from "@/components/AreaVisual";
import { areaIcon } from "@/components/AreaBento";
import { IconBadge, icons } from "@/components/ui";
import { advisory, catalog, offeringCount } from "@/lib/catalog";
import { areas } from "@/lib/specializations";

export const metadata: Metadata = {
  title: "Services",
  description:
    "WhatsApp business solutions, AI products and services, CRM and customer engagement, and DevOps with website and application management.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
    <>
      <PageHeader eyebrow="Services" title="Four specializations, every service under one.">
        {offeringCount} services in four areas. Scan the tiles, then open any service for the full brief.
      </PageHeader>

      {/* area switcher */}
      <nav aria-label="Service areas" className="container-x">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {catalog.map((a) => (
            <li key={a.key}>
              <Link
                href={`#${a.key}`}
                className="card card-hover group flex h-full items-center gap-4 p-4"
                style={{ "--accent": a.accent } as CSSProperties}
              >
                <IconBadge icon={areaIcon[a.key]} color={a.accent} size={40} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-tight">{a.short}</span>
                  <span className="data text-muted">{a.items.length} services</span>
                </span>
                <span aria-hidden="true" className="rotate-90 text-muted transition-colors group-hover:text-[var(--accent)]">{icons.arrow}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {catalog.map((a) => {
        const area = areas.find((x) => x.key === a.key)!;
        return (
          <section key={a.key} id={a.key} aria-labelledby={`${a.key}-h`} className="sec-tight scroll-mt-24" style={{ "--accent": a.accent } as CSSProperties}>
            <div className="container-x">
              {/* area header card */}
              <Reveal className="card card-glow overflow-hidden p-7 md:p-10">
                <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <IconBadge icon={areaIcon[a.key]} color={a.accent} size={52} />
                    <h2 id={`${a.key}-h`} className="display t-h2 mt-6 max-w-[16ch]">{a.title}</h2>
                    <p className="lede mt-5 max-w-xl">{a.intro}</p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      <li className="chip">
                        <span className="h-2 w-2 rounded-full" style={{ background: a.accent }} aria-hidden="true" />
                        {a.items.length} services
                      </li>
                      {area.highlights.slice(0, 2).map((h) => (
                        <li key={h} className="chip text-muted">{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="max-w-md lg:justify-self-end lg:w-full">
                    <AreaVisual k={a.key} accent={a.accent} />
                  </div>
                </div>
              </Reveal>

              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {a.items.map((o) => (
                  <OfferingTile key={o.title} o={o} accent={a.accent} />
                ))}
                {a.items.length % 3 !== 0 && (
                  <li
                    className={`hidden flex-col justify-center rounded-[24px] border border-dashed border-line-strong p-6 lg:flex ${a.items.length % 3 === 1 ? "lg:col-span-2" : ""}`}
                  >
                    <p className="display text-[1.2rem] tracking-[-0.015em]">Not sure which of these you need?</p>
                    <p className="mt-2 text-[0.95rem] text-muted">Tell us the problem. We will suggest the right mix.</p>
                    <Link href="/contact" className="link mt-6 self-start text-sm">Start a conversation</Link>
                  </li>
                )}
              </ul>

              {/* where it fits */}
              <div className="mt-4 flex flex-col gap-3 rounded-[24px] border border-line p-5 md:flex-row md:items-center md:gap-6">
                <p className="shrink-0 text-sm font-semibold">Where it fits</p>
                <ul className="flex flex-wrap gap-2">
                  {[...new Set(area.capabilities.flatMap((c) => c.fits))].slice(0, 6).map((f) => (
                    <li key={f} className="chip">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.accent }} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section id="advisory" aria-labelledby="advisory-h" className="sec-tight scroll-mt-24">
        <div className="container-x">
          <div className="card card-glow grid gap-8 p-7 md:grid-cols-[1fr_1.3fr] md:gap-12 md:p-10" style={{ "--accent": "var(--orange)" } as CSSProperties}>
            <div className="relative">
              <IconBadge icon="compass" color="var(--orange)" size={52} />
              <p className="eyebrow mt-6">Across all four areas</p>
              <h2 id="advisory-h" className="display t-h3 mt-2">{advisory.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{advisory.summary}</p>
            </div>
            <ul className="relative grid content-start gap-3 sm:grid-cols-2">
              {advisory.provides.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-2xl border border-line bg-ink/40 p-4 text-[0.95rem]">
                  <span className="mt-0.5 text-orange">{icons.check}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
    </PageTransition>
  );
}
