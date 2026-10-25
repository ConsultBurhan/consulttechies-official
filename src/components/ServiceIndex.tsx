import { pillars } from "@/lib/services";
import { serviceDetails } from "@/lib/service-details";
import { Reveal } from "./Reveal";

/** Services as an expandable index: scan the list, open what matters. */
export function ServiceIndex() {
  let count = 0;
  return (
    <div className="space-y-28">
      {pillars.map((p) => (
        <section key={p.key} id={p.key} aria-labelledby={`${p.key}-h`} className="scroll-mt-28">
          <div className="grid gap-8 md:grid-cols-[minmax(0,300px)_1fr] md:gap-14">
            <div className="md:sticky md:top-28 md:self-start">
              <span className="eyebrow" style={{ color: p.accent }}>{p.n} / {p.services.length} services</span>
              <h2 id={`${p.key}-h`} className="display mt-3 text-4xl md:text-5xl">{p.title}</h2>
              <p className="mt-3 text-muted">{p.line}</p>
              <span className="mt-6 block h-1 w-12 rounded-full" style={{ background: p.accent }} />
            </div>
            <Reveal as="ul" className="border-t border-line">
              {p.services.map((s) => {
                const d = serviceDetails[s.title];
                const n = String(++count).padStart(2, "0");
                return (
                  <li key={s.title} className="border-b border-line">
                    <details className="svc group" style={{ "--accent": p.accent } as React.CSSProperties}>
                      <summary className="flex cursor-pointer list-none items-start gap-5 py-6 pr-2 transition-colors hover:bg-white/[0.02] [&::-webkit-details-marker]:hidden">
                        <span className="eyebrow w-7 shrink-0 pt-1.5" style={{ color: p.accent }}>{n}</span>
                        <span className="flex-1">
                          <span className="display block text-xl md:text-2xl">{s.title}</span>
                          <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted">{s.body}</span>
                        </span>
                        <span aria-hidden="true" className="svc-plus mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-lg leading-none transition-all duration-300 group-open:rotate-45 group-open:border-[var(--accent)] group-open:text-[var(--accent)]">+</span>
                      </summary>
                      {d && (
                        <div className="svc-body grid gap-8 pb-8 pl-12 pr-2 text-sm lg:grid-cols-2">
                          <div>
                            <h3 className="eyebrow mb-3">What we provide</h3>
                            <ul className="space-y-2">
                              {d.provides.map((x) => (
                                <li key={x} className="flex gap-3"><span aria-hidden="true" style={{ color: p.accent }}>→</span>{x}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <h3 className="eyebrow mb-2">Typical use cases</h3>
                              <p className="leading-relaxed text-muted">{d.uses.join(" · ")}</p>
                            </div>
                            <div>
                              <h3 className="eyebrow mb-2" style={{ color: "#4aa8e8" }}>Where AI helps</h3>
                              <p className="leading-relaxed text-muted">{d.ai}</p>
                            </div>
                            <div className="border-l-2 pl-4" style={{ borderColor: p.accent }}>
                              <h3 className="eyebrow mb-1">Business value</h3>
                              <p className="leading-relaxed">{d.value}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </details>
                  </li>
                );
              })}
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
