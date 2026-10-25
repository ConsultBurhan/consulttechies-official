"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Large statement whose words light up as the reader scrolls through it. */
export function TextReveal({ text, className = "", marks = [] }: { text: string; className?: string; marks?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll("[data-w]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        { opacity: 1, ease: "none", stagger: 0.5, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.4 } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className={marks.includes(w.replace(/[.,]/g, "")) ? "grad-text" : undefined}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
