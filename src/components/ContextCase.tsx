"use client";

import { useState } from "react";
import { Stack3D, glyphs, type Layer } from "./Stack3D";

/** Our enterprise AI assistant, explained as the layers a question passes through. */
const LAYERS: (Layer & { title: string; body: string })[] = [
  { key: "people", label: "People", color: "#f17f2a", glyph: glyphs.people, title: "Employees · managers · leadership", body: "Anyone asks a business question in plain language, and gets an answer that fits their role and permissions." },
  { key: "context", label: "AI assistant", color: "#4aa8e8", glyph: glyphs.layers, title: "Understands · plans · retrieves · remembers", body: "The intelligence layer interprets intent, plans the task, retrieves from trusted sources and keeps contextual memory." },
  { key: "org", label: "Your organization", color: "#1dbcbf", glyph: glyphs.database, title: "SQL · Oracle · MongoDB · documents · APIs", body: "Connected to the databases, documents and systems you already run. People only retrieve what their role allows." },
  { key: "out", label: "Outcomes", color: "#ef4056", glyph: glyphs.chart, title: "Answers · charts · reports · forecasts", body: "Analysis becomes charts, structured reports, spreadsheets and PDFs, and forecasts estimated from historical data." },
];

type Answer = { kind: "bars"; rows: [string, number][]; note: string } | { kind: "text"; text: string } | { kind: "steps"; steps: string[] };

/** Simulation with sample data, mirroring how the product answers different kinds of question. */
const QUESTIONS: { q: string; mode: string; a: Answer }[] = [
  {
    q: "Show me sales performance by region",
    mode: "Analyze",
    a: { kind: "bars", rows: [["North", 82], ["Central", 64], ["Coastal", 91], ["South", 47]], note: "South is 18% below target this quarter; Coastal leads for the third quarter running." },
  },
  { q: "Who manages the operations department?", mode: "Quick answer", a: { kind: "text", text: "Operations is led by the Head of Operations, reporting to the COO. Regional ops managers cover each of the four regions." } },
  {
    q: "Explain our employee onboarding process",
    mode: "Quick answer",
    a: { kind: "steps", steps: ["Offer accepted and contract signed in HR", "Equipment request raised by the line manager", "Day-one induction and policy walkthrough", "30-day check-in with the manager"] },
  },
  {
    q: "Generate a quarterly report",
    mode: "Deep report",
    a: { kind: "text", text: "Quarterly report ready: revenue by region, top movers, risks and a next-quarter outlook. Available as Excel and PDF." },
  },
];

function AnswerView({ a }: { a: Answer }) {
  if (a.kind === "bars")
    return (
      <div>
        <ul className="space-y-2.5">
          {a.rows.map(([k, v]) => (
            <li key={k} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-3 text-sm">
              <span className="text-muted">{k}</span>
              <span className="h-2.5 overflow-hidden rounded-full bg-fg/10">
                <span className="block h-full rounded-full bg-[#4aa8e8] transition-[width] duration-700" style={{ width: `${v}%` }} />
              </span>
              <span className="data text-right">{v}%</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed">{a.note}</p>
      </div>
    );
  if (a.kind === "steps")
    return (
      <ol className="space-y-2 text-sm">
        {a.steps.map((s, i) => (
          <li key={s} className="flex gap-3">
            <span className="data mt-0.5 text-muted">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    );
  return <p className="text-sm leading-relaxed">{a.text}</p>;
}

export function ContextCase() {
  const [layer, setLayer] = useState(1);
  const [qi, setQi] = useState(0);
  const L = LAYERS[layer];
  const Q = QUESTIONS[qi];

  return (
    <section id="context" className="sec" aria-labelledby="ctx-h">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">Our own product</p>
            <h2 id="ctx-h" className="display t-h2 mt-4 max-w-[15ch]">An enterprise AI assistant for the whole organization.</h2>
          </div>
          <p className="lede max-w-md md:justify-self-end">
            We build and run our own enterprise AI assistant. It connects to a company&apos;s databases, documents and systems, so
            people can ask a question and get an answer, a chart or a report.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* layers */}
          <div>
            <p className="eyebrow mb-2">Select a layer</p>
            <Stack3D
              layers={LAYERS}
              active={layer}
              onSelect={setLayer}
              side={(i) => (
                <span className={`font-semibold transition-colors ${i === layer ? "text-text" : "text-muted hover:text-text"}`}>{LAYERS[i].label}</span>
              )}
            />
            <div key={L.key} className="pop mt-4 border-l-2 pl-5" style={{ borderColor: L.color }}>
              <p className="data text-muted">{L.title}</p>
              <p className="mt-2 leading-relaxed">{L.body}</p>
            </div>
          </div>

          {/* simulation */}
          <div className="panel flex flex-col overflow-hidden rounded-[28px]">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="font-semibold">Enterprise AI Assistant</p>
              <p className="data text-muted">Simulation · sample data</p>
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-end">
                <p key={`q${qi}`} className="pop max-w-[85%] rounded-2xl rounded-br-sm bg-fg/[0.08] px-4 py-2.5 text-sm">{Q.q}</p>
              </div>
              <div key={`a${qi}`} className="pop mt-4" style={{ animationDelay: "120ms" }}>
                <p className="data mb-3 text-[#4aa8e8]">{Q.mode}</p>
                <AnswerView a={Q.a} />
              </div>
            </div>
            <div className="border-t border-line p-4">
              <p className="mb-3 px-2 text-xs text-muted">Try a question</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Sample questions">
                {QUESTIONS.map((q, i) => (
                  <button
                    key={q.q}
                    type="button"
                    aria-pressed={i === qi}
                    onClick={() => setQi(i)}
                    className={`rounded-full border px-3.5 py-2 text-left text-sm transition ${i === qi ? "border-[#4aa8e8] text-text" : "border-line text-muted hover:border-line-strong hover:text-text"}`}
                  >
                    {q.q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
