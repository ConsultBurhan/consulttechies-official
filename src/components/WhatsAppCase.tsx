"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clients, kfgFacts, logoSrc } from "@/lib/clients";
import { WhatsAppDemo } from "./WhatsAppDemo";

/** The systems behind the chat, fanned out in depth behind the phone. */
const SYSTEMS = [
  { name: "Menu & ordering", note: "Products and choices served in the chat", color: "#25d366" },
  { name: "Kitchen & delivery", note: "Order status pushed back to the customer", color: "#1dbcbf" },
  { name: "Customer data & campaigns", note: "Segments and approved templates", color: "#ef4056" },
];

const built = [
  ["Ordering in the chat", "Customers browse, choose and place orders without leaving WhatsApp."],
  ["Order updates", "Confirmations and status notifications sent as the order moves."],
  ["Human handover", "Requests the automation should not handle go to a person, with the context intact."],
  ["Campaigns", "Offers to opted-in customers on approved message templates."],
] as const;

function Phone3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOpen(e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto hidden h-[620px] w-full max-w-[560px] md:block" style={{ perspective: 1400 }} aria-hidden="true">
      <div
        className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ transformStyle: "preserve-3d", transform: open ? "rotateY(-16deg) rotateX(6deg)" : "rotateY(-4deg) rotateX(2deg)" }}
      >
        {/* systems layered behind the phone */}
        {SYSTEMS.map((s, i) => (
          <div
            key={s.name}
            className="panel absolute left-[46%] w-[260px] rounded-2xl p-4 transition-all duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
              top: 70 + i * 150,
              transform: open ? `translateZ(${-90 - i * 70}px) translateX(${70 + i * 34}px)` : "translateZ(-60px) translateX(0px)",
              opacity: open ? 1 : 0,
              transitionDelay: `${150 + i * 120}ms`,
            }}
          >
            <span className="mb-2 block h-1 w-10 rounded-full" style={{ background: s.color }} />
            <p className="font-semibold">{s.name}</p>
            <p className="mt-1 text-sm text-muted">{s.note}</p>
          </div>
        ))}
        {/* connectors: from the phone edge to each system */}
        {SYSTEMS.map((s, i) => (
          <span
            key={`l${s.name}`}
            className="absolute h-px origin-left transition-all duration-[1400ms]"
            style={{
              left: "40%",
              top: 110 + i * 150,
              width: open ? 110 + i * 30 : 0,
              background: `linear-gradient(90deg, ${s.color}, transparent)`,
              transform: `translateZ(${-40 - i * 35}px)`,
              transitionDelay: `${300 + i * 120}ms`,
            }}
          />
        ))}
        <div className="absolute left-0 top-0 w-[330px]" style={{ transform: "translateZ(40px)" }}>
          <WhatsAppDemo />
        </div>
      </div>
    </div>
  );
}

/** Case study: WhatsApp ordering for Kout Food Group. */
export function WhatsAppCase() {
  const kout = clients.kout;
  return (
    <section id="kfg-case" className="sec relative overflow-hidden border-y border-line bg-ink-2" aria-labelledby="kfg-h">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(40% 50% at 75% 55%, color-mix(in srgb, var(--whatsapp) 9%, transparent), transparent 70%)" }}
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc(kout, 256)} alt="" width={56} height={56} className="h-14 w-14 rounded-xl bg-[#f4f1ec] object-contain p-1.5" />
            <p className="eyebrow">Case study · {kout.name}, Kuwait</p>
          </div>
          <h2 id="kfg-h" className="display t-h2 mt-6 max-w-[16ch]">WhatsApp ordering for a restaurant group with {kfgFacts[0].value} stores.</h2>
          <p className="lede mt-6 max-w-xl">
            {kout.name} runs a portfolio of international and homegrown restaurant brands across Kuwait. We built WhatsApp into a
            working ordering and service channel, connected to the systems behind the restaurants.
          </p>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-y border-line py-6">
            {kfgFacts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="display text-[clamp(1.8rem,3vw,2.4rem)] tracking-[-0.03em]">{f.value}</dd>
                <dd className="mt-1 text-sm text-muted">{f.label}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-10 font-semibold">What we built</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {built.map(([t, d]) => (
              <li key={t} className="border-l-2 border-[var(--whatsapp)] pl-4">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
          <Link href="/services#whatsapp" className="link mt-10 text-sm">WhatsApp services</Link>
        </div>
        <Phone3D />
        <div className="md:hidden">
          <WhatsAppDemo />
        </div>
      </div>
    </section>
  );
}
