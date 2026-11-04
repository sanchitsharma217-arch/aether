"use client";

import React, { useState } from "react";
import { X, Lock, CheckCircle2, ShieldCheck, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal, cartCount, clearCart } = useStore();

  const [formData, setFormData] = useState({
    name: "Alex Morgan",
    email: "alex@example.com",
    address: "742 Evergreen Terrace",
    city: "San Francisco",
    zip: "94103",
  });

  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const shipping = cartSubtotal >= 150 ? 0 : 12;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  const handleCloseAll = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={handleCloseAll} />

      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 text-stone-900">
        {/* Top Sandbox Notice Banner */}
        <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-900 text-[11px] font-mono flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
            SIMULATED CHECKOUT PROTOCOL · SANDBOX ENVIRONMENT
          </span>
          <span className="text-amber-800 text-[10px] hidden sm:inline">No real payment cards or financial accounts will be charged</span>
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
            <Lock className="h-4 w-4 text-emerald-600" />
            <span>Non-Custodial Direct Settlement Simulator</span>
          </div>
          <button
            onClick={handleCloseAll}
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {isOrdered ? (
            <div className="text-center py-12 space-y-5 animate-in zoom-in-95">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest font-mono">
                  Simulated Order #NOV-84920 Authorized
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Direct Maker Allocation Confirmed
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                  This demonstration simulated non-custodial direct merchant settlement: 93% allocated directly to verified guild ateliers with a 7% network routing fee. A simulated confirmation was sent to{" "}
                  <span className="font-semibold text-stone-900">{formData.email}</span>.
                </p>
              </div>

              <div className="max-w-sm mx-auto p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-left space-y-1 text-xs">
                <div className="font-bold text-stone-900">Shipping to:</div>
                <div className="text-stone-600">
                  {formData.name} <br />
                  {formData.address}, {formData.city} {formData.zip}
                </div>
                <div className="text-emerald-700 font-semibold pt-1">
                  Estimated Delivery: 2–3 Business Days
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleCloseAll}
                  className="px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold shadow-xs transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Customer and Shipping Form */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                    Contact & Delivery Address
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Email Address</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Street Address</label>
                      <input
                        required
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 font-medium mb-1">City</label>
                        <input
                          required
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 font-medium mb-1">ZIP / Postal</label>
                        <input
                          required
                          type="text"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Selection Mock */}
                <div className="pt-2 border-t space-y-2">
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    Settlement Protocol
                  </h4>
                  <div className="p-3.5 rounded-xl border border-stone-900 bg-stone-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-6 px-2 bg-stone-900 rounded text-emerald-400 text-[10px] font-mono font-bold flex items-center justify-center">
                        93% / 7%
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-semibold text-stone-900 block">Direct Merchant Settlement Protocol</span>
                        <span className="text-[10px] text-stone-500 font-mono block">93% Direct Maker Payout · 7% Network Fee</span>
                      </div>
                    </div>
                    <span className="text-emerald-700 font-mono font-bold text-[11px] bg-emerald-100/80 px-2 py-0.5 rounded">
                      Demo Mode
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-4 text-xs">
                  <h4 className="font-bold text-sm text-stone-900">
                    Order Summary ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </h4>

                  {/* Items mini list */}
                  <div className="max-h-40 overflow-y-auto divide-y space-y-1">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="py-1.5 flex items-center justify-between gap-2"
                      >
                        <span className="truncate text-stone-700">
                          {item.quantity}x {item.product.title}
                        </span>
                        <span className="font-semibold text-stone-900 shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3 space-y-1.5 text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-stone-900">
                        ${cartSubtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-700">
                        {shipping === 0 ? "FREE (Pilot Corridor)" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-stone-500 font-sans pt-1">
                      Complimentary consolidated dispatch on 8 pilot atelier corridors. Non-pilot orders route via direct atelier courier.
                    </div>
                    <div className="border-t pt-2 flex justify-between text-sm font-bold text-stone-900">
                      <span>Total Due</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0A0A0C] hover:bg-black text-white font-medium text-xs tracking-wider uppercase btn-tactile transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <span>Authorize Simulated Order (${total.toFixed(2)})</span>
                  </button>

                  <div className="text-[10px] text-stone-500 text-center flex items-center justify-center gap-1 font-mono">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>Non-Custodial Direct Settlement · 30-Day Evaluation Period</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

