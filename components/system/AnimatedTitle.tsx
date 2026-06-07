"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Cinematic section title — a "chapter" heading.
 * - Words rise + fade in with a stagger (premium reveal).
 * - A light-sweep passes across the text once on entry.
 * - A soft glow pulse breathes continuously.
 * - Collapses to static text under reduced motion.
 */
export function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const reduce = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <h2 className={className}>{text}</h2>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: "0.55em", filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-90px" }}
    >
      {words.map((w, i) => (
        <span key={i} className="relative inline-block align-bottom">
          <motion.span variants={word} className="relative inline-block overflow-hidden pb-[0.08em]">
            {w}
            {/* One-shot light sweep across each word */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              style={{ mixBlendMode: "overlay" }}
              initial={{ x: "-130%" }}
              whileInView={{ x: "130%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: "easeInOut" }}
            />
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.h2>
  );
}
