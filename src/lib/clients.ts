export type Client = {
  id: string;
  name: string;
  slug: string;
  url?: string;
  place?: string;
  note: string;
};

const c = (id: string, name: string, note: string, url?: string, place?: string, slug = id): Client => ({
  id,
  name,
  slug,
  note,
  url,
  place,
});

export const logoSrc = (client: Client, size: 256 | 512 = 512) =>
  `/clients/${client.slug}/${client.slug}-${size}.png`;

export const clients: Record<string, Client> = {
  kout: c("kout", "Kout Food Group", "Food service group running international and homegrown brands", "https://www.koutfood.com/", "Kuwait", "kout-food-group"),
  bk: c("bk", "Burger King", "Kout Food Group brand", "https://www.bk.com.kw/", "Kuwait", "burger-king"),
  ph: c("ph", "Pizza Hut", "Kout Food Group brand", "https://www.kuwait.pizzahut.me/", "Kuwait", "pizza-hut"),
  subway: c("subway", "Subway", "Kout Food Group brand", "https://www.subway.com.kw/", "Kuwait"),
  tb: c("tb", "Taco Bell", "Kout Food Group brand", "https://www.tacobell.com/", "Kuwait", "taco-bell"),
  applebees: c("applebees", "Applebee’s", "Kout Food Group brand", "https://applebeesme.com/kwt/", "Kuwait"),
  speedy: c("speedy", "Speedy Bunny", "Delivery brand · Kout Food Group", "https://tryspeedybunny.com/", "Kuwait", "speedy-bunny"),
  almaviva: c("almaviva", "AlmavivA de Belgique", "IT services · AlmavivA Group", "https://www.almavivagroup.com/en", "Belgium", "almaviva-de-belgique"),
  euaa: c("euaa", "European Union Agency for Asylum", "EU agency supporting national asylum systems", "https://www.euaa.europa.eu/", "Malta"),
  kababji: c("kababji", "Kababji", "Restaurants", "https://www.kababji.com/", "Lebanon"),
  hs: c("hs", "H&S Store", "E-commerce", "https://hsstore.com/", undefined, "hs-store"),
  tellgo: c("tellgo", "tellgo", "Travel eSIM platform", "https://tellgo.net/"),
  prezien: c("prezien", "Prezien", "SAP partner · CX and field service"),
  babyhouse: c("babyhouse", "Baby House Toys", "Toys and costumes", "https://www.babyhousetoys.com/", "Kuwait", "baby-house-toys"),
  asnan: c("asnan", "Asnan Tower", "Dental and medical centre", "https://www.asnan.com/", "Kuwait"),
};

export const allClients = Object.values(clients);

export const clientGroups = [
  { key: "icons", n: "01", title: "Global food icons", line: "Household names, served at scale.", accent: "#e0481f", ids: ["bk", "ph", "tb"] },
  { key: "dining", n: "02", title: "Table to doorstep", line: "Every meal, whether you sit down or it shows up.", accent: "#e9a420", ids: ["subway", "applebees", "kababji", "speedy"] },
  { key: "retail", n: "03", title: "Retail & e-commerce", line: "Where the cart fills up and the toy box too.", accent: "#e0488f", ids: ["hs", "babyhouse"] },
  { key: "tech", n: "04", title: "Technology & platforms", line: "The systems that keep other businesses moving.", accent: "#2f9bd6", ids: ["almaviva", "prezien", "tellgo"] },
  { key: "care", n: "05", title: "Public service & care", line: "Institutions people trust with what matters most.", accent: "#22b8b4", ids: ["euaa", "asnan"] },
].map((g) => ({ ...g, clients: g.ids.map((id) => clients[id]) }));

/** Published figures about Kout Food Group (as stated on consulttechies.io). */
export const kfgFacts = [
  { value: "250+", label: "stores across Kuwait" },
  { value: "4,000+", label: "people on the team" },
  { value: "40", label: "nationalities at work" },
];
