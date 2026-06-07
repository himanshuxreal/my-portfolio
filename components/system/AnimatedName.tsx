"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Hero name with full animation:
 * - Each letter rises, unblurs, and rotates into place with a stagger.
 * - The whole word carries a continuously flowing gradient (.name-animated).
 * - Letters drift in a slow per-character float once settled (alive, not static).
 * - Collapses to a clean static gradient under reduced motion.
 */
export function AnimatedName({ text, className }: { text: string; className?: string }) {
  const reduce = usePrefersReducedMotion();
  const letters = text.split("");

  if (reduce) {
    return (
      <h1 className={className}>
        <span className="name-animated inline-block max-w-full overflow-visible py-[0.08em]">
          {text}
        </span>
      </h1>
    );
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const letter: Variants = {
    hidden: { opacity: 0, y: "0.5em", rotateX: -90, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: "0em",
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ perspective: 800 }}
    >
      <span className="name-animated inline-flex max-w-full justify-center overflow-visible py-[0.08em]">
        {letters.map((c, i) => (
          <motion.span
            key={i}
            variants={letter}
            className="inline-block will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.5 + (i % 3) * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 + i * 0.12,
              }}
            >
              {c === " " ? " " : c}
            </motion.span>
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}
