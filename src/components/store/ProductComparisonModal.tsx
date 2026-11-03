"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, Check, ShoppingBag, ShieldCheck, Wrench, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Link from "next/link";

export const ProductComparisonModal: React.FC = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    comparedProducts,
    toggleCompare,
    clearCompare,
    addToCart,
  } = useStore();

  if (!isCompareOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCompareOpen(false)}
          className="fixed inset-0 bg-[#0A0A0C]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl border border-[#E5E5E9] shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-[#E5E5E9] flex items-center justify-between bg-[#F9F9FB]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#0A0A0C] text-white flex items-center justify-center">
                <Scale className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EA580C]">
                    CANONICAL BENCHMARK // SIDE-BY-SIDE
                  </span>
                  <span className="text-[10px] font-mono bg-stone-200 text-stone-800 px-2 py-0.5 rounded-full">
                    {comparedProducts.length} Objects Active
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase mt-0.5">
                  Specification & Endurance Ledger
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="text-xs font-mono text-[#64646E] hover:text-[#0A0A0C] transition-colors cursor-pointer hidden sm:inline"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="h-10 w-10 rounded-full border border-[#E5E5E9] bg-white flex items-center justify-center text-stone-600 hover:text-black hover:border-black transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-x-auto p-6 sm:p-8">
            {comparedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-sm text-stone-500 font-sans">No objects currently staged for comparison.</p>
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0A0A0C] text-white font-sans font-bold text-xs uppercase tracking-wider"
                >
                  Return to Archive
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#E5E5E9]">
                    <th className="p-4 w-48 text-[11px] font-mono uppercase text-[#64646E] font-bold">
                      Specification
                    </th>
                    {comparedProducts.map((p) => (
                      <th key={p.id} className="p-4 align-top min-w-[220px]">
                        <div className="space-y-3">
                          <div className="relative aspect-square rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] overflow-hidden p-3 flex items-center justify-center group">
                            <img src={p.image} alt={p.title} className="max-h-full max-w-full object-contain" />
                            <button
                              onClick={() => toggleCompare(p.id)}
                              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 text-stone-700 hover:text-black hover:bg-white flex items-center justify-center shadow-xs transition-colors"
                              title="Remove"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-[#EA580C] uppercase tracking-wider font-bold">
                              {p.canonicalSku}
                            </span>
                            <h4 className="text-sm font-sans font-black text-[#0A0A0C] leading-snug line-clamp-2">
                              {p.title}
                            </h4>
                            <div className="text-lg font-serif font-black text-[#0A0A0C] mt-1">
                              ${p.price}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                addToCart(p, 1);
                                setIsCompareOpen(false);
                              }}
                              className="w-full py-2 rounded-full bg-[#0A0A0C] text-white text-[11px] font-sans font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <ShoppingBag className="h-3 w-3" />
                              <span>Add to Bag</span>
                            </button>
                            <Link
                              href={`/product/${p.id}`}
                              onClick={() => setIsCompareOpen(false)}
                              className="px-2.5 py-2 rounded-full border border-[#E5E5E9] hover:border-black text-stone-700 hover:text-black transition-colors"
                              title="View Canonical Listing"
                            >
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E9] text-xs font-sans">
                  {/* Department */}
                  <tr>
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">Department</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 font-semibold text-[#0A0A0C]">
                        {p.category}
                      </td>
                    ))}
                  </tr>

                  {/* Endurance Index */}
                  <tr className="bg-[#F9F9FB]/60">
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">
                      Endurance Index
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-emerald-700 text-sm bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            {p.enduranceRubric?.score || p.lifespanScore} / 10
                          </span>
                          <span className="text-[11px] text-stone-500 font-mono">
                            ({p.durabilityYears}y design lifespan)
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Guaranteed Spare Parts */}
                  <tr>
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">
                      Parts Commitment
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-stone-800 font-medium">
                        Guaranteed stocked through{" "}
                        <span className="font-mono font-bold text-[#EA580C]">
                          {p.enduranceRubric?.guaranteedPartsUntil || 2038}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Modularity & Disassembly */}
                  <tr className="bg-[#F9F9FB]/60">
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">
                      Modular Repair
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-stone-700">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Wrench className="h-3.5 w-3.5 text-stone-500" />
                          <span>{p.enduranceIndex?.repairability || "10/10 Modular Screw Architecture"}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Verified Sellers & Price Range */}
                  <tr>
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">
                      Canonical Offers
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-stone-800">
                        <div className="font-semibold text-stone-900">
                          {p.offers?.length || p.verifiedSellersCount || 1} Verified Node Offers
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          From ${Math.min(...(p.offers?.map((o) => o.price) || [p.price]))} to $
                          {Math.max(...(p.offers?.map((o) => o.price) || [p.price]))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Origin & Atelier */}
                  <tr className="bg-[#F9F9FB]/60">
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">
                      Origin & Atelier
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-stone-800">
                        <div className="font-semibold">{p.primaryVendor.name}</div>
                        <div className="text-[11px] text-stone-500">{p.provenance?.origin || p.primaryVendor.location}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Primary Materials */}
                  <tr>
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">Materials</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-stone-700 leading-relaxed text-[11px]">
                        {p.provenance?.materials.join(" · ") || "Natural high-grade materials"}
                      </td>
                    ))}
                  </tr>

                  {/* Warranty */}
                  <tr className="bg-[#F9F9FB]/60">
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">Warranty</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4 text-stone-800 font-medium">
                        <div className="flex items-center gap-1.5 text-emerald-800">
                          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                          <span>{p.warrantyDoc?.duration || "10-Year Guild Craftsmanship Warranty"}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Keep Rate */}
                  <tr>
                    <td className="p-4 font-mono font-bold text-[#64646E] uppercase text-[10px]">
                      Retention Rate
                    </td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-4">
                        <span className="font-mono font-bold text-[#0A0A0C]">
                          {p.honestyDossier?.keepRate || 98.2}% Keep Rate
                        </span>
                        <span className="text-[10px] text-stone-400 block font-mono">
                          Zero-bot consensus telemetry
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

