import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ClientSectors } from "@/components/ClientSectors";
import { ClientShowcase } from "@/components/ClientShowcase";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Clients",
  description: "Restaurant groups, retailers, technology companies and public institutions that work with Babji Consult Techies.",
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader eyebrow="Clients" title={<>Brands that trust us <span className="grad-text">with their systems.</span></>} />
      <ClientShowcase />
      <div className="pt-24">
        <ClientSectors />
      </div>
      <div className="pt-32">
        <CtaBand />
      </div>
    </>
  );
}
