export interface SellerOffer {
  id: string;
  sellerName: string;
  location: string;
  fulfillmentSpeed: string;
  condition: "Mint / Sealed" | "Master Grade" | "Refurbished A+" | "Archival" | "Sealed New";
  price: number;
  isBestMatch?: boolean;
  rating?: number;
}

export interface Product {
  id: string;
  title: string;
  category: "Tech & Audio" | "Wearables" | "Home & Living" | "Accessories" | "Footwear" | "Culinary & Living";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  stockUrgency?: string; // e.g. "Only 3 left in stock"
  image: string;
  secondaryImage?: string; // alternate lifestyle angle
  colorImages?: Record<string, string>; // color to image map
  badge?: "Trending" | "New" | "Sale" | "Bestseller" | "Archive";
  description: string;
  features: string[];
  colors?: { name: string; hex: string; image?: string }[];
  specs?: Record<string, string>;
  inTheBox?: string[];
  bundleWith?: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  
  // Aether Core Pillars
  canonicalSku?: string;
  primaryVendor?: {
    name: string;
    location: string;
  };
  verifiedSellersCount?: number;
  lifespanScore?: number; // e.g. 9.8
  durabilityYears?: number; // e.g. 10
  offers?: SellerOffer[];
  provenance?: {
    origin: string;
    artisan: string;
    batch: string;
    materials: string[];
    carbonFootprint?: string;
  };
  honestyDossier?: {
    keepRate: number; // e.g. 97.4
    returnReasons: { percentage: number; reason: string }[];
    sixMonthPatinaReport: string;
  };
  enduranceIndex?: {
    score: number; // e.g. 9.8
    repairability: string;
    guaranteedPartsUntil: number; // e.g. 2036
    resaleRetention: number; // e.g. 74
  };
  workshops?: {
    id: string;
    name: string;
    location: string;
    dispatchTime: string;
    carbonOffset: string;
    price: number;
    badge?: string;
    rating: number;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedOffer?: SellerOffer;
}
