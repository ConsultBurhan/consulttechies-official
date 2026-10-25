import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ClientGroups } from "@/components/ClientGroups";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Clients",
  description: "Restaurant groups, retailers, technology companies and public institutions that work with Babji Consult Techies.",
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader eyebrow="Clients" title={<>Brands that trust us <span className="grad-text">with their systems.</span></>}>
        From Kout Food Group&apos;s restaurant brands in Kuwait to the European Union Agency for Asylum.
      </PageHeader>
      <div className="container-x">
        <ClientGroups />
      </div>
      <div className="pt-32">
        <CtaBand />
      </div>
    </>
  );
}
