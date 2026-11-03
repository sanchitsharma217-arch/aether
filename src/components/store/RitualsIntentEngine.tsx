"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Compass,
  Search,
  ShoppingBag,
  Leaf,
  ShieldCheck,
  Layers,
  Building2,
  Truck,
} from "lucide-react";
import { RITUAL_SCENARIOS, RitualScenario } from "@/data/ritualsData";
import { PRODUCTS } from "@/data/mockProducts";
import { useStore } from "@/context/StoreContext";
import Link from "next/link";

interface Props {
  className?: string;
}

export const RitualsIntentEngine: React.FC<Props> = ({ className = "" }) => {
  const [userSelectedScenarioId, setUserSelectedScenarioId] = useState<string | null>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const { addBundleToCart, searchQuery, setActiveBuyBoxProduct } = useStore();

  // Derive active scenario based on user click or search query
  const activeScenarioId = useMemo(() => {
    if (userSelectedScenarioId) return userSelectedScenarioId;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (q.includes("tokyo") || q.includes("acoustic") || q.includes("audio") || q.includes("sound")) {
        return "suite-audio";
      }
      if (q.includes("ceramic") || q.includes("morning") || q.includes("culinary") || q.includes("kitchen") || q.includes("pour-over")) {
        return "suite-culinary";
      }
      if (q.includes("edc") || q.includes("commute") || q.includes("watch") || q.includes("leather")) {
        return "suite-commute";
      }
      if (q.includes("work") || q.includes("desk") || q.includes("studio") || q.includes("linen")) {
        return "suite-workstation";
      }
    }
    return "suite-workstation";
  }, [userSelectedScenarioId, searchQuery]);

  // Find active scenario
  const currentScenario: RitualScenario =
    RITUAL_SCENARIOS.find((s) => s.id === activeScenarioId) || RITUAL_SCENARIOS[0];

  // Resolve bundle products from PRODUCTS
  const bundleProducts = currentScenario.bundleProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[0] => Boolean(p));

  const regularTotal = bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const discountMultiplier = (100 - currentScenario.bundleDiscountPercent) / 100;
  const bundleTotal = Math.round(regularTotal * discountMultiplier);
  const totalSavings = regularTotal - bundleTotal;

  const handleAssembleSuite = () => {
    setIsAssembled(true);
    const bundleItems = bundleProducts.map((prod) => ({
      product: prod,
      quantity: 1,
      color: prod.colors?.[0]?.name,
      offer: prod.offers?.[0],
    }));
    addBundleToCart(bundleItems);
    setTimeout(() => {
      setIsAssembled(false);
    }, 900);
  };

  return (
    <div
      id="intent-engine"
      className={`rounded-3xl border border-[#E5E5E9] bg-white p-6 sm:p-8 md:p-10 floating-card relative overflow-hidden scroll-mt-24 ${className}`}
    >
      {/* Marketplace Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E5E9]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
              CROSS-VENDOR SUITE BUILDER // INTENT ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase">
            Curate by Living Capsule, not Isolated SKUs.
          </h2>
          <p className="text-xs sm:text-sm text-[#64646E] font-sans mt-1 max-w-2xl leading-relaxed">
            Amazon expects you to search 20 separate keywords across conflicting dropshippers. Aether clusters complementary objects from certified independent makers into a unified, discounted setup.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#64646E] font-sans">
          <div className="flex items-center gap-1.5 bg-[#F9F9FB] px-3.5 py-1.5 rounded-full border border-[#E5E5E9] shadow-xs">
            <Truck className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[11px] font-mono font-bold text-[#0A0A0C]">1 Consolidated 4PL Parcel</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Category Tabs: [ Workstation ], [ Culinary / Kitchen ], [ Commute / EDC ], [ Audio Sanctuary ] */}
      <div className="flex items-center gap-2 pt-6 pb-6 overflow-x-auto no-scrollbar">
        {RITUAL_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === currentScenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setUserSelectedScenarioId(scenario.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-[#0D0D0D] text-white shadow-md scale-102"
                  : "bg-[#F9F9FB] border border-[#E5E5E9] text-[#64646E] hover:bg-white hover:text-black hover:border-[#0A0A0C]"
              }`}
            >
              <span>{scenario.tabLabel}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                  isActive ? "bg-[#EA580C] text-white" : "bg-stone-200 text-stone-700"
                }`}
              >
                -{scenario.bundleDiscountPercent}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Multi-Item Suite Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScenario.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Suite Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F9F9FB] rounded-2xl p-4 sm:p-5 border border-[#E5E5E9]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
                {currentScenario.tagline}
              </span>
              <h3 className="text-base sm:text-lg font-sans font-black tracking-tight text-[#0A0A0C] uppercase">
                {currentScenario.title}
              </h3>
              <p className="text-xs text-[#64646E] font-sans max-w-xl">
                {currentScenario.description}
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-[#E5E5E9] sm:pl-6 shrink-0">
              <div className="text-xs text-[#64646E] line-through font-mono">
                Individual Total: ${regularTotal}
              </div>
              <div className="text-xl font-mono font-black text-[#0A0A0C]">
                ${bundleTotal}{" "}
                <span className="text-xs font-mono font-bold text-emerald-700">
                  (Save ${totalSavings})
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Item Grid with Photo Zoom */}
          <div
            className={`grid grid-cols-1 ${
              bundleProducts.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            } gap-4 sm:gap-6`}
          >
            {bundleProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E5E9] flex flex-col justify-between gap-4 floating-card hover:border-[#0A0A0C] transition-all group h-full"
              >
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gradient-to-b from-[#F8F8FA] to-[#EFEFF3] border border-[#E5E5E9] p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-[#64646E] truncate">
                      {prod.canonicalSku || "CANONICAL-SKU"}
                    </div>

                    <h4
                      onClick={() => setActiveBuyBoxProduct(prod)}
                      className="text-xs sm:text-sm font-sans font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {prod.title}
                    </h4>

                    {/* Vendor Attribution */}
                    <div className="space-y-0.5 text-[11px] font-sans pt-0.5">
                      <div className="text-[#EA580C] font-semibold flex items-center gap-1">
                        <Building2 className="h-3 w-3 shrink-0" />
                        <span className="truncate">{prod.primaryVendor?.name || "Master Atelier"}</span>
                      </div>
                      <div className="text-[#64646E] text-[10px] flex items-center gap-1.5 font-mono">
                        <span>{prod.offers?.length || prod.verifiedSellersCount || 1} Offers</span>
                        <span>•</span>
                        <span className="font-bold text-emerald-700">{prod.lifespanScore || 9.8}/10 Score</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E9] text-xs font-mono">
                  <div className="text-base font-mono font-black text-[#0A0A0C]">
                    ${prod.price}
                  </div>
                  <button
                    onClick={() => setActiveBuyBoxProduct(prod)}
                    className="text-[10px] font-mono font-bold text-blue-700 hover:text-black underline cursor-pointer"
                  >
                    Compare Offers
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Setup Builder Action Bar */}
          <div className="bg-[#0D0D0D] text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-stone-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-sans font-bold uppercase tracking-tight">
                  Assemble {currentScenario.tabLabel} Capsule
                </h4>
                <p className="text-[11px] text-stone-400 font-sans">
                  Clusters {bundleProducts.length} objects from verified independent makers into a single low-impact 4PL parcel.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <span className="text-[11px] text-stone-400 font-mono line-through">
                  ${regularTotal}
                </span>
                <div className="text-xl font-mono font-black text-white">
                  ${bundleTotal}
                </div>
              </div>

              <button
                onClick={handleAssembleSuite}
                disabled={isAssembled}
                className={`w-full sm:w-auto px-7 py-3 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-98 ${
                  isAssembled
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-[#0A0A0C] hover:bg-stone-200"
                }`}
              >
                {isAssembled ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Complete Suite Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 text-emerald-700" />
                    <span>Add Complete Suite (${bundleTotal})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
