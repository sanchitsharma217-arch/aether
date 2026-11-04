"use client";

import React from "react";
import { Heart, ShoppingBag, Check, Scale } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0A0A0C] text-white shadow-2xl text-xs sm:text-sm font-medium border border-[#222225] btn-tactile">
        {toast.type === "fav" ? (
          <div className="h-6 w-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          </div>
        ) : toast.type === "compare" ? (
          <div className="h-6 w-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Scale className="h-3.5 w-3.5 text-amber-400" />
          </div>
        ) : (
          <div className="h-6 w-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" />
          </div>
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

