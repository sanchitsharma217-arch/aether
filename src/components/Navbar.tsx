"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeNY, setTimeNY] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeNY(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E6E5DF] py-3.5 shadow-xs"
          : "bg-[#FAFAF8] border-b border-[#E6E5DF]/60 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <a href="#" className="group flex flex-col">
            <span className="font-editorial text-xl md:text-2xl tracking-tight font-medium text-[#141413] group-hover:text-stone-700 transition-colors">
              ATELIER VANGUARD
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-500 font-mono">
              Commerce & Editorial Architecture
            </span>
          </a>

          {/* Availability pill - desktop */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Q4/Q1 Projects</span>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-stone-600">
          <a href="#work" className="hover:text-stone-950 transition-colors">
            Selected Work
          </a>
          <a href="#platforms" className="hover:text-stone-950 transition-colors">
            Platforms
          </a>
          <a href="#metrics" className="hover:text-stone-950 transition-colors">
            Proven Impact
          </a>
          <a href="#process" className="hover:text-stone-950 transition-colors">
            Methodology
          </a>
          <a href="#reviews" className="hover:text-stone-950 transition-colors">
            Endorsements
          </a>
        </nav>

        {/* Right side CTAs & Studio Clock */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-stone-500 border-r border-stone-200 pr-4">
            <span>NYC</span>
            <span className="text-stone-800 font-semibold">{timeNY || "12:00 PM"}</span>
          </div>

          <button
            onClick={onOpenEstimator}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141413] text-[#FAFAF8] text-xs font-medium tracking-wide transition-all duration-300 hover:bg-stone-800 hover:shadow-sm active:scale-98"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:rotate-12" />
            <span>Estimate Project Scope</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenEstimator}
            className="px-3 py-1.5 rounded-full bg-[#141413] text-[#FAFAF8] text-[11px] font-medium"
          >
            Estimate
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-800 hover:text-stone-950"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAFAF8] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wide uppercase text-stone-700">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-stone-100"
            >
              Selected Work
            </a>
            <a
              href="#platforms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-stone-100"
            >
              Platforms
            </a>
            <a
              href="#metrics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-stone-100"
            >
              Proven Impact
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-stone-100"
            >
              Methodology
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-stone-100"
            >
              Endorsements
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#141413] text-[#FAFAF8] text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Launch Scope Calculator</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

