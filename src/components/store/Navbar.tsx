"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, X, Menu, ChevronDown, Layers, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { DEPARTMENTS } from "@/data/mockProducts";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    favoritesCount,
    setIsFavoritesOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    isMounted,
  } = useStore();

  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayFavCount = isMounted ? favoritesCount : 0;
  const displayCartCount = isMounted ? cartCount : 0;
  const displayCartSubtotal = isMounted ? cartSubtotal : 0;

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* 00. GLOBAL UTILITY TICKER (32px) */}
      <div className="h-8 bg-[#0A0A0C] text-[#E5E5E9] border-b border-[#1E1E24] px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] font-mono tracking-wider overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-6 truncate">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">[PILOT ATELIERS]:</span>
            <span className="text-stone-300">8 Certified Maker Guilds [Tranche 01]</span>
          </div>

          <span className="hidden md:inline text-stone-600">·</span>

          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-amber-400 font-bold">[CANONICAL]:</span>
            <span className="text-stone-300">1 Master SKU per Physical Product</span>
          </div>

          <span className="hidden lg:inline text-stone-600">·</span>

          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-sky-400 font-bold">[LOGISTICS]:</span>
            <span className="text-stone-300">Consolidated Regional Mesh [Stage 1]</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] text-stone-400 uppercase tracking-widest font-mono">
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            Node: mesh-us-east
          </span>
          <span className="text-stone-700">|</span>
          <span className="text-white font-bold">SYSTEM 04</span>
        </div>
      </div>

      {/* 01. COMMAND NAVIGATION (64px) */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E5E5E9] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 md:hidden text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="h-8 w-8 rounded-lg bg-[#0A0A0C] text-white flex items-center justify-center font-sans font-black text-sm shadow-md"
              >
                A
              </motion.div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-sans font-black tracking-tighter text-[#0A0A0C] leading-none">
                  AETHER
                </span>
                <span className="hidden sm:inline-block border border-[#E5E5E9] bg-[#F9F9FB] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded text-[#64646E] uppercase tracking-widest">
                  Exchange
                </span>
              </div>
            </Link>

            {/* Departments Dropdown (Desktop) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0A0A0C] hover:text-stone-600 px-3 py-1.5 rounded-lg border border-[#E5E5E9] bg-white hover:border-[#0A0A0C] transition-all"
              >
                <Layers className="h-3.5 w-3.5 text-[#64646E]" />
                <span>Departments</span>
                <ChevronDown className={`h-3.5 w-3.5 text-[#64646E] transition-transform ${isDeptDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDeptDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setIsDeptDropdownOpen(false)}
                    className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-white border border-[#E5E5E9] shadow-2xl p-2 z-50 floating-card"
                  >
                    <div className="text-[10px] font-mono uppercase text-[#64646E] px-3 py-1.5 font-bold tracking-wider border-b border-[#E5E5E9] mb-1">
                      5 Canonical Guilds
                    </div>
                    {DEPARTMENTS.map((dept) => (
                      <Link
                        key={dept.id}
                        href="/shop"
                        onClick={() => {
                          setSelectedCategory(dept.category);
                          setIsDeptDropdownOpen(false);
                        }}
                        className="flex flex-col px-3 py-2 rounded-xl hover:bg-[#F9F9FB] transition-colors group"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#0A0A0C] group-hover:text-black">
                          <span>{dept.name}</span>
                          <span className="text-[10px] font-mono text-[#64646E] bg-stone-100 px-1.5 py-0.5 rounded">
                            {dept.activeCount}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#64646E] line-clamp-1">{dept.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Universal Semantic Search Hub */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64646E]" />
              <input
                type="text"
                placeholder="Ask anything (e.g. 'Studio monitors', 'Titanium field watch')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2 text-xs rounded-full border border-[#E5E5E9] bg-[#F9F9FB] text-[#0A0A0C] placeholder-[#64646E] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0A0A0C] focus:border-[#0A0A0C] transition-all shadow-xs font-sans"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-[10px] font-mono text-[#64646E] bg-white border border-[#E5E5E9] px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions (Wishlist & Universal Cart Indicator) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2 rounded-xl text-[#0A0A0C] hover:bg-stone-100 border border-transparent hover:border-[#E5E5E9] transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {displayFavCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#EA580C] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                  {displayFavCount}
                </span>
              )}
            </button>

            {/* Universal Cart Indicator: [Items: X | $YYY] */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0C] text-white hover:bg-black shadow-md hover:shadow-lg transition-all cursor-pointer"
              aria-label="Open Universal Cart"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" />
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="font-bold text-white">{displayCartCount}</span>
                <span className="text-stone-500">|</span>
                <span className="font-bold text-emerald-300">${displayCartSubtotal}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6E6B65]" />
            <input
              type="text"
              placeholder="Search products or natural intent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-[#E6E4DF] bg-white text-[#121110] placeholder-[#6E6B65] focus:outline-none focus:ring-1 focus:ring-[#121110]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[#E6E4DF] shadow-lg px-6 py-6 space-y-4"
          >
            <div className="text-[10px] font-mono uppercase text-[#6E6B65] font-bold tracking-wider">
              Departments of Craft
            </div>
            <div className="space-y-1">
              {DEPARTMENTS.map((dept) => (
                <Link
                  key={dept.id}
                  href="/shop"
                  onClick={() => {
                    setSelectedCategory(dept.category);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2 text-xs font-semibold text-[#121110] border-b border-stone-100"
                >
                  <span>{dept.name}</span>
                  <span className="text-[10px] font-mono text-[#6E6B65]">{dept.activeCount}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2 border-t border-[#E6E4DF]">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-semibold text-[#121110]"
              >
                Canonical Archive
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-xs font-semibold text-[#121110]"
              >
                Platform Manifesto & 4PL Ledger
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
