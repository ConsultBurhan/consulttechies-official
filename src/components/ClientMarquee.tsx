import { allClients, logoSrc } from "@/lib/clients";

export function ClientMarquee() {
  const row = (hidden: boolean) =>
    allClients.map((c) => (
      <li
        key={c.id + hidden}
        aria-hidden={hidden || undefined}
        className="mr-4 h-24 w-44 shrink-0 rounded-2xl bg-[#f4f1ec] p-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc(c, 256)}
          alt={hidden ? "" : c.name}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </li>
    ));

  return (
    <section aria-label="Our clients" className="border-y border-line bg-ink-2 py-10">
      <p className="eyebrow container-x mb-6">Trusted by teams across food, retail, technology &amp; public service</p>
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee-track">
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  );
}
