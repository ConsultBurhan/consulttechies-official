import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { DeliveryTimeline } from "@/components/DeliveryTimeline";
import { Pairings, ResponsibleBand } from "@/components/HomeSections";
import { areas } from "@/lib/specializations";

export const metadata: Metadata = {
  title: "Core expertise",
  description:
    "Our four core specializations: WhatsApp business solutions, AI products and services, CRM and customer engagement, and DevOps with website and application management.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHeader eyebrow="Core expertise" title={<>Four specializations, <span className="grad-text">one connected team.</span></>}>
        We help businesses improve how they engage customers, use information, manage relationships and run their digital platforms, combining strategy, implementation, integration, automation and ongoing support.
      </PageHeader>

      <nav aria-label="Specializations" className="sticky top-[84px] z-30">
        <ul className="container-x flex gap-2 overflow-x-auto py-3">
          {areas.map((a) => (
            <li key={a.key}>
              <Link href={`#${a.key}`} className="flex items-center gap-2 whitespace-nowrap drop drop-hover rounded-full px-4 py-2 text-sm text-muted transition hover:text-text">
                <span className="h-2 w-2 rounded-full" style={{ background: a.accent }} />
                {a.short}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {areas.map((a) => (
        <section key={a.key} id={a.key} aria-labelledby={`${a.key}-h`} className="relative scroll-mt-32 overflow-hidden pt-28">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[34rem]"
            style={{ background: `radial-gradient(50% 60% at 85% 0%, color-mix(in srgb, ${a.accent} 15%, transparent), transparent 70%)` }}
          />
          <span aria-hidden="true" className="display pointer-events-none absolute right-[3vw] top-16 select-none text-[clamp(10rem,24vw,22rem)] leading-none text-fg/[0.035]">
            {a.n}
          </span>

          <div className="container-x relative">
            <Reveal>
              <p className="eyebrow" style={{ color: a.accent }}>{a.n} · {a.kicker}</p>
              <h2 id={`${a.key}-h`} className="display mt-4 max-w-[18ch] text-[clamp(2.4rem,5.6vw,5rem)]">{a.title}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{a.headline}</p>
            </Reveal>

            <ol className="mt-16 border-t border-line">
              {a.capabilities.map((c, i) => (
                <Reveal as="li" key={c.title} className="grid gap-8 border-b border-line py-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-14">
                  <div>
                    <span className="eyebrow" style={{ color: a.accent }}>0{i + 1}</span>
                    <h3 className="display mt-3 text-2xl md:text-3xl">{c.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{c.intro}</p>
                  </div>
                  <div>
                    <h4 className="eyebrow mb-3">What we do</h4>
                    <ul className="grid gap-x-10 gap-y-2.5 text-sm leading-snug sm:grid-cols-2">
                      {c.does.slice(0, 4).map((d) => (
                        <li key={d} className="flex gap-3"><span aria-hidden="true" style={{ color: a.accent }}>→</span>{d}</li>
                      ))}
                    </ul>
                    <details className="mt-5 text-sm">
                      <summary className="eyebrow cursor-pointer list-none transition hover:text-text [&::-webkit-details-marker]:hidden">+ Where it fits{c.ai ? " & AI" : ""}</summary>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {c.fits.map((f) => (
                          <li key={f} className="drop rounded-full px-3 py-1 text-xs text-muted">{f}</li>
                        ))}
                      </ul>
                      {c.ai && <p className="mt-4 max-w-xl leading-relaxed text-muted"><span className="text-text">AI. </span>{c.ai}</p>}
                    </details>
                  </div>
                </Reveal>
              ))}
            </ol>
            
          </div>
        </section>
      ))}

      <Pairings />
      <section className="container-x pt-40" aria-label="Delivery process">
        <DeliveryTimeline />
      </section>
      <ResponsibleBand />
      <div className="pt-40">
        <CtaBand />
      </div>
    </>
  );
}
