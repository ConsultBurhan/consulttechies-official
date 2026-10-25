"use client";

import { useEffect, useState } from "react";

/** Brand mark shown briefly on the first visit of a session. */
export function Loader() {
  const [state, setState] = useState<"show" | "hide" | "gone">("gone");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("bct-loaded") === "1";
      sessionStorage.setItem("bct-loaded", "1");
    } catch {}
    if (seen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => setState("show"));
    const t1 = setTimeout(() => setState("hide"), reduce ? 200 : 1100);
    const t2 = setTimeout(() => setState("gone"), reduce ? 300 : 1700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "gone") return null;
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] grid place-items-center bg-ink transition-opacity duration-500"
      style={{ opacity: state === "hide" ? 0 : 1, pointerEvents: state === "hide" ? "none" : "auto" }}
    >
      {["/Loader-light.svg", "/Loader.svg"].map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          width={96}
          height={112}
          style={{ animation: "loaderPulse 1.1s ease-in-out infinite" }}
          className={`${i ? "theme-light-only" : "theme-dark-only"} h-28 w-auto`}
        />
      ))}
    </div>
  );
}
