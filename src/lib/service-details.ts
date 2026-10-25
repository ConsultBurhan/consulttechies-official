/** Per-service detail from docs/technology-and-ai-services.md, keyed by the title in services.ts */
export type ServiceDetail = { provides: string[]; ai: string; uses: string[]; value: string };

export const serviceDetails: Record<string, ServiceDetail> = {
  "WhatsApp Business Solutions": {
    provides: ["Chatbot design and conversation flows", "Automated answers to common questions", "Support workflows with escalation to staff", "Integration with ordering, CRM and other systems", "Marketing templates and notifications, subject to platform approval"],
    ai: "Natural-language handling, intent classification, multilingual assistance where configured, and retrieval of approved product or policy information, with human handover for sensitive requests.",
    uses: ["Answering product and service questions", "Routing support enquiries", "Order or service information", "Guided conversations"],
    value: "A consistent messaging channel and a foundation for automation across customer interactions.",
  },
  "WhatsApp Commerce & Order Automation": {
    provides: ["Catalogue presentation where supported", "Guided browsing and order capture", "Order-detail collection and validation", "Links to order, inventory, payment or delivery systems", "Confirmations, status notices and exception handover"],
    ai: "Conversational search and clarification using approved catalogue data. Final prices, stock and order status come from connected systems, never from AI assumptions.",
    uses: ["Restaurant and retail ordering", "Checkout questions", "Order-status and delivery updates", "Assisted product discovery"],
    value: "Less friction in ordering, clearer order communication and fewer manual steps.",
  },
  "WhatsApp Marketing & Campaign Management": {
    provides: ["Campaign planning and template setup", "Segmentation using permitted data", "Personalised promotions and scheduling", "Workflow automation and response routing", "Performance tracking where data is available"],
    ai: "Draft variations, audience analysis and campaign summaries under defined rules. Consent, opt-outs, template approval and policy compliance remain part of governance.",
    uses: ["Promotions for eligible segments", "Re-engagement of opted-in audiences", "Personalised announcements", "Reporting and iteration"],
    value: "More organised campaigns and more relevant messages, with customer preferences built in.",
  },
  "Website Design & Development": {
    provides: ["Responsive corporate sites and landing pages", "E-commerce and catalogue experiences", "Custom web apps and portals", "Content management and integrations", "Accessibility, SEO foundations and analytics as scoped"],
    ai: "Conversational site help, semantic search, content drafting or intelligent form routing, designed around approved content with a clear fallback.",
    uses: ["Lead-generation landing pages", "Customer self-service portals", "Product discovery and support", "Internal knowledge portals"],
    value: "A coherent online presence that evolves with the business.",
  },
  "Website Maintenance & Technical Support": {
    provides: ["Content and dependency updates", "Bug investigation and fixes", "Security patches and backup checks", "Troubleshooting and recovery", "Availability and health monitoring per agreement"],
    ai: "Summarising error logs, grouping recurring incidents and drafting troubleshooting steps. Automated remediation is limited to approved, tested actions.",
    uses: ["Routine upkeep", "Performance or availability issues", "Release-related fixes", "Recurring incident analysis"],
    value: "Improved maintainability and less operational uncertainty through a defined support process.",
  },
  "DevOps Engineering & Application Deployment": {
    provides: ["CI/CD pipeline design and implementation", "Build, test and deployment automation", "Dev, test, staging and production environments", "Release coordination and rollback planning", "Cloud operations and deployment troubleshooting"],
    ai: "Summarising pipeline failures, explaining logs and drafting configurations. Production changes still follow review, testing and access control.",
    uses: ["Automating releases", "Standardising deployments", "Investigating failed builds", "Improving release visibility"],
    value: "More consistent releases and less manual deployment work.",
  },
  "Mobile Application Development (iOS & Android)": {
    provides: ["Discovery, user-flow design and interface development", "Native or cross-platform implementation", "API integration and authentication", "Testing, release prep and store submission", "Maintenance and compatibility updates"],
    ai: "In-app assistants, natural-language search, document understanding or voice/text interaction, with privacy, latency and fallback considered in design.",
    uses: ["Customer self-service apps", "Employee and field-service apps", "Mobile ordering and booking", "AI-assisted in-app support"],
    value: "A mobile experience aligned to users and connected to the services the business relies on.",
  },
  "Custom Application Development": {
    provides: ["Internal apps and operational dashboards", "Workflow and approval applications", "API development and integration", "Role-based experiences and admin tools", "Testing, documentation and post-launch support"],
    ai: "Knowledge retrieval, document processing, request classification or natural-language access to selected functions. Business rules and approval authority stay explicit.",
    uses: ["Digitising manual workflows", "Replacing spreadsheet processes", "Connecting disconnected functions", "Purpose-built team tools"],
    value: "Software aligned to the real workflow, with room to automate suitable steps.",
  },
  "Server, Cloud & IT Infrastructure Management": {
    provides: ["Server setup and configuration", "Hosting and cloud-environment support", "Monitoring and troubleshooting", "Backup planning and recovery checks", "Access management and configuration review"],
    ai: "Summarising alerts, grouping incidents and explaining log patterns. AI does not replace infrastructure controls or operational accountability.",
    uses: ["Hosting and environment upkeep", "Investigating alerts", "Backup and recovery readiness", "Incident review and documentation"],
    value: "Better visibility into infrastructure and a more structured approach to incident response.",
  },
  "Customer Engagement Platform Implementation": {
    provides: ["Requirements mapping and platform configuration", "Customer data and event integration", "Journey and automation setup", "Roles, workflows and reporting", "Testing, enablement and handover"],
    ai: "Message drafting, journey analysis, audience insights and next-step suggestions where the platform supports it, respecting consent and data permissions.",
    uses: ["Lifecycle and retention journeys", "Lead nurturing and onboarding", "Coordinated multichannel messaging", "Visibility into engagement"],
    value: "A connected engagement setup that is easier to operate, measure and improve.",
  },
  "CRM & Third-Party Platform Integration": {
    provides: ["API and webhook integrations", "Data mapping and transformation", "Synchronisation and workflow automation", "Error handling, retries and monitoring", "Emarsys, HubSpot, Zoho and other systems"],
    ai: "Classifying incoming records, summarising interactions and routing work, with the integration layer enforcing permissions, validation and auditability.",
    uses: ["Syncing CRM and support records", "Passing leads from marketing to sales", "Automating routine updates", "A fuller view of customer interactions"],
    value: "Less manual re-entry and better continuity between existing tools.",
  },
  "High-Volume Data Processing & Cleansing": {
    provides: ["Duplicate detection and consolidation rules", "Format and value standardisation", "Contact validation using permitted methods", "Missing-value and consistency checks", "Profiling, exception reports and repeatable processing"],
    ai: "Classifying unstructured values, suggesting mappings and flagging records for review, with deterministic rules and human review where errors would matter.",
    uses: ["Preparing CRM or campaign data", "Cleaning customer and product records", "Normalising source-system values", "Quality reports before migration"],
    value: "More consistent datasets and a stronger foundation for reporting, integration and AI.",
  },
  "Platform Performance & Optimization": {
    provides: ["Performance and workflow review", "Analysis of logs, metrics and usage", "Bottleneck identification", "Prioritised recommendations and implementation", "Before-and-after measurement"],
    ai: "Summarising large volumes of logs or feedback and grouping related issues. Findings are validated against real measurements before change.",
    uses: ["Slow web or app experiences", "High-friction workflows", "Repeated support issues", "Reliability and efficiency gains"],
    value: "Evidence-based improvement priorities and a clear way to measure benefit.",
  },
  "IT Consulting & Technology Advisory Services": {
    provides: ["Technology strategy and roadmaps", "Infrastructure and architecture review", "Software and platform selection", "Digital transformation assessment", "Risk, integration and scalability planning"],
    ai: "Identifying suitable use cases, assessing data readiness, designing human-review steps and defining governance, tied to a measurable business problem.",
    uses: ["Planning a digital platform", "Evaluating cloud or software options", "Prioritising automation", "A phased AI adoption roadmap"],
    value: "Better-informed decisions and a practical path from assessment to delivery.",
  },
};
