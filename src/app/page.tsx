import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ClientMarquee } from "@/components/ClientMarquee";
import { TextReveal } from "@/components/TextReveal";
import { SpecStage } from "@/components/SpecStage";
import { WhatsAppSection, AiSection, CrmSection, DevopsSection, Pairings, ResponsibleBand } from "@/components/HomeSections";
import { DeliveryTimeline } from "@/components/DeliveryTimeline";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { pillars } from "@/lib/services";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />

      <section className="container-x pt-32 md:pt-44" aria-label="Who we are">
        <p className="eyebrow mb-6">What we do</p>
        <TextReveal
          className="display max-w-[26ch] text-[clamp(1.9rem,4.6vw,4rem)] !leading-[1.1] !tracking-[-0.03em]"
          text="We help businesses improve how they engage customers, use information, manage relationships and run their digital platforms. Strategy, implementation, integration, automation and the ongoing support that keeps it working."
          marks={["engage", "customers", "digital", "platforms"]}
        />
      </section>

      <div className="pt-32 md:pt-44" id="specializations">
        <SpecStage />
      </div>

      <WhatsAppSection />
      <AiSection />
      <CrmSection />
      <DevopsSection />
      <Pairings />

      <section className="container-x pt-40" aria-labelledby="all-h">
        <div className="grid gap-10 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">The full catalogue</p>
            <h2 id="all-h" className="display text-[clamp(2.2rem,4.4vw,3.8rem)]">
              Fourteen services, <span className="grad-text">one accountable team.</span>
            </h2>
            <Link href="/services" className="btn btn-ghost mt-8">See service details →</Link>
          </Reveal>
          <Reveal as="ul" stagger className="border-t border-line">
            {pillars.map((p) => (
              <li key={p.key} className="border-b border-line">
                <Link href={`/services#${p.key}`} className="group grid items-baseline gap-2 py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-6">
                  <span className="eyebrow" style={{ color: p.accent }}>{p.n}</span>
                  <span>
                    <span className="display block text-2xl transition-transform duration-500 group-hover:translate-x-2">{p.title}</span>
                    <span className="mt-1 block text-sm text-muted">{p.services.map((s) => s.title.replace(/ \(.*\)/, "")).join(" · ")}</span>
                  </span>
                  <span className="eyebrow">{p.services.length} services</span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

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
