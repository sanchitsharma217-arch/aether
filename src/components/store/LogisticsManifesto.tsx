"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, Leaf, Layers, Building2, Truck, Check } from "lucide-react";

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
            THE ECONOMIC MONOLITH · PLATFORM GOVERNANCE
          </span>
        </div>

        {/* Giant Bold Grotesque Headline that slices across the section */}
        <div className="space-y-6 pb-12 border-b border-[#242429]">
          <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-sans font-black tracking-tighter uppercase leading-[0.94] max-w-5xl">
            93% Paid to Makers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-400 to-stone-600">
              Zero Pay-to-Play Algorithms.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 max-w-2xl font-sans leading-relaxed">
            Legacy commerce extracts 35%–45% of every transaction through forced ad bidding and fulfillment monopolies. Aether operates on a non-custodial direct merchant settlement protocol: a fixed 7.0% network fee covers routing and cryptographic verification, allowing 93.0% to settle directly with verified craftspeople and certified guild ateliers.
          </p>
        </div>

        {/* 2-Column High-Contrast Ledger Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 items-start">
          
          {/* Left: 3 Precision Operational Metrics (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#141418] border border-[#242429] space-y-2 floating-card-dark">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Network Platform Fee</div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-400">7.0%</div>
              <div className="text-xs text-stone-400 font-sans leading-relaxed">
                Non-custodial settlement fee covering infrastructure, cryptography, and node coordination.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#141418] border border-[#242429] space-y-2 floating-card-dark">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Maker Revenue Net</div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-white">93.0%</div>
              <div className="text-xs text-stone-400 font-sans leading-relaxed">
                Directly retained by the independent atelier with zero mandatory advertising deductions.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#141418] border border-[#242429] space-y-2 floating-card-dark">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Sponsored Placements</div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-amber-300">0 Ads</div>
              <div className="text-xs text-stone-400 font-sans leading-relaxed">
                Shelf rankings are 100% merit-based, dictated by physical keep rates and repairability scores.
              </div>
            </div>

            <div className="sm:col-span-3 pt-4 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-white text-[#0A0A0C] font-sans font-medium text-xs uppercase tracking-wider btn-tactile-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Platform Whitepaper</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/shop"
                className="px-6 py-3 rounded-xl border border-stone-700 text-white font-sans font-medium text-xs uppercase tracking-wider hover:bg-white/10 btn-tactile transition-all cursor-pointer"
              >
                <span>Browse Verified Ateliers</span>
              </Link>
            </div>
          </div>

          {/* Right: Comparative Side-by-Side Ledger Table (5 cols) */}
          <div className="lg:col-span-5 bg-[#141418] rounded-3xl p-6 sm:p-7 border border-[#242429] space-y-4 floating-card-dark">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono font-bold tracking-wider">
              <span className="text-stone-400">SYSTEM PARAMETER</span>
              <span className="text-emerald-400">AETHER</span>
              <span className="text-stone-500 line-through">TRADITIONAL</span>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Listing Model</span>
                <span className="text-emerald-400 font-bold">1 Master SKU</span>
                <span className="text-stone-500">50 Clone Listings</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Placement Logic</span>
                <span className="text-emerald-400 font-bold">Durability & Keep Rate</span>
                <span className="text-stone-500">Top 4 Rows Sponsored</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Compounded Fees</span>
                <span className="text-emerald-400 font-bold">7% Network Fee</span>
                <span className="text-stone-500">35% – 45% Taken</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-stone-300 font-sans">Review Authenticity</span>
                <span className="text-emerald-400 font-bold">Verified Ownership Only</span>
                <span className="text-stone-500">Bot Hijacking Spikes</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-stone-300 font-sans">Multi-Vendor Transit</span>
                <span className="text-emerald-400 font-bold">Consolidated Regional Mesh</span>
                <span className="text-stone-500">Separate Boxes & Fees</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-stone-400 font-sans leading-relaxed">
              ✦ Built for objects that outlive disposable trends. Orders within Tranche 01 pilot corridors consolidate multi-origin ateliers into a unified carbon-batched drop; outer-region orders ship direct from maker depots.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
