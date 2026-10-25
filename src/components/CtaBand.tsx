import Link from "next/link";
import { Reveal } from "./Reveal";
import { site, whatsappLink } from "@/lib/site";

export function CtaBand() {
  return (
    <Reveal as="section" className="container-x">
      <div className="relative overflow-hidden glass rounded-[2.5rem] px-6 py-16 text-center md:px-16 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(50% 80% at 50% 120%, rgb(241 127 42 / .35), transparent 70%), radial-gradient(40% 60% at 90% -10%, rgb(29 188 191 / .25), transparent 70%)" }}
        />
        <div className="relative">
          <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.2rem,6vw,4.8rem)]">
            Tell us what you want to <span className="grad-text">move forward.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted">
            A website, a WhatsApp flow, a stuck integration or a technology decision. Start with a conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">Start a project →</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp</a>
            <a href={`mailto:${site.email}`} className="btn btn-ghost">{site.email}</a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
