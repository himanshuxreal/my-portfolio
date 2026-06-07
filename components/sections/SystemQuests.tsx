"use client";

import { motion } from "framer-motion";
import { Target, Lock } from "lucide-react";
import { Section } from "@/components/system/Section";
import { RevealGroup, RevealChild } from "@/components/system/Reveal";
import { Meter } from "@/components/system/Meter";
import { InteractiveCard } from "@/components/system/InteractiveCard";
import { quests } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function SystemQuests() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section
      id="quests"
      index="06"
      eyebrow="Active Directives"
      title="System Quests"
      description="The current roadmap — goals in progress and the ones queued next."
    >
      <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.07}>
        {quests.map((q) => {
          const queued = q.status === "queued";
          return (
            <RevealChild key={q.title} className="min-w-0">
              <InteractiveCard
                glow={!queued}
                className={cn("group p-5", queued && "opacity-80")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {queued ? (
                      <Lock className="h-4 w-4 shrink-0 text-mist" />
                    ) : (
                      <motion.div
                        animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Target className="h-4 w-4 shrink-0 text-monarch-glow" />
                      </motion.div>
                    )}
                    <h3 className="font-hud text-base font-semibold uppercase tracking-wide text-white truncate">
                      {q.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-0.5 font-hud text-[10px] uppercase tracking-widest",
                      queued
                        ? "bg-white/[0.05] text-mist"
                        : "bg-monarch/20 text-monarch-glow"
                    )}
                  >
                    {queued ? "Queued" : "Active"}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Meter
                    value={q.progress}
                    variant={queued ? "aura" : "monarch"}
                    showSheen={!queued}
                    className="min-w-0 flex-1"
                  />
                  <span className="w-10 shrink-0 text-right font-mono text-sm text-white/80 tabular-nums">
                    {q.progress}%
                  </span>
                </div>
              </InteractiveCard>
            </RevealChild>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
