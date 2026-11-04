"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Truck, Layers, Building2, Radio } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { CERTIFIED_GUILDS } from "@/data/certifiedGuilds";
import { CATEGORIES } from "@/data/mockProducts";

export const Footer: React.FC = () => {
  const { setSelectedCategory, setSearchQuery } = useStore();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#121110] text-[#E6E4DF] pt-16 pb-12 border-t border-[#2A2724] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2A2724]">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#F7F6F3] text-[#121110] flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-base font-sans font-black text-white tracking-tighter leading-none">
                  AETHER
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400 mt-0.5">
                  Universal Exchange · Issue 04
                </span>
              </div>
            </div>

            <p className="text-stone-400 max-w-md leading-relaxed text-xs">
              The universal exchange rejecting pay-to-play shelf placement, duplicate white-label listings, and artificial scarcity. Connecting independent certified ateliers directly with mindful collectors.
            </p>

            <div className="flex items-center gap-4 text-[11px] text-stone-400 font-mono flex-wrap">
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#A84B29]" />
                1 Master SKU
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#1B5E3C]" />
                Direct Merchant Settlement
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#1E3A8A]" />
                Pilot 4PL Regional Mesh
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              DISPATCH & ARCHIVE LEDGER
            </span>
            <h4 className="text-sm font-sans font-bold text-white">
              The Aether Technical Journal
            </h4>
            <p className="text-stone-400 text-xs">
              Receive notifications for serialized kiln releases, material durability whitepapers, and regional guild additions.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-2 rounded-xl text-xs font-mono">
                <Check className="h-4 w-4" />
                <span>Patron enrollment verified. Welcome to the exchange ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                <input
                  required
                  type="email"
                  placeholder="Enter email for dispatch notifications"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-stone-800 text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-400 text-xs font-sans"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#F7F6F3] text-[#121110] hover:bg-white font-medium btn-tactile-white transition-all flex items-center gap-1.5 shrink-0 cursor-pointer text-xs"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#2A2724] text-xs">
          {/* Column 1: Platform & Governance */}
          <div className="space-y-3">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
              Platform & Governance
            </h5>
            <ul className="space-y-2 text-stone-400 font-sans">
              <li><Link href="/about" className="hover:text-white transition-colors">Canonical 1-SKU Architecture</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Merit-Ranked Shelf Placement</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Direct Non-Custodial Protocol</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Return Forensics Protocol</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Decentralized 4PL Mesh</Link></li>
            </ul>
          </div>

          {/* Column 2: Verified Guilds & Ateliers */}
          <div className="space-y-3">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
              8 Verified Guilds (Tranche 01)
            </h5>
            <ul className="space-y-1.5 text-stone-400 font-sans text-[11px]">
              {CERTIFIED_GUILDS.map((guild) => (
                <li key={guild.id}>
                  <Link
                    href="/shop"
                    onClick={() => {
                      setSearchQuery(guild.name.split(" ")[0]);
                    }}
                    className="hover:text-white transition-colors truncate block"
                  >
                    {guild.name.replace(" Engineering Guild", "").replace(" (Kenjiro Yamada Kiln)", "")} ({guild.location.split(",")[0]})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Departments of Craft */}
          <div className="space-y-3">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
              5 Departments of Craft
            </h5>
            <ul className="space-y-2 text-stone-400 font-sans">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href="/shop"
                    onClick={() => setSelectedCategory(cat)}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Live System Telemetry */}
          <div className="space-y-3">
            <h5 className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
              System Telemetry
            </h5>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Environment</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live Preview Sandbox
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-400">Edge CDN</span>
                <span className="text-white font-bold">Global Mesh</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-400">Pilot Guilds</span>
                <span className="text-amber-300 font-bold">8 Verified [Tranche 01 Pilot]</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-stone-500">Settlement</span>
                <span className="text-sky-300">Non-Custodial Direct (Sandbox)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px] font-mono">
          <div>
            © 2026 AETHER UNIVERSAL EXCHANGE. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 font-sans">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Direct Settlement Charter</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Canonical SKU Standard</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Zero-Ad Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
