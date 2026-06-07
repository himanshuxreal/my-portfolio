"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, MapPin, Flame } from "lucide-react";
import { profile, character } from "@/data/portfolio";
import { HeroBackground } from "@/components/system/HeroBackground";
import { AnimatedName } from "@/components/system/AnimatedName";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSystemReady } from "@/components/system/SystemReady";
import { usePrefersReducedMotion } from "@/lib/hooks";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const ready = useSystemReady();
  const initial = reduce ? "show" : "hidden";

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-24 sm:px-6 sm:pt-24"
    >
      {/* ── Artwork background, synced with the intro reveal ── */}
      <HeroBackground revealed={reduce ? true : ready} />

      {/* ── Ambient aura accents over the artwork ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
        <motion.div
          className="glow-orb-lg absolute h-[75vmin] w-[75vmin] rounded-full sm:h-[55vmin] sm:w-[55vmin]"
          animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating aura motes ── */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
          {[20, 45, 60, 78, 35, 70, 52, 88].map((left, i) => (
            <motion.span
              key={left}
              className="absolute h-0.5 w-0.5 rounded-full"
              style={{
                left: `${left}%`,
                top: `${25 + (i % 4) * 18}%`,
                background: i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#9B6CFF" : "#60A5FA",
              }}
              animate={{ y: [0, -18 - i * 2, 0], opacity: [0, 0.85, 0], scale: [0.6, 1.5, 0.6] }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial={initial}
        animate="show"
        className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* System status line — pill on mobile for a designed feel */}
        <motion.div
          variants={item}
          className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 sm:mb-6 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
        >
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
          </span>
          <span className="hud-label text-[10px] tracking-[0.25em] text-emerald-300/90 sm:text-[11px] sm:tracking-[0.34em]">
            System Online
            <span className="hidden sm:inline"> · Hunter Authenticated</span>
          </span>
        </motion.div>

        {/* Class + Guild */}
        <motion.div variants={item} className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:mb-6 sm:gap-x-4">
          <span className="font-hud text-xs font-medium uppercase tracking-[0.25em] text-aura-cyan sm:text-sm sm:tracking-[0.3em]">
            {character.class}
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="font-hud text-xs font-medium uppercase tracking-[0.25em] text-mist sm:text-sm sm:tracking-[0.3em]">
            Guild · {character.guild}
          </span>
        </motion.div>

        {/* NAME — animated, flowing gradient, the dominant focal point.
            Fluid size floored low enough to never clip at 320px; relaxed
            line-height on mobile so tall ascenders aren't cut, tightening up
            from sm. */}
        <AnimatedName
          text={profile.name}
          className="w-full max-w-full px-2 font-display text-[clamp(2.75rem,12vw,11rem)] font-extrabold leading-[1.08] tracking-tight sm:leading-[0.95] md:leading-[0.9]"
        />

        {/* Title */}
        <motion.p
          variants={item}
          className="mt-5 max-w-[19rem] font-sans text-base leading-relaxed text-white/90 sm:mt-6 sm:max-w-xl sm:text-lg md:text-2xl"
        >
          {profile.title} — building{" "}
          <span className="bg-monarch-flow bg-clip-text font-semibold text-transparent">
            automated, scalable infrastructure
          </span>{" "}
          from Linux up to the cloud.
        </motion.p>

        {/* Rank + Level + Location */}
        <motion.div
          variants={item}
          className="mt-5 flex flex-col items-center gap-2 text-sm sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6"
        >
          {/* Rank first on mobile — it's the headline stat */}
          <span className="inline-flex items-center gap-2 rounded-full border border-aura/30 bg-aura/[0.08] px-3 py-1 font-hud uppercase tracking-wider sm:order-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
            <Flame
              className="h-4 w-4 text-aura-cyan animate-flame-flicker"
              style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.9))" }}
            />
            <span className="bg-monarch-flow bg-clip-text font-bold text-transparent">
              {character.rankLabel}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/80">Level {character.level}</span>
          </span>
          <span className="inline-flex items-center gap-2 text-mist sm:order-1">
            <MapPin className="h-4 w-4 text-aura-cyan" />
            <span className="text-white/85">{profile.location}</span>
          </span>
        </motion.div>

        {/* CTAs — stacked + full-width on mobile, inline from sm up */}
        <motion.div
          variants={item}
          className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <MagneticButton href="#army" variant="primary" className="w-full justify-center tracking-[0.18em] sm:w-auto">
            Enter the Army
          </MagneticButton>
          <div className="flex gap-3 sm:contents">
            <MagneticButton
              href={profile.github}
              external
              variant="ghost"
              aria-label="GitHub profile"
              className="flex-1 justify-center sm:flex-none"
            >
              <Github className="h-4 w-4" /> GitHub
            </MagneticButton>
            <MagneticButton
              href={profile.linkedin}
              external
              variant="ghost"
              aria-label="LinkedIn profile"
              className="flex-1 justify-center sm:flex-none"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      {!reduce && (
        <motion.a
          href="#profile"
          aria-label="Scroll to Hunter Profile"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-mist"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.span
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-hud text-[10px] uppercase tracking-[0.3em]">Descend</span>
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
