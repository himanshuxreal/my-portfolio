"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/system/Section";
import { RevealGroup, RevealChild } from "@/components/system/Reveal";
import { abilities, type Ability } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const tierMeta: Record<Ability["tier"], { label: string; ring: string; dot: string; bg: string }> = {
  core: {
    label: "Core Mastery",
    ring: "border-monarch/40 hover:border-monarch-glow",
    dot: "bg-monarch-glow",
    bg: "hover:bg-monarch/8",
  },
  strong: {
    label: "Proficient",
    ring: "border-aura/30 hover:border-aura-cyan",
    dot: "bg-aura-cyan",
    bg: "hover:bg-aura/8",
  },
  growing: {
    label: "Leveling Up",
    ring: "border-white/10 hover:border-white/35",
    dot: "bg-mist",
    bg: "hover:bg-white/[0.05]",
  },
};

const order: Ability["tier"][] = ["core", "strong", "growing"];

export function ShadowAbilities() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section
      id="abilities"
      index="02"
      eyebrow="Skill Tree"
      title="Shadow Abilities"
      description="The arsenal — grouped by current depth, from daily-driver mastery to skills actively leveling up."
    >
      <div className="space-y-10">
        {order.map((tier) => {
          const group = abilities.filter((a) => a.tier === tier);
          if (!group.length) return null;
          const meta = tierMeta[tier];
          return (
            <div key={tier}>
              <div className="mb-4 flex items-center gap-3">
                <motion.span
                  className={cn("h-2 w-2 rounded-full", meta.dot)}
                  animate={reduce ? undefined : { scale: [1, 1.6, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="hud-label">{meta.label}</span>
                <span className="h-px flex-1 bg-white/[0.06]" />
              </div>
              <RevealGroup className="flex flex-wrap gap-3" stagger={0.04}>
                {group.map((a) => (
                  <RevealChild key={a.name}>
                    <span
                      data-cursor
                      className={cn(
                        "group inline-flex items-center gap-2.5 rounded-xl border bg-white/[0.03] px-5 py-3 font-hud text-sm font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm transition-all duration-300",
                        meta.ring,
                        meta.bg,
                        "hover:-translate-y-0.5 hover:shadow-glow card-lift"
                      )}
                    >
                      <motion.span
                        className={cn("h-1.5 w-1.5 rounded-full", meta.dot)}
                        animate={reduce ? undefined : { scale: [1, 1.8, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {a.name}
                    </span>
                  </RevealChild>
                ))}
              </RevealGroup>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
