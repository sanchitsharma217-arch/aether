"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  Building2,
  Truck,
  Check,
  ShoppingBag,
  ExternalLink,
  Layers,
  Wrench,
  Clock,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { SellerOffer } from "@/types/store";

export const BuyBoxDrawer: React.FC = () => {
  const {
    activeBuyBoxProduct,
    setActiveBuyBoxProduct,
    addToCart,
    setIsCartOpen,
  } = useStore();

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"offers" | "specs" | "honesty">("offers");

  if (!activeBuyBoxProduct) return null;

  const product = activeBuyBoxProduct;
  const offers: SellerOffer[] = product.offers && product.offers.length > 0
    ? product.offers
    : [
        {
          id: "default-off-1",
          sellerName: product.primaryVendor?.name || "Master Atelier Guild",
          location: product.provenance?.origin || product.primaryVendor?.location || "Berlin, Germany",
          fulfillmentSpeed: "Dispatches in 24h via Regional Mesh",
          condition: "Sealed New",
          price: product.price,
          warranty: product.warrantyDoc?.duration || "10-Year Guild Warranty",
          returnTerms: "30-Day Evaluation Period",
          nodeVerification: "Maker Direct",
          isBestMatch: true,
          rating: 4.98,
        },
        {
          id: "default-off-2",
          sellerName: "Kyoto Heritage Vault",
          location: "Kyoto, Japan",
          fulfillmentSpeed: "2-Day Regional Mesh",
          condition: "Master Grade",
          price: product.price + 8,
          warranty: "10-Year Guild Warranty",
          returnTerms: "30-Day Evaluation Period",
          nodeVerification: "Certified Guild Vault",
          rating: 4.95,
        },
        {
          id: "default-off-3",
          sellerName: "Pacific Precision Depot",
          location: "Portland, OR, USA",
          fulfillmentSpeed: "Dispatches in 48h",
          condition: "Refurbished A+",
          price: Math.round(product.price * 0.9),
          warranty: "3-Year Atelier Warranty",
          returnTerms: "14-Day Evaluation Period",
          nodeVerification: "Heritage Restorer",
          rating: 4.91,
        },
      ];

  const currentSelectedOffer =
    offers.find((o) => o.id === selectedOfferId) || offers[0];

  const handleAddSelectedOffer = () => {
    addToCart(product, 1, product.colors?.[0]?.name, currentSelectedOffer);
    setActiveBuyBoxProduct(null);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveBuyBoxProduct(null)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-screen max-w-2xl bg-white border-l border-[#E5E5E9] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 bg-white border-b border-[#E5E5E9]">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold text-[#EA580C] bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full uppercase">
                      {product.canonicalSku || "CANONICAL-SKU"}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      <span>{product.lifespanScore || 9.8} / 10 Durability</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#64646E] bg-[#F1F1F4] px-2 py-0.5 rounded-full">
                      {product.honestyDossier?.keepRate || 98.4}% Keep Rate
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase leading-tight">
                    {product.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveBuyBoxProduct(null)}
                  className="p-2 rounded-xl text-[#64646E] hover:text-[#0A0A0C] hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Close Drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Architectural Anti-Amazon Notice */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#F9F9FB] border border-[#E5E5E9] text-xs text-[#64646E] font-sans flex items-start gap-2.5">
                <Layers className="h-4 w-4 text-[#EA580C] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-[#0A0A0C]">Canonical Buy Box:</strong> Multiple verified makers and authorized guild depots compete directly on this single master listing. Transparent pricing, condition grading, and zero sponsored shelf takeovers.
                </div>
              </div>

              {/* Sub-Tabs: Live Offers / Specs / Honesty Dossier */}
              <div className="flex items-center gap-2 mt-4 pt-2 border-t border-[#E5E5E9] text-xs font-mono">
                <button
                  onClick={() => setActiveTab("offers")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "offers"
                      ? "bg-[#0D0D0D] text-white font-bold shadow-xs"
                      : "text-[#64646E] hover:text-[#0A0A0C]"
                  }`}
                >
                  Live Guild Offers ({offers.length})
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "specs"
                      ? "bg-[#0D0D0D] text-white font-bold shadow-xs"
                      : "text-[#64646E] hover:text-[#0A0A0C]"
                  }`}
                >
                  Engineering Specs
                </button>
                <button
                  onClick={() => setActiveTab("honesty")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "honesty"
                      ? "bg-[#0D0D0D] text-white font-bold shadow-xs"
                      : "text-[#64646E] hover:text-[#0A0A0C]"
                  }`}
                >
                  Patina & Return Forensics
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#F9F9FB]">
              {activeTab === "offers" && (
                <div className="space-y-4">
                  <div className="text-[10px] font-mono uppercase text-[#6E6B65] font-bold tracking-wider">
                    Verified Participating Sellers
                  </div>

                  <div className="space-y-3">
                    {offers.map((offer) => {
                      const isSelected = currentSelectedOffer.id === offer.id;
                      return (
                        <div
                          key={offer.id}
                          onClick={() => setSelectedOfferId(offer.id)}
                          className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer ambient-card ${
                            isSelected
                              ? "border-[#121110] ring-1 ring-[#121110] shadow-sm"
                              : "border-[#E6E4DF] hover:border-stone-400"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-serif font-bold text-sm text-[#121110] truncate">
                                  {offer.sellerName}
                                </span>
                                {offer.isBestMatch && (
                                  <span className="text-[9px] font-mono font-bold bg-[#EAF5EE] text-[#1B5E3C] px-2 py-0.5 rounded-full">
                                    Direct Atelier / Best Match
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-[11px] text-[#6E6B65] font-sans">
                                <span>{offer.location}</span>
                                <span>·</span>
                                <span className="text-[#1E3A8A] font-medium flex items-center gap-1">
                                  <Truck className="h-3 w-3" />
                                  {offer.fulfillmentSpeed}
                                </span>
                              </div>

                              <div className="text-[10px] font-mono text-[#6E6B65] pt-0.5">
                                Condition: <span className="text-[#121110] font-semibold">{offer.condition}</span>
                                {offer.rating && ` · Seller Rating: ${offer.rating} / 5.0`}
                              </div>
                            </div>

                            <div className="text-right shrink-0 space-y-1">
                              <div className="text-lg font-mono font-bold text-[#121110]">
                                ${offer.price}.00
                              </div>
                              <button
                                type="button"
                                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                                  isSelected
                                    ? "bg-[#121110] text-white"
                                    : "bg-stone-100 text-[#121110] hover:bg-stone-200"
                                }`}
                              >
                                {isSelected ? "Selected" : "Select"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 border border-[#E6E4DF] space-y-3">
                    <h4 className="text-xs font-mono uppercase font-bold text-[#6E6B65] tracking-wider">
                      Technical Blueprint & Materials
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {product.specs &&
                        Object.entries(product.specs).map(([key, val]) => (
                          <div key={key} className="p-2.5 rounded-xl bg-[#F7F6F3] border border-[#E6E4DF]">
                            <div className="text-[10px] font-mono text-[#6E6B65] uppercase">{key}</div>
                            <div className="font-semibold text-[#121110] mt-0.5">{val}</div>
                          </div>
                        ))}
                    </div>

                    <div className="pt-3 border-t border-[#E6E4DF] space-y-2">
                      <div className="text-[10px] font-mono text-[#6E6B65] uppercase font-bold">
                        Physical Features
                      </div>
                      <ul className="space-y-1 text-xs text-[#6E6B65]">
                        {product.features?.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#A84B29] font-bold">✦</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "honesty" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 border border-[#E6E4DF] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DF]">
                      <div>
                        <div className="text-[10px] font-mono text-[#6E6B65] uppercase">Verified Keep Rate</div>
                        <div className="text-2xl font-mono font-bold text-[#1B5E3C]">
                          {product.honestyDossier?.keepRate || 98.4}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-[#6E6B65] uppercase">Lifespan Guarantee</div>
                        <div className="text-sm font-mono font-bold text-[#121110]">
                          Certified Parts through {product.enduranceIndex?.guaranteedPartsUntil || 2045}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-[#6E6B65] uppercase font-bold">
                        Top Return Reasons (Zero-Noise Transparency)
                      </div>
                      {product.honestyDossier?.returnReasons.map((r, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#F7F6F3]">
                          <span className="text-[#6E6B65]">{r.reason}</span>
                          <span className="font-mono font-bold text-[#121110]">{r.percentage}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#E6E4DF]">
                      <div className="text-[10px] font-mono text-[#6E6B65] uppercase font-bold mb-1">
                        6-Month Patina Consensus
                      </div>
                      <p className="text-xs text-[#6E6B65] italic leading-relaxed">
                        &ldquo;{product.honestyDossier?.sixMonthPatinaReport || 'Surfaces develop a rich, durable natural patina over daily use.'}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Drawer Footer */}
            <div className="p-6 bg-white border-t border-[#E5E5E9] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#64646E]">Selected Maker:</span>
                <span className="font-bold text-[#0A0A0C]">{currentSelectedOffer.sellerName}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#64646E] uppercase font-bold">Total with Selected Vendor</div>
                  <div className="text-2xl font-mono font-black text-[#0A0A0C]">
                    ${currentSelectedOffer.price}.00
                  </div>
                </div>

                <button
                  onClick={handleAddSelectedOffer}
                  className="px-6 py-3.5 rounded-2xl bg-[#0D0D0D] text-white hover:bg-black font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="h-4 w-4 text-emerald-400" />
                  <span>Add to Universal Bag</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

