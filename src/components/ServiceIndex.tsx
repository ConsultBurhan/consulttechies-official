"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { Offering } from "@/lib/catalog";
import { IconBadge, icons, type IconName } from "./ui";

const DURATION = 420;

/**
 * Full brief in a panel that slides in from the right. Rendered into <body> so card transforms
 * can't trap it, and closed explicitly before navigating so it never survives a route change.
 */
function DetailPanel({ o, accent, icon, onClose }: { o: Offering; accent: string; icon: IconName; onClose: () => void }) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const prevFocus = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  const close = () => {
    setShown(false);
    setTimeout(onClose, DURATION);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return createPortal(
    <div className="fixed inset-0 z-[120]" role="presentation">
      <div
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity ease-out"
        style={{ opacity: shown ? 1 : 0, transitionDuration: `${DURATION}ms` }}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto border-l border-line bg-ink-2 p-7 text-text shadow-[-30px_0_80px_-30px_rgb(0_0_0/0.5)] outline-none transition-transform ease-[cubic-bezier(0.2,0.8,0.2,1)] md:p-10"
        style={{ transform: shown ? "translateX(0)" : "translateX(100%)", transitionDuration: `${DURATION}ms` }}
      >
        <div className="flex items-start justify-between gap-4">
          <IconBadge icon={icon} color={accent} size={52} />
          <button type="button" onClick={close} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-lg transition hover:border-text" aria-label="Close">
            ×
          </button>
        </div>
        <h2 id={titleId} className="display mt-6 text-[1.8rem] tracking-[-0.025em]">{o.title}</h2>
        <p className="lede mt-3">{o.summary}</p>

        <h3 className="eyebrow mt-9 mb-3">What we provide</h3>
        <ul className="grid gap-2">
          {o.provides.map((x) => (
            <li key={x} className="flex items-start gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3 text-[0.95rem]">
              <span className="mt-0.5 shrink-0" style={{ color: accent }}>{icons.check}</span>
              {x}
            </li>
          ))}
        </ul>

        <h3 className="eyebrow mt-9 mb-3">Typical use cases</h3>
        <ul className="flex flex-wrap gap-2">
          {o.uses.map((u) => (
            <li key={u} className="chip">{u}</li>
          ))}
        </ul>

        {o.ai && (
          <div className="mt-9 rounded-2xl border p-5" style={{ borderColor: "color-mix(in srgb, #4aa8e8 35%, transparent)", background: "color-mix(in srgb, #4aa8e8 7%, transparent)" }}>
            <h3 className="flex items-center gap-2 font-semibold text-[#4aa8e8]">{icons.spark} Where AI helps</h3>
            <p className="mt-2 leading-relaxed text-muted">{o.ai}</p>
          </div>
        )}

        <div className="mt-9 rounded-2xl p-5" style={{ background: `color-mix(in srgb, ${accent} 10%, transparent)` }}>
          <h3 className="eyebrow mb-1">Business value</h3>
          <p className="leading-relaxed">{o.value}</p>
        </div>

        {/* close immediately (no slide) so the panel is gone before the next page renders */}
        <Link href="/contact" onClick={onClose} className="btn btn-primary mt-9">
          Talk to us about this <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>,
    document.body,
  );
}

/**
 * A service as a compact tile: icon, name, one-line tagline and two deliverables.
 * "Details" opens the full brief in a side panel, so the page stays scannable.
 */
export function OfferingTile({ o, accent }: { o: Offering; accent: string }) {
  const [open, setOpen] = useState(false);
  const icon = (o.icon ?? "check") as IconName;

  return (
    <li className="card card-hover group flex flex-col p-6" style={{ "--accent": accent } as CSSProperties}>
      <IconBadge icon={icon} color={accent} />
      <h3 className="display mt-5 text-[1.2rem] leading-snug tracking-[-0.015em]">{o.title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{o.tagline ?? o.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {o.provides.slice(0, 2).map((p) => (
          <li key={p} className="chip text-[0.78rem]">{p}</li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between border-t border-line pt-4 text-sm font-semibold transition-colors hover:text-[var(--accent)]"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Details
          <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full border border-line-strong transition-transform duration-300 group-hover:translate-x-0.5">
            {icons.arrow}
          </span>
        </button>
      </div>
      {open && <DetailPanel o={o} accent={accent} icon={icon} onClose={() => setOpen(false)} />}
    </li>
  );
}
