import Link from "next/link";
import { Reveal } from "./Reveal";
import { site, whatsappLink } from "@/lib/site";

const options = [
  { label: "Message us on WhatsApp", sub: "Usually the fastest reply", href: whatsappLink(), external: true },
  { label: site.email, sub: "For briefs and documents", href: `mailto:${site.email}` },
  { label: site.phoneDisplay, sub: "Udaipur, India", href: `tel:${site.phone}` },
];

/** Closing section: one statement, then the ways to reach us. */
export function CtaBand() {
  return (
    <section className="sec relative overflow-hidden border-t border-line" aria-labelledby="cta-h">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(45% 70% at 0% 100%, color-mix(in srgb, var(--orange) 14%, transparent), transparent 70%)" }}
      />
      <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
        <Reveal>
          <h2 id="cta-h" className="display t-hero max-w-[12ch]">
            Tell us what you want to <span className="grad-text">move forward.</span>
          </h2>
          <Link href="/contact" className="btn btn-primary mt-10">
            Start a project <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <Reveal as="ul" delay={0.1} className="border-t border-line">
          {options.map((o) => (
            <li key={o.label} className="border-b border-line">
              <a
                href={o.href}
                {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between gap-4 py-5"
              >
                <span>
                  <span className="block font-semibold transition-colors group-hover:text-orange">{o.label}</span>
                  <span className="mt-0.5 block text-sm text-muted">{o.sub}</span>
                </span>
                <span aria-hidden="true" className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text">→</span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
