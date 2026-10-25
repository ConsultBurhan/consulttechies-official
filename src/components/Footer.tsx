import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line bg-ink-2/70 backdrop-blur-sm">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo-light.svg" alt="Babji Consult Techies" width={150} height={82} className="theme-dark-only h-16 w-auto" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo.svg" alt="Babji Consult Techies" width={150} height={82} className="theme-light-only h-16 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Software, WhatsApp automation, cloud operations and platform integration for businesses that
            run on customer relationships. Since {site.founded}.
          </p>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Explore</h2>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="text-muted transition hover:text-text" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="text-muted transition hover:text-text" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="text-muted transition hover:text-text" href={`tel:${site.phone}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="text-muted transition hover:text-text"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x grid gap-4 pb-12 md:grid-cols-2">
        {site.offices.map((o) => (
          <address key={o.name} className="spot !rounded-2xl p-5 not-italic">
            <span className="eyebrow">
              {o.name} · {o.country}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {o.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </address>
        ))}
      </div>

      <div className="container-x flex flex-wrap justify-between gap-2 border-t border-line py-6 text-xs text-muted">
        <span>
          © {site.name}. All rights reserved.
        </span>
        <span>Client logos are trademarks of their owners.</span>
      </div>
    </footer>
  );
}
