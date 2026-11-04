"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Building2,
  ShieldCheck,
  ChevronRight,
  Eye,
  Check,
  Scale,
} from "lucide-react";
import { Product } from "@/types/store";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
  onOpenQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuickView }) => {
  const { addToCart, toggleFavorite, isFavorite, setActiveBuyBoxProduct, toggleCompare, isCompared } = useStore();

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const favorited = isFavorite(product.id);
  const compared = isCompared(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors?.[0]?.name, product.offers?.[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleOpenBuyBox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveBuyBoxProduct(product);
  };

  const displayedImage =
    isHovered && product.secondaryImage ? product.secondaryImage : activeImage;

  const durability = product.enduranceRubric?.score || product.lifespanScore || product.enduranceIndex?.score || 9.8;
  const sellerCount = product.offers?.length || product.verifiedSellersCount || 2;

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-white rounded-3xl border p-4 sm:p-5 flex flex-col justify-between floating-card transition-all duration-500 relative overflow-hidden ${
        compared ? "border-amber-400 ring-2 ring-amber-400/30" : "border-[#E5E5E9] hover:border-[#0A0A0C]"
      }`}
    >
      <div>
        {/* Top Badges & Durability Tag */}
        <div className="flex items-center justify-between mb-3 z-10 relative">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] font-mono font-medium uppercase tracking-wider text-[#64646E] bg-[#F1F1F4] border border-[#E5E5E9] px-2 py-0.5 rounded-md">
              {product.category}
            </span>
            {product.stockUrgency && (
              <span className="text-[9px] font-mono text-[#EA580C] bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md font-medium">
                {product.stockUrgency}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Compare Toggle Button */}
            <button
              type="button"
              onClick={handleCompareClick}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                compared
                  ? "bg-amber-100 text-amber-700 border border-amber-300"
                  : "text-stone-400 hover:text-amber-600 hover:bg-stone-100"
              }`}
              title={compared ? "Remove from comparison" : "Add to side-by-side comparison"}
              aria-label="Compare object"
            >
              <Scale className="h-3.5 w-3.5" />
            </button>

            {/* Durability score tag */}
            <span className="glass-pill inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-800 px-2 py-0.5 rounded-md shadow-xs">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>{durability}</span>
            </span>

            {/* Heart / Wishlist Button */}
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                favorited
                  ? "bg-rose-50 text-rose-500"
                  : "text-stone-400 hover:text-[#0A0A0C] hover:bg-stone-100"
              }`}
              title={favorited ? "Remove from Wishlist" : "Save to Wishlist"}
              aria-label="Wishlist"
            >
              <Heart
                className={`h-3.5 w-3.5 ${
                  favorited ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4:5 Vertical Image Frame with Magazine-Quality Studio Lighting & Deep Shadow */}
        <div
          onClick={handleOpenBuyBox}
          className="aspect-[4/5] w-full bg-gradient-to-b from-[#F8F8FA] to-[#EFEFF3] rounded-2xl flex items-center justify-center p-4 mb-3.5 relative overflow-hidden border border-[#E5E5E9] cursor-pointer"
        >
          <img
            src={displayedImage}
            alt={product.title}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)] group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Canonical SKU Watermark */}
          <div className="absolute bottom-2 left-2.5 text-[9px] font-mono font-bold text-[#64646E] glass-pill px-2 py-0.5 rounded shadow-xs">
            {product.canonicalSku}
          </div>
        </div>

        {/* Vendor Attribution Row */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#EA580C] font-semibold font-sans mb-1 truncate">
          <Building2 className="h-3 w-3 shrink-0 text-[#EA580C]" />
          <span className="truncate">
            {product.primaryVendor.name}
          </span>
          {product.provenance?.origin && (
            <span className="text-[#64646E] text-[10px] font-normal">
              ({product.provenance.origin.split(",")[0]})
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={handleOpenBuyBox}
          className="text-sm font-sans font-black tracking-tight text-[#0A0A0C] group-hover:text-black line-clamp-1 leading-snug cursor-pointer mb-2"
        >
          {product.title}
        </h3>

        {/* Current Best Offer & Multi-Seller Button */}
        <div className="pt-2 border-t border-[#E5E5E9] mb-3 space-y-1">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-mono font-black text-[#0A0A0C]">
                ${product.price}.00
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#64646E] line-through font-mono">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <span className="text-[10px] font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
              In Stock · Fast Mesh
            </span>
          </div>

          {/* Interactive Multi-Vendor Link: Opens Buy Box Drawer */}
          <button
            onClick={handleOpenBuyBox}
            className="w-full text-left flex items-center justify-between text-[11px] text-blue-700 hover:text-[#0A0A0C] font-sans font-semibold transition-colors pt-0.5 group/seller cursor-pointer"
          >
            <span>{sellerCount} verified node offers</span>
            <ChevronRight className="h-3 w-3 group-hover/seller:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Action Buttons: [ Inspect Dossier / 360° ] & [ Quick Add ] */}
      <div className="pt-2 border-t border-[#E5E5E9] flex items-center gap-2">
        <Link
          href={`/product/${product.id}`}
          className="flex-1 py-2 px-3 rounded-lg bg-[#F9F9FB] border border-[#E5E5E9] hover:border-[#0A0A0C] hover:bg-white text-[#0A0A0C] text-xs font-sans font-medium btn-tactile-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5 text-[#64646E]" />
          <span>Canonical Dossier</span>
        </Link>

        <button
          onClick={handleQuickAdd}
          className="p-2 rounded-lg bg-[#0D0D0D] hover:bg-black text-white text-xs font-medium btn-tactile transition-all flex items-center justify-center cursor-pointer shrink-0"
          title="Quick Add Best Match Offer"
          aria-label="Quick Add"
        >
          {justAdded ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
          )}
        </button>
      </div>
    </article>
  );
};
