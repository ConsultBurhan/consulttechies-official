import { clientGroups, logoSrc } from "@/lib/clients";
import { Reveal } from "./Reveal";

export function ClientGroups() {
  return (
    <div className="space-y-16">
      {clientGroups.map((g) => (
        <Reveal key={g.key} as="section" className="grid gap-6 border-t border-line pt-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
          <div>
            <span className="eyebrow" style={{ color: g.accent }}>
              {g.n}
            </span>
            <h3 className="display mt-2 text-3xl md:text-4xl">{g.title}</h3>
            <p className="mt-2 text-sm text-muted">{g.line}</p>
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {g.clients.map((c) => {
              const inner = (
                <>
                  <div className="h-28 rounded-xl bg-[#f4f1ec] p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoSrc(c)} alt={`${c.name} logo`} loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <p className="mt-3 font-semibold leading-tight">{c.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {c.note}
                    {c.place ? ` · ${c.place}` : ""}
                  </p>
                </>
              );
              return (
                <li key={c.id}>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-line bg-ink-2 p-3 transition hover:-translate-y-1 hover:border-white/30"
                      aria-label={`${c.name} (opens website in a new tab)`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="rounded-2xl border border-line bg-ink-2 p-3">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
