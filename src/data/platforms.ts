export interface PlatformCapability {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  bestFor: string;
  keyStrengths: string[];
  conversionBenchmark: string;
  speedRating: string;
  typicalTimeline: string;
  techKeywords: string[];
}

export const PLATFORMS_DATA: PlatformCapability[] = [
  {
    id: "shopify-plus",
    name: "Shopify Plus & Liquid Architecture",
    badge: "Enterprise Standard",
    tagline: "The world's most battle-tested e-commerce engine, customized with high-fashion bespoke Liquid themes and native Shopify Functions.",
    bestFor: "Established DTC brands, high-growth fashion ateliers, and multi-currency international storefronts.",
    keyStrengths: [
      "Native Shopify Functions for custom volume pricing and VIP tiering",
      "Shopify Checkout Extensibility for 1-click upsells & post-purchase offers",
      "Seamless integration with ERPs, Klaviyo, Gorgias, and 3PL warehouses",
      "Ultra-low operational maintenance without dev-heavy infrastructure overhead",
    ],
    conversionBenchmark: "4.2% – 6.8% CVR",
    speedRating: "0.8s – 1.2s",
    typicalTimeline: "4 – 7 Weeks",
    techKeywords: ["Shopify Plus", "Theme Architecture 2.0", "Liquid", "Shopify Functions", "Checkout Extensibility"],
  },
  {
    id: "headless-nextjs",
    name: "Headless Next.js & Shopify Storefront API",
    badge: "Maximum Performance",
    tagline: "Decoupled architecture pushing the front-end to Vercel's global edge network for instant, sub-second product pages and total design liberty.",
    bestFor: "Tech-forward brands, complex product configurators, high-traffic ad scaling, and extreme page speed requirements.",
    keyStrengths: [
      "Sub-second edge prefetching that eliminates page transitions completely",
      "Unrestricted UI/UX customization (interactive 3D, complex quizzes, custom subscriptions)",
      "High Lighthouse scores (98-100) directly lowering Google Ad & Meta CPM costs",
      "Rock-solid headless stability capable of absorbing massive viral traffic spikes",
    ],
    conversionBenchmark: "5.5% – 8.2% CVR",
    speedRating: "0.3s – 0.6s",
    typicalTimeline: "6 – 10 Weeks",
    techKeywords: ["Next.js App Router", "Shopify Storefront GraphQL", "Tailwind CSS", "Vercel Edge", "TypeScript"],
  },
  {
    id: "dtc-landing-pages",
    name: "High-Converting Editorial Landing Pages",
    badge: "Paid Ad Scaling",
    tagline: "Laser-focused acquisition pages engineered specifically to maximize ROAS on cold traffic from Meta, TikTok, Google Search, and YouTube.",
    bestFor: "Product launches, hero SKU scaling, promotional drops, and paid performance marketing campaigns.",
    keyStrengths: [
      "Narrative-driven editorial copywriting that dissolves purchase hesitation",
      "Integrated sticky conversion anchors and 1-tap Shop Pay / Apple Pay buttons",
      "Dynamic bundle builders and quantity discount selectors",
      "Server-side conversion tracking (CAPI) and A/B split-testing integration",
    ],
    conversionBenchmark: "6.5% – 11.4% CVR",
    speedRating: "0.4s – 0.7s",
    typicalTimeline: "2 – 3 Weeks",
    techKeywords: ["Next.js / Webflow", "Triple Whale", "PostHog", "Framer Motion", "Meta CAPI"],
  },
  {
    id: "mobile-pwa",
    name: "Mobile-First Commerce & Progressive Web Apps",
    badge: "Palm-of-the-Hand UX",
    tagline: "App-like mobile shopping experiences with swipeable gesture cards, instant bottom-sheet checkout, and offline resiliency.",
    bestFor: "Brands with >75% mobile traffic from social channels (Instagram, TikTok, Pinterest).",
    keyStrengths: [
      "Native mobile feel with gesture-based swipe controls and bottom-sheet drawers",
      "Express one-thumb checkout flows optimized for Instagram & TikTok browsers",
      "Offline browsing cache and optional push notification retargeting",
      "Zero app store fees or approval delays — updates publish instantly to the web",
    ],
    conversionBenchmark: "5.0% – 7.5% Mobile CVR",
    speedRating: "0.5s – 0.9s",
    typicalTimeline: "5 – 8 Weeks",
    techKeywords: ["Progressive Web App", "Service Workers", "Mobile Bottom Sheets", "One-Tap Apple Pay"],
  },
];

