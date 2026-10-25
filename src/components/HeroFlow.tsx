"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Stack3D, glyphs, type Layer } from "./Stack3D";

type Scenario = { ask: string; reply: string; events: [string, string, string, string] };

/** Illustrative flows, not records of a real client conversation. */
const SCENARIOS: Scenario[] = [
  {
    ask: "Hi, can I get two chicken combos delivered to Salmiya?",
    events: ["Message received", "Intent: new order · 2 items", "Customer matched · repeat buyer", "Order sent to kitchen POS"],
    reply: "Done. Two combos, about 35 minutes. We'll message you when the driver leaves.",
  },
  {
    ask: "My order still hasn't arrived 😕",
    events: ["Message received", "Intent: order status · frustrated", "Order found · flagged priority", "Driver located · agent joined"],
    reply: "Sorry for the wait. Your order is 6 minutes away, and Sara from our team is on this chat.",
  },
];

const LAYERS: Layer[] = [
  { key: "wa", label: "WhatsApp", color: "#25d366", glyph: glyphs.chat },
  { key: "ai", label: "AI", color: "#4aa8e8", glyph: glyphs.spark },
  { key: "crm", label: "CRM", color: "#ef4056", glyph: glyphs.contacts },
  { key: "ops", label: "Operations", color: "#1dbcbf", glyph: glyphs.gear },
];

const noop = () => () => {};

/**
 * Hero diagram: a customer message enters at the top and drops through the four systems it touches.
 * Each layer lifts and reports what it did as the message reaches it; then the reply goes back out.
 */
export function HeroFlow() {
  const reduce = useSyncExternalStore(noop, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
  const [s, setS] = useState(0);
  const [played, setStep] = useState(5);
  const step = reduce ? 5 : played; // 0 ask · 1-4 layers · 5 reply
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduce) return;
    const t: ReturnType<typeof setTimeout>[] = [setTimeout(() => setStep(0), 0)];
    [900, 1800, 2700, 3600, 4600].forEach((ms, i) => t.push(setTimeout(() => setStep(i + 1), ms)));
    t.push(setTimeout(() => setS((x) => (x + 1) % SCENARIOS.length), 9000));
    return () => t.forEach(clearTimeout);
  }, [s, visible, reduce]);

  const sc = SCENARIOS[s];
  const current = step >= 1 && step <= 4 ? step - 1 : null;

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[520px]">
      <p className="sr-only">
        Example: a customer message on WhatsApp is read by AI, matched in the CRM and turned into an order in your operations
        systems, then answered automatically.
      </p>
      <div aria-hidden="true">
        <div className="flex justify-end">
          <p key={`a${s}`} className="pop max-w-[80%] rounded-2xl rounded-br-sm bg-[#005c4b] px-4 py-2.5 text-[0.9rem] leading-snug text-[#e9edef] shadow-lg">
            {sc.ask}
          </p>
        </div>

        <div className="mt-2">
          <Stack3D
            layers={LAYERS}
            active={current}
            packet={current}
            lit={(i) => step > i + 1}
            side={(i) => {
              const on = step >= i + 1;
              return (
                <div>
                  <p className={`font-semibold transition-colors duration-500 ${on ? "text-text" : "text-muted"}`}>{LAYERS[i].label}</p>
                  <p className={`data mt-1 text-muted transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
                    {sc.events[i]}
                  </p>
                </div>
              );
            }}
          />
        </div>

        <div className="mt-2 min-h-[64px]">
          {step >= 5 && (
            <p key={`r${s}`} className="pop max-w-[80%] rounded-2xl rounded-bl-sm bg-[#1f2c34] px-4 py-2.5 text-[0.9rem] leading-snug text-[#e9edef] shadow-lg">
              {sc.reply}
            </p>
          )}
        </div>
      </div>
      <p className="mt-1 text-right text-xs text-muted">Illustrative flow</p>
    </div>
  );
}
