"use client";

import React from "react";
import { Search, Palette, Code2, Rocket, ArrowRight } from "lucide-react";

interface MethodologyProps {
  onOpenEstimator: () => void;
}

export const Methodology: React.FC<MethodologyProps> = ({ onOpenEstimator }) => {
  const steps = [
    {
      num: "01",
      title: "Commercial Friction & Funnel Audit",
      subtitle: "Uncovering where high-intent buyers drop off.",
      desc: "We analyze your existing conversion telemetry, heatmaps, scroll depth, and mobile checkout hurdles. We formulate a clear architectural roadmap with measurable revenue hypotheses.",
      icon: Search,
      deliverable: "Telemetry Audit & Architectural Blueprint",
    },
    {
      num: "02",
      title: "Editorial Design & High-Fashion UX",
      subtitle: "Elevating brand equity without sacrificing conversion.",
      desc: "We create interactive Figma prototypes tailored for luxury aesthetics, mobile-thumb ergonomical tap targets, editorial typography pairings, and micro-interactions that make buying feel effortless.",
      icon: Palette,
      deliverable: "High-Fidelity Interactive Prototypes & Design Tokens",
    },
    {
      num: "03",
      title: "Edge Engineering & Sub-Second Speed",
      subtitle: "Clean Liquid, Next.js, and headless GraphQL code.",
      desc: "We write clean, modular, accessible code utilizing edge prefetching, native Shopify Functions, localized multi-currency checkouts, and 98+ Google Lighthouse optimization.",
      icon: Code2,
      deliverable: "Production-Grade Codebase & Automated CI/CD",
    },
    {
      num: "04",
      title: "Conversion Calibration & Scaling",
      subtitle: "A/B testing and continuous revenue optimization.",
      desc: "Post-launch, we monitor real-time conversion rates across devices, optimize checkout latency, configure Klaviyo revenue triggers, and calibrate average order value upsells.",
      icon: Rocket,
      deliverable: "30-Day Conversion Tuning & Performance Guarantee",
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 border-b border-[#E6E5DF] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-stone-200/80 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500">
              METHODOLOGY & EXECUTION
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#141413]">
              The 4-stage engineering <br />
              <span className="italic">conversion</span> discipline.
            </h2>
          </div>
          <p className="text-stone-600 text-sm md:text-base max-w-md font-light leading-relaxed">
            Every store and landing page we ship is built around rigorous technical standards: predictable delivery timelines, transparent communication, and obsessive attention to conversion velocity.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-6 hover:border-stone-400 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-stone-300">
                      {st.num}
                    </span>
                    <div className="p-2 rounded-lg bg-stone-100 text-stone-700">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-editorial text-xl font-normal text-stone-900">
                      {st.title}
                    </h3>
                    <div className="text-xs font-mono text-stone-500">{st.subtitle}</div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    Phase Outcome
                  </div>
                  <div className="text-xs font-medium text-stone-800 mt-0.5">
                    {st.deliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Strip */}
        <div className="mt-12 p-8 rounded-2xl bg-[#141413] text-[#FAFAF8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-editorial text-2xl font-normal">
              Have an upcoming product release or store redesign?
            </h4>
            <p className="text-stone-400 text-xs sm:text-sm font-light">
              We accept a maximum of 3 concurrent client flagship builds per quarter to ensure uncompromising execution.
            </p>
          </div>

          <button
            onClick={onOpenEstimator}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FAFAF8] text-[#141413] text-xs font-semibold uppercase tracking-wider hover:bg-stone-200 transition-colors shrink-0"
          >
            <span>Reserve Production Slot</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

