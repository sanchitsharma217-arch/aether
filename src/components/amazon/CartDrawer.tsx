"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
    totalItems,
    subtotal,
  } = useCart();

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

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Cart Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-250 text-stone-900">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-stone-800" />
            <h2 className="text-base font-bold">Shopping Cart ({totalItems} items)</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Qualified Bar */}
        <div className="bg-emerald-50 px-5 py-2.5 border-b border-emerald-100 flex items-center gap-2 text-xs text-emerald-800 font-medium">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Your order qualifies for FREE Prime Two-Day Shipping!</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="h-16 w-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-stone-700">Your Amazon Cart is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our lightning deals and bestsellers to add items to your cart.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 text-xs font-bold shadow-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                {/* Product Thumbnail */}
                <div className="h-20 w-20 bg-stone-50 border rounded p-1 flex items-center justify-center shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Info & Controls */}
                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-medium text-stone-900 line-clamp-2 leading-snug">
                    {item.product.title}
                  </h4>
                  <div className="text-xs font-bold text-stone-900">
                    ${item.product.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">In Stock</div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Quantity Picker */}
                    <div className="flex items-center border rounded bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-200"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove from Cart"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Sticky Footer with Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-stone-200 p-5 bg-stone-50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">Subtotal ({totalItems} items):</span>
              <span className="font-bold text-lg text-stone-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onOpenCheckout();
              }}
              className="w-full py-3 px-4 rounded-full font-bold bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to checkout ({totalItems} items)</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Safe 256-bit SSL Amazon Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

