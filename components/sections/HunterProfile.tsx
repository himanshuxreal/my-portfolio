"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/system/Section";
import { Reveal } from "@/components/system/Reveal";
import { Meter } from "@/components/system/Meter";
import { InteractiveCard } from "@/components/system/InteractiveCard";
import { RankBadge } from "@/components/ui/RankBadge";
import { introduction, character, profile, stats } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function HunterProfile() {
  const reduce = usePrefersReducedMotion();

  return (
    <Section
      id="profile"
      index="01"
      eyebrow="Status Window"
      title="Hunter Profile"
      description="The person behind the interface — and the real skills mapped to each hunter stat."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Identity card */}
        <Reveal className="lg:col-span-5">
          <InteractiveCard as="article" tilt className="hud-corners h-full p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <RankBadge rank={character.rank} label={character.rankLabel} />
              <span className="font-hud text-sm uppercase tracking-[0.2em] text-mist">
                LV<span className="ml-1.5 text-3xl font-semibold tracking-normal text-white">{character.level}</span>
              </span>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-y-5 text-sm">
              <Field label="Hunter" value={character.hunterName} />
              <Field label="Class" value={character.class} />
              <Field label="Guild" value={character.guild} />
              <Field label="Location" value="Dehradun, IN" />
              <div className="col-span-2">
                <Field label="Education" value={profile.education} />
              </div>
            </dl>

            <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
              {introduction.map((p, i) => (
                <p key={i} className="font-sans text-sm leading-relaxed text-white/80">
                  {p}
                </p>
              ))}
            </div>
          </InteractiveCard>
        </Reveal>

        {/* Stat block — each stat is now a premium mini-card */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-white">
                Attribute Allocation
              </h3>
              <span className="hud-label text-[10px]">Self-assessed</span>
            </div>

            <ul className="space-y-3">
              {stats.map((s, i) => (
                <motion.li
                  key={s.key}
                  initial={reduce ? undefined : { opacity: 0, y: 16 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={reduce ? undefined : { once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <InteractiveCard
                    as="article"
                    scan={false}
                    border={false}
                    glow={false}
                    className="group p-5"
                  >
                    {/* Top row: key + name + value */}
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="w-11 shrink-0 font-mono text-xl font-extrabold text-monarch-glow drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                          {s.key}
                        </span>
                        <div className="min-w-0">
                          <span className="font-hud text-base font-semibold uppercase tracking-wide text-white">
                            {s.real}
                          </span>
                          <span className="ml-2 hidden text-xs text-mist sm:inline">
                            / {s.attribute}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-lg font-bold text-white/90 tabular-nums">
                        {s.value}
                      </span>
                    </div>

                    {/* Meter */}
                    <Meter value={s.value} className="mt-3 h-2" />

                    {/* Blurb */}
                    <p className="mt-2.5 text-xs leading-relaxed text-mist group-hover:text-white/70 transition-colors duration-300">
                      {s.blurb}
                    </p>
                  </InteractiveCard>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="hud-label">{label}</dt>
      <dd className="mt-1 font-sans text-white/90">{value}</dd>
    </div>
  );
}
