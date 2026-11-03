"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { DEPARTMENTS } from "@/data/mockProducts";
import { useStore } from "@/context/StoreContext";

export const IntentDepartments: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const deptCards = [
    {
      id: "hard-goods",
      title: "Hard Goods & Foundry",
      category: "Home & Living",
      count: "18 SKUs",
      location: "Lyon & Toyama",
      image: "https://images.unsplash.com/photo-1584990347449-397a6590214a?w=1000&auto=format&fit=crop&q=90",
      materials: "Recycled Pig Iron · Sand-Cast Bronze · Vitreous Enamel",
      desc: "Indestructible cookware and mineral vessels cast for multi-generational hearths.",
      span: "lg:col-span-7",
    },
    {
      id: "audio-systems",
      title: "Acoustic Systems",
      category: "Tech & Audio",
      count: "12 SKUs",
      location: "Berlin & Miyagi",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=90",
      materials: "Planar Beryllium · Solid American Walnut · Aircraft 6061",
      desc: "Zero-distortion studio monitoring instruments with glue-free field modularity.",
      span: "lg:col-span-5",
    },
    {
      id: "living-space",
      title: "Living Architecture",
      category: "Home & Living",
      count: "24 SKUs",
      location: "Flanders & Lancaster",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&auto=format&fit=crop&q=90",
      materials: "Belgian Flax · Continuous Heartwood Timber · Natural Beeswax",
      desc: "Thermo-regulating long-staple bedding and continuous-grain hardwood plinths.",
      span: "lg:col-span-4",
    },
    {
      id: "pantry-origins",
      title: "Pantry & Slow Extraction",
      category: "Home & Living",
      count: "15 SKUs",
      location: "Tokoname & Zurich",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&auto=format&fit=crop&q=90",
      materials: "High-Reduction Stoneware · 48mm Heptagonal Steel · Hinoki Wood",
      desc: "Mineral-rich ceramic drippers, nitrogen-hardened mills, and Aogami carbon blades.",
      span: "lg:col-span-4",
    },
    {
      id: "apparel-edc",
      title: "Apparel Architecture & EDC",
      category: "Accessories",
      count: "19 SKUs",
      location: "Chicago & Neuchâtel",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&auto=format&fit=crop&q=90",
      materials: "Horween Chromexcel Steerhide · Grade-5 Titanium · Sapphire",
      desc: "Modular pull-up folios and self-winding mechanical calibers that outlive electronics.",
      span: "lg:col-span-4",
    },
  ];

  return (
    <section id="intent-departments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#E5E5E9] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#EA580C] uppercase tracking-widest">
            SECTION 04 // MATERIAL GUILDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
            Departments of Craft.
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
        >
          <span>VIEW ALL 5 DEPARTMENTS</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Asymmetric Masonry Layout with 7/5 Split on Row 1 and 4/4/4 on Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {deptCards.map((dept) => (
          <Link
            key={dept.id}
            href="/shop"
            onClick={() => setSelectedCategory(dept.category)}
            className={`group bg-white rounded-3xl overflow-hidden border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer ${dept.span}`}
          >
            {/* Visual Frame */}
            <div className="relative h-60 w-full bg-[#18181C] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-108 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${dept.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold glass-pill-dark text-white px-3 py-1 rounded-full shadow-md">
                  {dept.count}
                </span>
                <span className="text-[10px] font-mono font-semibold text-stone-300 glass-pill-dark px-2.5 py-1 rounded-full">
                  {dept.location}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight uppercase">
                  {dept.title}
                </h3>
              </div>
            </div>

            {/* Content & Specs */}
            <div className="p-5 sm:p-6 space-y-3">
              <p className="text-xs text-[#64646E] line-clamp-2 leading-relaxed font-sans">
                {dept.desc}
              </p>

              <div className="pt-3 border-t border-[#E5E5E9] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#64646E] font-medium truncate mr-2">{dept.materials}</span>
                <ArrowRight className="h-4 w-4 text-[#0A0A0C] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
