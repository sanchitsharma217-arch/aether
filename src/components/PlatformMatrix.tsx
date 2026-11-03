"use client";

import React, { useState } from "react";
import { Check, Zap, Clock, ShieldCheck, ArrowRight, Layers } from "lucide-react";
import { PLATFORMS_DATA } from "@/data/platforms";

interface PlatformMatrixProps {
  onOpenEstimator: (platformId?: string) => void;
}

export const PlatformMatrix: React.FC<PlatformMatrixProps> = ({ onOpenEstimator }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>(PLATFORMS_DATA[0].id);

  const active = PLATFORMS_DATA.find((p) => p.id === selectedPlatform) || PLATFORMS_DATA[0];

  return (
    <section id="platforms" className="py-20 md:py-28 border-b border-[#E6E5DF] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-stone-200/80 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500">
              PLATFORM ARSENAL & CAPABILITIES
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#141413]">
              Engineered for the right stage, <br />
              <span className="italic">never</span> one-size-fits-all.
            </h2>
          </div>
          <p className="text-stone-600 text-sm md:text-base max-w-md font-light leading-relaxed">
            Whether you require the enterprise reliability of Shopify Plus, the zero-latency speed of Headless Next.js, or hyper-focused campaign landing pages, we build on the optimal stack for your business unit economics.
          </p>
        </div>

        {/* Platform Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {PLATFORMS_DATA.map((plat) => {
            const isSelected = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => setSelectedPlatform(plat.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#141413] text-[#FAFAF8] border-[#141413] shadow-md"
                    : "bg-white text-stone-700 border-stone-200/80 hover:border-stone-400"
                }`}
              >
                <div>
                  <div
                    className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${
                      isSelected ? "text-stone-400" : "text-stone-400"
                    }`}
                  >
                    {plat.badge}
                  </div>
                  <div className="text-sm font-semibold tracking-tight">{plat.name}</div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-[11px] font-mono">
                  <span className={isSelected ? "text-emerald-400" : "text-emerald-600"}>
                    {plat.speedRating}
                  </span>
                  <span className={isSelected ? "text-stone-500" : "text-stone-400"}>latency</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Platform Feature Deep Dive Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-stone-100 pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono">
                <Layers className="h-3.5 w-3.5" />
                <span>{active.badge}</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-4xl font-normal text-stone-900">
                {active.name}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {active.tagline}
              </p>
            </div>

            {/* Quick Metrics Pills */}
            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 min-w-[170px]">
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                  Typical Conversion
                </div>
                <div className="text-base font-bold text-stone-900">{active.conversionBenchmark}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 min-w-[170px]">
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                  Typical Delivery
                </div>
                <div className="text-base font-bold text-stone-900">{active.typicalTimeline}</div>
              </div>
            </div>
          </div>

          {/* Key Strengths & Best For */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                Ideal Application
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                {active.bestFor}
              </p>

              <div className="pt-4 space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.techKeywords.map((k) => (
                    <span
                      key={k}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-mono"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                Platform Capabilities & Engineering Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.keyStrengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50/80 border border-stone-100 text-xs text-stone-800"
                  >
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{strength}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => onOpenEstimator(active.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141413] text-[#FAFAF8] text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  <span>Inquire for {active.name.split("&")[0].trim()}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

