"use client";

import React, { useState } from "react";
import { Star, Check, ShoppingCart, Eye } from "lucide-react";
import { AmazonProduct } from "@/data/amazonProducts";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: AmazonProduct;
  onOpenQuickView: (product: AmazonProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
}) => {
  const { addToCart, userZip } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const wholePrice = Math.floor(product.price);
  const fractionalCents = Math.round((product.price - wholePrice) * 100)
    .toString()
    .padStart(2, "0");

  return (
    <article
      onClick={() => onOpenQuickView(product)}
      className="group bg-white rounded border border-stone-200/80 p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-200 cursor-pointer relative"
    >
      <div>
        {/* Amazon Badge (Best Seller / Amazon's Choice) */}
        <div className="min-h-6 mb-2">
          {product.isBestSeller && (
            <span className="inline-block bg-[#e67a00] text-white text-[10px] font-bold px-2 py-0.5 rounded-r shadow-2xs -ml-4">
              #1 Best Seller
            </span>
          )}
          {product.isAmazonChoice && !product.isBestSeller && (
            <span className="inline-block bg-[#232f3e] text-white text-[10px] font-bold px-2 py-0.5 rounded -ml-2">
              Amazon&apos;s <span className="text-[#f3a847]">Choice</span>
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="h-52 w-full bg-stone-50 rounded flex items-center justify-center p-3 mb-3 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Quick Look overlay button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-stone-900 border border-stone-300 px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-stone-100"
          >
            <Eye className="h-3.5 w-3.5 text-stone-600" />
            <span>Quick Look</span>
          </button>
        </div>

        {/* Title */}
        <h3 className="text-sm font-normal text-stone-900 line-clamp-2 group-hover:text-[#c7511f] leading-snug mb-1.5">
          {product.title}
        </h3>

        {/* Ratings and Reviews */}
        <div className="flex items-center gap-1.5 mb-1 text-xs">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-500"
                    : "fill-amber-200 text-amber-300"
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-stone-800">{product.rating}</span>
          <span className="text-[#007185] hover:text-[#c7511f]">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Social Proof label */}
        <div className="text-[11px] text-stone-500 mb-2">
          {product.boughtPastMonth} bought in past month
        </div>

        {/* Price Block */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            {product.discountPercent && (
              <span className="text-[#cc0c39] font-light text-xl">
                -{product.discountPercent}%
              </span>
            )}

            <div className="flex items-start text-stone-900 font-bold">
              <span className="text-xs mt-0.5">$</span>
              <span className="text-2xl leading-none">{wholePrice}</span>
              <span className="text-xs leading-none">{fractionalCents}</span>
            </div>
          </div>

          {product.originalPrice && (
            <div className="text-xs text-stone-500">
              List Price:{" "}
              <span className="line-through">${product.originalPrice.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Prime Badge & Delivery Information */}
        {product.isPrime && (
          <div className="space-y-0.5 text-xs text-stone-800 mb-3">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm text-[#00a8e1] tracking-tighter italic">
                ✓prime
              </span>
              <span className="font-bold text-stone-900">One-Day</span>
            </div>
            <div className="text-xs">
              FREE delivery <span className="font-bold">{product.deliveryDate}</span>
            </div>
          </div>
        )}

        <div className="text-[11px] text-stone-500 mb-3">
          Ships to <span className="font-medium text-stone-700">{userZip}</span>
        </div>
      </div>

      {/* Add to Cart Action */}
      <div className="pt-2">
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-full text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 text-stone-800" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};

