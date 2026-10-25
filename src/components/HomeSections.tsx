import Link from "next/link";
import { delivery } from "@/lib/specializations";
import { Reveal } from "./Reveal";
import { Card, IconBadge, icons, type IconName } from "./ui";

const controls: { does: string; keep: string; icon: IconName }[] = [
  { does: "Answers questions in plain language", keep: "Only from documents and data you approve", icon: "search" },
  { does: "Drafts replies and summaries", keep: "A person reviews anything consequential before it goes out", icon: "pen" },
  { does: "Analyses your business data", keep: "Within the same access rules your team already has", icon: "chart" },
  { does: "Classifies, extracts and routes work", keep: "Actions on your systems need explicit permission", icon: "loop" },
  { does: "Sometimes doesn't know", keep: "A defined fallback, a human handover and ongoing evaluation", icon: "compass" },
];

/** AI framed as a contract: each capability card is paired with the control that governs it. */
export function AiControls() {
  return (
    <section id="ai" className="sec border-t border-line" aria-labelledby="ai-h">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="ai-h" className="display t-h2 max-w-[13ch]">AI that works inside your rules.</h2>
          <p className="lede max-w-md md:justify-self-end">
            Every capability we build comes with a control you keep. Specific commitments are agreed per project, never assumed.
          </p>
        </Reveal>

        <div className="mt-12 hidden grid-cols-[1fr_56px_1fr] gap-x-2 px-1 text-sm text-muted md:grid">
          <p>What the AI does</p>
          <span />
          <p>What stays in your control</p>
        </div>
        <Reveal as="ul" stagger className="mt-4 space-y-3">
          {controls.map((c) => (
            <li key={c.does} className="grid items-stretch gap-2 md:grid-cols-[1fr_56px_1fr] md:gap-x-2">
              <Card hover={false} className="flex items-center gap-4 p-5">
                <IconBadge icon={c.icon} color="#4aa8e8" size={40} />
                <span className="display text-[1.1rem] tracking-[-0.015em] md:text-[1.2rem]">{c.does}</span>
              </Card>
              <span aria-hidden="true" className="relative hidden items-center justify-center md:flex">
                <span className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-[#4aa8e8] to-teal opacity-60" />
                <span className="relative grid h-8 w-8 place-items-center rounded-full border border-line-strong bg-ink text-teal">{icons.arrow}</span>
              </span>
              <div
                className="flex items-center gap-4 rounded-[24px] border p-5"
                style={{ borderColor: "color-mix(in srgb, var(--teal) 35%, transparent)", background: "color-mix(in srgb, var(--teal) 7%, var(--ink-2))" }}
              >
                <span className="shrink-0 text-teal">{icons.shield}</span>
                <span className="leading-relaxed">{c.keep}</span>
              </div>
            </li>
          ))}
        </Reveal>
        <div className="mt-8 flex justify-end">
          <Link href="/services#ai" className="link text-sm">AI services</Link>
        </div>
      </div>
    </section>
  );
}

type Side = { name: string; color: string; icon: IconName };
const combos: { a: Side; b: Side; line: string }[] = [
  { a: { name: "WhatsApp", color: "#25d366", icon: "chat" }, b: { name: "CRM", color: "#ef4056", icon: "contacts" }, line: "Conversations, lead records and campaign activity in one customer view." },
  { a: { name: "WhatsApp", color: "#25d366", icon: "chat" }, b: { name: "AI", color: "#4aa8e8", icon: "spark" }, line: "Natural-language enquiries, with fallback and handover to your team." },
  { a: { name: "CRM", color: "#ef4056", icon: "contacts" }, b: { name: "Data quality", color: "#f17f2a", icon: "database" }, line: "Clean, de-duplicated records before any journey or campaign goes live." },
];

/** Connected solutions: overlapping badges make the pairing visible before the text explains it. */
export function Combos() {
  return (
    <section className="sec-tight" aria-labelledby="combo-h">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="combo-h" className="display text-[1.6rem] tracking-[-0.02em] md:text-[2rem]">Better connected</h2>
          <p className="max-w-sm text-sm text-muted">The strongest results usually come from two areas working together.</p>
        </Reveal>
        <Reveal as="ul" stagger className="mt-8 grid gap-4 md:grid-cols-3">
          {combos.map(({ a, b, line }) => (
            <Card as="li" key={a.name + b.name} accent={b.color} glow className="p-6">
              <div className="relative flex items-center">
                <IconBadge icon={a.icon} color={a.color} size={48} />
                <span className="-ml-3 rounded-[16px] bg-ink-2 ring-4 ring-[var(--ink-2)]">
                  <IconBadge icon={b.icon} color={b.color} size={48} />
                </span>
              </div>
              <h3 className="display mt-5 text-[1.25rem] tracking-[-0.015em]">
                {a.name} <span className="text-muted">+</span> {b.name}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{line}</p>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const stepMeta: { icon: IconName; get: string }[] = [
  { icon: "search", get: "Goals, constraints and success measures" },
  { icon: "pen", get: "Architecture, flows and security boundaries" },
  { icon: "code", get: "Working software, integrations and automation" },
  { icon: "check", get: "Tested permissions, edge cases and readiness" },
  { icon: "rocket", get: "Documentation and operational handover" },
  { icon: "loop", get: "Prioritised next improvements" },
];

/** Delivery: a genuine sequence, shown as step cards with what you get at each stage. */
export function Process() {
  return (
    <section className="sec border-t border-line" aria-labelledby="process-h">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="process-h" className="display t-h2 max-w-[12ch]">How a project runs.</h2>
          <p className="lede max-w-md md:justify-self-end">Scoped to your systems, data and support needs. Anything third-party is confirmed in discovery.</p>
        </Reveal>
        <Reveal as="ol" stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {delivery.map(([t, d], i) => (
            <Card as="li" key={t} accent="var(--orange)" className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <IconBadge icon={stepMeta[i].icon} color="var(--orange)" size={40} />
                <span className="data text-muted">Step {i + 1} of {delivery.length}</span>
              </div>
              <h3 className="display mt-5 text-[1.3rem] tracking-[-0.015em]">{t}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{d}</p>
              <div className="mt-auto pt-5">
                <p className="flex items-start gap-2 border-t border-line pt-4 text-sm">
                  <span className="shrink-0 text-muted">You get</span>
                  <span>{stepMeta[i].get}</span>
                </p>
              </div>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
