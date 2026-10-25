import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Babji Consult Techies, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Loader-light.svg" alt="" width={32} height={38} className="theme-dark-only h-9 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Loader.svg" alt="" width={32} height={38} className="theme-light-only h-9 w-auto" />
            <span className="display text-lg tracking-[-0.02em]">Babji Consult Techies</span>
          </Link>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            WhatsApp, AI, CRM and DevOps for businesses that run on customer relationships. Udaipur and Austin, since {site.founded}.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-4">Explore</h2>
          <ul className="space-y-2.5">
            {[{ href: "/", label: "Home" }, ...nav].map((n) => (
              <li key={n.href}>
                <Link className="transition hover:text-orange" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4">Talk to us</h2>
          <ul className="space-y-2.5">
            <li>
              <a className="transition hover:text-orange" href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a className="transition hover:text-orange" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <a className="transition hover:text-orange" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-wrap justify-between gap-2 border-t border-line py-6 text-sm text-muted">
        <span>© {site.name}</span>
        <span>Client logos are trademarks of their owners.</span>
      </div>
    </footer>
  );
}
