"use client";

import { useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { areas } from "@/lib/specializations";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const topics = [...areas.map((a) => ({ id: a.short, label: a.short, accent: a.accent })), { id: "Not sure yet", label: "Not sure yet", accent: "#f17f2a" }];
const STEPS = ["Topic", "You", "Message"];

/** Three short steps: what you need, who you are, the message. */
export function ContactForm() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const form = useRef<HTMLFormElement>(null);

  const val = (n: string) => (form.current?.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "";

  function next() {
    if (step === 1) {
      const errs: Record<string, string> = {};
      if (!val("name").trim()) errs.name = "Please tell us your name.";
      if (!/^\S+@\S+\.\S+$/.test(val("email"))) errs.email = "Please enter a valid email address.";
      setErrors(errs);
      if (Object.keys(errs).length) return;
    }
    setStep((s) => Math.min(2, s + 1));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 2) return next();
    if (!val("message").trim()) {
      setErrors({ message: "Tell us a little about what you need." });
      return;
    }
    setErrors({});
    const data = { name: val("name"), email: val("email"), company: val("company"), phone: val("phone"), message: val("message"), website: val("website"), interest: picked };
    if (data.website) return setStatus("sent");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) setStatus("sent");
      else if (res.status === 503) {
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name}${data.company ? `, ${data.company}` : ""}${picked.length ? `\nInterested in: ${picked.join(", ")}` : ""}`);
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}&body=${body}`;
        setStatus("fallback");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-fg/30 bg-ink-2 px-4 py-3.5 text-base shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] outline-none transition placeholder:text-muted/60 hover:border-fg/50 focus:border-teal focus:ring-4 focus:ring-teal/15 aria-[invalid=true]:border-red";
  const err = (id: string) => (errors[id] ? <p id={`${id}-e`} className="mt-1 text-sm text-red">{errors[id]}</p> : null);

  if (status === "sent")
    return (
      <div role="status" className="py-10">
        <p className="eyebrow mb-4 text-teal">Sent</p>
        <h3 className="display text-4xl md:text-5xl">Thank you.</h3>
        <p className="mt-4 max-w-sm text-muted">We have your message and will reply by email. A confirmation is on its way to your inbox.</p>
      </div>
    );

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="relative">
      <ol className="mb-10 flex items-center gap-3" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-3" aria-current={i === step ? "step" : undefined}>
            <span className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-orange" : "bg-fg/10"}`} />
            <span className={`eyebrow ${i === step ? "text-text" : ""}`}>{s}</span>
          </li>
        ))}
      </ol>

      {/* honeypot: invisible to people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div hidden={step !== 0} className={step === 0 ? "pop" : ""}>
        <h3 className="display text-3xl md:text-4xl">What can we help with?</h3>
        <p className="mt-2 text-sm text-muted">Pick any that apply.</p>
        <div className="mt-6 flex flex-wrap gap-3" role="group" aria-label="Topics">
          {topics.map((t) => {
            const on = picked.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => setPicked((p) => (on ? p.filter((x) => x !== t.id) : [...p, t.id]))}
                className="rounded-full border px-5 py-3 text-base font-medium transition"
                style={on ? { background: t.accent, borderColor: t.accent, color: "#0a0d12" } : { borderColor: "var(--line)" }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div hidden={step !== 1} className={step === 1 ? "pop space-y-5" : "space-y-5"}>
        <h3 className="display mb-6 text-3xl md:text-4xl">Who are we talking to?</h3>
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block">Name</label>
          <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-e" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-e" : undefined} />
          {err("email")}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className="eyebrow mb-2 block">Company <span className="normal-case tracking-normal">(optional)</span></label>
            <input id="company" name="company" autoComplete="organization" className={field} />
          </div>
          <div>
            <label htmlFor="phone" className="eyebrow mb-2 block">Phone <span className="normal-case tracking-normal">(optional)</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
          </div>
        </div>
      </div>

      <div hidden={step !== 2} className={step === 2 ? "pop" : ""}>
        <h3 className="display text-3xl md:text-4xl">Tell us a little more.</h3>
        <label htmlFor="message" className="eyebrow mb-2 mt-6 block">What do you need?</label>
        <textarea id="message" name="message" rows={6} className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-e" : undefined} />
        {err("message")}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="text-sm text-muted transition hover:text-text">← Back</button>
        ) : (
          <span />
        )}
        <button className="btn btn-primary" disabled={status === "sending"}>
          {step < 2 ? "Continue →" : status === "sending" ? "Sending…" : "Start the conversation"}
        </button>
      </div>
      <p role="status" className="mt-4 text-sm text-muted">
        {status === "fallback" && "Opening your email app so you can send this directly."}
        {status === "error" && "Something went wrong. Please email us or message us on WhatsApp instead."}
      </p>
    </form>
  );
}
