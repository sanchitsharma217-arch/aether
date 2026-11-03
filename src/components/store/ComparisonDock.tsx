"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, X, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const ComparisonDock: React.FC = () => {
  const { comparedProducts, toggleCompare, clearCompare, setIsCompareOpen, isMounted } = useStore();

  if (!isMounted || comparedProducts.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none"
      >
        <div className="bg-[#0A0A0C] text-white rounded-full p-2 pl-4 pr-3 border border-[#242429] shadow-2xl flex items-center justify-between gap-3 pointer-events-auto backdrop-blur-md">
          {/* Left: Indicator & Count */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <Scale className="h-4 w-4" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-400">
                COMPARISON DOCK
              </span>
              <p className="text-[11px] text-stone-400 leading-tight">
                {comparedProducts.length} of 4 objects staged for specification analysis
              </p>
            </div>
          </div>

          {/* Middle: Thumbnails */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {comparedProducts.map((p) => (
              <div
                key={p.id}
                className="relative group h-9 w-9 rounded-full bg-white/10 border border-white/20 overflow-hidden shrink-0"
              >
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                <button
                  onClick={() => toggleCompare(p.id)}
                  title="Remove from comparison"
                  className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-2 rounded-full bg-white text-[#0A0A0C] font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-200 transition-all flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
            >
              <span>Compare Specs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={clearCompare}
              title="Clear all"
              className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
