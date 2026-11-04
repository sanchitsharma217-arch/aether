"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowRight, Share2, Sparkles, Leaf } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function FavoritesPage() {
  const {
    favoriteProducts,
    favoritesCount,
    toggleFavorite,
    addToCart,
    showToast,
  } = useStore();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Wishlist link copied to clipboard! 📋", "fav");
    } else {
      showToast("Wishlist ready to share!", "fav");
    }
  };

  const handleAddAllToCart = () => {
    favoriteProducts.forEach((p) => addToCart(p, 1));
    showToast(`Added all ${favoritesCount} saved objects to your bag! 🌿`, "cart");
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
        <span className="font-semibold text-stone-900">Personal Collection</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E4DFD5]">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C1917] tracking-tight">
              Saved Objects of Permanence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
            {favoritesCount} {favoritesCount === 1 ? "object" : "objects"} saved in your private contemplation archive
          </p>
        </div>

        {favoritesCount > 0 && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E4DFD5] hover:border-stone-400 text-xs font-medium text-stone-700 bg-white btn-tactile-white transition-all cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Collection</span>
            </button>

            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1C1917] hover:bg-black text-[#F7F5F0] text-xs font-medium btn-tactile transition-all cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add All to Bag</span>
            </button>
          </div>
        )}
      </div>

      {/* Body List */}
      {favoritesCount === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E4DFD5] p-12 sm:p-20 text-center space-y-4 max-w-lg mx-auto my-12 shadow-2xs">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-[#F7F5F0] flex items-center justify-center text-stone-400">
            <Heart className="h-8 w-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-serif text-[#1C1917]">Your collection is empty</h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-sm mx-auto font-sans">
              Explore our master ateliers and save objects of utility to contemplate them for your living rituals.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1C1917] text-[#F7F5F0] hover:bg-black text-xs font-medium tracking-wider uppercase btn-tactile transition-all cursor-pointer"
            >
              <span>Explore Objects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {favoriteProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-[#E4DFD5] p-4 flex flex-col justify-between hover:shadow-lg transition-all relative group"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                      {prod.canonicalSku || prod.category}
                    </span>
                    <button
                      onClick={() => toggleFavorite(prod.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <Link href={`/product/${prod.id}`}>
                    <div className="h-48 w-full bg-[#EFECE6]/50 rounded-2xl flex items-center justify-center p-3 mb-3 overflow-hidden group-hover:bg-[#EFECE6]/80 transition-colors border border-[#E4DFD5]/50">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h3 className="text-sm font-serif font-bold text-[#1C1917] line-clamp-1 group-hover:text-[#C2673D] transition-colors">
                      {prod.title}
                    </h3>
                  </Link>

                  <div className="text-base font-serif font-bold text-[#1C1917] mt-2">
                    ${prod.price}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 mt-3 flex items-center gap-2">
                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#1C1917] hover:bg-black text-[#F7F5F0] text-xs font-medium flex items-center justify-center gap-1.5 btn-tactile transition-all cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Move to Bag</span>
                  </button>

                  <Link
                    href={`/product/${prod.id}`}
                    className="p-2 rounded-lg border border-[#E4DFD5] hover:border-stone-900 text-stone-600 transition-colors text-xs flex items-center justify-center"
                    title="View Canonical Page"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
