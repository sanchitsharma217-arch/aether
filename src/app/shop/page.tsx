"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  ChevronDown,
  Heart,
  Search,
  X,
  Check,
  ShieldCheck,
  Wrench,
  Compass,
  Sparkles,
  Scale,
  RotateCcw,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/mockProducts";
import { ProductCard } from "@/components/store/ProductCard";
import { useStore } from "@/context/StoreContext";

export default function ShopPage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    favorites,
    favoritesCount,
    comparedProducts,
    setIsCompareOpen,
  } = useStore();

  const [sortBy, setSortBy] = useState<string>("featured");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyRepairable, setOnlyRepairable] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedWarranty, setSelectedWarranty] = useState<string>("All");
  const [minEndurance, setMinEndurance] = useState<number>(9.0);
  const [priceMax, setPriceMax] = useState<number>(650);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique countries
  const countries = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.provenance?.country) list.add(p.provenance.country);
    });
    return ["All", ...Array.from(list)];
  }, []);

  // Intent Intelligence: detects semantic user intentions and suggests reasoning
  const intentMatch = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    if (q.includes("work") || q.includes("focus") || q.includes("desk") || q.includes("station") || q.includes("minimal")) {
      return {
        concept: "Tactile Minimalist Workstation Capsule",
        rationale:
          "Curated for deep uninterrupted cognitive flow: acoustic planar isolation, weighted natural walnut organization, and Portuguese cork wrist dampening.",
        suggestedDepartment: "Home & Living",
      };
    }
    if (q.includes("culinary") || q.includes("kitchen") || q.includes("cook") || q.includes("morning") || q.includes("coffee") || q.includes("pour")) {
      return {
        concept: "Generational Culinary & Morning Extraction",
        rationale:
          "Honoring raw ingredients with slow preparation: French sand-cast iron for thermal braising, Hitachi Aogami carbon steel for razor slicing, and unglazed Tokoname clay to soften water minerals.",
        suggestedDepartment: "Kitchen & Culinary",
      };
    }
    if (q.includes("travel") || q.includes("commute") || q.includes("edc") || q.includes("watch") || q.includes("carry")) {
      return {
        concept: "Permanent Transit & Mechanical Carry",
        rationale:
          "Objects engineered for 25–50 years of continuous motion: full-grain Horween steerhide that gains rich patina, self-winding Grade-5 titanium horology, and solid turned brass writing instruments.",
        suggestedDepartment: "Wearables & Horology",
      };
    }
    return null;
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Category filter (5 Craft Departments)
      if (selectedCategory !== "All" && prod.category !== selectedCategory) {
        return false;
      }

      // Country of origin filter
      if (selectedCountry !== "All" && prod.provenance?.country !== selectedCountry) {
        return false;
      }

      // Favorites only filter
      if (showOnlyFavorites && !favorites.includes(prod.id)) {
        return false;
      }

      // In-stock only filter
      if (onlyInStock && !prod.inStock) {
        return false;
      }

      // Repairable only filter (Endurance Index score >= 9.7 and spare parts listed)
      if (onlyRepairable) {
        const isRepairable = (prod.spareParts && prod.spareParts.length > 0) || (prod.enduranceRubric?.score || 9.8) >= 9.8;
        if (!isRepairable) return false;
      }

      // Minimum Endurance Index
      const score = prod.enduranceRubric?.score || prod.lifespanScore || 9.8;
      if (score < minEndurance) {
        return false;
      }

      // Warranty filter
      if (selectedWarranty === "Lifetime") {
        const isLifetime = prod.warrantyDoc?.duration.toLowerCase().includes("lifetime");
        if (!isLifetime) return false;
      } else if (selectedWarranty === "10+ Years") {
        const duration = prod.warrantyDoc?.duration || "";
        const isLong = duration.includes("10-Year") || duration.includes("15-Year") || duration.includes("20-Year") || duration.includes("25-Year") || duration.includes("Lifetime");
        if (!isLong) return false;
      }

      // Price filter
      if (prod.price > priceMax) {
        return false;
      }

      // Search query (matches title, category, description, SKU, materials, origin, or intentTags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesCategory = prod.category.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesSku = prod.canonicalSku?.toLowerCase().includes(q) || false;
        const matchesOrigin = prod.provenance?.origin.toLowerCase().includes(q) || false;
        const matchesArtisan = prod.primaryVendor.name.toLowerCase().includes(q) || false;
        const matchesTags = prod.intentTags?.some((t) => t.toLowerCase().includes(q)) || false;

        if (!matchesTitle && !matchesCategory && !matchesDesc && !matchesSku && !matchesOrigin && !matchesArtisan && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "endurance") {
        const scoreA = a.enduranceRubric?.score || a.lifespanScore || 9.8;
        const scoreB = b.enduranceRubric?.score || b.lifespanScore || 9.8;
        return scoreB - scoreA;
      }
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [
    selectedCategory,
    selectedCountry,
    selectedWarranty,
    showOnlyFavorites,
    onlyInStock,
    onlyRepairable,
    minEndurance,
    priceMax,
    favorites,
    searchQuery,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedCountry("All");
    setSelectedWarranty("All");
    setSearchQuery("");
    setShowOnlyFavorites(false);
    setOnlyInStock(false);
    setOnlyRepairable(false);
    setMinEndurance(9.0);
    setPriceMax(650);
    setSortBy("featured");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* 00. Breadcrumb & Catalog Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 mb-6 font-mono border-b border-[#E5E5E9] pb-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            AETHER
          </Link>
          <span>/</span>
          <span className="font-bold text-[#0A0A0C]">Objects Archive</span>
          {selectedCategory !== "All" && (
            <>
              <span>/</span>
              <span className="text-[#EA580C]">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-stone-500">
            Showing <strong className="text-black">{filteredProducts.length}</strong> canonical master listings
          </span>
          {comparedProducts.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="text-[11px] font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
            >
              <Scale className="h-3 w-3" />
              <span>{comparedProducts.length} Staged in Comparison</span>
            </button>
          )}
        </div>
      </div>

      {/* 01. Catalog Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
            CANONICAL CATALOG // VERIFIED ATELIERS ONLY
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase">
          Curated Objects of Permanence
        </h1>
        <p className="text-xs sm:text-sm text-[#64646E] max-w-2xl font-sans leading-relaxed">
          Zero dropshipped white-label clones. Every item corresponds to one canonical SKU with independent durability ratings, published repair schematics, and transparent multi-vendor allocation.
        </p>
      </div>

      {/* 02. Search & Intent Intelligence Bar */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by intent, problem, material, or SKU (e.g. 'workstation for deep focus', 'titanium watch', 'cast iron')..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-[#E5E5E9] focus:border-[#0A0A0C] text-xs sm:text-sm font-sans placeholder:text-stone-400 focus:outline-none shadow-xs transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-black cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Intent Recommendation Banner (Triggered when natural language query matched) */}
        {intentMatch && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-[#0A0A0C] text-white border border-[#242429] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  INTENT INTELLIGENCE RECOMMENDATION // {intentMatch.concept}
                </span>
              </div>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                {intentMatch.rationale}
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory(intentMatch.suggestedDepartment)}
              className="px-3.5 py-1.5 rounded-full bg-white text-[#0A0A0C] text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Filter {intentMatch.suggestedDepartment}
            </button>
          </motion.div>
        )}

        {/* Suggestion Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono no-scrollbar">
          <span className="text-stone-400 text-[11px] shrink-0 font-bold">Try Intent:</span>
          {[
            "Workstation for deep focus",
            "Artisan morning pour-over",
            "Titanium automatic horology",
            "Generational cast iron",
            "Belgian stonewashed linen",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setSearchQuery(prompt)}
              className="px-3 py-1 rounded-full bg-[#F9F9FB] border border-[#E5E5E9] text-stone-600 hover:text-black hover:border-black transition-colors shrink-0 cursor-pointer text-[11px]"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* 03. Unified 5 Craft Departments Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#E5E5E9] mb-8 no-scrollbar">
        {["All", ...CATEGORIES].map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? "bg-[#0A0A0C] text-white shadow-md"
                  : "bg-[#F9F9FB] border border-[#E5E5E9] text-stone-600 hover:text-black hover:border-black"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 04. Main Layout: Advanced Filters Sidebar + Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters (3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-[#F9F9FB] p-6 rounded-3xl border border-[#E5E5E9]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E9]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0C] flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Specification Filters</span>
            </span>
            <button
              onClick={clearAllFilters}
              className="text-[11px] font-mono text-[#EA580C] hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Filter: Country of Origin */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600 block flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-stone-400" />
              <span>Atelier Origin</span>
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white border border-[#E5E5E9] text-xs font-sans text-stone-800 focus:outline-none focus:border-black cursor-pointer shadow-xs"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Guild Locations" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Filter: Minimum Endurance Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-stone-600 uppercase flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Min Endurance Score</span>
              </span>
              <span className="font-bold text-emerald-800">{minEndurance.toFixed(1)} / 10</span>
            </div>
            <input
              type="range"
              min="9.0"
              max="9.9"
              step="0.1"
              value={minEndurance}
              onChange={(e) => setMinEndurance(parseFloat(e.target.value))}
              className="w-full accent-[#0A0A0C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>9.0 (Standard)</span>
              <span>9.9 (Generational)</span>
            </div>
          </div>

          {/* Filter: Maximum Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-stone-600 uppercase">Max Investment</span>
              <span className="font-bold text-[#0A0A0C]">${priceMax}</span>
            </div>
            <input
              type="range"
              min="50"
              max="650"
              step="25"
              value={priceMax}
              onChange={(e) => setPriceMax(parseInt(e.target.value))}
              className="w-full accent-[#0A0A0C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>$50</span>
              <span>$650</span>
            </div>
          </div>

          {/* Filter: Warranty Duration */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600 block">
              Warranty Standard
            </label>
            <div className="space-y-1.5 text-xs font-sans">
              {[
                { id: "All", label: "All Guarantees" },
                { id: "10+ Years", label: "10+ Years or Greater" },
                { id: "Lifetime", label: "Lifetime Foundry / Heritage" },
              ].map((w) => (
                <label key={w.id} className="flex items-center gap-2 cursor-pointer text-stone-700">
                  <input
                    type="radio"
                    name="warranty"
                    checked={selectedWarranty === w.id}
                    onChange={() => setSelectedWarranty(w.id)}
                    className="accent-[#0A0A0C]"
                  />
                  <span>{w.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Boolean Toggles */}
          <div className="pt-3 border-t border-[#E5E5E9] space-y-3">
            {/* Repairable Only Toggle */}
            <label className="flex items-center justify-between text-xs font-sans cursor-pointer text-stone-800">
              <span className="flex items-center gap-1.5 font-medium">
                <Wrench className="h-3.5 w-3.5 text-[#EA580C]" />
                <span>Field Repairable Only</span>
              </span>
              <input
                type="checkbox"
                checked={onlyRepairable}
                onChange={(e) => setOnlyRepairable(e.target.checked)}
                className="accent-[#0A0A0C] h-4 w-4 rounded cursor-pointer"
              />
            </label>

            {/* In-Stock Only */}
            <label className="flex items-center justify-between text-xs font-sans cursor-pointer text-stone-800">
              <span className="font-medium">In-Stock Nodes Only</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-[#0A0A0C] h-4 w-4 rounded cursor-pointer"
              />
            </label>

            {/* Wishlist Only */}
            <label className="flex items-center justify-between text-xs font-sans cursor-pointer text-stone-800">
              <span className="flex items-center gap-1.5 font-medium">
                <Heart className="h-3.5 w-3.5 text-rose-500" />
                <span>Wishlist Only ({favoritesCount})</span>
              </span>
              <input
                type="checkbox"
                checked={showOnlyFavorites}
                onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                className="accent-[#0A0A0C] h-4 w-4 rounded cursor-pointer"
              />
            </label>
          </div>
        </aside>

        {/* Right Area: Sort & Product Grid (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Sort & Filter Toggle */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9]">
            <div className="text-xs font-mono text-stone-600">
              Showing <span className="font-bold text-black">{filteredProducts.length}</span> objects
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden px-3 py-1.5 rounded-full border border-[#E5E5E9] bg-white text-xs font-mono font-bold flex items-center gap-1.5"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filters</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-stone-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E5E9] text-xs font-sans font-semibold text-stone-900 focus:outline-none cursor-pointer shadow-xs"
                >
                  <option value="featured">Featured Atelier Order</option>
                  <option value="endurance">Highest Endurance Score</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Verified Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-16 rounded-3xl bg-[#F9F9FB] border border-[#E5E5E9] text-center space-y-4">
              <ShieldCheck className="h-10 w-10 text-stone-400 mx-auto" />
              <h3 className="text-lg font-sans font-black text-[#0A0A0C] uppercase">
                No Canonical Objects Matched Current Filters
              </h3>
              <p className="text-xs text-stone-500 font-sans max-w-md mx-auto">
                Try widening your price range, clearing specific filters, or browsing other craft departments.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#0A0A0C] text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
