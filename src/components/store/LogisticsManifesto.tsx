"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const LogisticsManifesto: React.FC = () => {
  return (
    <section className="w-full bg-[#0A0A0C] text-white py-16 sm:py-24 border-y border-[#1E1E24] relative overflow-hidden">
      {/* Dimensional lighting glow behind dark canvas */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-stone-800/20 via-stone-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[11px] font-semibold text-amber-300 uppercase tracking-widest">
            OUR COMMITMENT · TRANSPARENT COMMERCE
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-6 pb-12 border-b border-[#242429]">
          <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-sans font-black tracking-tighter uppercase leading-[0.94] max-w-5xl">
            93% Directly to the Makers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-400 to-stone-600">
              Zero Sponsored Ad Fees.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 max-w-2xl font-sans leading-relaxed">
            Legacy commerce extracts 35%–45% of every transaction through forced ad bidding and fulfillment monopolies. Aether operates with a transparent 7% platform fee to cover operations and digital tracking, passing 93% directly to independent workshops and certified craftspeople.
          </p>
        </div>

        {/* 2-Column High-Contrast Ledger Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
          
          {/* Left: 3 Precision Operational Metrics (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141418] border border-[#242429] space-y-2 floating-card-dark">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Platform Fee</div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-400">7.0%</div>
              <div className="text-xs text-stone-400 font-sans leading-relaxed">
                Clear operational fee covering payment processing, digital infrastructure, and logistics tracking.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141418] border border-[#242429] space-y-2 floating-card-dark">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Maker Revenue</div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-white">93.0%</div>
              <div className="text-xs text-stone-400 font-sans leading-relaxed">
                Directly retained by the independent atelier with zero mandatory advertising deductions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141418] border border-[#242429] space-y-2 floating-card-dark">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Organic Placement</div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-amber-300">0 Ads</div>
              <div className="text-xs text-stone-400 font-sans leading-relaxed">
                Shelf rankings are 100% merit-based, dictated by physical keep rates and verified durability.
              </div>
            </div>

            <div className="sm:col-span-3 pt-4 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-white text-[#0A0A0C] font-sans font-medium text-xs uppercase tracking-wider btn-tactile-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Platform Philosophy</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/shop"
                className="px-6 py-3 rounded-xl border border-stone-700 text-white font-sans font-medium text-xs uppercase tracking-wider hover:bg-white/10 btn-tactile transition-all cursor-pointer"
              >
                <span>Browse Independent Workshops</span>
              </Link>
            </div>
          </div>

          {/* Right: Comparative Side-by-Side Ledger Table (5 cols) */}
          <div className="lg:col-span-5 bg-[#141418] rounded-2xl p-6 sm:p-7 border border-[#242429] space-y-4 floating-card-dark">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono font-bold tracking-wider">
              <span className="text-stone-400">STANDARD</span>
              <span className="text-emerald-400">AETHER</span>
              <span className="text-stone-500 line-through">TRADITIONAL</span>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Listing Model</span>
                <span className="text-emerald-400 font-bold">1 Authentic Listing</span>
                <span className="text-stone-500">50 Clone Listings</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Shelf Ranking</span>
                <span className="text-emerald-400 font-bold">Durability & Reviews</span>
                <span className="text-stone-500">Top 4 Rows Sponsored</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Platform Take</span>
                <span className="text-emerald-400 font-bold">7% Transparent Fee</span>
                <span className="text-stone-500">35% – 45% Deducted</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Reviews</span>
                <span className="text-emerald-400 font-bold">Verified Buyers Only</span>
                <span className="text-stone-500">Bot Hijacking & Fake Reviews</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-stone-300 font-sans">Shipping</span>
                <span className="text-emerald-400 font-bold">Combined Low-Impact Parcel</span>
                <span className="text-stone-500">Separate Cluttered Boxes</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-stone-400 font-sans leading-relaxed">
              ✦ Designed for objects that outlive fast trends. Multi-item orders from independent workshops are consolidated into a single, carbon-neutral parcel.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
