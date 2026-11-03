"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/mockProducts";
import { ProductCard } from "@/components/store/ProductCard";
import { HeroBanner } from "@/components/store/HeroBanner";
import { AsymmetricVault } from "@/components/store/AsymmetricVault";
import { TrustGrid } from "@/components/store/TrustGrid";
import { IntentDepartments } from "@/components/store/IntentDepartments";
import { RitualsIntentEngine } from "@/components/store/RitualsIntentEngine";
import { LogisticsManifesto } from "@/components/store/LogisticsManifesto";

export default function Home() {
  // Small-Batch Archival Additions (Tokoname Brewer, Walnut Tamper, Conical Mill, Desk Companion)
  const archivalAdditions = PRODUCTS.slice(4, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 bg-white">
      {/* 01. THE HERO MOMENT: Giant Studio Stage with Deep Dimensional Lighting & Curated Setup Console */}
      <HeroBanner />

      {/* 02. THE ASYMMETRIC VAULT: 65% Giant Feature Card + 2 Stacked 35% Mini-Cards */}
      <AsymmetricVault />

      {/* 03. FULL-BLEED EDGE-TO-EDGE GRAPHITE MONOLITH SECTION: 93% Paid to Makers & Anti-Amazon Ledger */}
      <LogisticsManifesto />

      {/* 04. DYNAMIC INTENT DEPARTMENTS: Asymmetric Masonry (7/5 + 4/4/4) */}
      <IntentDepartments />

      {/* 05. CROSS-VENDOR SUITE BUILDER: Interactive Intent & Bundle Engine */}
      <section id="intent-engine" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <RitualsIntentEngine />
      </section>

      {/* 06. ARCHITECTURAL TRUST GRID: 3 Floating Pillars */}
      <TrustGrid />

      {/* 07. SMALL BATCH ARCHIVAL ADDITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#E5E5E9] pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#64646E] uppercase tracking-widest">
              RECENT KILN & WORKSHOP DISPATCHES
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
              Archival Singularities.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
          >
            <span>VIEW ALL ({PRODUCTS.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {archivalAdditions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
