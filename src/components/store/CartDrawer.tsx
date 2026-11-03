"use client";

import React, { useEffect } from "react";
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Truck,
  Layers,
  Leaf,
  Plus,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { CartItem } from "@/types/store";

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
  } = useStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  // Group cart items by vendor/shipment
  const shipmentGroups: {
    vendorName: string;
    location: string;
    speed: string;
    items: CartItem[];
  }[] = [];

  cart.forEach((item) => {
    const vendorName =
      item.selectedOffer?.sellerName ||
      item.product.primaryVendor?.name ||
      "Verified Master Atelier";
    const location =
      item.selectedOffer?.location ||
      item.product.primaryVendor?.location ||
      "Direct Guild";
    const speed =
      item.selectedOffer?.fulfillmentSpeed || "Batched Regional Courier";

    let group = shipmentGroups.find((g) => g.vendorName === vendorName);
    if (!group) {
      group = { vendorName, location, speed, items: [] };
      shipmentGroups.push(group);
    }
    group.items.push(item);
  });

  // Financial breakdown calculation
  const merchantNet = (cartSubtotal * 0.93).toFixed(2);
  const platformFee = (cartSubtotal * 0.07).toFixed(2);
  const total = cartSubtotal.toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs animate-in fade-in transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg h-full bg-[#F9F9FB] shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-250 text-[#0A0A0C] border-l border-[#E5E5E9]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E9] bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-emerald-600" />
            <div>
              <h2 className="text-sm font-sans font-black tracking-tight uppercase">
                Universal Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
              </h2>
              <div className="text-[10px] font-mono text-[#64646E]">
                {shipmentGroups.length} {shipmentGroups.length === 1 ? "Shipment" : "Batched Shipments"} · Multi-Vendor Consolidation
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 text-[#64646E] hover:text-[#0A0A0C] transition-colors cursor-pointer"
            aria-label="Close Bag"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 4PL Batch Transit Banner */}
        <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-800">
            <Truck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="font-bold">Unified 4PL Transit:</span>
            <span>All packages consolidated ($0.00)</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-sans font-bold">100% Batched</span>
        </div>

        {/* Scrollable Body: Grouped by Shipment Packages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-white flex items-center justify-center text-stone-400 border border-[#E6E4DF] ambient-card">
                <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Your universal bag is empty
                </h3>
                <p className="text-xs text-[#6E6B65] max-w-xs mx-auto leading-relaxed">
                  Discover canonical objects crafted for permanent utility across verified ateliers.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#121110] text-[#F7F6F3] hover:bg-black text-xs font-semibold tracking-wider uppercase shadow-2xs transition-colors cursor-pointer"
              >
                Browse Canonical Archive
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {shipmentGroups.map((group, groupIdx) => (
                <div
                  key={group.vendorName}
                  className="bg-white rounded-2xl border border-[#E6E4DF] p-4 ambient-card space-y-3"
                >
                  {/* Shipment Group Header */}
                  <div className="flex items-start justify-between pb-2 border-b border-[#E6E4DF] text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#A84B29] font-bold uppercase">
                        <Building2 className="h-3 w-3" />
                        <span>
                          Shipment {groupIdx + 1} of {shipmentGroups.length}
                        </span>
                      </div>
                      <div className="font-serif font-bold text-sm text-[#121110]">
                        {group.vendorName}
                      </div>
                      <div className="text-[11px] text-[#6E6B65]">
                        Origin: {group.location}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#1E3A8A] bg-[#EEF4FF] px-2 py-0.5 rounded-full">
                      {group.speed}
                    </span>
                  </div>

                  {/* Items in this Shipment */}
                  <div className="space-y-3 divide-y divide-stone-100">
                    {group.items.map((item) => (
                      <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3.5">
                        {/* Thumbnail */}
                        <div className="h-16 w-16 bg-[#F7F6F3] rounded-xl p-1 border border-[#E6E4DF] flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-serif font-bold text-[#121110] line-clamp-1 leading-snug">
                              {item.product.title}
                            </h4>
                            <span className="text-xs font-mono font-bold text-[#121110] shrink-0">
                              ${item.product.price * item.quantity}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] font-mono text-[#6E6B65]">
                            <span>SKU: {item.product.canonicalSku || item.product.id}</span>
                            {item.selectedOffer?.condition && (
                              <span>· {item.selectedOffer.condition}</span>
                            )}
                          </div>

                          {/* Stepper & Delete */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center border border-[#E6E4DF] rounded-full bg-[#F7F6F3] px-2 py-0.5 text-xs">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="px-1.5 text-[#6E6B65] hover:text-black font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 font-mono font-semibold text-[#121110]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="px-1.5 text-[#6E6B65] hover:text-black font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-[#6E6B65] hover:text-rose-600 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Transparent Direct Settlement Ledger */}
        {cart.length > 0 && (
          <div className="border-t border-[#E5E5E9] p-6 bg-white space-y-4">
            {/* Transparent Fee Ledger */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#64646E]">
                <span>Gross Order Value</span>
                <span className="font-bold text-[#0A0A0C]">${total}</span>
              </div>

              <div className="flex justify-between text-emerald-700">
                <span>Direct Maker Retention (93.0%)</span>
                <span className="font-bold">${merchantNet}</span>
              </div>

              <div className="flex justify-between text-[#64646E]">
                <span>Network Infrastructure Fee (7.0%)</span>
                <span>${platformFee}</span>
              </div>

              <div className="flex justify-between text-blue-700">
                <span>Batched Regional Node Transit</span>
                <span className="font-bold">FREE ($0.00)</span>
              </div>

              <div className="border-t border-[#E5E5E9] pt-2 flex justify-between text-base font-bold text-[#0A0A0C]">
                <span className="font-sans font-black uppercase">Universal Total</span>
                <span className="font-mono">${total}</span>
              </div>
            </div>

            {/* Checkout Action Button with Deep Obsidian #0D0D0D */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onOpenCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#0D0D0D] hover:bg-black text-white font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to Universal Checkout</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </button>

            <div className="flex items-center justify-between text-[10px] text-[#64646E] font-sans pt-1">
              <span className="flex items-center gap-1 font-mono">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                Non-Custodial Direct Settlement (Simulated Sandbox)
              </span>
              <button
                onClick={clearCart}
                className="hover:text-rose-600 transition-colors underline cursor-pointer font-mono"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
