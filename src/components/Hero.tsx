"use client";

import React from "react";
import { ArrowDown, TrendingUp, Zap, ShieldCheck, Award } from "lucide-react";

interface HeroProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: { label: string; count: number }[];
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeCategory,
  onSelectCategory,
  categories,
  onOpenEstimator,
}) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E6E5DF] overflow-hidden">
      {/* Background subtle editorial grid pattern */}
      <div className="absolute inset-0 bg-subtle-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Folio Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono uppercase tracking-[0.25em] text-stone-500 border-b border-stone-200/80 pb-4">
          <div className="flex items-center gap-2">
            <span>SELECTED CLIENT COMMERCE PORTFOLIO</span>
            <span className="text-stone-300">/</span>
            <span className="text-stone-700 font-semibold">2025—2026 EDITION</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-400">
            <span>SHOPIFY PLUS</span>
            <span>•</span>
            <span>HEADLESS NEXT.JS</span>
            <span>•</span>
            <span>CONVERSION FUNNELS</span>
          </div>
        </div>

        {/* Editorial Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] tracking-[-0.02em] font-normal text-[#141413]">
              Where high luxury <br />
              meets <span className="italic font-normal">sub-second</span> velocity.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <p className="text-stone-600 text-base md:text-lg leading-relaxed font-light">
              We design and engineer bespoke e-commerce storefronts and high-converting campaign
              landing pages for ambitious brands who refuse to compromise between editorial beauty and commercial performance.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-400 transition-colors"
              >
                <span>Explore Showcase Archive</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <span className="text-stone-300">•</span>

              <button
                onClick={onOpenEstimator}
                className="text-xs font-semibold tracking-wider uppercase text-stone-600 hover:text-stone-900 transition-colors"
              >
                Inquire For Project
              </button>
            </div>
          </div>
        </div>

        {/* Verified Impact Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-white border border-[#E6E5DF] shadow-xs mb-12">
          <div className="space-y-1 sm:border-r sm:border-stone-100 sm:pr-4">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-mono uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              <span>Client Revenue</span>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#141413]">
              $148M+
            </div>
            <div className="text-[11px] text-stone-500">Processed across deployed platforms</div>
          </div>

          <div className="space-y-1 lg:border-r lg:border-stone-100 lg:pr-4">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-mono uppercase tracking-wider">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Median Load Time</span>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#141413]">
              0.65s
            </div>
            <div className="text-[11px] text-stone-500">Sub-second edge caching & hydration</div>
          </div>

          <div className="space-y-1 sm:border-r sm:border-stone-100 sm:pr-4">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-mono uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              <span>Avg. Conversion Lift</span>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#141413]">
              +48.6%
            </div>
            <div className="text-[11px] text-stone-500">Post-launch A/B audited increase</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-mono uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-stone-600" />
              <span>Design & Dev Honors</span>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#141413]">
              34 Awards
            </div>
            <div className="text-[11px] text-stone-500">Awwwards, FWA & Shopify Commerce</div>
          </div>
        </div>

        {/* Platform & Category Filtering Tab Pills */}
        <div id="work" className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Filter by Platform & Medium:
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => onSelectCategory(cat.label)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-[#141413] text-[#FAFAF8] shadow-xs"
                      : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:border-stone-300"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-stone-700 text-stone-200" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

