"use client";

import React, { useEffect } from "react";
import { X, User, ChevronRight, Zap, Gift, HelpCircle, Settings, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface AmazonSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: string) => void;
}

export const AmazonSidebar: React.FC<AmazonSidebarProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePickCategory = (cat: string) => {
    onSelectCategory(cat);
    onClose();
    const section = document.getElementById("product-catalog");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-2xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-out Menu Panel */}
      <div className="relative w-80 sm:w-96 max-w-[85vw] h-full bg-white shadow-2xl z-10 flex flex-col animate-in slide-in-from-left duration-250">
        {/* Top Header Bar */}
        <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-stone-700 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="text-base font-bold">Hello, Sign in</div>
          </div>
        </div>

        {/* Scrollable List Content */}
        <div className="flex-1 overflow-y-auto text-sm text-stone-800 divide-y divide-stone-200">
          {/* Trending */}
          <div className="py-3">
            <div className="px-6 py-2 text-xs font-bold text-stone-900 tracking-wider uppercase">
              Trending
            </div>
            <button
              onClick={() => handlePickCategory("All Departments")}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors"
            >
              <span>Best Sellers</span>
              <ChevronRight className="h-4 w-4 text-stone-400" />
            </button>
            <button
              onClick={() => handlePickCategory("All Departments")}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors"
            >
              <span>New Releases</span>
              <ChevronRight className="h-4 w-4 text-stone-400" />
            </button>
            <button
              onClick={() => handlePickCategory("Today's Deals")}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors text-[#c7511f] font-semibold"
            >
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 fill-[#c7511f]" />
                <span>Movers & Shakers (Deals)</span>
              </span>
              <ChevronRight className="h-4 w-4 text-stone-400" />
            </button>
          </div>

          {/* Shop By Department */}
          <div className="py-3">
            <div className="px-6 py-2 text-xs font-bold text-stone-900 tracking-wider uppercase">
              Shop by Department
            </div>
            {[
              "Electronics",
              "Computers & Gaming",
              "Audio",
              "Home & Kitchen",
              "Fashion",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => handlePickCategory(cat)}
                className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors"
              >
                <span>{cat}</span>
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </button>
            ))}
          </div>

          {/* Programs & Features */}
          <div className="py-3">
            <div className="px-6 py-2 text-xs font-bold text-stone-900 tracking-wider uppercase">
              Programs & Features
            </div>
            <button
              onClick={() => handlePickCategory("Today's Deals")}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-stone-500" />
                <span>Gift Cards & Registry</span>
              </span>
              <ChevronRight className="h-4 w-4 text-stone-400" />
            </button>
            <button
              onClick={() => handlePickCategory("All Departments")}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-stone-500" />
                <span>Amazon Prime & Video</span>
              </span>
              <ChevronRight className="h-4 w-4 text-stone-400" />
            </button>
          </div>

          {/* Help & Settings */}
          <div className="py-3">
            <div className="px-6 py-2 text-xs font-bold text-stone-900 tracking-wider uppercase">
              Help & Settings
            </div>
            <button
              onClick={onClose}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors"
            >
              <span>Your Account</span>
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors"
            >
              <span>Customer Service</span>
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-2.5 text-left flex items-center justify-between hover:bg-stone-100 transition-colors text-stone-500"
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Close Button */}
      <button
        onClick={onClose}
        className="mt-4 ml-3 h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors z-20"
        aria-label="Close Menu"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};

