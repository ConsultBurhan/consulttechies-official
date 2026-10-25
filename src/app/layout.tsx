import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";
import { site } from "@/lib/site";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://consulttechies.io"),
  title: { default: `${site.name} — Software, automation & cloud`, template: `%s · ${site.name}` },
  description:
    "WhatsApp automation, web and mobile apps, DevOps, CRM integration and IT consulting for businesses in Kuwait, Europe and beyond. Teams in Udaipur and Austin.",
  openGraph: { siteName: site.name, type: "website" },
  icons: { icon: "/Loader.svg" },
};

export const viewport: Viewport = { themeColor: "#0a0d12" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Loader />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
