"use client";

import React, { useState, useMemo } from "react";
import { Star, ChevronDown, SlidersHorizontal, Check } from "lucide-react";
import { AMAZON_PRODUCTS, AmazonProduct } from "@/data/amazonProducts";
import { ProductCard } from "./ProductCard";
import { useCart } from "@/context/CartContext";

interface ProductCatalogProps {
  onOpenQuickView: (product: AmazonProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onOpenQuickView }) => {
  const { searchQuery, selectedCategory, setSelectedCategory } = useCart();

  // Filters state
  const [onlyPrime, setOnlyPrime] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Departments list with counts
  const departments = [
    "All Departments",
    "Electronics",
    "Computers & Gaming",
    "Audio",
    "Home & Kitchen",
    "Fashion",
  ];

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return AMAZON_PRODUCTS.filter((prod) => {
      // Category filter
      if (
        selectedCategory !== "All Departments" &&
        selectedCategory !== "Today's Deals" &&
        prod.category !== selectedCategory
      ) {
        return false;
      }

      // Deals filter
      if (selectedCategory === "Today's Deals" && !prod.discountPercent) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesCategory = prod.category.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // Prime filter
      if (onlyPrime && !prod.isPrime) {
        return false;
      }

      // Rating filter
      if (minRating !== null && prod.rating < minRating) {
        return false;
      }

      // Price filter
      if (priceRange === "under-50" && prod.price >= 50) return false;
      if (priceRange === "50-100" && (prod.price < 50 || prod.price > 100)) return false;
      if (priceRange === "100-300" && (prod.price < 100 || prod.price > 300)) return false;
      if (priceRange === "300-plus" && prod.price < 300) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, onlyPrime, minRating, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("All Departments");
    setOnlyPrime(false);
    setMinRating(null);
    setPriceRange("all");
    setSortBy("featured");
  };

  return (
    <section id="product-catalog" className="max-w-[1500px] mx-auto px-3 sm:px-6 py-6">
      {/* Top Results Header Bar */}
      <div className="bg-white p-3 rounded-sm border border-stone-200/80 shadow-2xs mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-stone-500">
            Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span>{" "}
            results for{" "}
          </span>
          <span className="font-bold text-[#c7511f]">
            {searchQuery ? `"${searchQuery}"` : selectedCategory}
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <label className="text-stone-600 font-medium">Sort by:</label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-stone-100 border border-stone-300 rounded py-1 pl-2.5 pr-7 font-medium text-stone-800 cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#f3a847]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
            </select>
            <ChevronDown className="h-3 w-3 text-stone-600 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filters Sidebar */}
        <aside className="lg:col-span-3 bg-white p-4 rounded-sm border border-stone-200 shadow-2xs space-y-5 text-xs text-stone-800">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
              <SlidersHorizontal className="h-4 w-4 text-stone-700" />
              <span>Filters</span>
            </div>
            {(onlyPrime || minRating !== null || priceRange !== "all" || selectedCategory !== "All Departments") && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#007185] hover:text-[#c7511f] font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="space-y-1.5">
            <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Department
            </div>
            <div className="space-y-1 pl-1">
              {departments.map((dept) => {
                const isSelected = selectedCategory === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedCategory(dept)}
                    className={`block w-full text-left py-0.5 hover:text-[#c7511f] transition-colors ${
                      isSelected
                        ? "font-bold text-[#c7511f]"
                        : "text-stone-700"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prime Eligible Filter */}
          <div className="space-y-2 border-t pt-3">
            <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Amazon Prime
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyPrime}
                onChange={(e) => setOnlyPrime(e.target.checked)}
                className="rounded border-stone-300 text-[#f3a847] focus:ring-[#f3a847]"
              />
              <span className="font-extrabold text-sm text-[#00a8e1] tracking-tighter italic">
                ✓prime
              </span>
              <span className="text-[11px] text-stone-600">Free Next-Day</span>
            </label>
          </div>

          {/* Customer Reviews Filter */}
          <div className="space-y-2 border-t pt-3">
            <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Customer Reviews
            </div>
            <div className="space-y-1.5 pl-1">
              {[4, 3].map((stars) => {
                const isSelected = minRating === stars;
                return (
                  <button
                    key={stars}
                    onClick={() => setMinRating(isSelected ? null : stars)}
                    className={`flex items-center gap-1.5 w-full text-left py-0.5 hover:text-[#c7511f] ${
                      isSelected ? "font-bold text-[#c7511f]" : ""
                    }`}
                  >
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < stars
                              ? "fill-amber-500"
                              : "fill-stone-200 text-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 border-t pt-3">
            <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Price
            </div>
            <div className="space-y-1 pl-1">
              {[
                { id: "all", label: "All Prices" },
                { id: "under-50", label: "Under $50" },
                { id: "50-100", label: "$50 to $100" },
                { id: "100-300", label: "$100 to $300" },
                { id: "300-plus", label: "$300 & Above" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriceRange(p.id)}
                  className={`block w-full text-left py-0.5 hover:text-[#c7511f] ${
                    priceRange === p.id
                      ? "font-bold text-[#c7511f]"
                      : "text-stone-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded text-center border border-stone-200 space-y-3">
              <h3 className="text-base font-bold text-stone-800">
                No matching products found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try clearing your search query or adjusting your filters to see more results.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 text-xs font-bold shadow-2xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenQuickView={onOpenQuickView}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

