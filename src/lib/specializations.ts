/** Content distilled from docs/business-core-specializations.md */
export type Capability = {
  title: string;
  intro: string;
  does: string[];
  fits: string[];
  ai?: string;
  outcome: string;
};

export type Area = {
  key: "whatsapp" | "ai" | "crm" | "devops";
  n: string;
  kicker: string;
  title: string;
  short: string;
  accent: string;
  headline: string;
  intro: string;
  highlights: string[];
  outcome: string;
  note: string;
  capabilities: Capability[];
};

export const areas: Area[] = [
  {
    key: "whatsapp",
    n: "01",
    kicker: "Customer conversations & commerce",
    title: "WhatsApp Business Solutions",
    short: "WhatsApp",
    accent: "#25d366",
    headline: "Turn WhatsApp into a working business channel.",
    intro:
      "Customer service, commerce, marketing and notifications on the app your customers already open every day, designed around how they actually talk to you.",
    highlights: [
      "Chatbots with clean handover to human agents",
      "Ordering journeys connected to order, payment and delivery systems",
      "Permission-aware campaigns on approved templates",
      "Webhooks and APIs into CRM, e-commerce and support tools",
    ],
    outcome: "More consistent customer communication and fewer repetitive manual replies.",
    note:
      "We work with the WhatsApp Business Platform and relevant Meta tools. Exact functionality depends on account setup, approvals, policies and the systems being connected.",
    capabilities: [
      {
        title: "Chatbots & automated conversations",
        intro: "Guided and automated conversations that help customers find information and complete common tasks.",
        does: [
          "Conversation flows, menus, intents and automated responses",
          "FAQ and support journeys with clear escalation to human agents",
          "Connection to approved knowledge sources and business systems",
          "Lead capture, enquiry qualification, appointment requests and routing",
          "Fallback responses and exception paths for what automation cannot resolve",
        ],
        fits: ["Customer service & FAQs", "Product and service enquiries", "Lead generation", "Booking and support workflows"],
        ai: "AI can interpret free-text questions, retrieve approved information, classify intent and draft replies. Rules and connected systems control important facts; humans take complex or sensitive requests.",
        outcome: "More consistent communication and fewer repetitive manual responses.",
      },
      {
        title: "Commerce & order automation",
        intro: "Ordering journeys where customers discover products, submit order details and receive updates in WhatsApp.",
        does: [
          "Catalogue and product discovery journeys where supported",
          "Guided order capture and validation",
          "Integration with order, inventory, payment, delivery or POS systems",
          "Confirmations, status notifications and exception handling",
          "Handover to staff when an order needs manual attention",
        ],
        fits: ["Restaurant and retail ordering", "Order-status enquiries", "Delivery and fulfilment notices", "Assisted product discovery"],
        ai: "Conversational AI helps customers describe what they need. Prices, availability, acceptance and status are always confirmed by connected systems.",
        outcome: "A simpler customer journey and better visibility across order communication.",
      },
      {
        title: "Marketing, campaigns & notifications",
        intro: "Customer messaging and operational notifications through structured, permission-aware workflows.",
        does: [
          "Campaign planning and approved template setup",
          "Personalised messages and segmentation from permitted data",
          "Scheduled messaging and campaign workflow automation",
          "Transactional and service notifications where supported",
          "Reporting and integration with CRM or marketing platforms",
        ],
        fits: ["Offers for eligible audiences", "Re-engagement and lifecycle messaging", "Order, booking and service updates", "CRM-coordinated campaigns"],
        ai: "AI can assist with message variants, drafting, segment insight and campaign summaries. Consent, opt-outs and template approvals stay part of the design.",
        outcome: "More organised messaging operations that reflect customer context.",
      },
      {
        title: "Integrations & the Meta ecosystem",
        intro:
          "Assessment and implementation of WhatsApp Business Platform capabilities, account configuration, templates, webhooks and APIs.",
        does: [
          "Business account and template configuration",
          "Webhook and API integration",
          "Connections to CRM, e-commerce, order-management and support systems",
          "Meta services selected by account, eligibility, use case and current requirements",
        ],
        fits: ["Connecting chat to existing systems", "Moving from a manual inbox to a workflow", "Multi-system order journeys"],
        outcome: "WhatsApp becomes a connected channel, not just a messaging inbox.",
      },
    ],
  },
  {
    key: "ai",
    n: "02",
    kicker: "Intelligence, automation & insight",
    title: "AI Products & Services",
    short: "AI",
    accent: "#4aa8e8",
    headline: "Practical AI that solves a defined problem.",
    intro:
      "Assistants, knowledge retrieval, data analysis and workflow automation, built around the users, the data, the permissions and the level of automation that is actually appropriate.",
    highlights: [
      "Assistants grounded in your approved documents",
      "Natural-language analysis over your business data",
      "Document extraction, routing and workflow support",
      "Evaluation, permissions and human review designed in",
    ],
    outcome: "A grounded route from AI experimentation to maintainable business use cases.",
    note:
      "AI outputs are checked where accuracy is consequential, and any action against business systems follows explicit permissions and approval rules.",
    capabilities: [
      {
        title: "Enterprise assistants & organisational knowledge",
        intro: "Conversational assistants that help employees and customers find information without searching across many sources.",
        does: [
          "Assistants grounded in approved documents and repositories",
          "Natural-language Q&A over supported business content",
          "Document ingestion and retrieval for PDFs and other formats",
          "Role-aware access patterns based on connected systems",
          "Conversation context, structured replies and escalation paths",
        ],
        fits: ["Internal policy and process help", "Employee onboarding", "Customer self-service", "Search across documentation"],
        outcome: "Faster access to organisational knowledge and less time spent searching.",
      },
      {
        title: "Generative AI & custom AI applications",
        intro: "Generative AI added to products and workflows where language understanding or content generation adds real value.",
        does: [
          "AI features for websites, mobile apps and internal systems",
          "LLM integration and model selection based on requirements",
          "Prompt and workflow design, structured outputs, tool integration",
          "Summarisation, extraction, classification and content assistance",
          "Testing for quality, reliability, safety and task performance",
        ],
        fits: ["AI assistants for customers or staff", "Document processing", "Drafting and summarising", "Features inside existing apps"],
        outcome: "Purpose-built AI features that fit existing products and processes.",
      },
      {
        title: "AI data analysis, reporting & BI",
        intro: "Make business data easier to explore: ask questions, analyse results and receive structured outputs.",
        does: [
          "Natural-language interfaces to approved data sources",
          "Business-question and analysis workflows",
          "Structured summaries, charts and reports where supported",
          "Forecasting and trend analysis when data and methods allow",
          "Connections to databases, business systems and reporting tools",
        ],
        fits: ["Sales and operations analysis", "Trend and variance investigation", "Report preparation", "Forecasting and scenarios"],
        outcome: "A more direct path from business questions to useful analysis, subject to data quality and access controls.",
      },
      {
        title: "Workflow automation & process support",
        intro: "AI combined with APIs, business rules and workflow tools to cut repetitive work while keeping controls explicit.",
        does: [
          "Classification and routing of incoming requests",
          "Extraction from supported documents and messages",
          "AI-assisted workflow steps and task preparation",
          "Integration with CRM, support tools, databases and internal apps",
          "Human approval for consequential actions",
        ],
        fits: ["Processing enquiries and requests", "Routing cases to the right team", "Preparing records for review", "Repetitive information handling"],
        outcome: "Reduced manual effort for suitable tasks and more consistent routine handling.",
      },
      {
        title: "AI consulting, integration & optimisation",
        intro: "Helping teams decide where AI is useful, choose an approach and keep improving after deployment.",
        does: [
          "Opportunity discovery and use-case prioritisation",
          "Data readiness and integration assessment",
          "Architecture and model-integration planning",
          "Evaluation criteria, monitoring and iteration",
          "Responsible-use controls, permissions and human-review design",
        ],
        fits: ["Planning an AI roadmap", "Adding AI to existing software", "Evaluating a proof of concept", "Improving an AI workflow"],
        outcome: "A more grounded route from experimentation to maintainable use cases.",
      },
    ],
  },
  {
    key: "crm",
    n: "03",
    kicker: "Customer data, journeys & platforms",
    title: "CRM & Customer Engagement",
    short: "CRM",
    accent: "#ef4056",
    headline: "Connect the data, the journeys and the teams.",
    intro:
      "Implementation, configuration, integration and improvement of CRM and engagement platforms, including Emarsys, HubSpot and Zoho, depending on your licensing and integration options.",
    highlights: [
      "CRM rollout and reconfiguration around real workflows",
      "Lifecycle journeys and trigger-based communication",
      "API and webhook integration between platforms",
      "Duplicate resolution and campaign-ready customer data",
    ],
    outcome: "More connected customer information and less manual data transfer between platforms.",
    note:
      "Configuration, migration, campaign setup, integration, automation, reporting and support can be delivered as separate or combined workstreams.",
    capabilities: [
      {
        title: "CRM implementation & configuration",
        intro: "CRM processes and platform structures set up around how sales, marketing and service teams work.",
        does: [
          "Requirements mapping and workflow configuration",
          "Contact, account, lead and activity structures",
          "Roles, permissions and team workflows",
          "Data import, mapping, cleansing and migration",
          "User testing, documentation and adoption support",
        ],
        fits: ["CRM rollout or reconfiguration", "Better lead and customer records", "Standardising sales and service", "Preparing data for campaigns"],
        outcome: "A CRM aligned to business processes and easier for teams to use consistently.",
      },
      {
        title: "Marketing automation & customer journeys",
        intro: "Structured customer journeys and campaign workflows using the platform's own capabilities.",
        does: [
          "Audience segmentation from available, permitted data",
          "Lifecycle journey and campaign configuration",
          "Trigger-based communications and scheduled workflows",
          "Template and content workflow support",
          "Reporting and iterative improvement",
        ],
        fits: ["Onboarding and lifecycle", "Lead nurturing", "Retention and re-engagement", "Coordinated customer messaging"],
        ai: "AI may assist with content variations, journey analysis and interaction summaries. Final campaign logic follows agreed business rules and customer permissions.",
        outcome: "More consistent customer journeys and clearer campaign operations.",
      },
      {
        title: "CRM integration & data connectivity",
        intro: "Connect CRM with other tools to reduce disconnected data and repetitive manual updates.",
        does: [
          "API, webhook and supported-connector integrations",
          "Data mapping and synchronisation",
          "Links to marketing, sales, support, websites and apps",
          "Error handling, reconciliation and monitoring",
          "Data-quality checks and workflow documentation",
        ],
        fits: ["Emarsys, HubSpot or Zoho with other tools", "Syncing customer and lead records", "Website forms into CRM", "Service and marketing workflows"],
        outcome: "Less manual re-entry and better continuity between the tools teams already use.",
      },
      {
        title: "Data quality & campaign readiness",
        intro: "Consistent, usable customer records so teams can get more from their CRM and engagement platforms.",
        does: [
          "Duplicate identification and resolution rules",
          "Field standardisation and validation",
          "Segmentation readiness and quality reporting",
          "Import and migration preparation",
          "Exception handling for records needing review",
        ],
        fits: ["Preparing a CRM for a campaign", "Cleaning data before migration", "Merging multiple customer sources", "Investigating duplicates"],
        ai: "AI can suggest mappings for inconsistent text and flag unusual records, while explicit validation and review protect important changes.",
        outcome: "More reliable records and a stronger basis for segmentation, reporting and personalisation.",
      },
    ],
  },
  {
    key: "devops",
    n: "04",
    kicker: "Build, release & operate",
    title: "DevOps, Websites & Applications",
    short: "DevOps",
    accent: "#1dbcbf",
    headline: "Build it, ship it, keep it running.",
    intro:
      "The digital platforms businesses rely on, from websites and mobile apps to custom software and cloud infrastructure, supported across the whole application lifecycle.",
    highlights: [
      "Websites, iOS and Android apps, internal tools and APIs",
      "CI/CD pipelines and repeatable releases",
      "Cloud, server, backup and access management",
      "Maintenance, monitoring and performance tuning",
    ],
    outcome: "Maintainable digital services and more repeatable releases and operations.",
    note: "We support the lifecycle from solution design and development through deployment, operations, maintenance and improvement.",
    capabilities: [
      {
        title: "Website design, development & maintenance",
        intro: "Websites with a clear user experience that can be maintained and evolved alongside the business.",
        does: [
          "Corporate sites, landing pages and e-commerce",
          "Responsive design and front-end / back-end development",
          "CMS, analytics and third-party integrations",
          "Content updates, bug fixes, dependency updates and security patching",
          "Backup checks, troubleshooting and health monitoring",
        ],
        fits: ["Launching a business website", "Campaign landing pages", "Maintaining an existing site", "Improving usability and performance"],
        outcome: "A website that can be maintained and evolved with the business.",
      },
      {
        title: "Custom software & applications",
        intro: "Web, mobile and internal applications shaped around specific operational needs.",
        does: [
          "Business applications, portals and internal tools",
          "iOS and Android mobile applications",
          "API development and third-party integration",
          "Workflow, form and approval applications",
          "Testing, release prep, documentation and support",
        ],
        fits: ["Digitising manual processes", "Customer-facing products", "Internal team tools", "Connecting apps to business data"],
        outcome: "Software shaped around real requirements and connected to the systems it needs.",
      },
      {
        title: "DevOps, CI/CD & release engineering",
        intro: "Repeatable builds and deployments through automated pipelines and consistent environment practice.",
        does: [
          "CI/CD pipeline design and implementation",
          "Build, test and deployment automation",
          "Development, staging and production environments",
          "Release coordination, rollback planning, configuration management",
          "Deployment troubleshooting and release documentation",
        ],
        fits: ["Automating manual deploys", "Standardising releases", "Build and deploy visibility", "Fewer avoidable release errors"],
        ai: "AI-assisted engineering can summarise logs, explain pipeline failures and draft configurations. Changes still require review and testing.",
        outcome: "More consistent delivery practice and better release visibility.",
      },
      {
        title: "Cloud, servers & infrastructure operations",
        intro: "The infrastructure applications depend on, with defined practice for access, monitoring, backup and troubleshooting.",
        does: [
          "Server and cloud-environment configuration",
          "Hosting and runtime support",
          "Infrastructure and service monitoring",
          "Backup planning and recovery checks",
          "Access management and incident troubleshooting",
        ],
        fits: ["Maintaining environments", "Investigating alerts", "Backup and recovery readiness", "Operational documentation"],
        ai: "AI may group alerts and summarise logs. Automated remediation is limited to approved, tested actions.",
        outcome: "Clearer operational visibility and a more structured approach to reliability.",
      },
      {
        title: "Application support, performance & optimisation",
        intro: "Keeping software useful after launch by resolving issues, monitoring behaviour and improving performance.",
        does: [
          "Bug investigation and technical support",
          "Performance and workflow analysis",
          "Issue and dependency review",
          "Prioritised improvement recommendations",
          "Maintenance planning and release support",
        ],
        fits: ["Recurring application issues", "Improving response times", "Reviewing bottlenecks", "Supporting growth in usage"],
        outcome: "A more maintainable lifecycle and measurable improvement priorities.",
      },
    ],
  },
];

export const delivery = [
  ["Discover", "Clarify business goals, user needs, current systems and constraints."],
  ["Design", "Define the solution, integrations, data flows, security boundaries and success measures."],
  ["Implement", "Configure platforms, develop software, build automation or integrate AI as agreed."],
  ["Validate", "Test functionality, access permissions, edge cases and operational readiness."],
  ["Launch & support", "Document the solution, hand over operational guidance and support per scope."],
  ["Improve", "Use feedback and agreed measures to prioritise what comes next."],
] as const;
