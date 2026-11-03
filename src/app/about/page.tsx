"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Compass, Wrench } from "lucide-react";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 font-sans"
    >
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-[#C2673D]" />
          <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-[0.25em] font-mono">
            THE AETHER MANIFESTO // ISSUE NO. 04
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black uppercase text-[#0A0A0C] tracking-tight leading-[1.05]">
          We built the antidote to the everything store.
        </h1>
        <p className="text-[#64646E] text-base sm:text-lg leading-relaxed font-sans">
          E-commerce was promised to give us infinite choice. Instead, it gave us infinite noise: sponsored ads on every row, 40 identical clone products manufactured for landfills, and fake five-star reviews. Aether is a quiet rebellion toward <strong>Objects of Permanence</strong>.
        </p>
      </div>

      {/* The 4 Aether Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-7 rounded-3xl bg-white border border-[#E4DFD5] shadow-xs space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-[#F7F5F0] flex items-center justify-center text-[#1C1917] font-mono font-bold text-xs">
            01
          </div>
          <h3 className="text-base font-serif font-bold text-[#1C1917]">Intent over Catalog</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            People live in scenarios, not search queries. Our natural language Intent Engine resolves your lifestyle setup into a harmonized, certified cross-category bundle in one click.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white border border-[#E4DFD5] shadow-xs space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-[#F7F5F0] flex items-center justify-center text-[#1C1917] font-mono font-bold text-xs">
            02
          </div>
          <h3 className="text-base font-serif font-bold text-[#1C1917]">Canonical Master SKUs</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            One single master page per physical product—like the Wikipedia of commerce. Certified workshops compete transparently on dispatch speed, condition, and carbon offset.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white border border-[#E4DFD5] shadow-xs space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-[#F7F5F0] flex items-center justify-center text-[#1C1917] font-mono font-bold text-xs">
            03
          </div>
          <h3 className="text-base font-serif font-bold text-[#1C1917]">Return Forensics</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            We publish true return ratios directly under the price tag, paired with verified 180-day wear-and-tear reports. Zero bot farms. Zero review bribery.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white border border-[#E4DFD5] shadow-xs space-y-3">
          <div className="h-10 w-10 rounded-2xl bg-[#F7F5F0] flex items-center justify-center text-[#1C1917] font-mono font-bold text-xs">
            04
          </div>
          <h3 className="text-base font-sans font-bold text-[#0A0A0C]">Repair Guarantee</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Every object is audited on our Endurance Index. Modular screw fasteners, zero glued disposable batteries, and product-specific spare parts commitments through 2038–2076.
          </p>
        </div>
      </div>

      {/* In-depth Editorial Narrative */}
      <div className="rounded-3xl bg-[#EFECE6]/70 border border-[#E4DFD5] p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-[10px] font-bold text-[#C2673D] uppercase tracking-[0.2em]">
            THE MATERIAL AUDIT
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#1C1917] leading-tight">
            &ldquo;If an object cannot be repaired, it is not luxury. It is merely expensive waste.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            We source exclusively from independent multi-generational workshops: iron-dense Tokoname potters in Japan, Flanders heritage flax weavers in Belgium, Tuscan vegetable tanners in Italy, and Tosa mountain blacksmiths.
          </p>
          <div className="pt-2 flex items-center gap-6 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-[#5E6857]" />
              <span>100% Zero Plastic Packaging</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#C2673D]" />
              <span>Modular Disassembly</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden border border-[#E4DFD5] shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&auto=format&fit=crop&q=80"
            alt="Hand-Turned Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Call to action */}
      <div className="rounded-3xl bg-[#1C1917] text-[#F7F5F0] p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#2A2522]">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-serif">Begin your unhurried ritual.</h3>
          <p className="text-stone-400 text-xs sm:text-sm font-sans">
            Enjoy low-impact consolidated delivery and a quiet 30-day home trial on all orders.
          </p>
        </div>
        <Link
          href="/shop"
          className="px-7 py-3.5 rounded-full bg-[#F7F5F0] text-[#1C1917] text-xs font-semibold tracking-wider uppercase hover:bg-white transition-colors shrink-0 shadow-sm cursor-pointer"
        >
          Explore Objects Archive
        </Link>
      </div>
    </motion.div>
  );
}
