import { PageTransition } from "@/components/PageTransition";
import { Hero } from "@/components/Hero";
import { ClientMarquee } from "@/components/ClientMarquee";
import { AreaBento } from "@/components/AreaBento";
import { AiControls, Combos, Process } from "@/components/HomeSections";
import { WhatsAppCase } from "@/components/WhatsAppCase";
import { ContextCase } from "@/components/ContextCase";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <PageTransition>
    <>
      <Hero />
      <ClientMarquee />

      <section id="areas" className="sec scroll-mt-20" aria-labelledby="areas-h">
        <div className="container-x">
          <Reveal className="mb-14 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 id="areas-h" className="display t-h2 max-w-[15ch]">Four specializations, one connected team.</h2>
            <p className="lede max-w-md md:justify-self-end">
              Deliver one focused service, or connect them: a WhatsApp journey that reads the enquiry with AI, updates your
              CRM and runs on infrastructure we maintain.
            </p>
          </Reveal>
          <AreaBento />
        </div>
      </section>

      <Combos />

      <WhatsAppCase />
      <ContextCase />
      <AiControls />
      <Process />
      <CtaBand />
    </>
    </PageTransition>
  );
}
