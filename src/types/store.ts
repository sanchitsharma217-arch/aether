export type CraftDepartment =
  | "Technology & Audio"
  | "Home & Living"
  | "Kitchen & Culinary"
  | "Wearables & Horology"
  | "Accessories & EDC";

export interface CertifiedGuild {
  id: string;
  name: string;
  location: string;
  specialty: string;
  foundedYear: number;
  activeCraftspeople: number;
  pilotTranche: string;
}

export interface InventoryLedger {
  totalUnits: number; // Total physical batch produced across all nodes
  availableUnits: number; // Immediately available across active competing nodes
  reservedUnits: number; // Quality inspection / transit buffer reserve
  outOfStockUnits: number; // Archival holds / depleted past tranches
  activeOffersCount: number; // Number of competing nodes offering this SKU
}

export interface SellerOffer {
  id: string;
  sellerName: string;
  location: string;
  fulfillmentSpeed: string;
  condition: "Sealed New" | "Master Grade" | "Refurbished A+" | "Archival";
  price: number;
  stockAllocation?: number; // Available inventory specifically held at this fulfillment depot
  reservedAllocation?: number; // Reserve buffer held at this depot
  warranty: string;
  returnTerms: string;
  nodeVerification: "Maker Direct" | "Certified Guild Vault" | "Heritage Restorer";
  isBestMatch?: boolean;
  rating?: number;
}

export interface VerifiedReview {
  id: string;
  author: string;
  roleOrCity: string;
  rating: number;
  date: string;
  batchId: string;
  monthsOwned: number;
  comment: string;
  helpfulCount: number;
}

export interface RatingDistribution {
  stars5: number; // e.g. 92%
  stars4: number; // e.g. 6%
  stars3: number; // e.g. 2%
  stars2: number; // 0%
  stars1: number; // 0%
}

export interface SparePart {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  inStock: boolean;
  replacementEase: "User-Replaceable (No Tools)" | "Modular Screw (T5 Included)" | "Workshop Service";
  estimatedMinutesToSwap: number;
}

export interface EnduranceBreakdown {
  score: number; // composite weighted score e.g. 9.8
  materials: { score: number; weight: number; notes: string };
  repairability: { score: number; weight: number; notes: string };
  disassembly: { score: number; weight: number; notes: string };
  spareParts: { score: number; weight: number; notes: string };
  warranty: { score: number; weight: number; notes: string };
  lifecycle: { score: number; weight: number; notes: string };
  guaranteedPartsUntil: number; // e.g. 2038
  resaleRetention: number; // e.g. 78%
  evidenceSource: string; // transparent citation of internal atelier benchmark
}

export interface EnduranceRubric {
  score: number; // e.g. 9.8
  materialIntegrity: number; // e.g. 9.9
  modularDisassembly: number; // e.g. 9.8
  sparePartsAvailability: number; // e.g. 9.7
  decoupledFirmware: number; // e.g. 10.0
  guaranteedPartsUntil: number; // e.g. 2038
  resaleRetention: number; // e.g. 78%
  methodologyNote: string;
}

export interface ReturnEligibility {
  evaluationPeriodDays: number; // e.g. 30
  eligibilityTerms: string;
  conditionRequired: string;
  restockingFee: string; // e.g. "$0 (Zero Restocking Fee)"
  returnShippingCoverage: string; // e.g. "Prepaid low-impact carbon-neutral return crate provided"
}

export interface DigitalPassport {
  batchId: string;
  productionYear: number;
  inspectionNode: string;
  cryptographicHash: string;
  materialPurity: string;
  originCoords: string;
}

export interface WarrantyDoc {
  duration: string; // e.g. "20-Year Natural Timber Split Warranty" or "10-Year Guild Craftsmanship Warranty"
  summary: string;
  replacementTerms: string;
  repairCenter: string;
  coverageScope?: string[];
  exclusions?: string[];
  claimProtocol?: string[];
  refinishingService?: string;
}

export interface Product {
  id: string;
  title: string;
  category: CraftDepartment;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  verifiedReviews?: VerifiedReview[];
  ratingDistribution?: RatingDistribution;
  inStock: boolean;
  stockCount: number;
  stockUrgency?: string;
  inventoryLedger?: InventoryLedger;
  returnEligibility?: ReturnEligibility;
  image: string;
  secondaryImage?: string;
  colorImages?: Record<string, string>;
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

  // Aether Canonical Architecture
  canonicalSku: string;
  primaryVendor: {
    name: string;
    location: string;
    atelierStory?: string;
  };
  verifiedSellersCount: number;
  lifespanScore: number;
  durabilityYears: number;
  offers: SellerOffer[];
  spareParts?: SparePart[];
  enduranceBreakdown?: EnduranceBreakdown;
  enduranceRubric?: EnduranceRubric;
  digitalPassport?: DigitalPassport;
  warrantyDoc?: WarrantyDoc;
  intentTags?: string[];
  intentRecommendationReason?: string;

  provenance?: {
    origin: string;
    country: string;
    artisan: string;
    batch: string;
    materials: string[];
    carbonFootprint?: string;
  };
  honestyDossier?: {
    keepRate: number; // e.g. 98.6%
    auditedUnitsCount?: number; // e.g. 188
    measurementMethodology?: string;
    returnReasons: { percentage: number; reason: string }[];
    sixMonthPatinaReport: string;
    refurbishmentProtocol?: string;
  };
  enduranceIndex?: {
    score: number;
    repairability: string;
    guaranteedPartsUntil: number;
    resaleRetention: number;
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
