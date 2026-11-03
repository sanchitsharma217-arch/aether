"use client";

import React, { useEffect } from "react";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const FavoritesDrawer: React.FC = () => {
  const {
    favoriteProducts,
    isFavoritesOpen,
    setIsFavoritesOpen,
    toggleFavorite,
    addToCart,
    favoritesCount,
  } = useStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFavoritesOpen(false);
    };
    if (isFavoritesOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isFavoritesOpen, setIsFavoritesOpen]);

  if (!isFavoritesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs animate-in fade-in transition-opacity"
        onClick={() => setIsFavoritesOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-250 text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
            <h2 className="text-base font-bold tracking-tight">
              My Favorites ({favoritesCount})
            </h2>
          </div>
          <button
            onClick={() => setIsFavoritesOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-stone-100">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                <Heart className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-stone-800">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Click the heart icon on any product to save your favorite items here for easy access.
                </p>
              </div>
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold shadow-xs transition-colors"
              >
                Discover Products
              </button>
            </div>
          ) : (
            favoriteProducts.map((prod) => (
              <div key={prod.id} className="pt-4 first:pt-0 flex gap-4">
                {/* Image */}
                <div className="h-20 w-20 bg-stone-100 rounded-lg p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                    {prod.category}
                  </div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 leading-snug">
                    {prod.title}
                  </h4>
                  <div className="text-sm font-bold text-stone-900">${prod.price}</div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        addToCart(prod, 1);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-2xs transition-all active:scale-95"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => toggleFavorite(prod.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">
              {favoritesCount} saved {favoritesCount === 1 ? "item" : "items"}
            </span>
            <button
              onClick={() => {
                favoriteProducts.forEach((p) => addToCart(p, 1));
                setIsFavoritesOpen(false);
              }}
              className="px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Add All to Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

