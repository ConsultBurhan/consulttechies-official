"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/** Icon mark plus the company name set beside it. */
function Logo({ className }: { className: string }) {
  return (
    <span className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Loader-light.svg" alt="" width={36} height={42} className={`theme-dark-only w-auto ${className}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Loader.svg" alt="" width={36} height={42} className={`theme-light-only w-auto ${className}`} />
      <span className="display whitespace-nowrap text-[0.95rem] font-semibold tracking-[-0.02em] sm:text-base">Babji Consult Techies</span>
    </span>
  );
}

/** Floating glass pill: wide at the top of the page, condenses on scroll, relaxes on hover. */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const condensed = scrolled && !hover && !open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center px-3 md:top-4">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="drop pointer-events-auto flex items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 transition-[width,padding,box-shadow] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ width: condensed ? "min(840px, 100%)" : "min(1240px, 100%)", backgroundColor: "color-mix(in srgb, var(--ink) 62%, transparent)" }}
      >
        <Link href="/" aria-label="Babji Consult Techies, home" onClick={() => setOpen(false)}>
          <Logo className={`w-auto transition-all duration-500 ${condensed ? "h-7" : "h-9"}`} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors hover:text-text ${active ? "bg-fg/10 text-text" : "text-muted"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle className="mx-1" />
          <Link href="/contact" className="btn btn-primary !min-h-10 !px-5 !text-sm">
            {condensed ? "Contact" : "Start a project"}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="drop grid h-10 w-10 place-items-center rounded-full"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-fg transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[11px] h-px w-5 bg-fg transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="glass pointer-events-auto mt-2 w-full max-w-[1240px] rounded-[2rem] px-6 py-4 md:hidden"
      >
        <ul className="display text-3xl">
          {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }]
            .filter((x, i, a) => a.findIndex((y) => y.href === x.href) === i)
            .map((item) => (
              <li key={item.href} className="border-b border-line py-3 last:border-0">
                <Link href={item.href} onClick={() => setOpen(false)} className="block">
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
}
