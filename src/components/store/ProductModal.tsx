"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Heart,
  Star,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Leaf,
  Info,
} from "lucide-react";
import { Product } from "@/types/store";
import { useStore } from "@/context/StoreContext";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenCheckout,
}) => {
  const { addToCart, toggleFavorite, isFavorite } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [userSelectedColor, setUserSelectedColor] = useState<string>("");
  const activeColor = userSelectedColor || product?.colors?.[0]?.name || "";

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, activeColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, activeColor);
    onClose();
    if (onOpenCheckout) onOpenCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F7F5F0] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200 text-[#1C1917] border border-[#E4DFD5]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4DFD5] bg-white/80">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span className="px-2 py-0.5 rounded-sm bg-[#1C1917] text-[#F7F5F0] font-semibold text-[10px]">
              CANONICAL SKU
            </span>
            <span>{product.canonicalSku || "AG-MASTER-001"}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="w-full h-80 sm:h-96 bg-white rounded-2xl p-6 flex items-center justify-center border border-[#E4DFD5] relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#1C1917] text-[#F7F5F0]">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-stone-600 font-sans">
                <div className="p-2 rounded-xl bg-white border border-[#E4DFD5] flex flex-col items-center gap-1">
                  <Leaf className="h-3.5 w-3.5 text-[#5E6857]" />
                  <span>Plastic-Free</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E4DFD5] flex flex-col items-center gap-1">
                  <RotateCcw className="h-3.5 w-3.5 text-stone-800" />
                  <span>30-Day Trial</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#E4DFD5] flex flex-col items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#C2673D]" />
                  <span>2038 Parts</span>
                </div>
              </div>
            </div>

            {/* Right: Details & Buying Actions */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-[#C2673D] uppercase tracking-widest font-sans">
                  {product.provenance?.origin || product.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] leading-tight">
                  {product.title}
                </h2>

                {/* Ratings & Keep Rate */}
                <div className="flex items-center gap-3 text-xs pt-1">
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
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span className="text-[11px] font-bold text-[#5E6857] bg-[#5E6857]/10 px-2 py-0.5 rounded-full">
                    {product.honestyDossier?.keepRate || 97.4}% Keep Rate
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-serif font-bold text-[#1C1917]">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-base text-stone-400 line-through font-serif">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Select Finish: <span className="font-serif text-[#C2673D]">{activeColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setUserSelectedColor(color.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-2 cursor-pointer ${
                          activeColor === color.name
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

              {/* Quantity Picker & Add to Favorites */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center border border-[#E4DFD5] rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-7 w-7 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-7 w-7 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                    favorited
                      ? "border-rose-300 bg-rose-50 text-rose-600"
                      : "border-[#E4DFD5] hover:border-stone-400 text-stone-700 bg-white"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorited ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>{favorited ? "Saved in Wishlist" : "Save to Wishlist"}</span>
                </button>
              </div>

              {/* Buying CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-6 rounded-full bg-[#1C1917] hover:bg-stone-800 text-[#F7F5F0] text-xs font-semibold tracking-wider uppercase shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-full bg-[#C2673D] hover:bg-[#a3522c] text-white text-xs font-bold tracking-wider uppercase shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Zap className="h-4 w-4 fill-white" />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
