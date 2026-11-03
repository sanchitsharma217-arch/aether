"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingCart,
  Zap,
  MapPin,
  Lock,
} from "lucide-react";
import { AmazonProduct } from "@/data/amazonProducts";
import { useCart } from "@/context/CartContext";

interface ProductDetailModalProps {
  product: AmazonProduct | null;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCheckout,
}) => {
  const { addToCart, userZip } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    onOpenCheckout();
  };

  const wholePrice = Math.floor(product.price);
  const fractionalCents = Math.round((product.price - wholePrice) * 100)
    .toString()
    .padStart(2, "0");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/65 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200 text-stone-900">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-stone-100 border-b border-stone-200 text-xs">
          <div className="text-stone-500 font-medium">
            Category: <span className="font-bold text-stone-800">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Product Details Content */}
        <div className="overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Product Image Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full h-80 sm:h-96 bg-stone-50 border border-stone-200 rounded-lg p-6 flex items-center justify-center relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
                {product.discountPercent && (
                  <span className="absolute top-4 left-4 bg-[#cc0c39] text-white text-xs font-black px-2 py-1 rounded">
                    -{product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center text-[11px] text-stone-600">
                <div className="p-2 border rounded flex flex-col items-center gap-1 bg-stone-50">
                  <Truck className="h-4 w-4 text-[#007185]" />
                  <span>Free Prime Delivery</span>
                </div>
                <div className="p-2 border rounded flex flex-col items-center gap-1 bg-stone-50">
                  <RotateCcw className="h-4 w-4 text-[#007185]" />
                  <span>30-Day Returns</span>
                </div>
                <div className="p-2 border rounded flex flex-col items-center gap-1 bg-stone-50">
                  <ShieldCheck className="h-4 w-4 text-[#007185]" />
                  <span>Top Brand Warranty</span>
                </div>
              </div>
            </div>

            {/* Center: Title, Pricing & Specifications */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <span className="text-xs text-[#007185] hover:underline cursor-pointer font-medium">
                  Visit the {product.specs?.Brand || "Store"}
                </span>
                <h2 className="text-lg sm:text-xl font-medium text-stone-900 leading-snug mt-1">
                  {product.title}
                </h2>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-2 text-xs border-b pb-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-500"
                          : "fill-amber-200 text-amber-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#007185] hover:underline cursor-pointer">
                  {product.reviewCount.toLocaleString()} ratings
                </span>
              </div>

              {/* Pricing */}
              <div className="space-y-1 border-b pb-4">
                <div className="flex items-baseline gap-2">
                  {product.discountPercent && (
                    <span className="text-[#cc0c39] font-light text-2xl">
                      -{product.discountPercent}%
                    </span>
                  )}
                  <div className="flex items-start text-stone-900 font-bold">
                    <span className="text-sm mt-0.5">$</span>
                    <span className="text-3xl leading-none">{wholePrice}</span>
                    <span className="text-sm leading-none">{fractionalCents}</span>
                  </div>
                </div>

                {product.originalPrice && (
                  <div className="text-xs text-stone-500">
                    Typical price:{" "}
                    <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                )}

                <div className="text-xs text-stone-600 pt-1">
                  No Import Fees Deposit & FREE Shipping to {userZip}
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-2 border-b pb-4">
                <div className="text-xs font-bold text-stone-900 uppercase">Specifications</div>
                <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <span className="text-stone-500 font-medium">{key}</span>
                      <span className="text-stone-900 font-semibold">{value}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* About this item Bullets */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-900 uppercase">About this item</div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-700 leading-relaxed">
                  {product.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Amazon Buy Box */}
            <div className="lg:col-span-3">
              <div className="border border-stone-300 rounded-lg p-5 bg-white shadow-xs space-y-4 text-xs">
                {/* Price in Buy Box */}
                <div>
                  <div className="flex items-start text-stone-900 font-bold">
                    <span className="text-xs mt-0.5">$</span>
                    <span className="text-2xl leading-none">{wholePrice}</span>
                    <span className="text-xs leading-none">{fractionalCents}</span>
                  </div>

                  <div className="mt-2 text-stone-800">
                    FREE delivery <span className="font-bold">{product.deliveryDate}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#007185] mt-1 text-[11px]">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>Deliver to {userZip}</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="text-sm font-bold text-emerald-700">
                  {product.stockStatus}
                </div>

                {/* Quantity selector */}
                <div className="flex items-center gap-2">
                  <label className="text-stone-700 font-medium">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="px-2 py-1 border rounded bg-stone-50 font-bold text-stone-900 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-2.5 px-4 rounded-full font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
                        <ShoppingCart className="h-4 w-4 text-stone-900" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-2.5 px-4 rounded-full font-bold bg-[#ffa41c] hover:bg-[#fa8900] text-stone-900 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Zap className="h-4 w-4 fill-stone-900" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Buy Box Security Meta */}
                <div className="pt-2 border-t space-y-1.5 text-[11px] text-stone-500">
                  <div className="flex items-center justify-between">
                    <span>Ships from</span>
                    <span className="font-semibold text-stone-800">Amazon.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sold by</span>
                    <span className="font-semibold text-stone-800">Amazon.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Returns</span>
                    <span className="text-[#007185]">30-day refund/replacement</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-600 pt-1">
                    <Lock className="h-3 w-3 text-stone-400" />
                    <span>Secure transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

