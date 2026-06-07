"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { AnimatedTitle } from "./AnimatedTitle";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Left-align the header instead of the default centered chapter style. */
  align?: "center" | "left";
};

/** Standard section wrapper: anchored, with a centered cinematic chapter header. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className,
  align = "center",
}: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full overflow-x-clip scroll-mt-24 px-5 py-20 sm:px-6 md:py-28", className)}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={index}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={align}
        />
        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "center",
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const reduce = usePrefersReducedMotion();
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col gap-5", centered ? "items-center text-center" : "items-start")}>
      {/* Eyebrow row */}
      <Reveal>
        <div className={cn("flex items-center gap-3", centered && "justify-center")}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-monarch/70" />
          <span className="font-mono text-xs font-bold text-monarch-glow">{index}</span>
          <span className="hud-label">{eyebrow}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-monarch/70" />
        </div>
      </Reveal>

      {/* Cinematic title with glow + reveal */}
      <div className="relative">
        {/* Ambient glow behind the title */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-full max-w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.18), rgba(37,99,235,0.06) 45%, transparent 70%)",
          }}
          animate={reduce ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <AnimatedTitle
          text={title}
          className="font-heading text-[2.1rem] font-bold uppercase leading-[1.04] tracking-tight text-white glow-text-md sm:text-5xl md:text-6xl lg:text-7xl"
        />
      </div>

      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "font-sans text-base leading-relaxed text-white/65 md:text-lg",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {/* Decorative under-rule */}
      {centered && (
        <Reveal delay={0.2}>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-1 w-1 rotate-45 bg-monarch-glow/60" />
            <span className="h-px w-16 bg-gradient-to-r from-monarch/60 via-aura/40 to-transparent" />
            <span className="h-1.5 w-1.5 rotate-45 border border-monarch-glow/70" />
            <span className="h-px w-16 bg-gradient-to-l from-monarch/60 via-aura/40 to-transparent" />
            <span className="h-1 w-1 rotate-45 bg-monarch-glow/60" />
          </div>
        </Reveal>
      )}
    </div>
  );
}
