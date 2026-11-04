"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Eye,
  Check,
  Zap,
  Layers,
} from "lucide-react";
import { PRODUCTS } from "@/data/mockProducts";
import { useStore } from "@/context/StoreContext";

export const AsymmetricVault: React.FC = () => {
  const { addToCart, setActiveBuyBoxProduct } = useStore();
  const [justAddedH01, setJustAddedH01] = useState(false);
  const [justAddedWatch, setJustAddedWatch] = useState(false);
  const [justAddedOven, setJustAddedOven] = useState(false);

  const prodH01 = PRODUCTS.find((p) => p.id === "prod-1") || PRODUCTS[0];
  const prodWatch = PRODUCTS.find((p) => p.id === "prod-2") || PRODUCTS[3];
  const prodOven = PRODUCTS.find((p) => p.id === "prod-dutch-oven") || PRODUCTS[1];

  const handleAddH01 = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prodH01, 1, prodH01.colors?.[0]?.name, prodH01.offers?.[0]);
    setJustAddedH01(true);
    setTimeout(() => setJustAddedH01(false), 1200);
  };

  const handleAddWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prodWatch, 1, prodWatch.colors?.[0]?.name, prodWatch.offers?.[0]);
    setJustAddedWatch(true);
    setTimeout(() => setJustAddedWatch(false), 1200);
  };

  const handleAddOven = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prodOven, 1, prodOven.colors?.[0]?.name, prodOven.offers?.[0]);
    setJustAddedOven(true);
    setTimeout(() => setJustAddedOven(false), 1200);
  };

  return (
    <section id="asymmetric-vault" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E5E5E9]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#0A0A0C]">
              THE CANONICAL VAULT · SCALE & ASYMMETRY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase">
            Curated Singularities.
          </h2>
          <p className="text-xs sm:text-sm text-[#64646E] mt-1 font-sans">
            One master listing per physical creation. Zero white-label clone proliferation.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
        >
          <span>EXPLORE ENTIRE ARCHIVE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ASYMMETRIC GRID: 1 Giant Feature Card (65% width) + 2 Stacked Mini-Cards (35% width) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* GIANT FEATURE CARD: 65% Width (8 cols) */}
        <div
          onClick={() => setActiveBuyBoxProduct(prodH01)}
          className="lg:col-span-8 group relative rounded-3xl bg-white border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] transition-all duration-500 p-6 sm:p-10 flex flex-col justify-between overflow-hidden cursor-pointer"
        >
          {/* Overlapping Floating Spec Tag breaking out at the top */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest bg-[#0A0A0C] text-white px-2.5 py-1 rounded-md shadow-xs">
                MASTER BENCHMARK · 01
              </span>
              <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>9.8 / 10 Durability Index</span>
              </span>
            </div>

            <span className="text-xs font-mono font-bold text-[#64646E] hidden sm:inline">
              CANONICAL: {prodH01.canonicalSku}
            </span>
          </div>

          {/* Center Stage: Oversized studio image that cleanly breaks scale */}
          <div className="relative my-8 sm:my-10 flex items-center justify-center">
            {/* Visual glow backdrop */}
            <div className="absolute inset-0 bg-radial from-stone-100 to-transparent opacity-80 blur-2xl pointer-events-none" />

            <div className="relative w-full max-w-lg aspect-[16/10] flex items-center justify-center">
              <img
                src={prodH01.image}
                alt={prodH01.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)] group-hover:scale-108 group-hover:-rotate-1 transition-transform duration-700 ease-out"
              />

              {/* Floating Overlapping Micro Glassmorphism Badge */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 glass-pill p-3 sm:p-4 rounded-2xl shadow-xl space-y-0.5 border border-white/60">
                <div className="text-[10px] font-mono uppercase text-[#64646E] font-bold">
                  Certified Origin
                </div>
                <div className="text-xs font-sans font-black text-[#0A0A0C]">
                  {prodH01.primaryVendor.name} &bull; {prodH01.primaryVendor.location.split(",")[0]}
                </div>
                <div className="text-[10px] font-mono text-emerald-700 font-semibold">
                  Available from {prodH01.offers?.length || 1} Verified Depots
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Title, Specs & Immediate Buy Box Actions */}
          <div className="relative z-10 pt-4 border-t border-[#E5E5E9] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 max-w-md">
              <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-[#0A0A0C] group-hover:text-black">
                {prodH01.title}
              </h3>
              <p className="text-xs text-[#64646E] font-sans line-clamp-2 leading-relaxed">
                {prodH01.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
              <div className="text-right">
                <div className="text-2xl font-mono font-black text-[#0A0A0C]">
                  ${prodH01.price}.00
                </div>
                <div className="text-[10px] font-mono text-[#64646E]">
                  Free Consolidated Transit
                </div>
              </div>

              <button
                onClick={handleAddH01}
                className="px-5 py-3 rounded-2xl bg-[#0D0D0D] hover:bg-black text-white font-sans font-semibold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
              >
                {justAddedH01 ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 text-emerald-400" />
                    <span>Quick Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2 STACKED MINI-CARDS: 35% Width (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
          
          {/* Mini-Card 1: Field Horology Automatic Watch */}
          <div
            onClick={() => setActiveBuyBoxProduct(prodWatch)}
            className="group relative rounded-3xl bg-white border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] transition-all duration-500 p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer flex-1"
          >
            <div className="flex items-center justify-between text-xs font-mono pb-2">
              <span className="text-[10px] font-medium text-[#EA580C] bg-orange-50 border border-orange-200/80 px-2.5 py-0.5 rounded-md uppercase">
                Horology · 02
              </span>
              <span className="text-[10px] text-[#64646E]">
                Zurich, Switzerland
              </span>
            </div>

            <div className="my-3 flex items-center justify-center h-36 relative">
              <img
                src={prodWatch.image}
                alt={prodWatch.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500 ease-out"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E5E9]">
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-sans font-bold text-[#0A0A0C] line-clamp-1">
                  {prodWatch.title}
                </h4>
                <span className="text-base font-mono font-black text-[#0A0A0C] shrink-0 ml-2">
                  ${prodWatch.price}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#64646E]">
                <span>Grade-5 Titanium · Sapphire</span>
                <span className="text-emerald-700 font-bold">9.9 Durability</span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveBuyBoxProduct(prodWatch);
                  }}
                  className="flex-1 py-2 text-center rounded-lg border border-[#E5E5E9] hover:border-[#0A0A0C] text-xs font-medium text-[#0A0A0C] transition-all bg-[#F9F9FB] btn-tactile-white cursor-pointer"
                >
                  Inspect Offers
                </button>
                <button
                  onClick={handleAddWatch}
                  className="p-2 rounded-lg bg-[#0D0D0D] text-white hover:bg-black transition-all btn-tactile cursor-pointer"
                >
                  {justAddedWatch ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mini-Card 2: Cast Enamelled Dutch Oven */}
          <div
            onClick={() => setActiveBuyBoxProduct(prodOven)}
            className="group relative rounded-3xl bg-white border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] transition-all duration-500 p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer flex-1"
          >
            <div className="flex items-center justify-between text-xs font-mono pb-2">
              <span className="text-[10px] font-medium text-[#2563EB] bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-md uppercase">
                Culinary · 03
              </span>
              <span className="text-[10px] text-[#64646E]">
                {prodOven.primaryVendor.location}
              </span>
            </div>

            <div className="my-3 flex items-center justify-center h-36 relative">
              <img
                src={prodOven.image}
                alt={prodOven.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500 ease-out"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E5E9]">
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-sans font-bold text-[#0A0A0C] line-clamp-1">
                  {prodOven.title}
                </h4>
                <span className="text-base font-mono font-black text-[#0A0A0C] shrink-0 ml-2">
                  ${prodOven.price}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#64646E]">
                <span>Recycled Pig Iron · Enamel</span>
                <span className="text-emerald-700 font-bold">{prodOven.durabilityYears}-Yr Warranty</span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveBuyBoxProduct(prodOven);
                  }}
                  className="flex-1 py-2 text-center rounded-lg border border-[#E5E5E9] hover:border-[#0A0A0C] text-xs font-medium text-[#0A0A0C] transition-all bg-[#F9F9FB] btn-tactile-white cursor-pointer"
                >
                  Inspect Offers
                </button>
                <button
                  onClick={handleAddOven}
                  className="p-2 rounded-lg bg-[#0D0D0D] text-white hover:bg-black transition-all btn-tactile cursor-pointer"
                >
                  {justAddedOven ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

