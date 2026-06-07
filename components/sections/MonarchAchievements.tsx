"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/system/Section";
import { RevealGroup, RevealChild } from "@/components/system/Reveal";
import { Counter } from "@/components/system/Counter";
import { InteractiveCard } from "@/components/system/InteractiveCard";
import { achievements } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function MonarchAchievements() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section
      id="achievements"
      index="05"
      eyebrow="Monarch Ledger"
      title="Monarch Achievements"
      description="The running tally — milestones accumulated across the journey so far."
    >
      <div className="relative">
        {/* Ambient orb behind the stat cards */}
        <div
          aria-hidden
          className="glow-orb-lg pointer-events-none absolute -right-16 -top-32 hidden h-80 w-80 rounded-full lg:block"
        />

        <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" stagger={0.1}>
          {achievements.map((a) => (
            <RevealChild key={a.label}>
              <InteractiveCard className="hud-corners group p-4 text-center sm:p-6">
                {/* Top accent line */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-monarch-glow/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Background aura bloom */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-monarch/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <motion.div
                  className="relative font-mono text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
                  initial={reduce ? undefined : { scale: 0.7, opacity: 0 }}
                  whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Counter value={a.value} />
                  <span className="text-gradient">{a.suffix}</span>
                </motion.div>
                <div className="relative mt-3 hud-label">{a.label}</div>
              </InteractiveCard>
            </RevealChild>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
