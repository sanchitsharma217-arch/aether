"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Layers, CheckCircle2, ShoppingBag, Star, Shield, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

interface DevicePreviewProps {
  project: Project;
  onOpenCaseStudy: () => void;
}

export const InteractiveDevicePreview: React.FC<DevicePreviewProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile" | "specs">("desktop");
  const [addedToCart, setAddedToCart] = useState(false);

  const handleSimulatedCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  return (
    <div className="w-full flex flex-col bg-stone-50 border-t border-[#E6E5DF] overflow-hidden">
      {/* Device Mode Switcher Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-stone-200/80 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-stone-500 uppercase tracking-wider text-[11px]">
            Live Platform Simulator
          </span>
        </div>

        <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
          <button
            onClick={() => setActiveTab("desktop")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-colors ${
              activeTab === "desktop"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Monitor className="h-3 w-3" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-colors ${
              activeTab === "mobile"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Smartphone className="h-3 w-3" />
            <span className="hidden sm:inline">Mobile PWA</span>
          </button>

          <button
            onClick={() => setActiveTab("specs")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium transition-colors ${
              activeTab === "specs"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Layers className="h-3 w-3" />
            <span className="hidden sm:inline">Architecture</span>
          </button>
        </div>
      </div>

      {/* Interactive Simulation Frame */}
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[360px] bg-[#F7F6F2]">
        {/* DESKTOP VIEW */}
        {activeTab === "desktop" && (
          <div className="w-full max-w-2xl bg-white rounded-xl border border-stone-300/80 shadow-md overflow-hidden transition-all duration-300">
            {/* Browser top chrome */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-stone-100/90 border-b border-stone-200 text-[10px] text-stone-500 font-mono">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="px-3 py-0.5 rounded bg-white border border-stone-200/80 max-w-[240px] truncate text-stone-600">
                https://{project.id}.storefront.io/catalog
              </div>
              <div className="text-[10px] text-stone-400">SSL 256-bit</div>
            </div>

            {/* Announcement Ticker */}
            <div className="bg-[#141413] text-[#FAFAF8] text-[10px] tracking-widest text-center py-1 font-mono uppercase">
              {project.desktopPreview.announcement}
            </div>

            {/* Desktop Storefront Content */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                    {project.desktopPreview.badge}
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl font-normal text-stone-900">
                    {project.desktopPreview.heroTitle}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md">
                    {project.desktopPreview.heroSubtitle}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-stone-400 uppercase font-mono">Curated Price</div>
                  <div className="text-lg font-semibold text-stone-900">
                    {project.desktopPreview.price}
                  </div>
                </div>
              </div>

              {/* Product preview bar with interactive add-to-cart */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="h-10 w-10 rounded-md bg-stone-200 flex items-center justify-center shrink-0">
                    <ShoppingBag className="h-4 w-4 text-stone-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-medium text-stone-900">
                      {project.desktopPreview.productName}
                    </div>
                    <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      <span>Ready for immediate dispatch</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSimulatedCart}
                  className={`w-full sm:w-auto px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                    addedToCart
                      ? "bg-emerald-600 text-white"
                      : "bg-[#141413] text-white hover:bg-stone-800"
                  }`}
                >
                  {addedToCart ? "✓ Added to Express Bag" : "Test 1-Click Checkout"}
                </button>
              </div>

              {/* Verified metric / social proof footer */}
              <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px] text-stone-500 font-mono">
                <span>{project.desktopPreview.stats}</span>
                <span className="text-stone-400">Avg checkout latency: 420ms</span>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE VIEW */}
        {activeTab === "mobile" && (
          <div className="w-[280px] bg-white rounded-3xl border-4 border-stone-800 shadow-xl overflow-hidden transition-all duration-300">
            {/* Notch / Dynamic Island */}
            <div className="h-5 bg-stone-800 flex items-center justify-center">
              <div className="h-2.5 w-16 bg-stone-900 rounded-full" />
            </div>

            {/* Mobile Header */}
            <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold tracking-tight text-stone-900">{project.client}</span>
              <span className="text-[10px] text-emerald-600 font-medium">● Online</span>
            </div>

            {/* Mobile Body */}
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-amber-500 text-[10px] font-semibold">
                  <Star className="h-2.5 w-2.5 fill-amber-500" />
                  <span>{project.mobilePreview.rating}</span>
                </div>
                <h4 className="font-editorial text-base text-stone-900 leading-tight">
                  {project.desktopPreview.productName}
                </h4>
                <div className="text-sm font-bold text-stone-900">
                  {project.desktopPreview.price}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/70 text-[11px] text-stone-600 leading-relaxed">
                {project.mobilePreview.salesPitch}
              </div>

              {/* Express checkout button */}
              <button
                onClick={handleSimulatedCart}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  addedToCart
                    ? "bg-emerald-600 text-white"
                    : "bg-[#141413] text-white hover:bg-stone-800"
                }`}
              >
                {addedToCart ? "✓ Order Initiated" : project.mobilePreview.ctaText}
              </button>

              <div className="text-[9px] text-stone-400 text-center flex items-center justify-center gap-1">
                <Shield className="h-2.5 w-2.5" />
                <span>Apple Pay & Klarna Instant Settlement</span>
              </div>
            </div>

            {/* Home indicator bar */}
            <div className="h-3 bg-stone-100 flex items-center justify-center pb-1">
              <div className="h-1 w-20 bg-stone-400 rounded-full" />
            </div>
          </div>
        )}

        {/* ARCHITECTURE / SPECS VIEW */}
        {activeTab === "specs" && (
          <div className="w-full max-w-2xl bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">
                  Platform Architecture Stack
                </span>
                <h4 className="font-medium text-stone-900 text-sm">{project.platformBadge}</h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-stone-100 font-mono text-stone-700">
                Landed: {project.year}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50/70 border border-stone-100 text-xs text-stone-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-stone-900 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={onOpenCaseStudy}
                className="text-xs font-medium text-stone-900 hover:text-stone-600 inline-flex items-center gap-1"
              >
                <span>Read Full Technical Audit</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

