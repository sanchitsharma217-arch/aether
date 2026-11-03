"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Share2,
  Plus,
  Flame,
  Wrench,
  Clock,
  Compass,
  Leaf,
  Info,
  Calendar,
  Sparkles,
  Scale,
  Building2,
  FileText,
  Hash,
  MapPin,
  PackageCheck,
  Layers,
} from "lucide-react";
import { Product, SellerOffer } from "@/types/store";
import { PRODUCTS } from "@/data/mockProducts";
import { ProductCard } from "@/components/store/ProductCard";
import { useStore } from "@/context/StoreContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleFavorite, isFavorite, showToast, toggleCompare, isCompared } = useStore();

  const favorited = isFavorite(product.id);
  const compared = isCompared(product.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<
    "vendors" | "endurance" | "parts" | "passport" | "specs" | "warranty" | "forensics"
  >("vendors");
  
  // Selected Seller Offer (Defaults to Best Match / Maker Direct)
  const [selectedOffer, setSelectedOffer] = useState<SellerOffer>(
    product.offers?.[0] || {
      id: "default-offer",
      sellerName: product.primaryVendor.name,
      location: product.provenance?.origin || product.primaryVendor.location,
      fulfillmentSpeed: "Dispatches in 24h via Regional Node",
      condition: "Sealed New",
      price: product.price,
      warranty: product.warrantyDoc?.duration || "10-Year Guild Warranty",
      returnTerms: "30-Day Evaluation Period",
      nodeVerification: "Maker Direct",
    }
  );

  const [showStickyBar, setShowStickyBar] = useState(false);

  const currentPrice = selectedOffer.price;
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Track scroll position to reveal Sticky Buy Bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedOffer);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedOffer);
    router.push("/cart");
  };

  const handleAddBundle = () => {
    addToCart(product, 1, selectedColor, selectedOffer);
    if (product.bundleWith) {
      showToast(`Added ${product.title} + ${product.bundleWith.title} Bundle to Bag! 🌿`, "cart");
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Canonical object dossier copied to clipboard! 📋", "fav");
    }
  };

  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName);
    const found = product.colors?.find((c) => c.name === colorName);
    if (found?.image) {
      setActiveImage(found.image);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* 00. Canonical Breadcrumbs & Master Hash */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500 mb-6 font-mono border-b border-[#E5E5E9] pb-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            AETHER
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900 transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-bold text-[#0A0A0C]">{product.canonicalSku}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Canonical Master SKU · 1 Single Listing</span>
          </span>
          {product.digitalPassport && (
            <span className="hidden md:inline text-stone-400 truncate max-w-[200px]">
              Hash: {product.digitalPassport.cryptographicHash.slice(0, 14)}...
            </span>
          )}
        </div>
      </div>

      {/* 01. Two-Column Main Stage: Gallery (7 Cols) & Buy Console (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        
        {/* Left Column: Visual Gallery & Live Endurance Scorecard */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Visual Frame with Floating Studio Shadows */}
          <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-[#F9F9FB] to-[#EDEDF2] border border-[#E5E5E9] p-8 flex items-center justify-center overflow-hidden floating-card group">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={activeImage}
              alt={product.title}
              className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Top Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold bg-[#0A0A0C] text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {product.canonicalSku}
              </span>
              {product.badge && (
                <span className="text-[10px] font-mono font-bold bg-[#EA580C] text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => toggleCompare(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all cursor-pointer ${
                  compared
                    ? "bg-amber-400 text-black border-amber-500"
                    : "bg-white/80 hover:bg-white text-stone-700 border-[#E5E5E9]"
                }`}
                title={compared ? "Remove from comparison" : "Add to side-by-side comparison"}
              >
                <Scale className="h-4 w-4" />
              </button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all cursor-pointer ${
                  favorited
                    ? "bg-rose-50 text-rose-500 border-rose-200"
                    : "bg-white/80 hover:bg-white text-stone-700 border-[#E5E5E9]"
                }`}
                title={favorited ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart className={`h-4 w-4 ${favorited ? "fill-rose-500" : ""}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 border border-[#E5E5E9] shadow-md transition-all cursor-pointer"
                title="Share canonical object"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Provenance Origin Chip */}
            <div className="absolute bottom-4 left-4 text-xs font-mono font-medium text-[#0A0A0C] bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E5E5E9] shadow-xs flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-[#EA580C]" />
              <span>{product.provenance?.origin || product.primaryVendor.location}</span>
            </div>
          </div>

          {/* Alternate Angles & Color Thumbnails */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.colors.map((col) => {
                const isSelected = activeImage === col.image;
                return (
                  <button
                    key={col.name}
                    onClick={() => {
                      setSelectedColor(col.name);
                      if (col.image) setActiveImage(col.image);
                    }}
                    className={`h-20 w-20 rounded-2xl bg-[#F9F9FB] border p-2 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? "border-[#0A0A0C] ring-2 ring-[#0A0A0C] shadow-md"
                        : "border-[#E5E5E9] hover:border-stone-400"
                    }`}
                  >
                    <img src={col.image} alt={col.name} className="max-h-full max-w-full object-contain" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Aether Endurance & Repair Scorecard (Live Rubric) */}
          <div className="rounded-3xl border border-[#E5E5E9] bg-[#F9F9FB] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E5E9] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0C]">
                  Aether Endurance Index // Specification Standard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-mono">Rating:</span>
                <span className="text-sm font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {product.enduranceRubric?.score || product.lifespanScore} / 10
                </span>
              </div>
            </div>

            {/* 4 Rubric Factor Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-2xl border border-[#E5E5E9] space-y-1">
                <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Materials</div>
                <div className="font-mono font-black text-stone-900 text-sm">
                  {product.enduranceRubric?.materialIntegrity || 9.9} / 10
                </div>
                <div className="text-[10px] text-stone-500">Zero composite plastic</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-[#E5E5E9] space-y-1">
                <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Disassembly</div>
                <div className="font-mono font-black text-stone-900 text-sm">
                  {product.enduranceRubric?.modularDisassembly || 9.8} / 10
                </div>
                <div className="text-[10px] text-stone-500">Standard driver modularity</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-[#E5E5E9] space-y-1">
                <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Parts Stocked</div>
                <div className="font-mono font-black text-[#EA580C] text-sm">
                  Through {product.enduranceRubric?.guaranteedPartsUntil || 2038}
                </div>
                <div className="text-[10px] text-stone-500">Guaranteed inventory</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-[#E5E5E9] space-y-1">
                <div className="text-[10px] font-mono text-stone-400 uppercase font-bold">Decoupling</div>
                <div className="font-mono font-black text-stone-900 text-sm">
                  {product.enduranceRubric?.decoupledFirmware || 10.0} / 10
                </div>
                <div className="text-[10px] text-stone-500">Zero app / cloud locks</div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 font-sans leading-relaxed border-t border-[#E5E5E9] pt-3">
              ✦ {product.enduranceRubric?.methodologyNote ||
                "Tested against Aether Endurance Standard v2.4: requires accessible fasteners, absence of planned obsolescence, and dedicated spare-part availability."}
            </p>
          </div>
        </div>

        {/* Right Column: Title, Selected Vendor Offer, and Order Console */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#EA580C] uppercase tracking-wider">
                {product.category}
              </span>
              {product.stockUrgency && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#EA580C] bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                  <Flame className="h-3 w-3 text-[#EA580C]" />
                  <span>{product.stockUrgency}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase leading-tight">
              {product.title}
            </h1>

            {/* Ratings & Verified Owners */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-500"
                        : "fill-stone-200 text-stone-200"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono font-bold text-[#0A0A0C]">{product.rating}</span>
              <span className="text-stone-400 font-sans">({product.reviewsCount} verified owners)</span>
            </div>

            {/* Dynamic Price tied to Selected Vendor Offer */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-mono font-black text-[#0A0A0C]">
                ${currentPrice}.00
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through font-mono">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                0% Middleman Markups
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* ACTIVE VENDOR OFFER SELECTOR (Pillar: Canonical Architecture) */}
          <div className="rounded-3xl border border-[#E5E5E9] bg-white p-5 space-y-3 floating-card">
            <div className="flex items-center justify-between border-b border-[#E5E5E9] pb-2">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-[#EA580C]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0C]">
                  Active Fulfillment Node ({product.offers?.length || 1} available)
                </span>
              </div>
              <button
                onClick={() => setActiveTab("vendors")}
                className="text-[11px] font-mono font-bold text-blue-700 hover:text-black transition-colors cursor-pointer"
              >
                Compare Offers →
              </button>
            </div>

            {/* Current Selected Vendor Card */}
            <div className="p-4 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-sans font-black text-sm text-[#0A0A0C]">
                    {selectedOffer.sellerName}
                  </span>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {selectedOffer.nodeVerification}
                  </span>
                </div>
                <span className="font-mono font-bold text-sm text-[#0A0A0C]">${selectedOffer.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 font-sans pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-3 w-3 text-stone-500" />
                  <span>{selectedOffer.fulfillmentSpeed}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  <span>{selectedOffer.warranty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-[#0A0A0C] uppercase tracking-wider block">
                Finish: <span className="text-[#EA580C]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleSelectColor(color.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                      selectedColor === color.name
                        ? "border-[#0A0A0C] bg-[#0A0A0C] text-white shadow-xs"
                        : "border-[#E5E5E9] bg-white text-stone-700 hover:border-stone-400"
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Primary Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#E5E5E9] rounded-full bg-white p-1 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 font-mono font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3.5 text-xs font-mono font-bold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 font-mono font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#0A0A0C] hover:bg-stone-800 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 text-emerald-400" />
                <span>Add to Universal Bag • ${(currentPrice * quantity).toLocaleString()}</span>
              </motion.button>
            </div>

            {/* Direct Instant Settlement */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-full border border-[#0A0A0C] bg-white text-[#0A0A0C] hover:bg-stone-100 font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Zap className="h-4 w-4 text-[#EA580C]" />
              <span>Instant Node Settlement</span>
            </button>
          </div>

          {/* Return & Warranty Forensics Summary */}
          <div className="p-4 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] text-xs font-sans space-y-2">
            <div className="flex items-center justify-between text-stone-700">
              <span className="font-bold flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-[#EA580C]" />
                <span>30-Day Evaluation Window</span>
              </span>
              <span className="font-mono font-bold text-emerald-700">
                {product.honestyDossier?.keepRate || 98.2}% Keep Rate
              </span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              If an object does not fit your physical rituals, return it to the regional node within 30 days. No restocking penalties; 100% refunded to original payment method.
            </p>
          </div>
        </div>

      </div>

      {/* 02. Canonical Object Dossier & Tabs (The Comprehensive Heart of AETHER) */}
      <div id="canonical-dossier" className="border-t border-[#E5E5E9] pt-12">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#E5E5E9] mb-8 no-scrollbar">
          {[
            { id: "vendors", label: "01. Vendor Comparison", count: product.offers?.length || 1 },
            { id: "endurance", label: "02. Endurance Index", count: product.enduranceRubric?.score || 9.8 },
            { id: "parts", label: "03. Spare Parts Catalog", count: product.spareParts?.length || 0 },
            { id: "passport", label: "04. Product Passport", count: "DPP" },
            { id: "specs", label: "05. Specifications", count: "Specs" },
            { id: "warranty", label: "06. Warranty Charter", count: "Doc" },
            { id: "forensics", label: "07. Patina & Returns", count: `${product.honestyDossier?.keepRate || 98}%` },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? "bg-[#0A0A0C] text-white shadow-md"
                    : "bg-[#F9F9FB] border border-[#E5E5E9] text-stone-600 hover:text-black hover:border-black"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 01: VENDOR COMPARISON LEDGER (The Anti-Amazon Tangible Proof) */}
        {activeTab === "vendors" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[#E5E5E9]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
                  CANONICAL MULTI-VENDOR LEDGER // ZERO CLONED LISTINGS
                </span>
                <h3 className="text-2xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
                  1 Master Page. Multiple Verified Node Offers.
                </h3>
              </div>
              <p className="text-xs text-stone-500 font-sans max-w-md">
                Merchants on Aether compete openly on price, fulfillment speed, and warranty duration under this single canonical listing. No sponsored duplicate pages.
              </p>
            </div>

            {/* Vendor Offer Comparison Table */}
            <div className="rounded-3xl border border-[#E5E5E9] bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#F9F9FB] border-b border-[#E5E5E9] text-[11px] font-mono uppercase text-[#64646E] font-bold">
                    <th className="p-4">Fulfillment Node</th>
                    <th className="p-4">Condition</th>
                    <th className="p-4">Dispatch & Mesh</th>
                    <th className="p-4">Warranty</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Allocation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E9] text-xs font-sans">
                  {product.offers?.map((offer) => {
                    const isSelected = selectedOffer.id === offer.id;
                    return (
                      <tr
                        key={offer.id}
                        className={`transition-colors ${
                          isSelected ? "bg-amber-50/40" : "hover:bg-[#F9F9FB]"
                        }`}
                      >
                        <td className="p-4">
                          <div className="font-bold text-[#0A0A0C] text-sm">{offer.sellerName}</div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="h-3 w-3 text-stone-400" />
                            <span>{offer.location}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">{offer.nodeVerification}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 font-mono text-[11px] font-semibold border border-stone-200">
                            {offer.condition}
                          </span>
                        </td>
                        <td className="p-4 text-stone-700">
                          <div className="flex items-center gap-1.5">
                            <Truck className="h-3.5 w-3.5 text-stone-400" />
                            <span>{offer.fulfillmentSpeed}</span>
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono mt-0.5">{offer.returnTerms}</div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-emerald-800 flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                            <span>{offer.warranty}</span>
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-base font-mono font-black text-[#0A0A0C]">
                            ${offer.price}.00
                          </div>
                          {offer.isBestMatch && (
                            <span className="text-[9px] font-mono uppercase font-bold text-[#EA580C]">
                              Maker Direct
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedOffer(offer);
                              showToast(`Switched allocation to ${offer.sellerName} ($${offer.price})`, "cart");
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#0A0A0C] text-white"
                                : "border border-[#E5E5E9] hover:border-black text-stone-800"
                            }`}
                          >
                            {isSelected ? "Active Choice" : "Select Node"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 02: ENDURANCE INDEX & METHODOLOGY */}
        {activeTab === "endurance" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#F9F9FB] border border-[#E5E5E9] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                  Aggregate Score
                </span>
                <div className="text-4xl font-mono font-black text-emerald-700">
                  {product.enduranceRubric?.score || 9.8} / 10
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                  Composite rating derived from material purity, fastener reversibility, spare-parts inventory, and firm anti-obsolescence hardware standards.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#F9F9FB] border border-[#E5E5E9] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                  Spare Parts Horizon
                </span>
                <div className="text-4xl font-mono font-black text-[#EA580C]">
                  Through {product.enduranceRubric?.guaranteedPartsUntil || 2038}
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                  Atelier commitment: replacement components and gaskets remain manufactured and inventoried at regional nodes for at least 12–50 years.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#F9F9FB] border border-[#E5E5E9] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                  Secondary Resale Retained Value
                </span>
                <div className="text-4xl font-mono font-black text-stone-900">
                  {product.enduranceRubric?.resaleRetention || 79}% Retained
                </div>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                  Obsolescence-free architecture preserves tangible resale value across secondary horology, audio, and culinary auctions.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5E5E9] space-y-3">
              <h4 className="font-sans font-black text-sm uppercase text-[#0A0A0C]">
                Aether Endurance Index v2.4 Testing Protocol
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Every object submitted to Aether undergoes destructive disassembly and wear tests. We evaluate: (1) whether normal consumer tools can access all wear points; (2) whether any irreversible chemical adhesive or glued batteries prevent component replacement; (3) whether firmware updates can brick or limit core mechanical functions; and (4) whether the manufacturer publishes open repair diagrams and supplies parts at fair value.
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 03: SPARE PARTS CATALOG */}
        {activeTab === "parts" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[#E5E5E9]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
                  FIELD SERVICE CATALOG // RIGHT TO REPAIR
                </span>
                <h3 className="text-2xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
                  Replaceable Components & Service Kits
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                100% In-Stock at Regional Hubs
              </span>
            </div>

            <div className="rounded-3xl border border-[#E5E5E9] bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#F9F9FB] border-b border-[#E5E5E9] text-[11px] font-mono uppercase text-[#64646E] font-bold">
                    <th className="p-4">Component Name</th>
                    <th className="p-4">Part Number</th>
                    <th className="p-4">Replacement Difficulty</th>
                    <th className="p-4">Est. Swap Time</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Order Part</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E9] text-xs font-sans">
                  {product.spareParts && product.spareParts.length > 0 ? (
                    product.spareParts.map((part) => (
                      <tr key={part.id} className="hover:bg-[#F9F9FB] transition-colors">
                        <td className="p-4 font-bold text-[#0A0A0C]">{part.name}</td>
                        <td className="p-4 font-mono text-stone-500 text-[11px]">{part.partNumber}</td>
                        <td className="p-4">
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <Wrench className="h-3 w-3" />
                            <span>{part.replacementEase}</span>
                          </span>
                        </td>
                        <td className="p-4 font-mono text-stone-600">{part.estimatedMinutesToSwap} minutes</td>
                        <td className="p-4 font-mono font-bold text-sm text-[#0A0A0C]">${part.price}.00</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              showToast(`Staged ${part.name} ($${part.price}) for dispatch!`, "cart");
                            }}
                            className="px-3.5 py-1.5 rounded-full border border-[#E5E5E9] hover:border-black text-[11px] font-mono font-bold uppercase transition-colors cursor-pointer"
                          >
                            Order Component
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-stone-500 font-sans">
                        Monolithic single-material artifact with zero moving sub-assemblies. Indestructible physical integrity.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 04: DIGITAL PRODUCT PASSPORT (DPP) */}
        {activeTab === "passport" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0A0C] text-white border border-[#242429] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
                    <Hash className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                      DIGITAL PRODUCT PASSPORT (EU DPP READY)
                    </span>
                    <h4 className="text-lg font-sans font-black uppercase text-white mt-0.5">
                      Cryptographic Authenticity & Batch Ledger
                    </h4>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-stone-400">
                  <div>Inspection Node: {product.digitalPassport?.inspectionNode || "Node Europe #01"}</div>
                  <div className="text-emerald-400">Status: Verified Genuine</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                  <span className="text-stone-400 text-[10px] uppercase">Batch Identifier</span>
                  <div className="text-white font-bold">{product.digitalPassport?.batchId || "BATCH-2026-A"}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                  <span className="text-stone-400 text-[10px] uppercase">Production Year</span>
                  <div className="text-white font-bold">{product.digitalPassport?.productionYear || 2026}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                  <span className="text-stone-400 text-[10px] uppercase">Material Purity</span>
                  <div className="text-emerald-400 font-bold">
                    {product.digitalPassport?.materialPurity || "100% Verified Non-Toxic"}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141418] border border-white/10 space-y-1">
                  <span className="text-stone-400 text-[10px] uppercase">Atelier Coordinates</span>
                  <div className="text-stone-300 font-bold">
                    {product.digitalPassport?.originCoords || "48.8566° N, 2.3522° E"}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141418] border border-white/10 text-xs font-mono break-all text-stone-400">
                <span className="text-stone-500 uppercase block text-[10px] mb-1">
                  Cryptographic Verification Hash (SHA-256)
                </span>
                <span className="text-emerald-400">
                  {product.digitalPassport?.cryptographicHash || "0x8f4a9b21c430e719df6b52a78461cd9e410b372f"}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 05: FULL TECHNICAL SPECIFICATIONS */}
        {activeTab === "specs" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-[#E5E5E9] bg-white p-6 sm:p-8 space-y-6 shadow-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.specs &&
                Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <div className="text-xs sm:text-sm font-sans font-semibold text-stone-900">{value}</div>
                  </div>
                ))}
            </div>

            {product.inTheBox && (
              <div className="pt-6 border-t border-[#E5E5E9] space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0C]">
                  Included in Atelier Delivery Folio:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 font-sans">
                  {product.inTheBox.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 06: WARRANTY CHARTER */}
        {activeTab === "warranty" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E9] space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  TRANSPARENT WARRANTY CHARTER
                </span>
                <h4 className="text-xl font-sans font-black uppercase text-[#0A0A0C]">
                  {product.warrantyDoc?.duration || "10-Year Guild Craftsmanship Warranty"}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans pt-2">
              {product.warrantyDoc?.summary ||
                "Covers all structural failures, metallurgical fatigue, and craftsmanship defects under normal usage. Repaired or replaced by original maker at no cost to the owner."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E5E9] text-xs font-sans">
              <div className="p-4 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] space-y-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">Replacement Terms</span>
                <div className="text-stone-800 font-medium">{product.warrantyDoc?.replacementTerms}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] space-y-1">
                <span className="text-[10px] font-mono text-stone-400 uppercase font-bold">Primary Service Center</span>
                <div className="text-stone-800 font-medium">{product.warrantyDoc?.repairCenter}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 07: SENSORY HONESTY & 180-DAY PATINA CONSENSUS */}
        {activeTab === "forensics" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-3xl bg-white border border-[#E5E5E9] space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5E5E9] pb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#0A0A0C]">
                  Verified Return Forensics
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {product.honestyDossier?.keepRate || 98.2}% Keep Rate
                </span>
              </div>
              <div className="space-y-2 text-xs font-sans">
                {product.honestyDossier?.returnReasons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#F9F9FB]">
                    <span className="font-mono font-bold text-[#EA580C] shrink-0">{item.percentage}%</span>
                    <span className="text-stone-600">{item.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5E5E9] space-y-4 shadow-xs">
              <span className="text-xs font-mono font-bold uppercase text-[#0A0A0C] block border-b border-[#E5E5E9] pb-3">
                180-Day Wear & Aging Report
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans italic">
                "{product.honestyDossier?.sixMonthPatinaReport ||
                  "Natural materials age gracefully, deepening in character without structural deterioration."}"
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* 03. Related Canonical Objects */}
      <div className="border-t border-[#E5E5E9] pt-16 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
              CANONICAL CONTEXT // COMPLEMENTARY CRAFT
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
              Objects of Similar Permanence
            </h3>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
          >
            VIEW ALL OBJECTS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* 04. Sticky Bottom Buy Bar (Shown on scroll) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E5E9] py-3.5 px-4 sm:px-8 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 truncate">
                <img src={product.image} alt={product.title} className="h-10 w-10 object-contain rounded-lg bg-stone-100 p-1" />
                <div className="truncate hidden sm:block">
                  <div className="text-xs font-sans font-bold text-[#0A0A0C] truncate">{product.title}</div>
                  <div className="text-[11px] font-mono text-[#EA580C]">
                    ${currentPrice}.00 • Sold by {selectedOffer.sellerName}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base font-mono font-black text-[#0A0A0C] sm:hidden">
                  ${currentPrice}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="py-2.5 px-6 rounded-full bg-[#0A0A0C] text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
