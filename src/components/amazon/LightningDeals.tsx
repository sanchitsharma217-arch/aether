"use client";

import React, { useState, useEffect } from "react";
import { Zap, Clock, Star, ShoppingCart, Check } from "lucide-react";
import { AmazonProduct } from "@/data/amazonProducts";
import { useCart } from "@/context/CartContext";

interface LightningDealsProps {
  deals: AmazonProduct[];
  onOpenProduct: (product: AmazonProduct) => void;
}

export const LightningDeals: React.FC<LightningDealsProps> = ({
  deals,
  onOpenProduct,
}) => {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: AmazonProduct) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="max-w-[1500px] mx-auto px-3 sm:px-6 py-6">
      <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-sm space-y-4">
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold text-lg sm:text-xl">
              <Zap className="h-5 w-5 fill-[#cc0c39] text-[#cc0c39]" />
              <span>Today&apos;s Lightning Deals</span>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-red-100 text-[#cc0c39] text-xs font-bold">
              UP TO 25% OFF
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-full w-fit">
            <Clock className="h-3.5 w-3.5 text-stone-500" />
            <span>Ends in:</span>
            <span className="font-mono text-[#cc0c39]">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* Deals Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((item) => {
            const hasAdded = addedMap[item.id];
            const wholePrice = Math.floor(item.price);
            const fractionalCents = Math.round((item.price - wholePrice) * 100)
              .toString()
              .padStart(2, "0");

            return (
              <div
                key={item.id}
                onClick={() => onOpenProduct(item)}
                className="group border border-stone-200 rounded p-4 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer bg-white"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="h-44 w-full bg-stone-50 rounded flex items-center justify-center p-2 mb-3 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                      -{item.discountPercent || 15}%
                    </div>
                  </div>

                  {/* Deal Tag */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="bg-[#cc0c39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Limited time deal
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <div className="flex items-start text-stone-900 font-bold">
                      <span className="text-xs mt-0.5">$</span>
                      <span className="text-2xl leading-none">{wholePrice}</span>
                      <span className="text-xs leading-none">{fractionalCents}</span>
                    </div>

                    {item.originalPrice && (
                      <span className="text-xs text-stone-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-xs text-stone-800 line-clamp-2 group-hover:text-[#c7511f] font-medium leading-relaxed mb-2">
                    {item.title}
                  </h4>

                  {/* Claimed Bar */}
                  <div className="space-y-1 mb-3">
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#e67a00] h-full rounded-full transition-all"
                        style={{ width: `${item.dealProgress || 65}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-stone-500 font-medium">
                      {item.dealProgress || 65}% claimed
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  className={`w-full py-1.5 px-3 rounded-full text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 ${
                    hasAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900"
                  }`}
                >
                  {hasAdded ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

