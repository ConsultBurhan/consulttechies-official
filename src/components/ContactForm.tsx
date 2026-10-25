"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) errs.email = "Please enter a valid email address.";
    if (!data.message?.trim()) errs.message = "Tell us a little about what you need.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503) {
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name}${data.company ? `, ${data.company}` : ""}`);
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}&body=${body}`;
        setStatus("fallback");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-base outline-none transition focus:border-teal";
  const err = (id: string) =>
    errors[id] ? (
      <p id={`${id}-e`} className="mt-1 text-sm text-red">
        {errors[id]}
      </p>
    ) : null;

  if (status === "sent")
    return (
      <div role="status" className="spot p-8">
        <h3 className="display text-3xl">Thank you.</h3>
        <p className="mt-3 text-muted">We&apos;ve received your message and will reply by email.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="eyebrow mb-2 block">Name</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-e" : undefined} />
        {err("name")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-e" : undefined} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="company" className="eyebrow mb-2 block">Company <span className="normal-case tracking-normal">(optional)</span></label>
          <input id="company" name="company" autoComplete="organization" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">What do you need?</label>
        <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-e" : undefined} />
        {err("message")}
      </div>
      <button className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p role="status" className="text-sm text-muted">
        {status === "fallback" && "Opening your email app so you can send this directly."}
        {status === "error" && "Something went wrong. Please email us or message us on WhatsApp instead."}
      </p>
    </form>
  );
}
