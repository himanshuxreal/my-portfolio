"use client";

import { Swords, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/system/Section";
import { Reveal } from "@/components/system/Reveal";
import { Counter } from "@/components/system/Counter";
import { InteractiveCard } from "@/components/system/InteractiveCard";
import { experience } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function DungeonRecords() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section
      id="records"
      index="04"
      eyebrow="Cleared Gates"
      title="Dungeon Records"
      description="Real experience, logged as cleared dungeons — each with the XP earned and abilities unlocked."
    >
      <div className="relative">
        {/* Timeline spine */}
        <div
          aria-hidden
          className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-monarch via-aura/50 to-transparent md:block"
        />

        <ol className="space-y-6">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.1}>
              <div className="relative flex gap-5">
                {/* Timeline node — pulsing glow */}
                <div className="relative hidden h-10 w-10 shrink-0 items-center justify-center md:flex">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-monarch/20 blur-md"
                    animate={reduce ? undefined : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-monarch/50 bg-void">
                    <Swords className="h-4 w-4 text-monarch-glow" />
                  </span>
                </div>

                <InteractiveCard as="article" className="w-full p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-white group-hover:text-monarch-glow transition-colors duration-300">
                        {e.title}
                      </h3>
                      <p className="mt-1 font-sans text-sm text-mist">{e.real}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-2xl font-bold text-gradient">
                        +<Counter value={e.xp} /> XP
                      </div>
                      <span className="hud-label text-[10px]">Experience</span>
                    </div>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {e.achievements.map((a) => (
                      <li
                        key={a}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-hud text-xs uppercase tracking-wide text-white/75 transition-colors duration-300 hover:border-monarch/40 hover:bg-monarch/8"
                      >
                        <Trophy className="h-3 w-3 text-aura-cyan" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </InteractiveCard>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
