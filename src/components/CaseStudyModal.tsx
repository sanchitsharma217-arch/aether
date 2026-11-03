"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, ArrowRight, Zap, Target, Wrench, Shield, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenEstimator: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenEstimator,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Background click listener */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl border border-stone-200 shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
              Technical Audit & Case Study
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-200/80 font-mono text-stone-800">
              {project.platformBadge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10">
          {/* Header Title Block */}
          <div className="space-y-3 border-b border-stone-200 pb-8">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Client: {project.client} (Landed {project.year})
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-stone-900 leading-tight">
              {project.title}
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              {project.overview}
            </p>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1"
              >
                <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-stone-900">{m.value}</div>
                {m.change && (
                  <div className="text-xs text-stone-500 font-sans">{m.change}</div>
                )}
              </div>
            ))}
          </div>

          {/* Challenge & Architectural Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Challenge */}
            <div className="p-6 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <Target className="h-4 w-4 text-amber-700" />
                <span>The Legacy Challenge</span>
              </div>
              <p className="text-sm text-amber-950/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-6 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                <Zap className="h-4 w-4 text-emerald-700" />
                <span>The Engineering Solution</span>
              </div>
              <p className="text-sm text-emerald-950/80 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Architectural Innovations */}
          <div className="space-y-4">
            <h3 className="font-editorial text-2xl font-normal text-stone-900">
              Core Capabilities Deployed
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs text-stone-800"
                >
                  <CheckCircle2 className="h-4 w-4 text-stone-900 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Tech Stack Used */}
          <div className="space-y-3 border-t border-stone-200 pt-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
              <Wrench className="h-3.5 w-3.5" />
              <span>Full Technology & Infrastructure Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-mono border border-stone-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Endorsement Quote */}
          <div className="p-6 rounded-xl bg-stone-900 text-stone-100 space-y-3">
            <p className="font-editorial text-lg italic text-stone-200">
              &ldquo;{project.clientQuote.text}&rdquo;
            </p>
            <div className="text-xs font-mono text-stone-400">
              — {project.clientQuote.author}, {project.clientQuote.role}
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-stone-50 border-t border-stone-200 gap-4">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            Interested in deploying a similar architecture for your brand?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenEstimator();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#141413] text-[#FAFAF8] text-xs font-semibold tracking-wide hover:bg-stone-800 transition-colors"
            >
              <span>Estimate This Architecture</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

