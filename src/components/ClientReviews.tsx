"use client";

import React from "react";
import { Star, Quote, ArrowUpRight } from "lucide-react";

export const ClientReviews: React.FC = () => {
  const reviews = [
    {
      quote:
        "Vanguard rebuilt our flagship on Headless Next.js and Shopify Storefront. Our sub-second speed and custom stack builder immediately increased our cold traffic conversion rate by +168%. The ROI was paid back in 19 days.",
      author: "Dr. Marcus Vance",
      role: "Co-Founder & CPO",
      brand: "Kinetic Performance Labs",
      metric: "+168% Mobile CVR",
      platform: "Headless Next.js",
    },
    {
      quote:
        "In the luxury apparel tier, standard Shopify templates feel cheap. Atelier Vanguard delivered a bespoke Liquid architecture that rivals high-fashion Parisian houses while maintaining flawless checkout stability.",
      author: "Éléonore de Saint-Germain",
      role: "Global Head of Digital",
      brand: "Aura Maison",
      metric: "+54.2% Checkout Completion",
      platform: "Shopify Plus",
    },
    {
      quote:
        "Our paid Meta ad CAC was climbing until Vanguard built our dedicated editorial campaign landing pages. Cold ROAS jumped from 2.1x to 4.8x. They understand direct response psychology as deeply as design.",
      author: "Chloe Callahan",
      role: "VP of Growth Marketing",
      brand: "Solis Eyewear",
      metric: "4.8x Meta ROAS",
      platform: "Editorial Landing Page",
    },
  ];

  const brandLogos = [
    "AURA MAISON",
    "KINETIC LABS",
    "SOLIS OPTICAL",
    "NORDEN INTERIORS",
    "BOTANICA ESSENTIALS",
    "VELA CHRONOMETRY",
  ];

  return (
    <section id="reviews" className="py-20 md:py-28 border-b border-[#E6E5DF] bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Trusted Brand Strip */}
        <div className="border-b border-stone-200/80 pb-12 mb-16">
          <div className="text-center text-xs font-mono uppercase tracking-[0.25em] text-stone-400 mb-8">
            Trusted by Visionary DTC Brands & Luxury Houses Globally
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {brandLogos.map((brand) => (
              <span
                key={brand}
                className="font-editorial text-base sm:text-lg tracking-widest text-stone-500 hover:text-stone-900 transition-colors uppercase"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500">
              EXECUTIVE TESTIMONIALS
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#141413]">
              What founders and e-commerce leaders say.
            </h2>
          </div>
          <div className="text-xs font-mono text-stone-500">
            AVERAGE CLIENT NET PROMOTER SCORE: <span className="font-bold text-stone-900">98 / 100</span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {rev.platform}
                  </span>
                </div>

                <p className="font-editorial text-base sm:text-lg leading-relaxed text-stone-800 italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-end justify-between">
                <div>
                  <div className="text-sm font-semibold text-stone-900">{rev.author}</div>
                  <div className="text-xs text-stone-500">{rev.role}</div>
                  <div className="text-[11px] font-mono text-stone-400 mt-0.5">{rev.brand}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-stone-400 uppercase">Impact</div>
                  <div className="text-sm font-bold text-emerald-700">{rev.metric}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

