"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Msg = { from: "bot" | "me"; text: string };

const script: Msg[] = [
  { from: "me", text: "Hi, I'd like to order" },
  { from: "bot", text: "Welcome! Browse the menu or pick a category 👇" },
  { from: "me", text: "Show me combos" },
  { from: "bot", text: "3 combos available. Tap one to add it to your cart." },
  { from: "me", text: "Combo 2, deliver to my saved address" },
  { from: "bot", text: "✅ Order placed. We'll message you when it's on the way." },
  { from: "bot", text: "🛵 Your order is out for delivery." },
];

/** Illustrative conversation: a sample flow, not a recording of a real client chat. */
export function WhatsAppDemo() {
  const reduce = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [played, setCount] = useState(0);
  const count = reduce ? script.length : played;
  const [run, setRun] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return;
    let i = 0;
    const reset = setTimeout(() => setCount(0), 0);
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= script.length) clearInterval(id);
    }, 1300);
    return () => {
      clearTimeout(reset);
      clearInterval(id);
    };
  }, [inView, run, reduce]);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [count]);

  return (
    <div ref={wrap} className="mx-auto w-full max-w-[340px]">
      <div className="rounded-[2.4rem] border border-fg/15 bg-ink-3 p-3 shadow-[0_40px_120px_-30px_rgb(37_211_102/.35)]">
        <div className="overflow-hidden rounded-[1.8rem] bg-[#0b141a] text-[#e9edef]">
          <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25d366] text-sm font-bold text-black">B</span>
            <div>
              <p className="text-sm font-semibold">Your Brand</p>
              <p className="text-[11px] text-[#25d366]">Business account · online</p>
            </div>
          </div>
          <div ref={box} role="log" aria-live="off" className="h-[380px] space-y-2 overflow-y-auto p-4">
            {script.slice(0, count).map((m, i) => (
              <div key={i} className={`pop flex ${m.from === "me" ? "justify-end" : ""}`}>
                <p
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                    m.from === "me" ? "rounded-tr-sm bg-[#005c4b]" : "rounded-tl-sm bg-[#1f2c34]"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => setRun((r) => r + 1)} className="mt-4 w-full text-center text-xs text-muted underline-offset-4 hover:text-text hover:underline">
        Replay conversation
      </button>
    </div>
  );
}
