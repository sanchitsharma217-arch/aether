export interface RitualScenario {
  id: string;
  tabLabel: string;
  tagline: string;
  title: string;
  description: string;
  scenarioPrompt: string;
  atmosphere: string;
  coverImage: string;
  badge: string;
  bundleProductIds: string[];
  bundleDiscountPercent: number;
}

export const RITUAL_SCENARIOS: RitualScenario[] = [
  {
    id: "suite-workstation",
    tabLabel: "Workstation",
    tagline: "SUITE 01 · TACTILE ANALOG FOCUS",
    title: "The Creator Workstation Suite",
    description:
      "Engineered for deep uninterrupted focus. American black walnut desk organizer, planar acoustic monitor headphones, and natural Portuguese cork & wool desk protection.",
    scenarioPrompt: "Acoustic focus and tactile walnut desk setup for uninterrupted studio work",
    atmosphere: "Quiet cedar light, zero digital hum, warm continuous walnut grain",
    coverImage:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000&auto=format&fit=crop&q=80",
    badge: "Studio Benchmark",
    bundleProductIds: ["prod-1", "prod-desk-companion", "prod-cork-mat"],
    bundleDiscountPercent: 15,
  },
  {
    id: "suite-culinary",
    tabLabel: "Culinary / Kitchen",
    tagline: "SUITE 02 · HEARTH & HARVEST",
    title: "The Master Culinary Suite",
    description:
      "Honoring raw ingredients through patient preparation. Cast enamelled French Dutch oven, Tosa coal-forged Aogami carbon steel, and iron-dense Tokoname stoneware ceramics.",
    scenarioPrompt: "Hand-forged carbon steel blades, Dutch oven, and artisan ceramics",
    atmosphere: "Razor push-cut precision, warm stone tactile grip, natural wood ash glaze",
    coverImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&auto=format&fit=crop&q=80",
    badge: "Generational Kitchen",
    bundleProductIds: ["prod-dutch-oven", "prod-santoku", "prod-brewer"],
    bundleDiscountPercent: 15,
  },
  {
    id: "suite-commute",
    tabLabel: "Commute / EDC",
    tagline: "SUITE 03 · PERMANENT TRANSIT",
    title: "The Unhurried Commute Suite",
    description:
      "Objects built for decades of travel. Full-grain Chicago Horween leather folio, Grade-5 aerospace titanium mechanical horology, and solid turned C360 marine brass pen.",
    scenarioPrompt: "Horween leather carryall, automatic titanium field watch, and solid brass rollerball",
    atmosphere: "Rich neatsfoot oil patina, tactile mechanical sweep, zero synthetic plastic",
    coverImage:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&auto=format&fit=crop&q=80",
    badge: "Patron Travel Pick",
    bundleProductIds: ["prod-folio", "prod-2", "prod-brass-pen"],
    bundleDiscountPercent: 12,
  },
  {
    id: "suite-slow-living",
    tabLabel: "Slow Living & Home",
    tagline: "SUITE 04 · CONTEMPLATIVE DWELLING",
    title: "The Mindful Living Suite",
    description:
      "Organic tactile domestic spaces. Belgian stonewashed Masters of Linen duvet, sand-cast Japanese contemplation bronze incense tray, and natural Yoshino Hinoki aromatics.",
    scenarioPrompt: "Stonewashed linen bedding and cast bronze contemplation incense burner",
    atmosphere: "Volcanic pumice washed flax, natural cypress phytoncides, quiet amber shade",
    coverImage:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&auto=format&fit=crop&q=80",
    badge: "Sanctuary Standard",
    bundleProductIds: ["prod-linen-sheets", "prod-bronze-incense"],
    bundleDiscountPercent: 10,
  },
];
