"use client";

import React from "react";
import { ArrowUpRight, Sparkles, Mail, Globe } from "lucide-react";

interface FooterProps {
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEstimator }) => {
  return (
    <footer className="bg-[#141413] text-[#FAFAF8] pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/80">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Select Q4/Q1 Client Commissions</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-6xl font-normal leading-tight text-stone-100">
              Ready to elevate your digital commerce presence?
            </h2>

            <p className="text-stone-400 text-base max-w-lg font-light leading-relaxed">
              Let&apos;s build an e-commerce storefront or editorial landing page that captivates your
              audience and delivers unprecedented conversion rates.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FAFAF8] text-[#141413] text-xs font-semibold uppercase tracking-wider hover:bg-stone-200 transition-colors shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Estimate Your Project Scope</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-stone-600" />
              </button>
            </div>
          </div>

          {/* Studio Ateliers / Offices */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="grid grid-cols-2 gap-6 text-xs font-mono">
              <div className="space-y-1">
                <div className="text-stone-500 uppercase tracking-wider">New York Atelier</div>
                <div className="text-stone-300">540 Madison Ave, Floor 18</div>
                <div className="text-stone-500">New York, NY 10022</div>
              </div>

              <div className="space-y-1">
                <div className="text-stone-500 uppercase tracking-wider">Paris Atelier</div>
                <div className="text-stone-300">28 Rue du Faubourg Saint-Honoré</div>
                <div className="text-stone-500">75008 Paris, France</div>
              </div>

              <div className="space-y-1">
                <div className="text-stone-500 uppercase tracking-wider">London Studio</div>
                <div className="text-stone-300">14 Berkeley Square, Mayfair</div>
                <div className="text-stone-500">London W1J 6BQ, UK</div>
              </div>

              <div className="space-y-1">
                <div className="text-stone-500 uppercase tracking-wider">Tokyo Bureau</div>
                <div className="text-stone-300">6-10-1 Ginza, Chuo-ku</div>
                <div className="text-stone-500">Tokyo 104-0061, Japan</div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                Direct Inquiries
              </div>
              <a
                href="mailto:inquiries@ateliervanguard.com"
                className="text-stone-200 hover:text-white transition-colors text-sm font-mono flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-stone-400" />
                <span>inquiries@ateliervanguard.com</span>
              </a>
              <div className="text-[10px] text-stone-500">
                Direct response from our partners within 24 business hours.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-2">
            <span>© 2026 ATELIER VANGUARD COMMERCE LABS.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#work" className="hover:text-stone-300 transition-colors">
              Portfolio
            </a>
            <a href="#platforms" className="hover:text-stone-300 transition-colors">
              Platform Matrix
            </a>
            <a href="#process" className="hover:text-stone-300 transition-colors">
              Methodology
            </a>
            <a href="#" className="hover:text-stone-300 transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

