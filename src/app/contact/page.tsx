import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Babji Consult Techies. Offices in Udaipur, India and Austin, Texas.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title={<>Let&apos;s build something <span className="grad-text">that works.</span></>}>
        Tell us about your project and we&apos;ll reply by email.
      </PageHeader>
      <div className="container-x grid gap-16 md:grid-cols-[1.2fr_1fr]">
        <ContactForm />
        <aside className="space-y-8">
          <div>
            <h2 className="eyebrow mb-3">Direct</h2>
            <ul className="space-y-2">
              <li><a className="text-lg hover:text-teal" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a className="text-lg hover:text-teal" href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
              <li><a className="text-lg hover:text-teal" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a></li>
            </ul>
          </div>
          {site.offices.map((o) => (
            <address key={o.name} className="not-italic">
              <h2 className="eyebrow mb-3">{o.name} · {o.country}</h2>
              <p className="leading-relaxed text-muted">
                {o.lines.map((l) => (<span key={l} className="block">{l}</span>))}
              </p>
            </address>
          ))}
        </aside>
      </div>
    </>
  );
}
