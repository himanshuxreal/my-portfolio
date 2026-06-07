"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Hero artwork background — the Shadow Monarch piece, blended into the scene.
 * - Slow zoom + parallax drift (not a flat wallpaper).
 * - Heavy gradient scrims keep the hero text readable.
 * - Color-graded toward the purple-anchored palette with blue/cyan flame and
 *   a crimson ember base, echoing the artwork.
 * - Reveals in sync with the boot intro via the `revealed` prop.
 */
export function HeroBackground({ revealed }: { revealed: boolean }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Artwork layer — parallax + slow zoom, fades in with the intro.
          Masked top + bottom so it dissolves into the page (no hard box edge). */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: reduce ? 0 : y,
          scale: reduce ? 1 : scale,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 12%, #000 60%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 12%, #000 60%, transparent 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          animate={
            reduce
              ? undefined
              : { scale: [1.05, 1.12, 1.05], x: ["0%", "-2%", "0%"] }
          }
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/hero-monarch.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_18%] sm:object-[center_24%] md:object-[center_22%]"
          />
        </motion.div>
      </motion.div>

      {/* Color-grade wash — pull the royal-blue art toward the monarch purple anchor */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.55) 0%, rgba(37,99,235,0.25) 45%, rgba(34,211,238,0.18) 70%, rgba(244,63,94,0.2) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 35%, rgba(155,108,255,0.35), transparent 70%)",
        }}
      />

      {/* Readability scrims — top, bottom, and a center vignette */}
      <motion.div className="absolute inset-0" style={{ opacity: reduce ? 1 : scrimOpacity }}>
        {/* Slightly stronger on mobile (stacked text needs more contrast) */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,16,0.85) 0%, rgba(5,5,16,0.62) 30%, rgba(5,5,16,0.62) 60%, rgba(5,5,16,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,16,0.82) 0%, rgba(5,5,16,0.45) 28%, rgba(5,5,16,0.45) 62%, rgba(5,5,16,0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 42%, transparent 38%, rgba(5,5,16,0.55) 78%, rgba(5,5,16,0.9) 100%)",
          }}
        />
      </motion.div>

      {/* Bottom blend into the page so the hero dissolves into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 sm:h-64"
        style={{ background: "linear-gradient(180deg, transparent, var(--void) 92%)" }}
      />
      {/* Side feathering so vertical edges never read as a hard box on mobile */}
      <div
        className="absolute inset-y-0 left-0 w-12 sm:hidden"
        style={{ background: "linear-gradient(90deg, var(--void), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-12 sm:hidden"
        style={{ background: "linear-gradient(270deg, var(--void), transparent)" }}
      />
    </div>
  );
}
