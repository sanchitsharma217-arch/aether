export interface Project {
  id: string;
  title: string;
  client: string;
  tagline: string;
  category: "Shopify Plus" | "Headless Next.js" | "Landing Page" | "Mobile PWA" | "Bespoke Commerce";
  platformBadge: string;
  year: string;
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  overview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  colorTheme: {
    primary: string;
    bg: string;
    text: string;
    accent: string;
  };
  desktopPreview: {
    heroTitle: string;
    heroSubtitle: string;
    price: string;
    productName: string;
    badge: string;
    announcement: string;
    stats: string;
  };
  mobilePreview: {
    screenTitle: string;
    rating: string;
    salesPitch: string;
    ctaText: string;
  };
  clientQuote: {
    text: string;
    author: string;
    role: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "aura-luxury",
    title: "AURA MAISON",
    client: "Aura Haute Horlogerie & Apparel",
    tagline: "Ultra-luxury fashion & horology flagship with localized multi-currency checkout and editorial catalog.",
    category: "Shopify Plus",
    platformBadge: "Shopify Plus & Custom Liquid",
    year: "2026",
    metrics: [
      { label: "Checkout Completion", value: "+54.2%", change: "vs legacy store" },
      { label: "Avg. Page Load", value: "0.78s", change: "global median" },
      { label: "First 90-Day GMV", value: "$6.8M", change: "128% of target" },
    ],
    overview:
      "A bespoke Shopify Plus architecture built for a Paris-based luxury apparel and timepiece atelier. Features ultra-smooth micro-interactions, editorial lookbook shoppable hotspots, and zero-latency localized cart sheets.",
    challenge:
      "The client was experiencing a 68% cart abandonment rate due to slow third-party currency converters and heavy unoptimized video assets on their previous legacy theme.",
    solution:
      "We engineered an ultra-lean custom Liquid theme using native Shopify Functions for dynamic tiered gifting, paired with localized edge caching and native video streaming layers.",
    techStack: ["Shopify Plus", "Liquid Engine", "Tailwind CSS", "Shopify Functions", "Klaviyo VIP Flows", "Algolia Search"],
    features: [
      "Editorial Shoppable Lookbook with interactive product pins",
      "Dynamic Multi-Currency & Tax Localization across 38 countries",
      "VIP Private Client Vault with passcode & token gating",
      "Instant Cart Drawer with one-click Apple Pay & Klarna financing",
    ],
    liveUrl: "https://auramaison-demo.example.com",
    colorTheme: {
      primary: "#1A1A18",
      bg: "#F4F3EE",
      text: "#1E1E1C",
      accent: "#B89758",
    },
    desktopPreview: {
      heroTitle: "L'Automne Éternel — Curated Collection",
      heroSubtitle: "Handcrafted cashmere and chronographs made in limited atelier runs of 250 units.",
      price: "$1,850 USD",
      productName: "The Grand Chrono N°4 in Brushed Titanium",
      badge: "Edition Limited to 250",
      announcement: "COMPLIMENTARY WHITE-GLOVE WORLDWIDE COURIER",
      stats: "99.4% CSAT • 4.9/5 from 840+ Collectors",
    },
    mobilePreview: {
      screenTitle: "Aura Mobile Atelier",
      rating: "★ 4.9 (840 Collector Reviews)",
      salesPitch: "Reserve Edition N°4 with 1-Tap Apple Pay. Ships within 24 hours.",
      ctaText: "Acquire Piece — $1,850",
    },
    clientQuote: {
      text: "Vanguard redefined how high-luxury translates into digital commerce. Our global checkout velocity doubled within 3 weeks of release.",
      author: "Éléonore de Saint-Germain",
      role: "Global Head of Digital, Aura Maison",
    },
  },
  {
    id: "kinetic-nutrition",
    title: "KINETIC LABS",
    client: "Kinetic Performance Biomarkers",
    tagline: "Headless Next.js biotech storefront featuring dynamic bundle optimization and sub-second checkout.",
    category: "Headless Next.js",
    platformBadge: "Headless Next.js + Shopify Storefront API",
    year: "2026",
    metrics: [
      { label: "Mobile CVR", value: "5.82%", change: "+168% uplift" },
      { label: "Lighthouse Performance", value: "99/100", change: "Core Web Vitals" },
      { label: "AOV Growth", value: "+38.5%", change: "via Smart Bundler" },
    ],
    overview:
      "Engineered an enterprise headless e-commerce experience decoupling the front-end onto Vercel Edge with Next.js App Router and Shopify Storefront GraphQL API. Designed for high-volume subscription conversions.",
    challenge:
      "Complex recurring subscriptions and heavy personalized biomarker quizzes caused noticeable lag on conventional platforms, driving drop-offs on ad traffic.",
    solution:
      "Crafted a headless edge-rendered architecture with predictive prefetching, interactive supplement stack configurator, and integrated Recharge subscription mutations.",
    techStack: ["Next.js (App Router)", "TypeScript", "Shopify Storefront GraphQL", "Recharge API", "Turbopack", "Radix UI"],
    features: [
      "Sub-second page navigation powered by edge streaming & prefetching",
      "Interactive 4-Step Stack Builder with live nutritional pricing discount",
      "One-click frictionless subscription management portal",
      "Synchronized inventory updates via Shopify Webhooks",
    ],
    liveUrl: "https://kineticbiotech-demo.example.com",
    colorTheme: {
      primary: "#0F172A",
      bg: "#F8FAFC",
      text: "#0F172A",
      accent: "#2563EB",
    },
    desktopPreview: {
      heroTitle: "Cognitive Endurance & Cellular Energy",
      heroSubtitle: "Clinically validated nootropic formulas tailored to peak cognitive throughput.",
      price: "$84 / month (Save 20%)",
      productName: "The Daily Metabolic Synapse Stack",
      badge: "Clinical Grade • GMP Certified",
      announcement: "FREE EXPEDITED SHIPPING ON ALL SUBSCRIPTIONS",
      stats: "0.42s Time-to-Interactive • 99 Lighthouse Score",
    },
    mobilePreview: {
      screenTitle: "Stack Configurator",
      rating: "★ 4.95 (1,240 Verified Biohackers)",
      salesPitch: "Select your biomarker goals for custom formulation & 20% discount.",
      ctaText: "Start Subscription — $84/mo",
    },
    clientQuote: {
      text: "The speed is staggering. Our ad ROAS jumped from 2.1x to 4.3x because visitors never experience a single millisecond of latency.",
      author: "Dr. Marcus Vance",
      role: "Co-Founder & Chief Product Officer",
    },
  },
  {
    id: "solis-eyewear",
    title: "SOLIS OPTICAL",
    client: "Solis Eyewear California",
    tagline: "High-converting editorial DTC campaign page with real-time lens tint preview and 1-click cart.",
    category: "Landing Page",
    platformBadge: "High-Converting DTC Funnel",
    year: "2025",
    metrics: [
      { label: "Cold Traffic CVR", value: "7.14%", change: "+142% vs baseline" },
      { label: "Ad ROAS", value: "4.8x", change: "Meta & TikTok Ads" },
      { label: "Bounce Rate", value: "22.4%", change: "-34% reduction" },
    ],
    overview:
      "A high-impact, story-driven e-commerce landing page crafted specifically for paid social acquisition (Meta, TikTok & YouTube). Balances editorial magazine aesthetic with razor-sharp conversion triggers.",
    challenge:
      "Solis had high cost-per-click on ad campaigns because traffic was dumping into standard collection pages without sufficient storytelling or urgency.",
    solution:
      "Built a specialized high-intent campaign landing page with social proof sticky bar, interactive polarized tint previewer, and instant slide-out checkout.",
    techStack: ["Next.js React", "Tailwind CSS", "Shopify Storefront", "Framer Motion", "Triple Whale Tracking", "PostHog"],
    features: [
      "Dynamic Split-Screen Lens Visualizer (Polarized vs Non-Polarized)",
      "Sticky floating conversion bar with live inventory countdown",
      "Seamless customer review gallery with authentic video testimonials",
      "Integrated frictionless express checkout (Apple Pay / Shop Pay)",
    ],
    liveUrl: "https://solis-eyewear.example.com",
    colorTheme: {
      primary: "#292524",
      bg: "#FAF7F2",
      text: "#1C1917",
      accent: "#D97706",
    },
    desktopPreview: {
      heroTitle: "Hand-Milled Japanese Acetate Sunglasses",
      heroSubtitle: "Engineered in Venice Beach. Hand-carved in Sabae, Japan. Zero visual distortion.",
      price: "$225 USD",
      productName: "The Marais Frame in Smoked Amber",
      badge: "Summer Drop • Selling Rapidly",
      announcement: "BUY 1 GET 50% OFF POLARIZED LENS UPGRADE",
      stats: "Over 14,000 Pairs Shipped • 30-Day Risk-Free Trial",
    },
    mobilePreview: {
      screenTitle: "Direct-to-Consumer Drop",
      rating: "★ 4.88 (3,120 Happy Customers)",
      salesPitch: "Try at home for 30 days. Free return shipping and full refund guarantee.",
      ctaText: "Claim My Pair Now — $225",
    },
    clientQuote: {
      text: "Our conversion rate on cold Meta ads shattered our internal targets. Vanguard turns paid traffic into committed brand advocates.",
      author: "Chloe Callahan",
      role: "VP of Growth Marketing, Solis Eyewear",
    },
  },
  {
    id: "norden-living",
    title: "NORDEN INTERIORS",
    client: "Norden Nordic Living Copenhagen",
    tagline: "Scandinavian furniture & decor flagship with interactive trade-discount portal and 3D room staging.",
    category: "Bespoke Commerce",
    platformBadge: "Webflow + Medusa Commerce Engine",
    year: "2025",
    metrics: [
      { label: "Trade Portal AOV", value: "$4,820", change: "+115% increase" },
      { label: "B2B Inquiry Rate", value: "+84%", change: "Architects & Designers" },
      { label: "Page Weight", value: "850 KB", change: "-65% reduced" },
    ],
    overview:
      "A dual B2C & B2B trade e-commerce flagship. Allows everyday customers to purchase handcrafted Scandinavian furnishings while granting interior designers access to automated wholesale pricing tiers.",
    challenge:
      "Managing separate B2B quote sheets and B2C online sales was causing operational friction and lost sales with high-value architectural firms.",
    solution:
      "Created an integrated omnichannel store with instant tax ID verification, wholesale tiered carts, and dynamic freight shipping calculations.",
    techStack: ["Webflow Frontend", "MedusaJS Headless", "Stripe Corporate", "TaxJar Integration", "Cloudinary Media CDN"],
    features: [
      "Automated Trade Account Verification with instant tier pricing",
      "Dynamic Freight & White-Glove Delivery Calculator",
      "High-Resolution Material Swatch Selector with zoom inspection",
      "Interactive Project Board for architectural room specs",
    ],
    liveUrl: "https://nordenliving-demo.example.com",
    colorTheme: {
      primary: "#262626",
      bg: "#F7F6F2",
      text: "#171717",
      accent: "#8B5E3C",
    },
    desktopPreview: {
      heroTitle: "Quiet Scandinavian Architecture for the Home",
      heroSubtitle: "Certified solid oak, natural linen, and brass hardware crafted to endure generations.",
      price: "$2,450 USD (Trade $1,840)",
      productName: "The Hans Lounge Chair in Oiled Walnut",
      badge: "Sustainably Harvested FSC Oak",
      announcement: "COMPLIMENTARY MATERIAL SWATCH BOX ON INQUIRY",
      stats: "Featured in Architectural Digest • 10-Year Craft Warranty",
    },
    mobilePreview: {
      screenTitle: "Architect Spec Sheet",
      rating: "★ 4.96 (420 Design Studios)",
      salesPitch: "Instant 3D models (USDZ / OBJ) available for download with trade pass.",
      ctaText: "Request Trade Access",
    },
    clientQuote: {
      text: "The platform seamlessly caters to both our retail buyers and high-volume commercial architects. Our operational team saved 20+ hours every week.",
      author: "Frederik Lindqvist",
      role: "Managing Director, Norden Living",
    },
  },
  {
    id: "botanica-skincare",
    title: "BOTANICA ESSENTIALS",
    client: "Botanica Organic Skincare Melbourne",
    tagline: "Mobile-first PWA storefront with interactive diagnostic skin quiz and dynamic bundle discounting.",
    category: "Mobile PWA",
    platformBadge: "Mobile-First PWA & Headless Shopify",
    year: "2026",
    metrics: [
      { label: "Mobile Conversion", value: "6.2%", change: "+78% increase" },
      { label: "Quiz Completion", value: "81.4%", change: "Diagnostic Quiz" },
      { label: "Repeat Purchase", value: "44.2%", change: "via PWA notifications" },
    ],
    overview:
      "Designed from the palm of the hand up. Over 86% of Botanica's traffic arrives from Instagram and TikTok on mobile devices. We built an app-like PWA with gesture navigation and swipeable story cards.",
    challenge:
      "Mobile shoppers were getting overwhelmed by 40+ individual skincare serums and abandoning their carts without finding the right routine.",
    solution:
      "Introduced a 60-second diagnostic routine builder quiz that generates a custom 3-step morning/night regimen with automated 1-click bundle savings.",
    techStack: ["Next.js PWA", "Workbox Service Workers", "Shopify Storefront", "Klaviyo SMS/Email", "Framer Gesture API"],
    features: [
      "App-like installable Progressive Web App with offline browsing",
      "60-Second Skin Diagnostic Quiz with clinical routine suggestions",
      "Swipeable Instagram-style story reels with direct product add-to-bag",
      "One-tap Express Checkout via Apple Pay & Google Pay",
    ],
    liveUrl: "https://botanica-pwa.example.com",
    colorTheme: {
      primary: "#14231E",
      bg: "#F2F5F3",
      text: "#12201B",
      accent: "#386641",
    },
    desktopPreview: {
      heroTitle: "Botanical Science for Radiant Skin Health",
      heroSubtitle: "Cold-pressed Australian botanicals, certified vegan, and packaged in refillable biophotonic glass.",
      price: "$118 Bundle (Save $32)",
      productName: "The Barrier Restoration 3-Piece Ritual",
      badge: "Clinical Dermatology Approved",
      announcement: "FREE 15ML TRAVEL ELIXIR WITH ANY RITUAL ORDER",
      stats: "94% Report Immediate Hydration • Over 80k Routines Formulated",
    },
    mobilePreview: {
      screenTitle: "Personalized Regimen",
      rating: "★ 4.92 (5,600+ Reviews)",
      salesPitch: "Your skin barrier profile matched with Barrier Elixir & Peptide Creme.",
      ctaText: "Add 3-Step Ritual — $118",
    },
    clientQuote: {
      text: "The quiz funnels 80% of our ad traffic directly into high-value 3-product bundles. It transformed our entire DTC unit economics.",
      author: "Maya Lin-Archer",
      role: "Founder, Botanica Essentials",
    },
  },
  {
    id: "vela-watches",
    title: "VELA HOROLOGY",
    client: "Vela Chronometry Zurich",
    tagline: "High-volume flash drop platform with queue protection and real-time inventory synchronization.",
    category: "Bespoke Commerce",
    platformBadge: "Custom Next.js & Stripe Treasury",
    year: "2025",
    metrics: [
      { label: "Sellout Speed", value: "14 mins", change: "1,000 units sold" },
      { label: "Server Uptime", value: "100.0%", change: "Zero bot infiltration" },
      { label: "Zero Fraud Rate", value: "0.0%", change: "Stripe Radar protection" },
    ],
    overview:
      "Engineered an extreme-traffic flash drop architecture capable of processing 25,000 simultaneous concurrent users without queue degradation or duplicate inventory allocation.",
    challenge:
      "Past drops on traditional platforms crashed the server within 90 seconds, leading to double-charges and furious collectors on social media.",
    solution:
      "Implemented an edge queue system with Cloudflare Workers, Redis token buckets for inventory reservation, and Stripe Radar anti-bot verification.",
    techStack: ["Next.js Edge", "Upstash Redis", "Stripe Radar & Payments", "Cloudflare Workers", "Tailwind CSS"],
    features: [
      "Zero-latency Redis Token Bucket inventory reservation locks",
      "Multi-factor cryptographic bot protection without annoying CAPTCHAs",
      "Live interactive countdown with automatic instant unlock",
      "Real-time synchronized inventory count down to the final unit",
    ],
    liveUrl: "https://velahorology-demo.example.com",
    colorTheme: {
      primary: "#111827",
      bg: "#F3F4F6",
      text: "#111827",
      accent: "#4F46E5",
    },
    desktopPreview: {
      heroTitle: "The Vanguard Edition Chronometer 01",
      heroSubtitle: "Hand-assembled in Geneva. COSC-certified mechanical movement with 72-hour reserve.",
      price: "$3,600 USD",
      productName: "Reference 01 / Cobalt Blue Sunburst Dial",
      badge: "Only 1,000 Pieces Produced",
      announcement: "DROP COMPLETED: ALL ALLOCATIONS RESERVED IN 14 MINUTES",
      stats: "24,800 Concurrent Collectors • 0% System Downtime",
    },
    mobilePreview: {
      screenTitle: "Priority Collector Queue",
      rating: "COSC Certified Swiss Chronometer",
      salesPitch: "Your allocation token is secured for the next 04:59 minutes.",
      ctaText: "Complete Allocation — $3,600",
    },
    clientQuote: {
      text: "For the first time in our company's history, a limited drop ran with 100% stability, zero duplicate sales, and praise from our collector community.",
      author: "Beatriz Weber",
      role: "Operations Director, Vela Horology",
    },
  },
];

