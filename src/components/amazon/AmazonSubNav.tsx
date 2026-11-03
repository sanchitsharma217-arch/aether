"use client";

import React from "react";
import { Menu, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface AmazonSubNavProps {
  onOpenSidebar: () => void;
  onFilterDeals: () => void;
}

export const AmazonSubNav: React.FC<AmazonSubNavProps> = ({
  onOpenSidebar,
  onFilterDeals,
}) => {
  const { setSelectedCategory } = useCart();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const section = document.getElementById("product-catalog");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#232f3e] text-white text-xs sm:text-sm">
      <div className="max-w-[1500px] mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-none py-1">
        {/* Left Sub-Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          {/* Hamburger "All" Button */}
          <button
            onClick={onOpenSidebar}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:border hover:border-white font-bold cursor-pointer transition-colors"
          >
            <Menu className="h-4 w-4" />
            <span>All</span>
          </button>

          {/* Quick link items */}
          <button
            onClick={onFilterDeals}
            className="flex items-center gap-1 px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer text-[#febd69] hover:text-white"
          >
            <Zap className="h-3.5 w-3.5 fill-[#febd69]" />
            <span>Today&apos;s Deals</span>
          </button>

          <button
            onClick={() => handleCategoryClick("Electronics")}
            className="px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer"
          >
            Electronics
          </button>

          <button
            onClick={() => handleCategoryClick("Computers & Gaming")}
            className="px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer"
          >
            Computers & Gaming
          </button>

          <button
            onClick={() => handleCategoryClick("Audio")}
            className="px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer"
          >
            Audio & Sound
          </button>

          <button
            onClick={() => handleCategoryClick("Home & Kitchen")}
            className="hidden md:inline-block px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer"
          >
            Home & Kitchen
          </button>

          <button
            onClick={() => handleCategoryClick("Fashion")}
            className="hidden lg:inline-block px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer"
          >
            Fashion
          </button>

          <button
            onClick={() => handleCategoryClick("All Departments")}
            className="hidden sm:inline-block px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer"
          >
            Customer Service
          </button>

          <span className="hidden xl:inline-block px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer">
            Registry
          </span>

          <span className="hidden xl:inline-block px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer">
            Gift Cards
          </span>

          <span className="hidden xl:inline-block px-2 py-1.5 rounded hover:border hover:border-white font-medium cursor-pointer">
            Sell
          </span>
        </div>

        {/* Right Promo Text */}
        <div className="hidden lg:flex items-center gap-2 pl-4 text-xs font-semibold text-stone-200">
          <span className="text-[#febd69]">★ Prime</span>
          <span>Fast, FREE Delivery & Entertainment</span>
        </div>
      </div>
    </div>
  );
};

