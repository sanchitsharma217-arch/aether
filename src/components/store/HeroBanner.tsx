"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sparkles,
  ArrowRight,
  Search,
  Check,
  ShoppingBag,
  Building2,
  Truck,
  ShieldCheck,
  Volume2,
  Layers,
  Flame,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/mockProducts";

export const HeroBanner: React.FC = () => {
  const { addBundleToCart, searchQuery, setSearchQuery, setActiveBuyBoxProduct } = useStore();
  const [activeTab, setActiveTab] = useState<"audio" | "kitchen" | "wfh">("audio");
  const [isAdding, setIsAdding] = useState(false);
  const [activeSpecPoint, setActiveSpecPoint] = useState<number | null>(null);

  // Tab definitions with 3 distinct verified vendors each
  const suites = {
    audio: {
      name: "ACOUSTIC PURIST MONOLITH",
      tagline: "BERLIN // HI-RES MASTER MONITORING",
      desc: "Reference 10Hz–45kHz studio audio without harmonic coloration or digital compression.",
      heroProduct: PRODUCTS.find((p) => p.id === "prod-1") || PRODUCTS[0],
      heroImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1600&auto=format&fit=crop&q=90",
      specPoints: [
        { label: "80mm Planar Diaphragm", desc: "0.05% THD reference accuracy", top: "25%", left: "15%" },
        { label: "Black Walnut Resonance", desc: "Hand-turned acoustic chambers", top: "62%", left: "22%" },
        { label: "Modular Billet Frame", desc: "100% field serviceable with T5", top: "35%", left: "75%" },
      ],
      items: [
        {
          id: "h01-monitors",
          product: PRODUCTS.find((p) => p.id === "prod-1") || PRODUCTS[0],
          name: "H-01 Open-Back Planar Monitors",
          vendor: "Sonic Laboratories",
          location: "Berlin, Germany",
          price: 340,
          image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80",
        },
        {
          id: "titanium-watch",
          product: PRODUCTS.find((p) => p.id === "prod-2") || PRODUCTS[3],
          name: "Field Horology Titanium Automatic",
          vendor: "Alpine Precision Studio",
          location: "Zurich, Switzerland",
          price: 420,
          image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80",
        },
        {
          id: "aogami-blade",
          product: PRODUCTS.find((p) => p.id === "prod-santoku") || PRODUCTS[9],
          name: "Hand-Forged Aogami Santoku",
          vendor: "Tosa Munemitsu Forge",
          location: "Kochi, Japan",
          price: 185,
          image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&auto=format&fit=crop&q=80",
        },
      ],
      total: 945,
    },
    kitchen: {
      name: "HEARTH & EXTRACTION SUITE",
      tagline: "TOKONAME // FRENCH FOUNDRY HEIRLOOM",
      desc: "Sand-cast pig iron heat retention and high-reduction iron stoneware extraction.",
      heroProduct: PRODUCTS.find((p) => p.id === "prod-dutch-oven") || PRODUCTS[1],
      heroImage: "https://images.unsplash.com/photo-1584990347449-397a6590214a?w=1600&auto=format&fit=crop&q=90",
      specPoints: [
        { label: "Vitreous Quartz Enamel", desc: "Triple-fired non-reactive interior", top: "30%", left: "20%" },
        { label: "Self-Basting Spikes", desc: "Even moisture condensation lid", top: "50%", left: "75%" },
      ],
      items: [
        {
          id: "dutch-oven",
          product: PRODUCTS.find((p) => p.id === "prod-dutch-oven") || PRODUCTS[1],
          name: "Cast Enamelled Dutch Oven 5.5qt",
          vendor: "Atelier de Fonte",
          location: "Lyon, France",
          price: 280,
          image: "https://images.unsplash.com/photo-1584990347449-397a6590214a?w=400&auto=format&fit=crop&q=80",
        },
        {
          id: "tokoname-brewer",
          product: PRODUCTS.find((p) => p.id === "prod-brewer") || PRODUCTS[4],
          name: "Tokoname Hand-Turned Brewer",
          vendor: "Kenjiro Yamada Guild",
          location: "Tokoname, Japan",
          price: 98,
          image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80",
        },
        {
          id: "conical-mill",
          product: PRODUCTS.find((p) => p.id === "prod-mill") || PRODUCTS[6],
          name: "Apex Conical Burr Extraction Mill",
          vendor: "Apex Zurich Engineering",
          location: "Zurich, Switzerland",
          price: 220,
          image: "https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?w=400&auto=format&fit=crop&q=80",
        },
      ],
      total: 598,
    },
    wfh: {
      name: "ARCHITECT TACTILE STUDIO",
      tagline: "CHICAGO // HORWEEN FULL-GRAIN",
      desc: "Sustainably harvested Pennsylvania timber and heavy pull-up steerhide essentials.",
      heroProduct: PRODUCTS.find((p) => p.id === "prod-folio") || PRODUCTS[2],
      heroImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1600&auto=format&fit=crop&q=90",
      specPoints: [
        { label: "Horween Chromexcel", desc: "89-day cold bark pit tannage", top: "28%", left: "20%" },
        { label: "Saddler-Stitched Seams", desc: "Heavy waxed polycord construction", top: "65%", left: "70%" },
      ],
      items: [
        {
          id: "leather-folio",
          product: PRODUCTS.find((p) => p.id === "prod-folio") || PRODUCTS[2],
          name: "Horween Chromexcel Leather Folio",
          vendor: "Chicago Tanner Guild",
          location: "Chicago, USA",
          price: 165,
          image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80",
        },
        {
          id: "desk-companion",
          product: PRODUCTS.find((p) => p.id === "prod-desk-companion") || PRODUCTS[7],
          name: "Solid American Walnut Companion",
          vendor: "Miller Millwork",
          location: "Pennsylvania, USA",
          price: 135,
          image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=80",
        },
        {
          id: "bronze-vessel",
          product: PRODUCTS.find((p) => p.id === "prod-incense") || PRODUCTS[10],
          name: "Yoshino Hinoki Cypress Vessel",
          vendor: "Takaoka Foundry",
          location: "Toyama, Japan",
          price: 88,
          image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&auto=format&fit=crop&q=80",
        },
      ],
      total: 388,
    },
  };

  const currentSuite = suites[activeTab];

  const handleAddSuite = () => {
    setIsAdding(true);
    const bundleItems = currentSuite.items.map((item) => ({
      product: item.product,
      quantity: 1,
      offer: item.product.offers?.[0],
    }));
    addBundleToCart(bundleItems);
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  const quickChips = [
    { label: 'Try: "Acoustic Focus Workspace"', tab: "audio" as const },
    { label: 'Try: "Pour-Over Coffee Ritual"', tab: "kitchen" as const },
    { label: 'Try: "Minimalist Weekend Commute"', tab: "wfh" as const },
  ];

  return (
    <div className="relative bg-white pt-6 pb-14 sm:pt-8 sm:pb-20 overflow-hidden border-b border-[#E5E5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow & Live Telemetry Pill */}
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-[#0A0A0C] uppercase tracking-widest">
              SYSTEM 04 // THE ANTI-AMAZON MONOLITH
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-[#64646E]">
            <span>142 Certified Guilds</span>
            <span>·</span>
            <span>100% Batched 4PL Dispatch</span>
          </div>
        </div>

        {/* HERO TITLE: Giant High-Impact Grotesque Typography */}
        <div className="pb-8 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-7xl lg:text-[88px] font-sans font-black tracking-tighter text-[#0A0A0C] uppercase leading-[0.9] select-none"
          >
            The Universal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0C] via-stone-700 to-stone-400">
              Exchange.
            </span>
          </motion.h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="text-sm sm:text-base text-[#64646E] max-w-xl font-sans leading-relaxed">
              No pay-to-play algorithms. No cloned white-label listings. Every physical object has one canonical master page, verified durability forensics, and direct multi-vendor buy boxes.
            </p>

            {/* Quick Intent Scenario Input */}
            <div className="flex items-center gap-2 bg-[#F9F9FB] border border-[#E5E5E9] rounded-full p-1.5 pl-3.5 max-w-md w-full shadow-xs">
              <Search className="h-3.5 w-3.5 text-[#64646E] shrink-0" />
              <input
                type="text"
                placeholder="Living scenario: e.g. 'Acoustic focus'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-[#0A0A0C] placeholder-[#64646E] focus:outline-none font-sans"
              />
              <button
                onClick={() => {
                  const el = document.getElementById("asymmetric-vault");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#0D0D0D] text-white text-[11px] font-semibold hover:bg-black transition-all shrink-0 cursor-pointer shadow-xs"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* THE HERO MOMENT: Giant Studio Stage (65% Studio Photo Showcase / 35% Live Suite Dispatch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 65% (8 cols): Giant Studio Object with Dimensional Lighting & Shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 relative rounded-3xl bg-gradient-to-b from-[#18181C] via-[#0E0E11] to-[#0A0A0C] p-6 sm:p-10 text-white flex flex-col justify-between overflow-hidden shadow-2xl border border-[#242429] min-h-[520px] group"
          >
            {/* Ambient Dimensional Light Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-stone-700/20 via-stone-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Studio Object Stage Header */}
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                  {currentSuite.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white mt-2">
                  {currentSuite.heroProduct.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                  <span>CANONICAL: {currentSuite.heroProduct.canonicalSku || "CANONICAL-SKU"}</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-bold">{currentSuite.heroProduct.lifespanScore || 9.8}/10 Lifespan</span>
                </div>
              </div>

              {/* Inspect Button with Glassmorphism */}
              <button
                onClick={() => setActiveBuyBoxProduct(currentSuite.heroProduct)}
                className="glass-pill-dark px-4 py-2 rounded-full text-xs font-mono font-semibold text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5 shrink-0 shadow-lg cursor-pointer"
              >
                <span>Inspect 360° Dossier</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* The Razor-Sharp Hero Image with Deep Dimensional Floating Shadow */}
            <div className="relative z-10 my-8 sm:my-10 flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[16/10] flex items-center justify-center">
                <motion.img
                  key={currentSuite.heroImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={currentSuite.heroImage}
                  alt={currentSuite.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_40px_60px_rgba(0,0,0,0.85)] group-hover:scale-106 transition-transform duration-700 ease-out cursor-pointer"
                  onClick={() => setActiveBuyBoxProduct(currentSuite.heroProduct)}
                />

                {/* Interactive Glassmorphic Spec Hotspots */}
                {currentSuite.specPoints.map((point, idx) => (
                  <div
                    key={point.label}
                    style={{ top: point.top, left: point.left }}
                    className="absolute hidden sm:flex items-center gap-2 cursor-pointer z-20 group/point"
                    onMouseEnter={() => setActiveSpecPoint(idx)}
                    onMouseLeave={() => setActiveSpecPoint(null)}
                  >
                    <span className="h-3 w-3 rounded-full bg-emerald-400 animate-ping absolute" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black relative z-10" />
                    <div className="glass-pill-dark px-2.5 py-1 rounded-lg text-[10px] font-mono text-stone-200 border border-white/20 shadow-xl opacity-90 group-hover/point:opacity-100 group-hover/point:scale-105 transition-all">
                      <div className="font-bold text-white">{point.label}</div>
                      <div className="text-[9px] text-stone-400">{point.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Object Stage Bottom Ticker */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <Building2 className="h-3.5 w-3.5 text-amber-300" />
                  <span>Primary Atelier: {currentSuite.heroProduct.primaryVendor?.name || "Master Guild"}</span>
                </div>
                <span className="text-stone-600">|</span>
                <span className="text-emerald-400">Available from {currentSuite.heroProduct.offers?.length || 3} Verified Vendors</span>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="font-mono">${currentSuite.heroProduct.price}.00</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Best Live Offer
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT 35% (4 cols): Live Multi-Vendor Setup Switcher Console */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col justify-between floating-card rounded-3xl p-6 sm:p-7 border border-[#E5E5E9] bg-white relative"
          >
            {/* Header with Smooth Pill Switcher */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">
                  CURATED SETUP CONSOLE
                </span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                  100% Batched
                </span>
              </div>

              {/* Tab Pills with Smooth Hover & Active States */}
              <div className="grid grid-cols-3 gap-1 bg-[#F1F1F4] p-1 rounded-2xl border border-[#E5E5E9] text-xs font-mono">
                <button
                  onClick={() => setActiveTab("audio")}
                  className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                    activeTab === "audio"
                      ? "bg-[#0D0D0D] text-white shadow-md"
                      : "text-[#64646E] hover:text-[#0A0A0C]"
                  }`}
                >
                  Audio
                </button>
                <button
                  onClick={() => setActiveTab("kitchen")}
                  className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                    activeTab === "kitchen"
                      ? "bg-[#0D0D0D] text-white shadow-md"
                      : "text-[#64646E] hover:text-[#0A0A0C]"
                  }`}
                >
                  Kitchen
                </button>
                <button
                  onClick={() => setActiveTab("wfh")}
                  className={`py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                    activeTab === "wfh"
                      ? "bg-[#0D0D0D] text-white shadow-md"
                      : "text-[#64646E] hover:text-[#0A0A0C]"
                  }`}
                >
                  Studio
                </button>
              </div>

              <div>
                <h3 className="text-base font-sans font-bold text-[#0A0A0C] tracking-tight">
                  {currentSuite.name}
                </h3>
                <p className="text-xs text-[#64646E] font-sans mt-0.5 leading-relaxed">
                  {currentSuite.desc}
                </p>
              </div>

              {/* 3 Distinct Vendor Line Items with Micro Zoom */}
              <div className="space-y-2.5 pt-2">
                {currentSuite.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveBuyBoxProduct(item.product)}
                    className="p-3 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] flex items-center justify-between gap-3 hover:border-[#0A0A0C] hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-xl bg-white border border-[#E5E5E9] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-xs font-sans font-bold text-[#0A0A0C] group-hover:text-black truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#64646E] font-sans truncate">
                          <Building2 className="h-3 w-3 text-[#EA580C] shrink-0" />
                          <span>{item.vendor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#0A0A0C] shrink-0">
                      ${item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar with Deep Obsidian Button */}
            <div className="pt-4 border-t border-[#E5E5E9] space-y-3 mt-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#64646E] flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-blue-600" />
                  <span>4PL Batch Consolidation:</span>
                </span>
                <span className="text-emerald-700 font-bold">$0.00 (Free)</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64646E]">Bundle Total (3 Items)</span>
                  <div className="text-2xl font-mono font-black text-[#0A0A0C]">
                    ${currentSuite.total}.00
                  </div>
                </div>

                <button
                  onClick={handleAddSuite}
                  disabled={isAdding}
                  className="px-6 py-3 rounded-2xl bg-[#0D0D0D] hover:bg-black text-white font-sans font-semibold text-xs transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                >
                  {isAdding ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Adding 3 Items...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 text-emerald-400" />
                      <span>Add Setup</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
