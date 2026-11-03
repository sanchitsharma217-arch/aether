"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/mockProducts";

const RECENT_PURCHASES = [
  { city: "Zurich, Switzerland", product: PRODUCTS[0], time: "2 minutes ago" },
  { city: "Brooklyn, New York", product: PRODUCTS[1], time: "5 minutes ago" },
  { city: "Tokyo, Japan", product: PRODUCTS[6], time: "8 minutes ago" },
  { city: "London, UK", product: PRODUCTS[3], time: "12 minutes ago" },
];

export const SocialProofNotification: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after 4 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Rotate every 16 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 1000);
    }, 16000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = RECENT_PURCHASES[index];

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md p-3.5 pr-8 rounded-2xl border border-stone-200/90 shadow-xl flex items-center gap-3 max-w-sm relative group"
          >
            <div className="h-12 w-12 rounded-xl bg-stone-50 border p-1 flex items-center justify-center shrink-0">
              <img
                src={current.product.image}
                alt={current.product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-0.5 text-xs">
              <div className="flex items-center gap-1.5 text-stone-500 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Someone in {current.city}</span>
              </div>
              <div className="font-semibold text-stone-900 line-clamp-1 max-w-[200px]">
                Purchased {current.product.title}
              </div>
              <div className="text-[10px] text-stone-400">{current.time}</div>
            </div>

            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 p-1 text-stone-300 hover:text-stone-600 transition-colors"
              title="Dismiss"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

