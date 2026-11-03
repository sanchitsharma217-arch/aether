"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Truck,
  Leaf,
  Clock,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    showToast,
  } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [transitMode, setTransitMode] = useState<"consolidated" | "split">("consolidated");
  const [isOrdered, setIsOrdered] = useState(false);

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(
    100,
    (cartSubtotal / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  // If consolidated eco mode, give extra $5 credit discount
  const ecoCreditDiscount = transitMode === "consolidated" ? 5 : 0;
  const shipping = remainingForFreeShipping === 0 ? 0 : 12;
  const tax = Math.max(0, (cartSubtotal - discountAmount - ecoCreditDiscount) * 0.08);
  const total = Math.max(0, cartSubtotal - discountAmount - ecoCreditDiscount + shipping + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "SLOW10" || code === "AETHER10" || code === "AETHER") {
      setDiscountPercent(10);
      setPromoApplied(true);
      showToast(`10% Code ${code} Applied!`, "cart");
    } else {
      showToast("Invalid code. Try using AETHER10", "cart");
    }
  };

  const handlePlaceOrder = () => {
    setIsOrdered(true);
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
        <span className="font-semibold text-stone-900">Curated Bag</span>
      </div>

      {isOrdered ? (
        <div className="bg-white rounded-3xl border border-[#E4DFD5] p-12 sm:p-20 text-center space-y-6 max-w-lg mx-auto my-12 shadow-sm animate-in zoom-in-95">
          <div className="h-16 w-16 mx-auto rounded-full bg-[#5E6857]/15 flex items-center justify-center text-[#5E6857]">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#EA580C] uppercase tracking-widest">
              CANONICAL ORDER #AE-91830 CONFIRMED
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
              Quiet utility begins here.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed font-sans">
              Your objects have been assigned to their respective certified master workshops. You will receive real-time inspection certificates and provenance updates as they are prepared.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E4DFD5] text-left text-xs space-y-1.5">
            <div className="flex items-center justify-between text-stone-800 font-semibold">
              <span className="flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5 text-[#5E6857]" />
                <span>Low-Impact 4PL Routing Active</span>
              </span>
              <span className="text-[#5E6857]">+50 Eco-Credits Awarded</span>
            </div>
            <p className="text-[11px] text-stone-500">
              Zero plastic tape. Unbleached organic cotton dust bags and FSC mycelium cushioning.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1917] text-[#F7F5F0] hover:bg-stone-800 text-xs font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              <span>Return to Archive</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : cartCount === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E4DFD5] p-12 sm:p-20 text-center space-y-4 max-w-lg mx-auto my-12 shadow-2xs">
          <div className="h-16 w-16 mx-auto rounded-full bg-[#F7F5F0] flex items-center justify-center text-stone-400">
            <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-serif text-[#1C1917]">Your curated bag is empty</h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-sm mx-auto font-sans">
              Discover mindful objects and harmonious daily rituals designed for a lifetime of quiet utility.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/#rituals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1917] text-[#F7F5F0] hover:bg-stone-800 text-xs font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              <span>Explore Living Rituals</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-8 pb-4 border-b border-[#E4DFD5]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2673D]">
              Intentional Checkout
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C1917] tracking-tight mt-0.5">
              Curated Bag ({cartCount} Objects)
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
              Direct-from-workshop provenance with decentralized low-impact routing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping & Low Carbon Alert */}
              <div className="p-4 rounded-2xl bg-[#EFECE6]/80 border border-[#E4DFD5] space-y-2 text-xs">
                {remainingForFreeShipping === 0 ? (
                  <div className="flex items-center gap-2 text-[#5E6857] font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-[#5E6857]" />
                    <span>Complimentary Low-Impact Regional Dispatch Unlocked!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-stone-700 font-medium font-sans">
                    <span>
                      Add <strong className="text-stone-950 font-serif">${remainingForFreeShipping.toFixed(0)}</strong> more to unlock Complimentary Low-Impact Delivery
                    </span>
                    <span className="font-bold text-stone-900 font-mono">
                      ${cartSubtotal.toFixed(0)} / ${freeShippingThreshold}
                    </span>
                  </div>
                )}
                <div className="w-full h-1.5 bg-[#E4DFD5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5E6857] rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-[#E4DFD5] divide-y divide-[#E4DFD5]/60 overflow-hidden shadow-2xs">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 rounded-xl bg-[#F7F5F0] border border-[#E4DFD5] p-2 flex items-center justify-center shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                          <span>{item.product.canonicalSku || "CANONICAL-SKU"}</span>
                          <span>•</span>
                          <span className="text-[#EA580C] font-semibold">
                            {item.selectedOffer?.sellerName || item.product.primaryVendor.name}
                          </span>
                        </div>
                        <h3 className="text-sm font-serif font-bold text-[#1C1917] leading-snug">
                          {item.product.title}
                        </h3>
                        {item.selectedColor && (
                          <div className="text-xs text-stone-500 font-sans">
                            Finish: <span className="font-serif text-stone-800">{item.selectedColor}</span>
                          </div>
                        )}
                        <div className="text-sm font-serif font-bold text-[#1C1917]">
                          ${item.product.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E4DFD5] rounded-full bg-white px-2.5 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-stone-500 hover:text-stone-900 font-bold px-1.5 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-900 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-stone-500 hover:text-stone-900 font-bold px-1.5 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-serif font-bold text-[#1C1917]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[11px] text-stone-400 hover:text-[#C2673D] transition-colors mt-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AETHER 4PL LOGISTICS MESH: Low-Impact Transit Selector */}
              <div className="rounded-3xl border border-[#E4DFD5] bg-[#F4F1EA] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-[#5E6857]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Decentralized 4PL Logistics Mesh
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">Zero-Waste Routing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Option 1: Consolidated */}
                  <div
                    onClick={() => setTransitMode("consolidated")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      transitMode === "consolidated"
                        ? "border-[#1C1917] bg-white ring-1 ring-[#1C1917] shadow-2xs"
                        : "border-[#E4DFD5] bg-white/70 hover:border-stone-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900 font-serif">
                        Consolidated Linen Parcel
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5E6857] text-white font-bold">
                        -$5 Eco Credit
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                      Clusters all objects into 1 zero-waste delivery window. Offsets 4.2kg carbon + awards +50 platform credits.
                    </p>
                  </div>

                  {/* Option 2: Split */}
                  <div
                    onClick={() => setTransitMode("split")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      transitMode === "split"
                        ? "border-[#1C1917] bg-white ring-1 ring-[#1C1917] shadow-2xs"
                        : "border-[#E4DFD5] bg-white/70 hover:border-stone-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900 font-serif">
                        Split Rapid Dispatch
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">Standard</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                      Separate dispatches directly from each artisan workshop as hand-inspections conclude.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Order Summary & Checkout Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-[#E4DFD5] p-6 shadow-2xs space-y-6">
                <h3 className="text-base font-serif font-bold text-[#1C1917]">Atelier Summary</h3>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-xs font-medium text-stone-600 font-sans">
                    Patron Invitation / Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SLOW10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-[#E4DFD5] text-xs focus:ring-2 focus:ring-[#C2673D]/30 focus:outline-hidden font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-[#F7F5F0] text-xs font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="text-[11px] text-[#5E6857] flex items-center gap-1 font-semibold">
                      <Tag className="h-3 w-3" />
                      <span>10% Slow-Living Code Applied</span>
                    </div>
                  )}
                </form>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-2 border-t border-[#E4DFD5] text-xs text-stone-600 font-sans">
                  <div className="flex justify-between">
                    <span>Objects Subtotal</span>
                    <span className="font-semibold text-stone-900 font-mono">
                      ${cartSubtotal.toFixed(2)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#5E6857]">
                      <span>Patron Discount (10%)</span>
                      <span className="font-semibold font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {ecoCreditDiscount > 0 && (
                    <div className="flex justify-between text-[#5E6857]">
                      <span>Zero-Waste Linen Parcel Credit</span>
                      <span className="font-semibold font-mono">-${ecoCreditDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Low-Impact Shipping</span>
                    <span className="font-semibold text-[#5E6857] font-mono">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Certified Guild Tax</span>
                    <span className="font-semibold text-stone-900 font-mono">${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-[#E4DFD5] pt-3 flex justify-between text-base font-bold text-[#1C1917]">
                    <span className="font-serif">Total Investment</span>
                    <span className="font-serif">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 px-6 rounded-full bg-[#1C1917] hover:bg-stone-800 text-[#F7F5F0] font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Authorize Order (${total.toFixed(2)})</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 font-sans">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#5E6857]" />
                  <span>Verified 256-Bit Cryptographic Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
