"use client";

import React from "react";
import { Layers, ShieldCheck, Truck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const TrustGrid: React.FC = () => {
  const pillars = [
    {
      step: "ORIGINAL CRAFT",
      tagColor: "text-[#EA580C] bg-orange-50 border border-orange-200",
      icon: Layers,
      title: "Authentic Single Listings",
      subtitle: "One Master Page per Creation",
      desc: "Zero duplicate white-label knockoffs. Every authentic object carries one clean listing where independent workshops compete openly on craft quality, warranty, and dispatch.",
      stat: "1 Authentic SKU",
      statLabel: "Zero duplicate clone listings",
    },
    {
      step: "HONEST CURATION",
      tagColor: "text-emerald-800 bg-emerald-50 border border-emerald-200",
      icon: ShieldCheck,
      title: "Merit-Based Placement",
      subtitle: "Zero Paid Advertising Slots",
      desc: "Shelf rankings cannot be bought. Product discovery is strictly determined by verified material durability, independent repairability benchmarks, and customer satisfaction.",
      stat: "100% Organic",
      statLabel: "Ranked purely by craft quality",
    },
    {
      step: "MINDFUL DISPATCH",
      tagColor: "text-blue-800 bg-blue-50 border border-blue-200",
      icon: Truck,
      title: "Consolidated Delivery",
      subtitle: "Combined Low-Impact Shipment",
      desc: "Orders from multiple independent European and Japanese studios are consolidated into a single carbon-neutral drop, reducing packaging waste and transport emissions.",
      stat: "1 Combined Drop",
      statLabel: "Eco-friendly coordinated transit",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#E5E5E9] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#EA580C] uppercase tracking-widest">
            FOUNDATIONAL PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
            Built for Decades of Use.
          </h2>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
        >
          <span>READ PLATFORM PHILOSOPHY</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3 Symmetrical Elevated Floating Cards with Identical Heights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-[#F9F9FB] border border-[#E5E5E9] flex items-center justify-center text-[#0A0A0C] shadow-2xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md ${pillar.tagColor}`}>
                    {pillar.step}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-sans font-bold tracking-tight text-[#0A0A0C]">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-[#64646E]">
                    {pillar.subtitle}
                  </div>
                </div>

                <p className="text-xs text-[#64646E] leading-relaxed font-sans line-clamp-3">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E9] flex items-baseline justify-between text-xs mt-6">
                <span className="font-mono font-black text-base text-[#0A0A0C]">{pillar.stat}</span>
                <span className="text-[11px] text-[#64646E] font-sans">{pillar.statLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
