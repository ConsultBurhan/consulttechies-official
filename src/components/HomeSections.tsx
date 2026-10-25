import Link from "next/link";
import { areas, guardrails, pairings } from "@/lib/specializations";
import { Reveal } from "./Reveal";
import { WhatsAppDemo } from "./WhatsAppDemo";

const [wa, ai, crm, devops] = areas;

/** WhatsApp: copy scrolls on the left while the phone stays pinned on the right. */
export function WhatsAppSection() {
  return (
    <section id="whatsapp" className="container-x scroll-mt-24 pt-40" aria-labelledby="wa-h">
      <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-4" style={{ color: wa.accent }}>01 · {wa.kicker}</p>
            <h2 id="wa-h" className="display text-[clamp(2.2rem,5vw,4.4rem)]">
              Browse, order and track, <span className="grad-text">inside one chat.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{wa.intro}</p>
          </Reveal>
          <ol className="mt-14">
            {wa.capabilities.map((c, i) => (
              <Reveal as="li" key={c.title} className="grid gap-4 border-t border-line py-8 sm:grid-cols-[3rem_1fr]">
                <span className="eyebrow pt-1" style={{ color: wa.accent }}>0{i + 1}</span>
                <div>
                  <h3 className="display text-2xl md:text-3xl">{c.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted">{c.intro}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {c.does.slice(0, 3).map((d) => (
                      <li key={d} className="flex gap-3"><span aria-hidden="true" style={{ color: wa.accent }}>●</span>{d}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted"><span className="text-white">Outcome.</span> {c.outcome}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="border-t border-line pt-6 text-sm leading-relaxed text-muted">{wa.note}</p>
        </div>
        <div className="md:sticky md:top-28 md:self-start">
          <WhatsAppDemo />
          <p className="mx-auto mt-6 max-w-[340px] text-center text-xs text-muted">
            Illustrative flow. Exact journeys depend on your systems and WhatsApp approvals.
          </p>
        </div>
      </div>
    </section>
  );
}

/** AI: a ledger of capabilities plus the controls that keep it honest. */
export function AiSection() {
  return (
    <section id="ai" className="relative mt-40 scroll-mt-24 overflow-hidden border-y border-line bg-ink-2 py-28" aria-labelledby="ai-h">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(50% 45% at 100% 0%, rgb(74 168 232 / .18), transparent 70%), radial-gradient(40% 40% at 0% 100%, rgb(29 188 191 / .10), transparent 70%)" }}
      />
      <div className="container-x relative grid gap-14 md:grid-cols-[minmax(0,400px)_1fr] md:gap-20">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow mb-4" style={{ color: ai.accent }}>02 · {ai.kicker}</p>
          <h2 id="ai-h" className="display text-[clamp(2.2rem,4.6vw,4.2rem)]">
            AI, applied where it <span className="grad-text">earns its place.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-muted">{ai.intro}</p>
          <Link href="/expertise#ai" className="btn btn-ghost mt-8">All AI capabilities →</Link>
        </Reveal>

        <ul>
          {ai.capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} className="ledger group border-t border-white/10 py-7 first:border-t-0 first:pt-0">
              <div className="grid gap-3 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="eyebrow pt-2" style={{ color: ai.accent }}>0{i + 1}</span>
                <div className="transition-transform duration-500 group-hover:translate-x-2">
                  <h3 className="display text-2xl md:text-[1.75rem]">{c.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{c.intro}</p>
                  <div className="hover-expand">
                    <ul className="min-h-0 overflow-hidden">
                      {c.does.slice(0, 3).map((d) => (
                        <li key={d} className="mt-2 flex gap-3 text-sm first:mt-4"><span aria-hidden="true" style={{ color: ai.accent }}>→</span>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="container-x relative mt-24">
        <Reveal>
          <p className="eyebrow mb-3">AI with controls</p>
          <p className="max-w-3xl text-xl leading-snug md:text-2xl">
            Clear boundaries come first: what data it may use, who may see what, when a person steps in, and what happens when it does not know.
          </p>
        </Reveal>
        <Reveal as="ul" stagger className="mt-10 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {guardrails.map(([t, d], i) => (
            <li key={t} className="border-b border-white/10 py-6 pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <span className="eyebrow" style={{ color: ai.accent }}>0{i + 1}</span>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** CRM: oversized platform names, then a four-column spec sheet. */
export function CrmSection() {
  return (
    <section id="crm" className="container-x scroll-mt-24 pt-40" aria-labelledby="crm-h">
      <Reveal>
        <p className="eyebrow mb-4" style={{ color: crm.accent }}>03 · {crm.kicker}</p>
        <h2 id="crm-h" className="display max-w-[20ch] text-[clamp(2.2rem,5vw,4.4rem)]">
          Customer data that finally <span className="grad-text">moves together.</span>
        </h2>
      </Reveal>
      <Reveal className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-2 border-y border-line py-8">
        {["Emarsys", "HubSpot", "Zoho"].map((p) => (
          <span key={p} className="outline-text display text-[clamp(3rem,10vw,8.5rem)]">{p}</span>
        ))}
        <p className="max-w-[16rem] pb-3 text-sm leading-relaxed text-muted">…and other systems where interfaces are available. Scope is confirmed per client.</p>
      </Reveal>
      <Reveal as="ul" stagger className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {crm.capabilities.map((c) => (
          <li key={c.title} className="border-t-2 pt-5" style={{ borderColor: crm.accent }}>
            <h3 className="display text-2xl">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.intro}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {c.does.slice(0, 3).map((d) => (
                <li key={d} className="flex gap-2"><span aria-hidden="true" style={{ color: crm.accent }}>+</span>{d}</li>
              ))}
            </ul>
          </li>
        ))}
      </Reveal>
    </section>
  );
}

const stages = ["Commit", "Build", "Test", "Stage", "Release", "Monitor"];

/** DevOps: a living pipeline diagram and an inline capability index. */
export function DevopsSection() {
  return (
    <section id="devops" className="container-x scroll-mt-24 pt-40" aria-labelledby="devops-h">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
        <Reveal>
          <p className="eyebrow mb-4" style={{ color: devops.accent }}>04 · {devops.kicker}</p>
          <h2 id="devops-h" className="display text-[clamp(2.2rem,5vw,4.4rem)]">
            Websites, apps and infrastructure, <span className="grad-text">shipped and kept alive.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="leading-relaxed text-muted">{devops.intro}</p>
        </Reveal>
      </div>

      <Reveal className="relative mt-16 overflow-hidden rounded-[1.6rem] border border-line bg-ink-2 p-6 md:p-10">
        <p className="eyebrow mb-8">A release, end to end</p>
        <ol className="pipeline relative grid gap-6 md:grid-cols-6">
          <span aria-hidden="true" className="pipe-line hidden md:block" />
          {stages.map((s, i) => (
            <li key={s} className="relative flex items-center gap-4 md:flex-col md:items-start md:gap-3">
              <span className="pipe-node relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[11px] font-mono" style={{ animationDelay: `${i * 0.7}s` }}>
                {i + 1}
              </span>
              <span className="display text-xl">{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          Automated builds and tests, consistent dev / staging / production environments, release coordination with rollback planning, and monitoring once it is live.
        </p>
      </Reveal>

      <Reveal as="ul" stagger className="mt-14 divide-y divide-line border-y border-line">
        {devops.capabilities.map((c, i) => (
          <li key={c.title} className="grid gap-2 py-5 md:grid-cols-[3rem_1.1fr_1.4fr] md:items-baseline md:gap-8">
            <span className="eyebrow" style={{ color: devops.accent }}>0{i + 1}</span>
            <h3 className="display text-xl md:text-2xl">{c.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{c.does.slice(0, 3).join(" · ")}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}

/** "Stronger together": oversized type pairings. */
export function Pairings() {
  return (
    <section className="container-x pt-40" aria-labelledby="pair-h">
      <Reveal>
        <p className="eyebrow mb-4">Better together</p>
        <h2 id="pair-h" className="display max-w-[20ch] text-[clamp(2.2rem,5vw,4.2rem)]">
          The strongest solutions connect <span className="grad-text">more than one.</span>
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          A WhatsApp journey can feed a CRM, use AI to read the enquiry and rely on a maintained integration layer
          behind the scenes. Deliver one focused service or combine them.
        </p>
      </Reveal>
      <Reveal as="ul" stagger className="mt-14 border-t border-line">
        {pairings.map((p) => (
          <li key={p.a + p.b} className="pair group grid items-center gap-3 border-b border-line py-7 transition-colors md:grid-cols-[1.3fr_1fr] md:gap-12">
            <h3 className="display text-[clamp(1.8rem,4.4vw,3.6rem)] transition-transform duration-500 group-hover:translate-x-3">
              <span style={{ color: p.accents[0] }}>{p.a}</span>
              <span className="mx-3 text-muted">+</span>
              <span style={{ color: p.accents[1] }}>{p.b}</span>
            </h3>
            <p className="leading-relaxed text-muted">{p.line}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}

export function ResponsibleBand() {
  return (
    <Reveal as="section" className="container-x pt-40">
      <div className="grid gap-10 rounded-[1.6rem] border border-line p-8 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16 md:p-14">
        <div>
          <p className="eyebrow mb-4">A practical, responsible approach</p>
          <h2 className="display text-3xl md:text-4xl">Scoped honestly, delivered carefully.</h2>
        </div>
        <div className="space-y-5 leading-relaxed text-muted">
          <p>
            We scope services according to your objectives, available systems, data, platform access and support needs.
            Features that depend on third-party platforms, APIs, account approvals, licensing or AI model capabilities are
            confirmed during discovery.
          </p>
          <p>
            Security controls, data permissions, human approval, monitoring and fallback behaviour are considered where
            relevant. Specific service levels, certifications and compliance commitments are included only when explicitly agreed.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
