import type { Area } from "@/lib/specializations";

/** Small live illustrations that show what each specialization does. Decorative: the card text carries the meaning. */
export function AreaVisual({ k, accent }: { k: Area["key"]; accent: string }) {
  if (k === "whatsapp")
    return (
      <div aria-hidden="true" className="rounded-2xl bg-[#0b141a] p-4 text-[12px] leading-snug text-[#e9edef]">
        <p className="ml-auto w-fit max-w-[80%] rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-1.5">Show me today&apos;s combos</p>
        <p className="mt-2 w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-[#1f2c34] px-3 py-1.5">3 combos available. Tap one to add it 👇</p>
        <div className="mt-2 flex gap-1.5">
          {["Combo 1", "Combo 2", "Combo 3"].map((c) => (
            <span key={c} className="rounded-lg border border-white/15 px-2.5 py-1 text-[11px] text-[#7fd6ff]">{c}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2">
          <span>Order #48213 · confirmed</span>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: accent }}>
            <span className="blink h-1.5 w-1.5 rounded-full" style={{ background: accent }} /> out for delivery
          </span>
        </div>
      </div>
    );

  if (k === "ai")
    return (
      <div aria-hidden="true" className="rounded-2xl border border-line bg-ink p-4 text-[12px]">
        <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-muted">
          <span style={{ color: accent }}>✦</span> Which regions are underperforming?
        </div>
        <div className="mt-4 flex h-24 items-end gap-2.5 px-1">
          {[72, 58, 88, 41, 66].map((h, i) => (
            <span
              key={i}
              className="growbar flex-1 rounded-t-md"
              style={{ height: `${h}%`, animationDelay: `${i * 90}ms`, background: i === 3 ? "var(--red)" : `color-mix(in srgb, ${accent} ${55 + i * 8}%, transparent)` }}
            />
          ))}
        </div>
        <p className="mt-3 border-t border-line pt-3 leading-relaxed text-muted">
          <span className="text-text">South</span> is 18% below target. Source: sales database · your access level
        </p>
      </div>
    );

  if (k === "crm")
    return (
      <div aria-hidden="true" className="relative h-[150px]">
        <span className="absolute inset-x-8 top-0 h-full rounded-2xl border border-line bg-ink-3 opacity-50" />
        <span className="absolute inset-x-4 top-3 h-full rounded-2xl border border-line bg-ink-3 opacity-80" />
        <div className="absolute inset-x-0 top-6 rounded-2xl border border-line bg-ink p-4 text-[12px] shadow-[0_20px_30px_-20px_var(--glass-shadow)]">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-black" style={{ background: accent }}>AK</span>
            <div>
              <p className="font-semibold text-text">Customer #4821</p>
              <p className="text-muted">Last order 12 days ago · 3 duplicates merged</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Repeat buyer", "Opted in", "Kuwait"].map((t) => (
              <span key={t} className="rounded-full border px-2 py-0.5 text-[11px]" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div aria-hidden="true" className="rounded-2xl border border-line bg-ink p-4 text-[12px]">
      <div className="grid grid-cols-4 gap-1.5">
        {[
          ["Build", "done"],
          ["Test", "done"],
          ["Deploy", "run"],
          ["Monitor", "wait"],
        ].map(([s, st]) => (
          <span
            key={s}
            className={`flex items-center justify-center gap-1 rounded-lg border px-1 py-1.5 ${st === "wait" ? "border-line text-muted" : ""}`}
            style={st !== "wait" ? { borderColor: `color-mix(in srgb, ${accent} 45%, transparent)` } : undefined}
          >
            {st === "done" ? <span style={{ color: accent }}>✓</span> : st === "run" ? <span className="blink h-1.5 w-1.5 rounded-full" style={{ background: accent }} /> : null}
            {s}
          </span>
        ))}
      </div>
      <p className="mt-4 flex flex-wrap justify-between gap-x-3 gap-y-1 text-muted">
        <span>Health checks, last 30 days</span>
        <span className="data text-text">1 incident · resolved</span>
      </p>
      <div className="mt-2 flex h-6 gap-[3px]">
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} className="flex-1 rounded-[2px]" style={{ background: i === 19 ? "var(--orange)" : `color-mix(in srgb, ${accent} 70%, transparent)` }} />
        ))}
      </div>
    </div>
  );
}
