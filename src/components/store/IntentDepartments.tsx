"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, Building2, MapPin, X, ShieldCheck } from "lucide-react";
import { CraftDepartment } from "@/types/store";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/mockProducts";
import { CERTIFIED_GUILDS } from "@/data/certifiedGuilds";

export const IntentDepartments: React.FC = () => {
  const { setSelectedCategory } = useStore();
  const [isGuildModalOpen, setIsGuildModalOpen] = useState(false);

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
      tranche: "Master Collection",
      location: "Berlin & Zurich",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=90",
      materials: "Planar Diaphragms · Solid American Walnut · Aircraft 6061 Alloy",
      desc: "Reference acoustic monitors and micro-tolerance tooling with zero cloud or battery tethering.",
      span: "lg:col-span-6",
    },
    {
      id: "kitchen-culinary",
      title: "Kitchen & Culinary",
      category: "Kitchen & Culinary",
      tranche: "Master Collection",
      location: "Champagne-Ardenne & Kochi",
      image: "https://images.unsplash.com/photo-1556909128-2293de4be38e?w=1000&auto=format&fit=crop&q=90",
      materials: "French Sand-Cast Iron · Hitachi Blue Paper Steel · Tokoname Clay",
      desc: "Generational Dutch ovens, pine-charcoal forged carbon blades, and mineral pour-over ceramics.",
      span: "lg:col-span-6",
    },
    {
      id: "home-living",
      title: "Home & Living",
      category: "Home & Living",
      tranche: "Master Collection",
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
      tranche: "Master Collection",
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
      tranche: "Master Collection",
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
            FEATURED DISCIPLINES (5 CORE DEPARTMENTS · 8 PARTNER GUILDS)
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-1">
            Five Departments of Craft.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsGuildModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] px-3 py-1.5 rounded-lg border border-[#E5E5E9] bg-[#F9F9FB] hover:border-black transition-colors cursor-pointer"
          >
            <Building2 className="h-3.5 w-3.5 text-[#EA580C]" />
            <span>ALL 8 GUILDS DIRECTORY</span>
          </button>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Symmetrical Grid: 2 equal cards on Row 1 (6/6), 3 equal cards on Row 2 (4/4/4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        {deptCards.map((dept) => (
          <Link
            key={dept.id}
            href="/shop"
            onClick={() => setSelectedCategory(dept.category)}
            className={`group bg-white rounded-2xl overflow-hidden border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer h-full ${dept.span}`}
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
                  {PRODUCTS.filter((p) => p.category === dept.category).length} Works
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
              <p className="text-xs text-[#64646E] leading-relaxed font-sans line-clamp-2 h-10">
                {dept.desc}
              </p>

              <div className="pt-3 border-t border-[#E5E5E9] flex items-center justify-between text-[11px] font-mono text-stone-500 mt-auto">
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

      {/* Complete 8 Certified Guilds Directory Modal */}
      <AnimatePresence>
        {isGuildModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-3xl bg-white rounded-2xl border border-[#E5E5E9] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-5 sm:p-6 border-b border-[#E5E5E9] flex items-center justify-between bg-[#F9F9FB]">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
                      ATELIER REGISTRY
                    </span>
                  </div>
                  <h3 className="text-xl font-sans font-black text-[#0A0A0C]">
                    All 8 Certified Guild Workshops
                  </h3>
                </div>
                <button
                  onClick={() => setIsGuildModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-black rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 divide-y divide-[#E5E5E9]">
                {CERTIFIED_GUILDS.map((guild) => (
                  <div key={guild.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0A0A0C]">{guild.name}</span>
                        <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">
                          Est. {guild.foundedYear}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500 font-mono text-[11px]">
                        <MapPin className="h-3 w-3 text-stone-400" />
                        <span>{guild.location}</span>
                        <span>·</span>
                        <span className="text-emerald-700">{guild.activeCraftspeople} Master Craftspeople</span>
                      </div>
                      <p className="text-stone-600 font-sans text-xs pt-0.5 max-w-lg">
                        {guild.specialty}
                      </p>
                    </div>

                    <Link
                      href="/shop"
                      onClick={() => setIsGuildModalOpen(false)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] px-3 py-1.5 rounded-lg border border-[#E5E5E9] hover:border-black shrink-0 self-start transition-colors"
                    >
                      <span>Explore Works</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#F9F9FB] border-t border-[#E5E5E9] flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>All 8 workshops operate on direct merchant settlement (93% direct payout).</span>
                <button
                  onClick={() => setIsGuildModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#0D0D0D] text-white hover:bg-black font-medium transition-colors cursor-pointer"
                >
                  Close Directory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
