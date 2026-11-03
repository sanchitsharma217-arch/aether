"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, Heart, Search, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/mockProducts";
import { Product } from "@/types/store";
import { ProductCard } from "./ProductCard";
import { useStore } from "@/context/StoreContext";

interface ProductSectionProps {
  onOpenQuickView: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ onOpenQuickView }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    favorites,
    favoritesCount,
    setIsFavoritesOpen,
  } = useStore();

  const [sortBy, setSortBy] = useState<string>("featured");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== "All" && prod.category !== selectedCategory) {
        return false;
      }

      // Favorites only toggle
      if (showOnlyFavorites && !favorites.includes(prod.id)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesCategory = prod.category.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesDesc) {
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
  }, [selectedCategory, showOnlyFavorites, favorites, searchQuery, sortBy]);

  return (
    <section id="products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
            Curated Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {showOnlyFavorites
              ? `My Favorites (${filteredProducts.length})`
              : selectedCategory === "All"
              ? "All Products"
              : selectedCategory}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Showing {filteredProducts.length} of {PRODUCTS.length} curated essentials
          </p>
        </div>

        {/* Filter Controls & Favorite Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick "Saved Favorites Only" Filter Toggle */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
              showOnlyFavorites
                ? "bg-rose-50 border-rose-300 text-rose-600 shadow-2xs"
                : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"
            }`}
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                showOnlyFavorites ? "fill-rose-500 text-rose-500" : "text-stone-500"
              }`}
            />
            <span>Saved Favorites</span>
            {favoritesCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-stone-200 rounded-full py-2 pl-3.5 pr-8 text-xs font-semibold text-stone-700 hover:border-stone-400 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-stone-900 shadow-2xs"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-stone-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(searchQuery || selectedCategory !== "All" || showOnlyFavorites) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-stone-400 font-medium">Active filters:</span>

          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-medium">
              <span>Category: {selectedCategory}</span>
              <button
                onClick={() => setSelectedCategory("All")}
                className="hover:text-stone-950"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-medium">
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <button
                onClick={() => setSearchQuery("")}
                className="hover:text-stone-950"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {showOnlyFavorites && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium">
              <span>Favorites Only</span>
              <button
                onClick={() => setShowOnlyFavorites(false)}
                className="hover:text-rose-950"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setShowOnlyFavorites(false);
            }}
            className="text-xs text-stone-500 hover:text-stone-900 underline ml-2"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 max-w-md mx-auto my-8">
          <div className="h-12 w-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-800">No products found</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {showOnlyFavorites
                ? "You haven't added any products from this category to your favorites yet. Click the heart icon on any card to save it."
                : "We couldn't find any items matching your current filters or search term."}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setShowOnlyFavorites(false);
            }}
            className="px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      )}
    </section>
  );
};

