"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Clock, Calculator } from "lucide-react";

interface ProjectEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatformId?: string;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  isOpen,
  onClose,
  defaultPlatformId,
}) => {
  const [selectedType, setSelectedType] = useState<string>(
    defaultPlatformId === "headless-nextjs"
      ? "headless"
      : defaultPlatformId === "dtc-landing-pages"
      ? "landing"
      : "shopify"
  );

  const [features, setFeatures] = useState<string[]>([
    "speed",
    "upsell",
  ]);

  const [timeline, setTimeline] = useState<string>("standard");

  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    brand: "",
    url: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleFeature = (featId: string) => {
    if (features.includes(featId)) {
      setFeatures(features.filter((f) => f !== featId));
    } else {
      setFeatures([...features, featId]);
    }
  };

  // Dynamic estimate calculator
  const calculateEstimate = () => {
    let baseMin = 12000;
    let baseMax = 18000;
    let weeks = "4 – 6 Weeks";
    let archName = "Shopify Plus Bespoke Architecture";

    if (selectedType === "headless") {
      baseMin = 22000;
      baseMax = 38000;
      weeks = "6 – 10 Weeks";
      archName = "Headless Next.js (App Router) + Shopify GraphQL API";
    } else if (selectedType === "landing") {
      baseMin = 6500;
      baseMax = 12000;
      weeks = "2 – 3 Weeks";
      archName = "High-Converting Editorial Landing Page & Meta Funnel";
    } else if (selectedType === "pwa") {
      baseMin = 18000;
      baseMax = 28000;
      weeks = "5 – 8 Weeks";
      archName = "Mobile-First Commerce PWA & Gesture-Driven UX";
    }

    // Add features
    const featureCost = features.length * 2500;
    baseMin += featureCost;
    baseMax += featureCost * 1.4;

    if (timeline === "rush") {
      baseMin *= 1.25;
      baseMax *= 1.25;
      weeks = "Accelerated / 2 – 4 Weeks";
    }

    return {
      range: `$${Math.round(baseMin / 500) * 500 / 1000}k – $${
        Math.round(baseMax / 500) * 500 / 1000
      }k USD`,
      weeks,
      archName,
    };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-stone-700" />
            <span className="text-xs font-mono uppercase tracking-widest text-stone-700 font-semibold">
              Project Scope & Investment Calculator
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-editorial text-3xl text-stone-900">
                Inquiry Received & Logged
              </h3>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you, {clientInfo.name || "partner"}. Our technical director will review your
                brand specs ({clientInfo.brand || "your brand"}) and deliver a bespoke scope proposal within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#141413] text-[#FAFAF8] text-xs font-medium"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Platform Architecture */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">
                  Step 1: Select Core Platform Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: "shopify",
                      title: "Shopify Plus Bespoke",
                      desc: "Custom Liquid theme with high-performance Checkout Extensibility.",
                    },
                    {
                      id: "headless",
                      title: "Headless Next.js Storefront",
                      desc: "Decoupled edge-rendered frontend with Shopify Storefront API.",
                    },
                    {
                      id: "landing",
                      title: "High-Converting DTC Funnel",
                      desc: "Laser-focused narrative landing page for scaling cold paid traffic.",
                    },
                    {
                      id: "pwa",
                      title: "Mobile-First PWA Commerce",
                      desc: "Gesture-driven app-like web storefront for Instagram & TikTok buyers.",
                    },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSelectedType(item.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        selectedType === item.id
                          ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                          : "bg-stone-50/60 text-stone-800 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <div className="font-semibold text-xs sm:text-sm">{item.title}</div>
                      <div
                        className={`text-[11px] mt-1 leading-snug ${
                          selectedType === item.id ? "text-stone-300" : "text-stone-500"
                        }`}
                      >
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Advanced Capabilities */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">
                  Step 2: Key Capabilities & Conversion Enhancements
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: "speed", label: "Sub-Second Speed & 98+ Lighthouse Audit" },
                    { id: "upsell", label: "Dynamic Cart Drawer & 1-Click Post-Purchase Upsell" },
                    { id: "bundle", label: "Interactive Custom Bundle / Box Builder" },
                    { id: "currency", label: "Global Multi-Currency & Localized Tax Gating" },
                    { id: "b2b", label: "B2B Wholesale Portal & Trade Discount Tiering" },
                    { id: "pwa-feat", label: "Push Notification & Offline Shopping PWA Layer" },
                  ].map((feat) => {
                    const isChecked = features.includes(feat.id);
                    return (
                      <button
                        type="button"
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-lg border text-left text-xs transition-colors ${
                          isChecked
                            ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium"
                            : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded flex items-center justify-center shrink-0 text-[10px] font-bold ${
                            isChecked
                              ? "bg-emerald-600 text-white"
                              : "border border-stone-300 bg-stone-50"
                          }`}
                        >
                          {isChecked && "✓"}
                        </div>
                        <span>{feat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Launch Window */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500">
                  Step 3: Target Launch Timeline
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "rush", label: "Rush Launch", desc: "2 – 4 Weeks" },
                    { id: "standard", label: "Standard Flagship", desc: "4 – 8 Weeks" },
                    { id: "extended", label: "Enterprise Build", desc: "8 – 12 Weeks" },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        timeline === t.id
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400"
                      }`}
                    >
                      <div className="text-xs font-semibold">{t.label}</div>
                      <div
                        className={`text-[10px] ${
                          timeline === t.id ? "text-stone-300" : "text-stone-400"
                        }`}
                      >
                        {t.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Real-Time Ballpark Scope Box */}
              <div className="p-5 rounded-xl bg-stone-100 border border-stone-200/90 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-500 uppercase tracking-wider">
                    Calculated Scope & Delivery
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                    ESTIMATED RANGE
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200/80 pb-3">
                  <div>
                    <div className="text-xs font-semibold text-stone-900">
                      {estimate.archName}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Estimated Production: {estimate.weeks}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-stone-900">
                    {estimate.range}
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 leading-relaxed">
                  Includes full UI/UX design, custom theme development, mobile checkout
                  optimization, and 30-day post-launch conversion monitoring.
                </div>
              </div>

              {/* Step 4: Client Contact Information */}
              <div className="space-y-4 border-t border-stone-200 pt-6">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  Step 4: Where Should We Send Your Detailed Proposal?
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="sarah@yourbrand.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Brand or Company Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Maison Lumina"
                      value={clientInfo.brand}
                      onChange={(e) => setClientInfo({ ...clientInfo, brand: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Current Store / Website URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://yourbrand.com"
                      value={clientInfo.url}
                      onChange={(e) => setClientInfo({ ...clientInfo, url: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#141413] text-[#FAFAF8] text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Request Bespoke Proposal & Technical Consultation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

