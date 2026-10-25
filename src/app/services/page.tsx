import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ServiceIndex } from "@/components/ServiceIndex";
import { CtaBand } from "@/components/CtaBand";
import { pillars } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "WhatsApp business solutions, web and mobile development, DevOps, cloud infrastructure, CRM integration, data processing and IT consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title={<>Everything between idea and <span className="grad-text">uptime.</span></>}>
        Fourteen services across five areas. Open any service to see what we provide, typical use cases, where AI can help and the business value.
      </PageHeader>
      <nav aria-label="Service areas" className="container-x mb-20 flex flex-wrap gap-2">
        {pillars.map((p) => (
          <Link key={p.key} href={`#${p.key}`} className="rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-fg/40 hover:text-text">
            {p.title}
          </Link>
        ))}
      </nav>
      <div className="container-x">
        <ServiceIndex />
      </div>
      <div className="pt-32">
        <CtaBand />
      </div>
    </>
  );
}
