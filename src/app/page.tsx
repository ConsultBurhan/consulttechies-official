import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ClientMarquee } from "@/components/ClientMarquee";
import { ServicePillars } from "@/components/ServicePillars";
import { WhatsAppDemo } from "@/components/WhatsAppDemo";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";

const process = [
  ["Understand", "We learn how your business and customers work before proposing anything."],
  ["Design", "Flows, screens and architecture agreed with you, with measurable goals."],
  ["Build & integrate", "Engineering, API connections and automation wired into your existing platforms."],
  ["Run & improve", "Deployment, monitoring, support and ongoing optimisation after launch."],
];

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />

      <section className="container-x pt-32" aria-labelledby="services-h">
        <Reveal>
          <p className="eyebrow mb-4">What we do</p>
          <h2 id="services-h" className="display max-w-[18ch] text-[clamp(2.2rem,5.5vw,4.6rem)]">
            Fourteen services, <span className="grad-text">one accountable team.</span>
          </h2>
        </Reveal>
        <div className="mt-16">
          <ServicePillars compact />
        </div>
        <div className="mt-12">
          <Link href="/services" className="btn btn-ghost">See full service details →</Link>
        </div>
      </section>

      <section className="container-x grid items-center gap-16 pt-40 md:grid-cols-2" aria-labelledby="wa-h">
        <Reveal>
          <p className="eyebrow mb-4">WhatsApp commerce</p>
          <h2 id="wa-h" className="display text-[clamp(2.2rem,5vw,4.2rem)]">
            Browse, order and track — <span className="grad-text">inside one chat.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            We design the conversation, build the ordering journey, connect it to your systems and manage
            approved campaign templates, so customers can browse products, place orders and receive order
            updates on the app they already use.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted">
            {["Chatbots and automated conversations", "Ordering flows and order-status updates", "Segmented campaigns with approved templates"].map((t) => (
              <li key={t} className="flex gap-3"><span className="text-[#25d366]" aria-hidden="true">●</span>{t}</li>
            ))}
          </ul>
        </Reveal>
        <WhatsAppDemo />
      </section>

      <section className="container-x pt-40" aria-labelledby="process-h">
        <Reveal>
          <p className="eyebrow mb-4">How we work</p>
          <h2 id="process-h" className="display text-[clamp(2.2rem,5vw,4.2rem)]">From first call to <span className="grad-text">running in production.</span></h2>
        </Reveal>
        <Reveal as="ol" stagger className="mt-14 grid gap-4 md:grid-cols-4">
          {process.map(([t, d], i) => (
            <li key={t} className="spot p-6">
              <span className="display grad-text text-5xl">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </Reveal>
      </section>

      <div className="pt-40">
        <CtaBand />
      </div>
    </>
  );
}
