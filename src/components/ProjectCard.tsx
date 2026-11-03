"use client";

import React from "react";
import { ArrowUpRight, FileText, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/projects";
import { InteractiveDevicePreview } from "./InteractiveDevicePreview";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-[#E6E5DF] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Top Header Information */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 font-medium">
              {project.category}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500">{project.platformBadge}</span>
          </div>

          <div className="text-stone-400 font-mono text-[11px]">
            ARCHIVE NO. {project.year} / {project.id.toUpperCase()}
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#141413] tracking-tight group-hover:text-stone-700 transition-colors">
              {project.title}
            </h2>
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
              {project.client}
            </span>
          </div>
          <p className="text-stone-600 text-base leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* Core Business Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
          {project.metrics.map((metric, i) => (
            <div key={i} className="space-y-0.5">
              <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight flex items-baseline gap-1.5">
                <span>{metric.value}</span>
                {metric.change && (
                  <span className="text-[10px] font-sans font-normal text-stone-500">
                    ({metric.change})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Live Device Preview Component */}
      <InteractiveDevicePreview
        project={project}
        onOpenCaseStudy={() => onOpenCaseStudy(project)}
      />

      {/* Bottom Editorial Testimonial & Action Footer */}
      <div className="px-6 py-5 sm:px-8 bg-stone-50/60 border-t border-stone-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Quote */}
        <div className="max-w-2xl">
          <p className="text-xs italic text-stone-600 font-editorial">
            &ldquo;{project.clientQuote.text}&rdquo;
          </p>
          <div className="mt-1 text-[11px] font-mono text-stone-500">
            — {project.clientQuote.author},{" "}
            <span className="text-stone-400">{project.clientQuote.role}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-stone-200 text-stone-800 text-xs font-medium hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <FileText className="h-3.5 w-3.5 text-stone-500" />
            <span>Audit Case Study</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#141413] text-[#FAFAF8] text-xs font-medium hover:bg-stone-800 transition-colors shadow-2xs"
            >
              <span>Visit Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

