"use client";

import { ClientGlobe, type Pin } from "./ClientGlobe";
import { allClients } from "@/lib/clients";

const COORDS: Record<string, [number, number]> = {
  Kuwait: [29.37, 47.98],
  Lebanon: [33.89, 35.5],
  Belgium: [50.85, 4.35],
  Malta: [35.9, 14.5],
};

const PINS: Pin[] = [
  { name: "Udaipur", lat: 24.58, lon: 73.68, kind: "office" },
  { name: "Austin", lat: 30.27, lon: -97.74, kind: "office" },
  ...Object.entries(COORDS).map(([name, [lat, lon]]) => ({ name, lat, lon, kind: "client" as const })),
];

const byCountry = Object.keys(COORDS).map((country) => ({ country, names: allClients.filter((c) => c.place === country).map((c) => c.name) }));
const elsewhere = allClients.filter((c) => !c.place).map((c) => c.name);

/** Where our clients are: the globe explains reach, the list beside it carries the same facts as text. */
export function ClientReach() {
  return (
    <section className="sec" aria-labelledby="reach-h">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="order-2 grid place-items-center lg:order-1">
          <ClientGlobe pins={PINS} hub="Udaipur" />
          <p className="eyebrow mt-2 flex items-center gap-5">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal" />Our offices</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange" />Client countries</span>
            <span className="hidden sm:inline">Drag to turn</span>
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <h2 id="reach-h" className="display t-h2 max-w-[14ch]">From Udaipur and Austin to four countries.</h2>
          <p className="lede mt-5 max-w-lg">Delivery teams in India and the United States, working with clients across the Gulf and Europe.</p>
          <dl className="mt-10 border-t border-line">
            {byCountry.map(({ country, names }) => (
              <div key={country} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                <dt className="font-semibold">{country}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-muted">{names.join(", ")}</dd>
              </div>
            ))}
            {elsewhere.length > 0 && (
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4">
                <dt className="font-semibold">Online</dt>
                <dd className="text-[0.95rem] leading-relaxed text-muted">{elsewhere.join(", ")}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}
