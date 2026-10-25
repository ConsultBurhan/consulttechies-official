export const site = {
  name: "Babji Consult Techies",
  short: "BCT",
  founded: 2023,
  email: "info@consulttechies.com",
  phone: "+916375652153",
  phoneDisplay: "+91 63756 52153",
  offices: [
    {
      name: "Head office",
      country: "India",
      lines: [
        "Mangalam Complex, 6th Floor, Office No. 613,",
        "Durga Nursery Road, Udaipur,",
        "Rajasthan, India",
      ],
    },
    {
      name: "USA office",
      country: "United States",
      lines: ["5900 Balcones Drive, Suite 100,", "Austin, TX 78731,", "United States"],
    },
  ],
} as const;

export const whatsappLink = (text = "Hi, I'd like to talk about a project.") =>
  `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: "/expertise", label: "Expertise" },
  { href: "/services", label: "Services" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
] as const;
