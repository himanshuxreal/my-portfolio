"use client";

import { Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/system/Section";
import { RevealChild, RevealGroup } from "@/components/system/Reveal";
import { Meter } from "@/components/system/Meter";
import { InteractiveCard } from "@/components/system/InteractiveCard";
import { projects, type Project } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function ShadowArmy() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section
      id="army"
      index="03"
      eyebrow="Extracted Shadows"
      title="Shadow Army"
      description="Projects raised from the work — each a soldier with its own rank and power rating."
    >
      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
        {projects.map((p, i) => (
          <RevealChild key={p.name} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <ProjectCard project={p} featured={i === 0} reduce={reduce} />
          </RevealChild>
        ))}
      </RevealGroup>
    </Section>
  );
}

function ProjectCard({
  project,
  featured,
  reduce,
}: {
  project: Project;
  featured?: boolean;
  reduce: boolean;
}) {
  return (
    <InteractiveCard as="article" tilt className="hud-corners group h-full p-6">
      {/* Corner aura — larger and more dramatic */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-monarch/20 opacity-40 blur-3xl transition-all duration-500 group-hover:opacity-90 group-hover:scale-110"
      />

      {/* Energy border accent line along the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-monarch-glow/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-sm transition-colors duration-300 group-hover:border-monarch/40 group-hover:bg-monarch/10">
          <Shield className="h-3.5 w-3.5 text-monarch-glow" />
          <span className="font-hud text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
            {project.rank}
          </span>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 font-mono text-2xl font-bold text-white">
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-4 w-4 text-aura-cyan" />
            </motion.div>
            {project.power}
          </div>
          <span className="hud-label text-[10px]">Power</span>
        </div>
      </div>

      <h3
        className={`relative mt-5 font-heading font-bold leading-tight text-white transition-colors duration-300 group-hover:text-monarch-glow ${
          featured ? "text-3xl" : "text-2xl"
        }`}
      >
        {project.name}
      </h3>

      <p className="relative mt-3 font-sans text-sm leading-relaxed text-mist transition-colors duration-300 group-hover:text-white/80">
        {project.description}
      </p>

      {project.features && (
        <ul className="relative mt-4 flex flex-wrap gap-2">
          {project.features.map((f) => (
            <li
              key={f}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-hud text-[11px] font-medium uppercase tracking-wide text-white/75 transition-colors duration-300 group-hover:border-monarch/30 group-hover:bg-monarch/8"
            >
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-6">
        <div className="mb-1.5 flex justify-between font-hud text-[10px] font-semibold uppercase tracking-widest text-mist">
          <span>Combat Power</span>
          <span>{project.power}/100</span>
        </div>
        <Meter value={project.power} variant={project.power >= 90 ? "monarch" : "aura"} />
      </div>
    </InteractiveCard>
  );
}
