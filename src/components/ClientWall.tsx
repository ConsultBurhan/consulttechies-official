import Link from "next/link";
import { clientGroups, clients, kfgFacts, logoSrc, type Client } from "@/lib/clients";
import { Reveal } from "./Reveal";

function Tile({ c, size = "md" }: { c: Client; size?: "md" | "lg" }) {
  const body = (
    <>
      <span className={`relative block overflow-hidden rounded-2xl bg-[#f4f1ec] transition-transform duration-500 group-hover:-translate-y-1 ${size === "lg" ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc(c)} alt={`${c.name} logo`} loading="lazy" className="absolute inset-[16%] h-[68%] w-[68%] object-contain" />
      </span>
      <span className="mt-3 block">
        <span className="block font-semibold leading-tight">{c.name}</span>
        <span className="mt-0.5 block text-sm text-muted">{[c.note.replace(/ · Kout Food Group|Kout Food Group brand/, "").trim() || null, c.place].filter(Boolean).join(" · ")}</span>
      </span>
    </>
  );
  return c.url ? (
    <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.name} (opens website in a new tab)`} className="group block">
      {body}
    </a>
  ) : (
    <div className="group">{body}</div>
  );
}

/** Kout Food Group as the featured relationship, then the five client groups. */
export function ClientWall() {
  return (
    <div className="space-y-20">
      <Reveal className="panel grid gap-8 rounded-[28px] p-6 md:p-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
        <Tile c={clients.kout} size="lg" />
        <div>
          <p className="eyebrow">Featured client</p>
          <h2 className="display t-h3 mt-2">Kout Food Group</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            A Kuwait-based food service group running a portfolio of international and homegrown restaurant brands. Many of the
            brands below belong to it.
          </p>
          <dl className="mt-6 grid max-w-md grid-cols-3 gap-4 border-y border-line py-5">
            {kfgFacts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="display text-2xl tracking-[-0.03em]">{f.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
          <Link href="/#kfg-case" className="link mt-6 text-sm">Read the WhatsApp case study</Link>
        </div>
      </Reveal>

      {clientGroups.map((g) => (
        <Reveal key={g.key} className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
          <div>
            <p className="data" style={{ color: g.accent }}>{g.n} / {String(clientGroups.length).padStart(2, "0")}</p>
            <h2 className="display t-h3 mt-2">{g.title}</h2>
            <p className="mt-2 text-[0.97rem] leading-relaxed text-muted">{g.line}</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
            {g.clients.map((c) => (
              <li key={c.id}>
                <Tile c={c} />
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
