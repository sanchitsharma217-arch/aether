"use client";

import React from "react";
import { Globe } from "lucide-react";

export const AmazonFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerColumns = [
    {
      title: "Get to Know Us",
      links: [
        "Careers",
        "Amazon Newsletter",
        "About Amazon",
        "Accessibility",
        "Sustainability",
        "Press Center",
        "Investor Relations",
        "Amazon Devices",
        "Amazon Science",
      ],
    },
    {
      title: "Make Money with Us",
      links: [
        "Sell products on Amazon",
        "Sell on Amazon Business",
        "Sell apps on Amazon",
        "Become an Affiliate",
        "Advertise Your Products",
        "Self-Publish with Us",
        "Host an Amazon Hub",
        "See More Make Money with Us",
      ],
    },
    {
      title: "Amazon Payment Products",
      links: [
        "Amazon Visa",
        "Amazon Store Card",
        "Amazon Secured Card",
        "Amazon Business Card",
        "Shop with Points",
        "Credit Card Marketplace",
        "Reload Your Balance",
        "Amazon Currency Converter",
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        "Amazon and COVID-19",
        "Your Account",
        "Your Orders",
        "Shipping Rates & Policies",
        "Returns & Replacements",
        "Manage Your Content and Devices",
        "Recalls and Product Safety Alerts",
        "Help Center",
      ],
    },
  ];

  const subServices = [
    { title: "Amazon Music", desc: "Stream millions of songs" },
    { title: "Amazon Advertising", desc: "Find, attract, and engage customers" },
    { title: "6pm", desc: "Score deals on fashion brands" },
    { title: "AbeBooks", desc: "Books, art & collectibles" },
    { title: "ACX", desc: "Audiobook Publishing Made Easy" },
    { title: "Sell on Amazon", desc: "Start a Selling Account" },
    { title: "Audible", desc: "Listen to Books & Audio" },
    { title: "Box Office Mojo", desc: "Find Movie Box Office Data" },
    { title: "Goodreads", desc: "Book reviews & recommendations" },
    { title: "IMDb", desc: "Movies, TV & Celebrities" },
    { title: "Shopbop", desc: "Designer Fashion Brands" },
    { title: "Ring", desc: "Smart Home Security Systems" },
    { title: "eero WiFi", desc: "Stream 4K Video in Every Room" },
    { title: "Blink", desc: "Smart Security for Every Home" },
  ];

  return (
    <footer className="w-full text-stone-300 text-xs mt-12">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full py-4 bg-[#37475a] hover:bg-[#485769] text-white text-center text-xs font-semibold cursor-pointer transition-colors"
      >
        Back to top
      </button>

      {/* 4-Column Main Links */}
      <div className="bg-[#232f3e] py-12 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-stone-700">
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-bold text-white text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-stone-300 hover:underline hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo and Global Settings Row */}
        <div className="max-w-[1200px] mx-auto pt-8 flex flex-wrap items-center justify-center gap-6 text-xs">
          {/* Logo */}
          <div className="flex items-baseline">
            <span className="text-xl font-black text-white">amazon</span>
            <span className="text-xs text-[#febd69] font-bold ml-0.5">.prime</span>
          </div>

          <div className="flex items-center gap-2 border border-stone-600 rounded px-3 py-1.5 hover:border-white cursor-pointer">
            <Globe className="h-3.5 w-3.5 text-stone-300" />
            <span>English</span>
          </div>

          <div className="border border-stone-600 rounded px-3 py-1.5 hover:border-white cursor-pointer">
            <span>$ USD - U.S. Dollar</span>
          </div>

          <div className="flex items-center gap-1.5 border border-stone-600 rounded px-3 py-1.5 hover:border-white cursor-pointer">
            <span>🇺🇸</span>
            <span>United States</span>
          </div>
        </div>
      </div>

      {/* Sub-services Grid */}
      <div className="bg-[#131a22] py-10 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 text-[11px] pb-8">
          {subServices.map((sub) => (
            <a key={sub.title} href="#" className="group space-y-0.5">
              <div className="font-bold text-stone-300 group-hover:underline">
                {sub.title}
              </div>
              <div className="text-stone-500 leading-tight group-hover:underline">
                {sub.desc}
              </div>
            </a>
          ))}
        </div>

        {/* Copyright & Legal */}
        <div className="max-w-[1200px] mx-auto pt-4 border-t border-stone-800 text-center space-y-1 text-[11px] text-stone-400">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="hover:underline">
              Conditions of Use
            </a>
            <a href="#" className="hover:underline">
              Privacy Notice
            </a>
            <a href="#" className="hover:underline">
              Consumer Health Data Privacy Disclosure
            </a>
            <a href="#" className="hover:underline">
              Your Ads Privacy Choices
            </a>
          </div>
          <div className="text-stone-500">
            © 1996–2026, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  );
};

