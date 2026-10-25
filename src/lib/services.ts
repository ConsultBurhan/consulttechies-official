export type Service = { title: string; body: string };
export type Pillar = {
  key: string;
  n: string;
  title: string;
  line: string;
  accent: string;
  services: Service[];
};

export const pillars: Pillar[] = [
  {
    key: "whatsapp",
    n: "01",
    title: "WhatsApp",
    line: "Meet customers where they already talk.",
    accent: "#25d366",
    services: [
      {
        title: "WhatsApp Business Solutions",
        body: "WhatsApp chatbots, automated conversations, ordering flows, marketing templates, and customer support.",
      },
      {
        title: "WhatsApp Commerce & Order Automation",
        body: "Ordering journeys that let customers browse products, place orders, and receive order updates through WhatsApp.",
      },
      {
        title: "WhatsApp Marketing & Campaign Management",
        body: "Campaign templates, personalized promotions, customer segmentation, and automated messaging using approved WhatsApp templates.",
      },
    ],
  },
  {
    key: "build",
    n: "02",
    title: "Build",
    line: "Websites, apps and tools, designed and engineered.",
    accent: "#f17f2a",
    services: [
      {
        title: "Website Design & Development",
        body: "Responsive business websites, landing pages, e-commerce websites, and custom web solutions.",
      },
      {
        title: "Mobile Application Development (iOS & Android)",
        body: "High-performance mobile apps for iOS and Android, including custom business apps, customer-facing applications, API integrations, and ongoing maintenance and support.",
      },
      {
        title: "Custom Application Development",
        body: "Business applications, internal tools, workflow applications, APIs, and custom software solutions.",
      },
      {
        title: "Website Maintenance & Technical Support",
        body: "Ongoing updates, bug fixes, security patches, backups, troubleshooting, and website health monitoring.",
      },
    ],
  },
  {
    key: "cloud",
    n: "03",
    title: "Cloud & Ops",
    line: "Ship reliably. Keep it running.",
    accent: "#1dbcbf",
    services: [
      {
        title: "DevOps Engineering & Application Deployment",
        body: "Deployment automation, CI/CD pipelines, environment management, cloud operations, and application release support.",
      },
      {
        title: "Server, Cloud & IT Infrastructure Management",
        body: "Server configuration, hosting support, infrastructure monitoring, backups, access management, and troubleshooting.",
      },
    ],
  },
  {
    key: "data",
    n: "04",
    title: "Customer & Data",
    line: "Connect the platforms. Clean the data.",
    accent: "#ef4056",
    services: [
      {
        title: "Customer Engagement Platform Implementation",
        body: "Implementation, configuration, and integration of CRM, marketing automation, and customer engagement platforms.",
      },
      {
        title: "CRM & Third-Party Platform Integration",
        body: "Connect CRM, marketing, sales, customer support, and business applications using APIs and automation. Examples: Emarsys, HubSpot, Zoho.",
      },
      {
        title: "High-Volume Data Processing & Cleansing",
        body: "Process large datasets, remove duplicate records, standardize data, validate contact information, and improve data quality.",
      },
    ],
  },
  {
    key: "advise",
    n: "05",
    title: "Advise & Optimise",
    line: "Make better technology decisions.",
    accent: "#4aa8e8",
    services: [
      {
        title: "Platform Performance & Optimization",
        body: "Analyze platform performance, identify bottlenecks, improve workflows, and recommend measurable improvements.",
      },
      {
        title: "IT Consulting & Technology Advisory Services",
        body: "Expert guidance on technology strategy, IT infrastructure, software selection, digital transformation, system architecture, process optimization, and technology implementation to help businesses make informed decisions and improve operational efficiency.",
      },
    ],
  },
];

export const allServices = pillars.flatMap((p) => p.services.map((s) => ({ ...s, pillar: p })));
