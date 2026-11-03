"use client";

import React, { useState } from "react";
import { X, Lock, CheckCircle2, Truck, CreditCard, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, totalItems, clearCart, userZip } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [deliverySpeed, setDeliverySpeed] = useState("one-day");

  if (!isOpen) return null;

  const tax = subtotal * 0.0825;
  const orderTotal = subtotal + tax;

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    clearCart();
  };

  const handleCloseAll = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-2xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={handleCloseAll} />

      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 text-stone-900">
        {/* Checkout Top Bar */}
        <div className="px-6 py-4 bg-[#131921] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-white">amazon</span>
            <span className="text-xs text-[#febd69] font-bold">.prime</span>
            <span className="text-stone-400">|</span>
            <div className="flex items-center gap-1.5 text-xs text-stone-300">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Secure Checkout</span>
            </div>
          </div>

          <button
            onClick={handleCloseAll}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-8">
          {isOrdered ? (
            /* Order Placed Success Confirmation */
            <div className="text-center py-10 space-y-5 animate-in zoom-in-95">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Order 114-8930219-482910 Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  Thank you for your order!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto">
                  We&apos;ve sent an order confirmation and tracking details to your Amazon account email.
                </p>
              </div>

              {/* Delivery ETA Card */}
              <div className="max-w-md mx-auto p-4 rounded-lg bg-stone-50 border border-stone-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-stone-800">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#007185]" />
                    <span>Guaranteed Prime Delivery</span>
                  </div>
                  <span className="text-emerald-700">Tomorrow by 8:00 PM</span>
                </div>
                <div className="text-stone-500">
                  Shipping to: <span className="text-stone-800 font-medium">Jane Doe, {userZip}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleCloseAll}
                  className="px-6 py-2.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 text-xs font-bold shadow-xs cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form Review */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Address, Payment, Shipping Speed */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. Shipping Address */}
                <div className="p-4 rounded-lg border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                      <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">
                        1
                      </span>
                      <span>Shipping Address</span>
                    </div>
                    <span className="text-xs text-[#007185] hover:underline cursor-pointer">
                      Change
                    </span>
                  </div>
                  <div className="text-xs text-stone-700 pl-7 space-y-0.5">
                    <div className="font-semibold text-stone-900">Jane Doe</div>
                    <div>1200 4th Ave, Suite 300</div>
                    <div>{userZip}, United States</div>
                    <div className="text-stone-500">Phone: (206) 555-0192</div>
                  </div>
                </div>

                {/* 2. Payment Method */}
                <div className="p-4 rounded-lg border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                      <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">
                        2
                      </span>
                      <span>Payment Method</span>
                    </div>
                    <span className="text-xs text-[#007185] hover:underline cursor-pointer">
                      Change
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pl-7 text-xs text-stone-800">
                    <div className="h-6 w-10 bg-blue-900 rounded text-white text-[9px] font-black flex items-center justify-center">
                      VISA
                    </div>
                    <div>
                      <span className="font-semibold">Amazon Prime Visa</span> ending in 4242
                      <div className="text-[11px] text-emerald-700 font-medium">
                        5% Back on this purchase with Prime ($
                        {((orderTotal * 0.05)).toFixed(2)} in rewards)
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Review Items and Shipping Speed */}
                <div className="p-4 rounded-lg border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                    <span className="h-5 w-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>Review Items & Choose Delivery Speed</span>
                  </div>

                  {/* Delivery speed selector */}
                  <div className="pl-7 space-y-2">
                    <label className="flex items-center gap-2.5 p-2.5 rounded border border-emerald-300 bg-emerald-50/60 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="speed"
                        checked={deliverySpeed === "one-day"}
                        onChange={() => setDeliverySpeed("one-day")}
                        className="text-[#f3a847] focus:ring-[#f3a847]"
                      />
                      <div>
                        <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <span>Tomorrow, by 8:00 PM</span>
                          <span className="text-[10px] text-white bg-[#00a8e1] px-1.5 py-0.2 rounded font-extrabold italic">
                            ✓prime
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-600">FREE Prime Delivery</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-2.5 rounded border border-stone-200 hover:bg-stone-50 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="speed"
                        checked={deliverySpeed === "standard"}
                        onChange={() => setDeliverySpeed("standard")}
                        className="text-[#f3a847] focus:ring-[#f3a847]"
                      />
                      <div>
                        <div className="font-bold text-stone-800">Standard 2-Day Shipping</div>
                        <div className="text-[11px] text-stone-600">FREE Prime Delivery</div>
                      </div>
                    </label>
                  </div>

                  {/* Selected Cart Items Preview */}
                  <div className="pl-7 pt-2 space-y-2 border-t mt-3">
                    <div className="text-xs text-stone-500">Order items ({totalItems}):</div>
                    <div className="max-h-36 overflow-y-auto divide-y space-y-1">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between text-xs py-1.5"
                        >
                          <div className="flex items-center gap-2 truncate max-w-sm">
                            <span className="font-bold text-stone-700">{item.quantity}x</span>
                            <span className="truncate text-stone-800">{item.product.title}</span>
                          </div>
                          <span className="font-bold text-stone-900 shrink-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Place Order */}
              <div className="lg:col-span-4">
                <div className="border border-stone-300 rounded-lg p-5 bg-white shadow-xs space-y-4 text-xs">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-3 px-4 rounded-full font-bold bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Sparkles className="h-4 w-4 text-amber-700" />
                    <span>Place your order</span>
                  </button>

                  <div className="text-[10px] text-stone-500 text-center leading-tight">
                    By placing your order, you agree to Amazon&apos;s{" "}
                    <span className="text-[#007185] hover:underline cursor-pointer">
                      Conditions of Use
                    </span>{" "}
                    and{" "}
                    <span className="text-[#007185] hover:underline cursor-pointer">
                      Privacy Notice
                    </span>.
                  </div>

                  {/* Summary Breakdown */}
                  <div className="border-t pt-3 space-y-2">
                    <div className="font-bold text-stone-900 text-sm">Order Summary</div>

                    <div className="flex justify-between text-stone-600">
                      <span>Items ({totalItems}):</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Shipping & handling:</span>
                      <span className="text-emerald-700 font-medium">FREE</span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Estimated tax to be collected:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-2 flex justify-between font-bold text-sm text-[#cc0c39]">
                      <span>Order total:</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded border text-[11px] text-stone-600 space-y-1">
                    <div className="font-bold text-stone-800">Prime Savings Applied</div>
                    <div>FREE One-Day Shipping: Saved $12.99</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

