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
      "Engineered for deep uninterrupted focus. American black walnut desk organizer, planar acoustic monitor headphones, and natural Portuguese cork desk protection.",
    scenarioPrompt: "Acoustic focus and tactile walnut desk setup for uninterrupted studio work",
    atmosphere: "Quiet cedar light, zero digital hum, warm continuous walnut grain",
    coverImage:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000&auto=format&fit=crop&q=80",
    badge: "Studio Benchmark",
    bundleProductIds: ["prod-1", "prod-desk-companion"],
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
      "Objects built for decades of travel. Full-grain Chicago Horween Chromexcel leather folio and Grade-5 aerospace titanium mechanical horology.",
    scenarioPrompt: "Horween leather carryall and automatic titanium field watch",
    atmosphere: "Rich neatsfoot oil patina, tactile mechanical sweep, zero synthetic plastic",
    coverImage:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&auto=format&fit=crop&q=80",
    badge: "Patron Travel Pick",
    bundleProductIds: ["prod-folio", "prod-2"],
    bundleDiscountPercent: 12,
  },
  {
    id: "suite-audio",
    tabLabel: "Audio Sanctuary",
    tagline: "SUITE 04 · PURE ACOUSTICS",
    title: "The Acoustic Sanctuary Suite",
    description:
      "Restorative sound and ambient calm. Planar magnetic studio monitors and Yoshino Hinoki cypress bronze mineral vessel.",
    scenarioPrompt: "Lossless studio acoustic monitoring and calming Japanese Hinoki aromatics",
    atmosphere: "Zero audible distortion, sub-bass fidelity, calming forest phytoncide aroma",
    coverImage:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&auto=format&fit=crop&q=80",
    badge: "Audiophile Standard",
    bundleProductIds: ["prod-1", "prod-incense"],
    bundleDiscountPercent: 15,
  },
];
