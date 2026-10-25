import { PageTransition } from "@/components/PageTransition";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ClientWall } from "@/components/ClientWall";
import { CtaBand } from "@/components/CtaBand";
import { ClientReach } from "@/components/ClientReach";
import { allClients, clientGroups } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Clients",
  description: "Restaurant groups, retailers, technology companies and public institutions that work with Babji Consult Techies.",
};

const countries = new Set(allClients.map((c) => c.place).filter(Boolean)).size;
const sectorCount = clientGroups.length;

export default function ClientsPage() {
  return (
    <PageTransition>
    <>
      <PageHeader eyebrow="Clients" title="Brands that trust us with their systems.">
        <span className="text-text">
          <span className="font-semibold text-orange">{allClients.length} brands</span> across{" "}
          <span className="font-semibold text-red">{sectorCount} sectors</span> in{" "}
          <span className="font-semibold text-teal">{countries} countries</span>
        </span>
        , from a multi-brand restaurant operator in Kuwait to a European Union agency in Malta.
      </PageHeader>
      <div className="container-x pb-8">
        <ClientWall />
      </div>
      <ClientReach />
      <CtaBand />
    </>
    </PageTransition>
  );
}
