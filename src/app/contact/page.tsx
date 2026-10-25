import { PageTransition } from "@/components/PageTransition";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { OfficeClock } from "@/components/OfficeClocks";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Babji Consult Techies. Offices in Udaipur, India and Austin, Texas.",
};

const channels = [
  { label: "WhatsApp", value: "Message us", href: whatsappLink(), external: true, accent: "#25d366" },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, accent: "#4aa8e8" },
  { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}`, accent: "#f17f2a" },
];

/** Split screen: who and where on the left (pinned), a short stepped form on the right. */
export default function ContactPage() {
  return (
    <PageTransition>
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="relative px-[max(1.5rem,calc((100vw-1240px)/2))] pb-16 pt-36 lg:pr-12" aria-labelledby="contact-h">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow mb-5">Contact</p>
          <h1 id="contact-h" className="display t-hero">
            Start with a conversation.
          </h1>

          <ul className="mt-12 border-t border-line">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-line">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="eyebrow w-24 shrink-0" style={{ color: c.accent }}>{c.label}</span>
                  <span className="display flex-1 text-xl transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{c.value}</span>
                  <span aria-hidden="true" className="text-muted transition group-hover:text-text">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {site.offices.map((o, i) => (
              <div key={o.name}>
                <OfficeClock tz={i === 0 ? "Asia/Kolkata" : "America/Chicago"} city={i === 0 ? "Udaipur" : "Austin"} />
                <address className="mt-4 text-sm not-italic leading-relaxed text-muted">
                  {o.lines.map((l) => (<span key={l} className="block">{l}</span>))}
                </address>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2/60 px-[max(1.5rem,calc((100vw-1240px)/2))] py-16 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-36" aria-label="Contact form">
        <div className="mx-auto max-w-xl lg:mx-0 lg:sticky lg:top-32">
          <ContactForm />
          <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
            We read every note and come prepared with questions. A business conversation, not a sales script.
          </p>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
