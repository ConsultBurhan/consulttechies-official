import Link from "next/link";
import { allClients, logoSrc } from "@/lib/clients";

export function ClientMarquee() {
  const row = (hidden: boolean) =>
    allClients.map((c) => (
      <li
        key={c.id + hidden}
        aria-hidden={hidden || undefined}
        className="mr-3 grid h-20 w-40 shrink-0 place-items-center rounded-2xl bg-[#f4f1ec] p-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc(c)} alt={hidden ? "" : c.name} loading="lazy" className="h-full w-full object-contain" />
      </li>
    ));

  return (
    <section aria-label="Our clients" className="border-y border-line py-8">
      <div className="container-x mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <p className="eyebrow">Trusted by restaurant groups, retailers, technology firms and public institutions</p>
        <Link href="/clients" className="link text-sm">All clients</Link>
      </div>
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <ul className="marquee-track">
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  );
}
