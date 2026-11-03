"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, Heart, Search, X, Check, ShieldCheck, Leaf } from "lucide-react";
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
  } = useStore();

  const [sortBy, setSortBy] = useState<string>("featured");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(500);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== "All" && prod.category !== selectedCategory) {
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

      // Price filter
      if (prod.price > priceMax) {
        return false;
      }

      // Search query (matches title, category, description, SKU, materials, or origin)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesCategory = prod.category.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesSku = prod.canonicalSku?.toLowerCase().includes(q) || false;
        const matchesOrigin = prod.provenance?.origin.toLowerCase().includes(q) || false;
        const matchesArtisan = prod.provenance?.artisan.toLowerCase().includes(q) || false;
        if (!matchesTitle && !matchesCategory && !matchesDesc && !matchesSku && !matchesOrigin && !matchesArtisan) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, showOnlyFavorites, onlyInStock, priceMax, favorites, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setShowOnlyFavorites(false);
    setOnlyInStock(false);
    setPriceMax(500);
    setSortBy("featured");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500 mb-6 font-sans">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Atelier Archive
        </Link>
        <span>/</span>
        <span className="font-semibold text-stone-900">Objects Directory</span>
        {selectedCategory !== "All" && (
          <>
            <span>/</span>
            <span className="text-stone-700">{selectedCategory}</span>
          </>
        )}
      </div>

      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E5E5E9]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-[#EA580C] uppercase tracking-widest">
              CANONICAL DIRECTORY // ZERO SPONSORED ADS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-sans font-black text-[#0A0A0C] tracking-tight uppercase">
            {showOnlyFavorites
              ? `Saved Favorites (${filteredProducts.length})`
              : selectedCategory === "All"
              ? "All Canonical Objects"
              : selectedCategory}
          </h1>
          <p className="text-xs sm:text-sm text-[#64646E] mt-1 font-sans">
            Displaying {filteredProducts.length} certified master objects. Each item has a single verified master page.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Favorite Only Filter */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans font-semibold border transition-all cursor-pointer ${
              showOnlyFavorites
                ? "bg-rose-50 border-rose-300 text-rose-600 shadow-xs"
                : "bg-white border-[#E5E5E9] text-[#0A0A0C] hover:border-[#0A0A0C]"
            }`}
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                showOnlyFavorites ? "fill-rose-500 text-rose-500" : "text-stone-500"
              }`}
            />
            <span>Saved Wishlist</span>
            {favoritesCount > 0 && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
                {favoritesCount}
              </span>
            )}
          </motion.button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E5E5E9] rounded-full py-2 pl-3.5 pr-8 text-xs font-sans font-semibold text-[#0A0A0C] hover:border-[#0A0A0C] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#0A0A0C] shadow-xs"
            >
              <option value="featured">Sort by: Curated Merit</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Verified Rating</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-stone-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid & Filters Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filters Sidebar */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-3xl border border-[#E4DFD5] shadow-2xs space-y-6 text-xs text-stone-800 font-sans">
          <div className="flex items-center justify-between border-b border-[#E4DFD5] pb-3">
            <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
              <SlidersHorizontal className="h-4 w-4 text-stone-700" />
              <span>Archive Filters</span>
            </div>
            {(selectedCategory !== "All" || showOnlyFavorites || onlyInStock || priceMax < 500 || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#C2673D] hover:text-stone-950 font-medium cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Material Department
            </div>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left py-1.5 px-3 rounded-xl transition-colors cursor-pointer text-xs ${
                    selectedCategory === cat
                      ? "bg-[#1C1917] text-[#F7F5F0] font-semibold"
                      : "text-stone-600 hover:bg-[#F7F5F0]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-[#E4DFD5]">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-stone-900">
              <span>Max Investment</span>
              <span className="font-mono text-[#C2673D]">${priceMax}</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#C2673D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>$50</span>
              <span>$500</span>
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-2 border-t border-[#E4DFD5]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-[#E4DFD5] text-[#1C1917] focus:ring-0 h-4 w-4"
              />
              <span className="text-xs text-stone-700">Small Batch In-Stock Only</span>
            </label>
          </div>

          {/* Transparency Guarantee Note */}
          <div className="pt-4 border-t border-[#E4DFD5] text-[11px] text-stone-500 space-y-1.5">
            <div className="flex items-center gap-1 text-[#5E6857] font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero-Ad Integrity</span>
            </div>
            <p>
              Ranked solely by verified durability score and real return-to-order ratio.
            </p>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E4DFD5] p-12 text-center space-y-4">
              <div className="h-14 w-14 mx-auto rounded-full bg-[#F7F5F0] flex items-center justify-center text-stone-400">
                <Search className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-serif font-bold text-stone-900">No objects match your criteria</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto font-sans">
                  Try adjusting your price ceiling, clearing your search keywords, or selecting another department.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-full bg-[#1C1917] text-[#F7F5F0] text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
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
