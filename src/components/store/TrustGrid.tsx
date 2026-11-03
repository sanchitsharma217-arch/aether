"use client";

import React from "react";
import { Layers, ShieldCheck, Truck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const TrustGrid: React.FC = () => {
  const pillars = [
    {
      step: "LIVE CAPABILITY // ANTI-CLONE",
      tagColor: "text-[#EA580C] bg-orange-50 border border-orange-200",
      icon: Layers,
      title: "Canonical 1-SKU Architecture",
      subtitle: "One Master Listing per Physical Product",
      desc: "Eliminates the 50 duplicate white-label clone listings flooding legacy catalogs. Every object carries exactly one canonical master page where verified merchants compete openly on dispatch speed, condition, and price.",
      stat: "1 Master Listing",
      statLabel: "Zero duplicate clone pages",
    },
    {
      step: "LIVE CAPABILITY // ZERO ADS",
      tagColor: "text-emerald-800 bg-emerald-50 border border-emerald-200",
      icon: ShieldCheck,
      title: "Merit-Ranked Shelf Placement",
      subtitle: "Zero Pay-to-Play Sponsored Ads",
      desc: "Platform placement cannot be bought with advertising budgets. Placement is governed purely by verified customer retention ratios, post-purchase wear consensus, and independent repairability scores.",
      stat: "100% Merit",
      statLabel: "Placement determined by durability",
    },
    {
      step: "PILOT STAGE // REGIONAL MESH",
      tagColor: "text-blue-800 bg-blue-50 border border-blue-200",
      icon: Truck,
      title: "Consolidated Multi-Vendor Delivery",
      subtitle: "Batched Regional Node Logistics",
      desc: "Order across independent guilds in Tokyo, Berlin, and Zurich in a single checkout. Our pilot regional mesh batches multi-origin items into consolidated drops to reduce shipping waste and fees.",
      stat: "1 Unified Drop",
      statLabel: "Batched regional dispatch coverage",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#E5E5E9] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#EA580C] uppercase tracking-widest">
            SYSTEM PILLARS // THE ANTI-AMAZON CORE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
            Engineered against disposable commerce.
          </h2>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
        >
          <span>READ PLATFORM WHITEPAPER</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3 Elevated Floating Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] flex items-center justify-center text-[#0A0A0C] shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${pillar.tagColor}`}>
                    {pillar.step}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-sans font-black tracking-tight text-[#0A0A0C]">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-[#64646E]">
                    {pillar.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#64646E] leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E9] flex items-baseline justify-between text-xs">
                <span className="font-mono font-black text-lg text-[#0A0A0C]">{pillar.stat}</span>
                <span className="text-[11px] text-[#64646E] font-sans">{pillar.statLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
