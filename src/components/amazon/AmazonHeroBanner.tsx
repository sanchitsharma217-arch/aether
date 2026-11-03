"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_BANNER_CARDS } from "@/data/amazonProducts";
import { useCart } from "@/context/CartContext";

const BANNERS = [
  {
    id: 1,
    title: "Save up to 40% on Premium Tech & Audio",
    subtitle: "Experience studio-grade acoustics and edge computing with fast Prime delivery.",
    badge: "LIMITED TIME DEALS",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1600&auto=format&fit=crop&q=80",
    cta: "Shop Tech Deals",
    category: "Audio",
  },
  {
    id: 2,
    title: "Next-Gen Gaming & Workstations",
    subtitle: "PlayStation 5 Pro, M4 Pro MacBooks, and high-DPI ergonomic peripherals in stock.",
    badge: "NEW ARRIVALS",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80",
    cta: "Explore Gaming Gear",
    category: "Computers & Gaming",
  },
  {
    id: 3,
    title: "Elevate Your Home & Kitchen",
    subtitle: "Barista-grade espresso machines, smart cordless vacuums, and stainless insulated drinkware.",
    badge: "PRIME ESSENTIALS",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80",
    cta: "Upgrade Kitchen",
    category: "Home & Kitchen",
  },
];

export const AmazonHeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedCategory } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const handleCardClick = (cat: string) => {
    setSelectedCategory(cat);
    const section = document.getElementById("product-catalog");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-[1500px] mx-auto overflow-hidden">
      {/* Banner Carousel Container */}
      <div className="relative h-[280px] sm:h-[380px] md:h-[460px] w-full">
        {BANNERS.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Dark & Bottom Gradients */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#eaeded] via-[#eaeded]/80 to-transparent" />
            </div>

            {/* Banner Text Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl text-white space-y-3 pb-24 sm:pb-32">
              <span className="inline-block text-[11px] font-bold tracking-widest px-2.5 py-1 rounded bg-[#febd69] text-stone-900 w-fit">
                {banner.badge}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {banner.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 sm:line-clamp-none max-w-lg">
                {banner.subtitle}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleCardClick(banner.category)}
                  className="px-5 py-2.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-stone-900 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98"
                >
                  {banner.cta}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Prev/Next Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-28 sm:top-36 z-30 p-2 sm:p-3 rounded bg-black/30 hover:bg-black/60 text-white transition-colors cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-28 sm:top-36 z-30 p-2 sm:p-3 rounded bg-black/30 hover:bg-black/60 text-white transition-colors cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>

      {/* Iconic 4-Card Amazon Homepage Overlay Grid */}
      <div className="relative z-30 -mt-24 sm:-mt-32 md:-mt-40 px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {HERO_BANNER_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.category)}
              className="bg-white p-5 rounded-sm shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow group border border-stone-200/60"
            >
              <div>
                <h3 className="font-bold text-lg text-stone-900 mb-3 group-hover:text-[#c7511f] transition-colors leading-tight">
                  {card.title}
                </h3>
                <div className="h-44 sm:h-52 w-full rounded overflow-hidden bg-stone-100 mb-3 relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="text-xs font-semibold text-[#007185] group-hover:text-[#c7511f] group-hover:underline">
                {card.linkText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

