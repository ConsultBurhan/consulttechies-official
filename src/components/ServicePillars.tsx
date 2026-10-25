import { pillars } from "@/lib/services";
import { Reveal } from "./Reveal";
import { Spot } from "./Spot";

/** All five pillars with every service. `compact` trims copy for the home page. */
export function ServicePillars({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-24">
      {pillars.map((p) => (
        <section key={p.key} id={p.key} aria-labelledby={`${p.key}-h`} className="scroll-mt-28">
          <Reveal className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
            <div className="md:sticky md:top-28 md:self-start">
              <span className="eyebrow" style={{ color: p.accent }}>
                {p.n} / {p.services.length} {p.services.length === 1 ? "service" : "services"}
              </span>
              <h3 id={`${p.key}-h`} className="display mt-3 text-4xl md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-3 text-muted">{p.line}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {p.services.map((s, i) => (
                <Spot
                  as="li"
                  key={s.title}
                  accent={p.accent}
                  className={`p-6 ${p.services.length % 2 === 1 && i === p.services.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <span className="mb-5 block h-1 w-8 rounded-full" style={{ background: p.accent }} />
                  <h4 className="text-lg font-semibold leading-snug">{s.title}</h4>
                  <p className={`mt-3 text-sm leading-relaxed text-muted ${compact ? "line-clamp-3" : ""}`}>{s.body}</p>
                </Spot>
              ))}
            </ul>
          </Reveal>
        </section>
      ))}
    </div>
  );
}
