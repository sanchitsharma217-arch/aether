"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  User,
  Heart,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { AMAZON_CATEGORIES } from "@/data/amazonProducts";

interface AmazonHeaderProps {
  onOpenSidebar: () => void;
  onOpenCheckout: () => void;
}

export const AmazonHeader: React.FC<AmazonHeaderProps> = ({
  onOpenSidebar,
  onOpenCheckout,
}) => {
  const {
    totalItems,
    setIsCartOpen,
    userZip,
    setUserZip,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCart();

  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [tempZip, setTempZip] = useState(userZip);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productSection = document.getElementById("product-catalog");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSaveZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempZip.trim()) {
      setUserZip(tempZip.trim());
      setIsZipModalOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#131921] text-white">
      {/* Main Top Navigation Row */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 gap-2 sm:gap-4 max-w-[1500px] mx-auto text-sm">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-1 sm:p-2 rounded hover:border hover:border-white text-white flex items-center gap-1"
            aria-label="Open Sidebar Menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Amazon Logo with orange smile curve */}
          <a
            href="#"
            className="flex flex-col items-start px-2 py-1 rounded hover:border hover:border-white transition-all group"
          >
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                amazon
              </span>
              <span className="text-xs text-[#febd69] font-bold ml-0.5">.prime</span>
            </div>
            {/* Smile Curve */}
            <svg
              className="w-16 h-3 text-[#febd69] -mt-1 group-hover:scale-105 transition-transform"
              viewBox="0 0 100 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <path d="M 5 6 Q 50 20 95 6" />
              <path d="M 85 4 L 95 6 L 88 12" fill="currentColor" />
            </svg>
          </a>
        </div>

        {/* Deliver to Location Picker */}
        <button
          onClick={() => setIsZipModalOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded hover:border hover:border-white text-left transition-colors cursor-pointer shrink-0"
        >
          <MapPin className="h-4 w-4 text-white mt-2 shrink-0" />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-stone-400 text-[11px]">Deliver to</span>
            <span className="font-bold text-white tracking-tight truncate max-w-[110px]">
              {userZip}
            </span>
          </div>
        </button>

        {/* Search Bar - Center */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-3xl flex items-center rounded-md overflow-hidden bg-white focus-within:ring-3 focus-within:ring-[#f3a847] shadow-xs"
        >
          {/* Category Dropdown */}
          <div className="relative hidden lg:flex items-center bg-[#e6e6e6] text-stone-700 text-xs hover:bg-[#d4d4d4] transition-colors border-r border-stone-300">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-transparent py-2.5 pl-3 pr-7 cursor-pointer focus:outline-hidden font-medium text-stone-800"
            >
              {AMAZON_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-stone-600 absolute right-2 pointer-events-none" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Amazon.prime, electronics, deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 px-3 text-stone-900 text-sm focus:outline-hidden"
          />

          {/* Clear button if typed */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="px-2 text-stone-400 hover:text-stone-600 text-xs"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search Submit Button */}
          <button
            type="submit"
            className="bg-[#febd69] hover:bg-[#f3a847] text-stone-900 px-4 py-2.5 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Right Nav: Language, Account, Orders, Cart */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language Flag */}
          <div className="hidden xl:flex items-center gap-1 px-2 py-2 rounded hover:border hover:border-white cursor-pointer text-xs font-bold">
            <span className="text-base">🇺🇸</span>
            <span>EN</span>
            <ChevronDown className="h-3 w-3 text-stone-400" />
          </div>

          {/* Account & Lists */}
          <div
            className="relative"
            onMouseEnter={() => setIsAccountMenuOpen(true)}
            onMouseLeave={() => setIsAccountMenuOpen(false)}
          >
            <div className="px-2 py-1.5 rounded hover:border hover:border-white cursor-pointer text-left leading-tight">
              <div className="text-[11px] text-stone-300">Hello, Sign in</div>
              <div className="text-xs font-bold text-white flex items-center gap-0.5">
                <span>Account & Lists</span>
                <ChevronDown className="h-3 w-3 text-stone-400" />
              </div>
            </div>

            {/* Account dropdown */}
            {isAccountMenuOpen && (
              <div className="absolute right-0 top-full pt-1 z-50 w-64 animate-in fade-in duration-150">
                <div className="bg-white text-stone-900 rounded-md shadow-2xl border border-stone-200 p-4 text-xs space-y-3">
                  <div className="text-center pb-3 border-b border-stone-200">
                    <button
                      onClick={onOpenCheckout}
                      className="w-full py-2 rounded-md bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 font-medium shadow-xs"
                    >
                      Sign in with Amazon
                    </button>
                    <div className="text-[11px] text-stone-500 mt-1.5">
                      New customer?{" "}
                      <span className="text-[#007185] hover:underline cursor-pointer">
                        Start here.
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-bold text-stone-900 mb-1.5">Your Lists</div>
                      <div className="space-y-1 text-stone-600">
                        <div className="hover:text-[#c7511f] cursor-pointer">Create a List</div>
                        <div className="hover:text-[#c7511f] cursor-pointer">Wish List</div>
                        <div className="hover:text-[#c7511f] cursor-pointer">Baby Registry</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 mb-1.5">Your Account</div>
                      <div className="space-y-1 text-stone-600">
                        <div className="hover:text-[#c7511f] cursor-pointer">Your Account</div>
                        <div className="hover:text-[#c7511f] cursor-pointer">Your Orders</div>
                        <div className="hover:text-[#c7511f] cursor-pointer">Prime Membership</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <button
            onClick={onOpenCheckout}
            className="hidden sm:flex flex-col items-start px-2 py-1.5 rounded hover:border hover:border-white text-left leading-tight cursor-pointer"
          >
            <span className="text-[11px] text-stone-300">Returns</span>
            <span className="text-xs font-bold text-white">& Orders</span>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded hover:border hover:border-white cursor-pointer relative"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="h-7 w-7 text-white" />
              <span className="absolute -top-1 left-3.5 bg-[#f08804] text-white text-[11px] font-black h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-xs text-white self-end mb-0.5">
              Cart
            </span>
          </button>
        </div>
      </div>

      {/* Zip Code Change Modal */}
      {isZipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs text-stone-900">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-base">Choose your location</h3>
              <button
                onClick={() => setIsZipModalOpen(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-stone-600">
              Delivery options and speeds may vary for different locations.
            </p>
            <form onSubmit={handleSaveZip} className="space-y-3">
              <input
                type="text"
                value={tempZip}
                onChange={(e) => setTempZip(e.target.value)}
                placeholder="e.g. Seattle 98101 or New York 10001"
                className="w-full px-3 py-2 border rounded text-xs focus:ring-2 focus:ring-[#f3a847] focus:outline-hidden"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsZipModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold rounded bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 shadow-2xs"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

