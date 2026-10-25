"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};

const fmt = (tz: string) =>
  new Date().toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
const open = (tz: string) => {
  const h = Number(new Date().toLocaleString("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }));
  const d = new Date().toLocaleDateString("en-GB", { timeZone: tz, weekday: "short" });
  return h >= 9 && h < 18 && d !== "Sat" && d !== "Sun";
};

/** Local time in each office, with a simple open/closed hint (09:00 to 18:00, Mon to Fri). */
export function OfficeClock({ tz, city }: { tz: string; city: string }) {
  const time = useSyncExternalStore(subscribe, () => fmt(tz), () => "");
  const on = useSyncExternalStore(subscribe, () => open(tz), () => false);
  return (
    <div>
      <p className="eyebrow">{city}</p>
      <p className="display mt-2 text-4xl tabular-nums md:text-5xl">{time || "--:--"}</p>
      <p className="mt-2 flex items-center gap-2 text-xs text-muted">
        <span className={`h-2 w-2 rounded-full ${on ? "bg-[#25d366]" : "bg-fg/25"}`} aria-hidden="true" />
        {on ? "In the office now" : "Outside office hours"}
      </p>
    </div>
  );
}
