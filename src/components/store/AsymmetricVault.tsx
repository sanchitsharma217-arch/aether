"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Check,
} from "lucide-react";
import { PRODUCTS } from "@/data/mockProducts";
import { useStore } from "@/context/StoreContext";

export const AsymmetricVault: React.FC = () => {
  const { addToCart, setActiveBuyBoxProduct } = useStore();
  const [justAddedH01, setJustAddedH01] = useState(false);
  const [justAddedWatch, setJustAddedWatch] = useState(false);
  const [justAddedOven, setJustAddedOven] = useState(false);

  const prodH01 = PRODUCTS.find((p) => p.id === "prod-1") || PRODUCTS[0];
  const prodWatch = PRODUCTS.find((p) => p.id === "prod-2") || PRODUCTS[3];
  const prodOven = PRODUCTS.find((p) => p.id === "prod-dutch-oven") || PRODUCTS[1];

  const handleAddH01 = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prodH01, 1, prodH01.colors?.[0]?.name, prodH01.offers?.[0]);
    setJustAddedH01(true);
    setTimeout(() => setJustAddedH01(false), 1200);
  };

  const handleAddWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prodWatch, 1, prodWatch.colors?.[0]?.name, prodWatch.offers?.[0]);
    setJustAddedWatch(true);
    setTimeout(() => setJustAddedWatch(false), 1200);
  };

  const handleAddOven = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prodOven, 1, prodOven.colors?.[0]?.name, prodOven.offers?.[0]);
    setJustAddedOven(true);
    setTimeout(() => setJustAddedOven(false), 1200);
  };

  const items = [
    {
      product: prodH01,
      tag: "AUDIO · 01",
      tagColor: "bg-stone-100 text-stone-800 border-stone-200",
      location: "Berlin, Germany",
      materials: "Solid Walnut · Planar Transducers",
      rating: "15-Yr Warranty · 9.8 Score",
      onAdd: handleAddH01,
      isAdded: justAddedH01,
    },
    {
      product: prodWatch,
      tag: "HOROLOGY · 02",
      tagColor: "bg-orange-50 text-orange-800 border-orange-200",
      location: "Zurich, Switzerland",
      materials: "Grade-5 Titanium · Sapphire Crystal",
      rating: "Automatic · 9.9 Score",
      onAdd: handleAddWatch,
      isAdded: justAddedWatch,
    },
    {
      product: prodOven,
      tag: "CULINARY · 03",
      tagColor: "bg-blue-50 text-blue-800 border-blue-200",
      location: "Champagne-Ardenne, France",
      materials: "Cast Iron · Vitreous Enamel",
      rating: "50-Yr Warranty · 9.8 Score",
      onAdd: handleAddOven,
      isAdded: justAddedOven,
    },
  ];

  return (
    <section id="asymmetric-vault" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E5E5E9]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#0A0A0C]">
              ATELIER HIGHLIGHTS · THREE ESSENTIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-[#0A0A0C] uppercase">
            Crafted for a Lifetime.
          </h2>
          <p className="text-xs sm:text-sm text-[#64646E] mt-1 font-sans">
            Three iconic creations from independent workshops in Berlin, Zurich, and Champagne-Ardenne.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0A0A0C] hover:text-[#EA580C] transition-colors"
        >
          <span>EXPLORE ENTIRE ARCHIVE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* SYMMETRICAL 3-COLUMN GRID: Perfectly balanced heights, padding, and baselines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {items.map((it) => (
          <div
            key={it.product.id}
            onClick={() => setActiveBuyBoxProduct(it.product)}
            className="group rounded-2xl bg-white border border-[#E5E5E9] floating-card hover:border-[#0A0A0C] transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
          >
            <div>
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-[#F0F0F4]">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${it.tagColor}`}>
                  {it.tag}
                </span>
                <span className="text-[11px] text-[#64646E] truncate ml-2">
                  {it.location}
                </span>
              </div>

              {/* Symmetrical Image Frame */}
              <div className="my-5 w-full aspect-[4/3] rounded-xl bg-[#F9F9FB] border border-[#EBEBEF] flex items-center justify-center p-4 relative overflow-hidden group-hover:bg-[#F4F4F7] transition-colors">
                <img
                  src={it.product.image}
                  alt={it.product.title}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-106 transition-transform duration-500 ease-out"
                />
                <div className="absolute bottom-2.5 left-2.5 text-[9px] font-mono font-semibold text-[#64646E] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-[#E5E5E9] shadow-2xs">
                  {it.product.canonicalSku}
                </div>
              </div>

              {/* Title & Price Header */}
              <div className="space-y-1 mb-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-sans font-bold text-[#0A0A0C] line-clamp-1 group-hover:text-black">
                    {it.product.title}
                  </h3>
                  <span className="text-lg font-mono font-black text-[#0A0A0C] shrink-0">
                    ${it.product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#64646E]">
                  <span className="truncate">{it.materials}</span>
                  <span className="text-emerald-700 font-semibold shrink-0 ml-2">{it.rating}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#64646E] font-sans line-clamp-2 leading-relaxed mb-4">
                {it.product.description}
              </p>
            </div>

            {/* Symmetrical Action Footer */}
            <div className="pt-3 border-t border-[#E5E5E9] flex items-center gap-2 mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBuyBoxProduct(it.product);
                }}
                className="flex-1 py-2.5 text-center rounded-lg border border-[#E5E5E9] hover:border-[#0A0A0C] text-xs font-medium text-[#0A0A0C] transition-all bg-[#F9F9FB] hover:bg-white btn-tactile-white cursor-pointer"
              >
                Inspect Specifications
              </button>
              <button
                onClick={it.onAdd}
                className="p-2.5 rounded-lg bg-[#0D0D0D] text-white hover:bg-black transition-all btn-tactile cursor-pointer shrink-0"
                title="Add to Bag"
                aria-label="Add to Bag"
              >
                {it.isAdded ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <ShoppingBag className="h-4 w-4 text-emerald-400" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
