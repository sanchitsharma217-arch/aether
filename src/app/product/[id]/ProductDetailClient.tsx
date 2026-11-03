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
} from "lucide-react";
import { Product } from "@/types/store";
import { PRODUCTS } from "@/data/mockProducts";
import { ProductCard } from "@/components/store/ProductCard";
import { useStore } from "@/context/StoreContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleFavorite, isFavorite, showToast } = useStore();

  const favorited = isFavorite(product.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "provenance" | "box" | "shipping">("provenance");
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string>(
    product.workshops?.[0]?.id || ""
  );
  const [showStickyBar, setShowStickyBar] = useState(false);

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
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    router.push("/cart");
  };

  const handleAddBundle = () => {
    addToCart(product, 1, selectedColor);
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

  // Review breakdown stats
  const ratingsBreakdown = [
    { stars: 5, pct: 91 },
    { stars: 4, pct: 7 },
    { stars: 3, pct: 1 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Canonical SKU & Provenance Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#E4DFD5] text-[11px] font-mono text-stone-500">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-sm bg-[#1C1917] text-[#F7F5F0] font-semibold tracking-wider">
            CANONICAL MASTER SKU
          </span>
          <span className="text-[#1C1917] font-bold">{product.canonicalSku || "AG-MASTER-001"}</span>
          <span className="text-stone-300">•</span>
          <span>Single Verified Master Page (Zero Duplicates)</span>
        </div>

        <div className="flex items-center gap-2 text-stone-600">
          <Leaf className="h-3.5 w-3.5 text-[#5E6857]" />
          <span>{product.provenance?.origin || "Verified Independent Atelier"}</span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500 mb-8 font-sans">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Atelier Archive
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-stone-900 transition-colors">
          Objects
        </Link>
        <span>/</span>
        <span className="text-stone-500">{product.category}</span>
        <span>/</span>
        <span className="font-semibold text-stone-900 truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pb-16 border-b border-[#E4DFD5]">
        {/* Left: Product Imagery Showcase & Thumbnails */}
        <div className="lg:col-span-7 space-y-4">
          <div className="w-full h-96 sm:h-[500px] bg-[#EFECE6]/60 rounded-3xl p-8 border border-[#E4DFD5] flex items-center justify-center relative overflow-hidden group">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={activeImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-104 transition-transform duration-500"
            />

            {product.badge && (
              <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full bg-[#1C1917] text-[#F7F5F0] shadow-2xs font-sans">
                {product.badge}
              </span>
            )}

            <button
              onClick={handleShare}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-700 hover:text-stone-900 shadow-2xs hover:bg-white transition-colors cursor-pointer"
              title="Share Canonical Dossier"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Alternate Angle Thumbnails Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveImage(product.image)}
              className={`h-20 w-20 rounded-2xl bg-white border p-2 flex items-center justify-center transition-all cursor-pointer ${
                activeImage === product.image
                  ? "ring-2 ring-[#1C1917] border-[#1C1917]"
                  : "border-[#E4DFD5] hover:border-stone-400"
              }`}
            >
              <img src={product.image} alt="Angle 1" className="max-h-full max-w-full object-contain" />
            </button>

            {product.secondaryImage && (
              <button
                onClick={() => setActiveImage(product.secondaryImage!)}
                className={`h-20 w-20 rounded-2xl bg-white border p-2 flex items-center justify-center transition-all cursor-pointer ${
                  activeImage === product.secondaryImage
                    ? "ring-2 ring-[#1C1917] border-[#1C1917]"
                    : "border-[#E4DFD5] hover:border-stone-400"
                }`}
              >
                <img src={product.secondaryImage} alt="Angle 2" className="max-h-full max-w-full object-contain" />
              </button>
            )}

            {product.colors?.map((col) => {
              if (!col.image || col.image === product.image) return null;
              return (
                <button
                  key={col.name}
                  onClick={() => {
                    setSelectedColor(col.name);
                    setActiveImage(col.image!);
                  }}
                  className={`h-20 w-20 rounded-2xl bg-white border p-2 flex items-center justify-center transition-all cursor-pointer ${
                    activeImage === col.image
                      ? "ring-2 ring-[#1C1917] border-[#1C1917]"
                      : "border-[#E4DFD5] hover:border-stone-400"
                  }`}
                >
                  <img src={col.image} alt={col.name} className="max-h-full max-w-full object-contain" />
                </button>
              );
            })}
          </div>

          {/* Aether Endurance & Repair Scorecard (Pillar B) */}
          <div className="rounded-2xl border border-[#E4DFD5] bg-[#F4F1EA] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-[#C2673D]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C1917]">
                  Endurance & Repair Index
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5E6857]">
                <span>Score:</span>
                <span className="text-sm px-2 py-0.5 rounded-full bg-[#5E6857]/15 text-[#5E6857]">
                  {product.enduranceIndex?.score || 9.8} / 10
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
              <div className="bg-white p-3 rounded-xl border border-[#E4DFD5]">
                <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  Modularity
                </div>
                <div className="font-semibold text-stone-900 mt-0.5">
                  {product.enduranceIndex?.repairability || "10/10 — Zero glue, fully serviceable"}
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E4DFD5]">
                <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  Guaranteed Parts
                </div>
                <div className="font-semibold text-[#C2673D] mt-0.5">
                  Through {product.enduranceIndex?.guaranteedPartsUntil || 2038}
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E4DFD5]">
                <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  Resale Retention
                </div>
                <div className="font-semibold text-stone-900 mt-0.5">
                  {product.enduranceIndex?.resaleRetention || 78}% Retained Value
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Buy Actions, Colors, and Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest font-sans">
                {product.category}
              </span>
              {product.stockUrgency && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C2673D] bg-[#C2673D]/10 px-2.5 py-0.5 rounded-full">
                  <Flame className="h-3 w-3 text-[#C2673D]" />
                  <span>{product.stockUrgency}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C1917] tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Ratings */}
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
              <span className="font-bold text-[#1C1917]">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount} verified owners)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-serif text-[#1C1917] font-bold">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through font-serif">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-[11px] font-bold text-[#5E6857] bg-[#5E6857]/15 px-2.5 py-0.5 rounded-full">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>
          </div>

          {/* SENSORY & MATERIAL HONESTY DOSSIER (Pillar C: Anti-Amazon Return Forensics) */}
          <div className="rounded-2xl border border-[#E4DFD5] bg-[#EFECE6]/70 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-[#C2673D]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700">
                  Sensory & Return Forensics
                </span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#5E6857] text-white">
                {product.honestyDossier?.keepRate || 97.4}% Keep Rate
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] text-stone-500 font-medium">
                Verified Return Causes (Total returns: {(100 - (product.honestyDossier?.keepRate || 97.4)).toFixed(1)}%):
              </p>
              <div className="space-y-1 text-xs text-stone-700">
                {product.honestyDossier?.returnReasons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="font-mono font-bold text-[#C2673D] shrink-0 text-[11px]">
                      {item.percentage}%
                    </span>
                    <span className="text-[11px] text-stone-600">{item.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6-Month Patina & Aging Report */}
            {product.honestyDossier?.sixMonthPatinaReport && (
              <div className="pt-2 border-t border-[#E4DFD5]/80 text-[11px] text-stone-600">
                <span className="font-semibold text-stone-800">
                  Verified 180-Day Patina Consensus:
                </span>{" "}
                <em>"{product.honestyDossier.sixMonthPatinaReport}"</em>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* CERTIFIED WORKSHOP & ATELIER MATRIX (Pillar D: Canonical SKU Multi-Merchant) */}
          {product.workshops && product.workshops.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-stone-900 uppercase tracking-wider font-sans">
                  Fulfillment Workshop Matrix ({product.workshops.length} certified makers)
                </label>
                <span className="text-[10px] text-stone-400">Canonical Routing</span>
              </div>

              <div className="space-y-2">
                {product.workshops.map((ws) => {
                  const isSelected = selectedWorkshopId === ws.id || (!selectedWorkshopId && ws === product.workshops![0]);
                  return (
                    <div
                      key={ws.id}
                      onClick={() => setSelectedWorkshopId(ws.id)}
                      className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "border-[#1C1917] bg-white ring-1 ring-[#1C1917] shadow-2xs"
                          : "border-[#E4DFD5] bg-white/70 hover:border-stone-400"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900">{ws.name}</span>
                          {ws.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#C2673D] text-white font-medium">
                              {ws.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2">
                          <span>{ws.location}</span>
                          <span>•</span>
                          <span className="text-[#5E6857]">{ws.dispatchTime}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-serif font-bold text-stone-900">${ws.price}</div>
                        <div className="text-[10px] text-[#5E6857] font-medium">{ws.carbonOffset}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Finish Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Select Finish: <span className="font-serif text-[#C2673D]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleSelectColor(color.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                      selectedColor === color.name
                        ? "border-[#1C1917] bg-[#1C1917] text-[#F7F5F0] shadow-2xs"
                        : "border-[#E4DFD5] bg-white text-stone-700 hover:border-stone-400"
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

          {/* Quantity Stepper & Save to Favorites Button */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center border border-[#E4DFD5] rounded-full bg-white p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-8 w-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-stone-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Favorite / Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                favorited
                  ? "border-rose-300 bg-rose-50 text-rose-600"
                  : "border-[#E4DFD5] hover:border-stone-400 text-stone-700 bg-white hover:bg-stone-50"
              }`}
            >
              <Heart
                className={`h-4 w-4 transition-transform ${
                  favorited ? "fill-rose-500 text-rose-500 scale-110" : ""
                }`}
              />
              <span>{favorited ? "Saved in Wishlist" : "Save to Wishlist"}</span>
            </motion.button>
          </div>

          {/* Buying Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-full bg-[#1C1917] hover:bg-stone-800 text-[#F7F5F0] text-xs font-semibold tracking-wider uppercase shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add Object to Bag</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-full bg-[#C2673D] hover:bg-[#a3522c] text-white text-xs font-bold tracking-wider uppercase shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-white" />
              <span>Instant Checkout</span>
            </motion.button>
          </div>

          {/* Frequently Bought Together Smart Bundle */}
          {product.bundleWith && (
            <div className="p-4 rounded-2xl bg-[#EFECE6]/70 border border-[#E4DFD5] space-y-3 pt-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-900 uppercase tracking-wider">
                <span className="font-serif">Curated Pair Object</span>
                <span className="text-[#5E6857] font-extrabold bg-[#5E6857]/15 px-2 py-0.5 rounded-full text-[10px]">
                  Bundle Savings $15
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-white border border-[#E4DFD5] p-1 flex items-center justify-center shrink-0">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>
                <Plus className="h-4 w-4 text-stone-400" />
                <div className="h-14 w-14 rounded-xl bg-white border border-[#E4DFD5] p-1 flex items-center justify-center shrink-0">
                  <img src={product.bundleWith.image} alt={product.bundleWith.title} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="flex-1 space-y-0.5 text-xs">
                  <div className="font-semibold text-stone-900 line-clamp-1">{product.bundleWith.title}</div>
                  <div className="text-stone-500">
                    Pair Price: <strong className="text-stone-950 font-serif">${product.price + product.bundleWith.price - 15}</strong>{" "}
                    <span className="line-through text-stone-400">${product.price + product.bundleWith.price}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                className="w-full py-2.5 rounded-full bg-white border border-[#E4DFD5] hover:border-stone-900 text-xs font-semibold text-stone-900 transition-colors shadow-2xs cursor-pointer"
              >
                Add Both Objects to Bag
              </button>
            </div>
          )}

          {/* Interactive Information Tabs */}
          <div className="pt-6 border-t border-[#E4DFD5] space-y-4">
            <div className="flex border-b border-[#E4DFD5] text-xs font-semibold gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: "provenance", label: "Provenance & Batch" },
                { id: "features", label: "Craft Highlights" },
                { id: "specs", label: "Material Specs" },
                { id: "box", label: "In The Box" },
                { id: "shipping", label: "Low-Impact Shipping" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 transition-colors cursor-pointer border-b-2 -mb-[2px] whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[#1C1917] text-[#1C1917] font-bold"
                      : "border-transparent text-stone-400 hover:text-stone-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "provenance" && (
              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-[#E4DFD5]">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Atelier</span>
                    <p className="font-semibold text-stone-900">{product.provenance?.artisan || "Independent Master Guild"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Origin</span>
                    <p className="font-semibold text-stone-900">{product.provenance?.origin || "Global Artisan Registry"}</p>
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Batch Number</span>
                    <p className="font-semibold text-stone-900">{product.provenance?.batch || "Serialized 2026 Lot"}</p>
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Carbon Footprint</span>
                    <p className="font-semibold text-[#5E6857]">{product.provenance?.carbonFootprint || "0.2 kg CO2e"}</p>
                  </div>
                </div>
                {product.provenance?.materials && (
                  <div className="pt-1">
                    <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">Verified Raw Materials:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {product.provenance.materials.map((m, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-[#E4DFD5] text-stone-800">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "features" && (
              <ul className="space-y-2 text-xs text-stone-600">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#5E6857] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "specs" && (
              <div className="space-y-2 text-xs">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-stone-200/60">
                    <span className="text-stone-400 font-sans">{key}</span>
                    <span className="font-semibold text-stone-800">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "box" && (
              <ul className="space-y-2 text-xs text-stone-600">
                {(product.inTheBox || [
                  "1x Main Artisan Piece",
                  "1x Unbleached Linen Storage Pouch",
                  "1x Certificate of Provenance & Artisan Signature",
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#1C1917] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "shipping" && (
              <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
                <p>
                  Orders over $150 receive complimentary low-impact regional parcel dispatch (plastic-free packaging).
                </p>
                <p>
                  30-Day Quiet Home Trial: Live with the object. If it does not bring daily utility and stillness, return it in original packaging for a 100% refund.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Review Sentiment Breakdown */}
      <section className="py-16 border-b border-[#E4DFD5]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xl font-serif text-[#1C1917]">Verified Owner Sentiment</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif text-[#1C1917] font-bold">{product.rating}</span>
              <span className="text-sm text-stone-400">out of 5.0</span>
            </div>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-stone-500 font-sans">
              Cryptographically verified purchases with wear-and-tear updates after 180 days.
            </p>
          </div>

          <div className="md:col-span-8 space-y-2">
            {ratingsBreakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs text-stone-600">
                <span className="w-12 font-mono">{row.stars} Stars</span>
                <div className="flex-1 h-2 bg-[#EFECE6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1C1917] rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-stone-700">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="pt-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E4DFD5]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2673D]">
              Harmonious Additions
            </span>
            <h2 className="text-2xl font-serif text-[#1C1917] tracking-tight">
              Complementary Objects of Permanence
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Floating Sticky Buy Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-t border-[#E4DFD5] py-3.5 px-4 sm:px-8 shadow-xl"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-white border border-[#E4DFD5] p-1 shrink-0 overflow-hidden hidden sm:flex items-center justify-center">
                  <img src={activeImage} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-serif text-[#1C1917] line-clamp-1 max-w-sm">
                    {product.title}
                  </h4>
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span className="font-bold text-[#1C1917]">${product.price}</span>
                    <span>•</span>
                    <span>{selectedColor}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                    favorited
                      ? "border-rose-300 bg-rose-50 text-rose-500"
                      : "border-[#E4DFD5] hover:border-stone-400 text-stone-600 bg-white"
                  }`}
                  title={favorited ? "Favorited" : "Save"}
                >
                  <Heart className={`h-4 w-4 ${favorited ? "fill-rose-500" : ""}`} />
                </button>

                <button
                  onClick={handleAddToCart}
                  className="px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-[#F7F5F0] text-xs font-semibold shadow-2xs flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="px-5 py-2.5 rounded-full bg-[#C2673D] hover:bg-[#a3522c] text-white text-xs font-bold shadow-2xs hidden sm:flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="h-3.5 w-3.5 fill-white" />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
