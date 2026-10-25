import { areas, type Area } from "./specializations";
import { allServices } from "./services";
import { serviceDetails } from "./service-details";

/** One offering as shown on the Services page, whichever source document it came from. */
export type Offering = {
  title: string;
  tagline?: string;
  icon?: string;
  summary: string;
  provides: string[];
  uses: string[];
  ai?: string;
  value: string;
};

export type CatalogArea = Pick<Area, "key" | "title" | "short" | "accent" | "headline" | "intro"> & { items: Offering[] };

/** One-line taglines and icons so the Services page scans as tiles, not paragraphs. */
const META: Record<string, [string, string]> = {
  "WhatsApp Business Solutions": ["Chatbots and support journeys with a clean handover to people.", "chat"],
  "WhatsApp Commerce & Order Automation": ["Browse, order and track without leaving the chat.", "cart"],
  "WhatsApp Marketing & Campaign Management": ["Segmented offers on approved templates, to opted-in customers.", "megaphone"],
  "Enterprise assistants & organisational knowledge": ["Answers from your own documents and systems.", "search"],
  "Generative AI & custom AI applications": ["AI features built into your products and workflows.", "spark"],
  "AI data analysis, reporting & BI": ["Ask your data a question, get a chart or a report.", "chart"],
  "Workflow automation & process support": ["Classify, extract and route the repetitive work.", "loop"],
  "AI consulting, integration & optimisation": ["Find where AI helps, then make it reliable.", "compass"],
  "Customer Engagement Platform Implementation": ["Journeys, segments and automation, configured properly.", "contacts"],
  "CRM & Third-Party Platform Integration": ["Emarsys, HubSpot, Zoho and your other tools, in sync.", "plug"],
  "High-Volume Data Processing & Cleansing": ["De-duplicated, validated, campaign-ready data.", "filter"],
  "Website Design & Development": ["Responsive sites, landing pages and e-commerce.", "globe"],
  "Mobile Application Development (iOS & Android)": ["Native or cross-platform apps, ready for the stores.", "phone"],
  "Custom Application Development": ["Internal tools, portals and APIs shaped around your process.", "code"],
  "Website Maintenance & Technical Support": ["Updates, fixes, security patches and health checks.", "wrench"],
  "DevOps Engineering & Application Deployment": ["CI/CD pipelines and repeatable, reversible releases.", "rocket"],
  "Server, Cloud & IT Infrastructure Management": ["Hosting, monitoring, backups and access control.", "server"],
  "Platform Performance & Optimization": ["Find the bottlenecks, then measure the fix.", "gauge"],
  "IT Consulting & Technology Advisory Services": ["Technology decisions grounded in your priorities.", "compass"],
};

const withMeta = (o: Offering): Offering => ({ ...o, tagline: META[o.title]?.[0], icon: META[o.title]?.[1] });

const fromService = (title: string): Offering => {
  const s = allServices.find((x) => x.title === title);
  const d = serviceDetails[title];
  if (!s || !d) throw new Error(`Unknown service: ${title}`);
  return withMeta({ title: s.title, summary: s.body, provides: d.provides, uses: d.uses, ai: d.ai, value: d.value });
};

/** The single grouping used across the site: four specializations, every service nested under one. */
const SERVICES_BY_AREA: Record<Area["key"], string[]> = {
  whatsapp: ["WhatsApp Business Solutions", "WhatsApp Commerce & Order Automation", "WhatsApp Marketing & Campaign Management"],
  ai: [],
  crm: ["Customer Engagement Platform Implementation", "CRM & Third-Party Platform Integration", "High-Volume Data Processing & Cleansing"],
  devops: [
    "Website Design & Development",
    "Mobile Application Development (iOS & Android)",
    "Custom Application Development",
    "Website Maintenance & Technical Support",
    "DevOps Engineering & Application Deployment",
    "Server, Cloud & IT Infrastructure Management",
    "Platform Performance & Optimization",
  ],
};

export const catalog: CatalogArea[] = areas.map((a) => ({
  key: a.key,
  title: a.title,
  short: a.short,
  accent: a.accent,
  headline: a.headline,
  intro: a.intro,
  // AI has no entry in the 14-service list, so its offerings come from the specializations document
  items:
    a.key === "ai"
      ? a.capabilities.map((c) => withMeta({ title: c.title, summary: c.intro, provides: c.does, uses: c.fits, value: c.outcome }))
      : SERVICES_BY_AREA[a.key].map(fromService),
}));

export const advisory: Offering = fromService("IT Consulting & Technology Advisory Services");

export const offeringCount = catalog.reduce((n, a) => n + a.items.length, 0) + 1;
