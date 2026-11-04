"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { CraftDepartment } from "@/types/store";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/mockProducts";

export const IntentDepartments: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const deptCards: {
    id: string;
    title: string;
    category: CraftDepartment;
    tranche: string;
    location: string;
    image: string;
    materials: string;
    desc: string;
    span: string;
  }[] = [
    {
      id: "tech-audio",
      title: "Technology & Audio",
      category: "Technology & Audio",
      tranche: "Tranche 01 · Active",
      location: "Berlin & Zurich",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=90",
      materials: "Planar Diaphragms · Solid American Walnut · Aircraft 6061 Alloy",
      desc: "Reference acoustic monitors and micro-tolerance tooling with zero cloud or battery tethering.",
      span: "lg:col-span-7",
    },
    {
      id: "kitchen-culinary",
      title: "Kitchen & Culinary",
      category: "Kitchen & Culinary",
      tranche: "Tranche 01 · Active",
      location: "Champagne-Ardenne & Kochi",
      image: "https://images.unsplash.com/photo-1556909128-2293de4be38e?w=1000&auto=format&fit=crop&q=90",
      materials: "French Sand-Cast Iron · Hitachi Blue Paper Steel · Tokoname Clay",
      desc: "Generational Dutch ovens, pine-charcoal forged carbon blades, and mineral pour-over ceramics.",
      span: "lg:col-span-5",
    },
    {
      id: "home-living",
      title: "Home & Living",
      category: "Home & Living",
      tranche: "Tranche 01 · Active",
      location: "Lancaster, Flanders & Évora",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1000&auto=format&fit=crop&q=90",
      materials: "Continuous Black Walnut · Masters of Linen Flax · Portuguese Cork",
      desc: "Tactile natural fibers, single-billet desktop plinths, and circular organic desk surfaces.",
      span: "lg:col-span-4",
    },
    {
      id: "wearables-horology",
      title: "Wearables & Horology",
      category: "Wearables & Horology",
      tranche: "Tranche 01 · Active",
      location: "Neuchâtel, Switzerland",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&auto=format&fit=crop&q=90",
      materials: "Grade-5 Aerospace Titanium · Double-Domed Sapphire · Super-LumiNova",
      desc: "Self-winding mechanical movements sculpted from titanium ingots for multi-decade transit.",
      span: "lg:col-span-4",
    },
    {
      id: "accessories-edc",
      title: "Accessories & EDC",
      category: "Accessories & EDC",
      tranche: "Tranche 01 · Active",
      location: "Chicago, Paris & Solingen",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&auto=format&fit=crop&q=90",
      materials: "Horween Chromexcel Steerhide · Solid C360 Brass · Braided Thread",
      desc: "Saddle-stitched leather field folios and solid milled brass rollerballs that acquire individual patina.",
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
            5 Departments of Craft.
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
        >
          <span>VIEW FULL CATALOG ARCHIVE</span>
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
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
              <img
                src={dept.image}
                alt={dept.title}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badges on Visual */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-[10px] font-mono font-medium text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
                  {dept.tranche}
                </span>
                <span className="text-[10px] font-mono font-medium text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
                  {PRODUCTS.filter((p) => p.category === dept.category).length} Master SKUs
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                  {dept.location}
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight uppercase leading-snug">
                  {dept.title}
                </h3>
              </div>
            </div>

            {/* Description & Materials Body */}
            <div className="p-6 space-y-3 bg-white flex-1 flex flex-col justify-between">
              <p className="text-xs text-[#64646E] leading-relaxed font-sans">
                {dept.desc}
              </p>

              <div className="pt-3 border-t border-[#E5E5E9] flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span className="truncate max-w-[80%] text-[10px] text-stone-600 font-sans">
                  {dept.materials}
                </span>
                <span className="text-[#0A0A0C] font-bold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
