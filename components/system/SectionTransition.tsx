"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Cinematic bridge between two sections — replaces hard boundaries.
 * As the seam scrolls through the viewport, a soft aura glow blooms and fades
 * so sections dissolve into one another. No hard line — purely a smooth,
 * blurred light bloom. Purely decorative; sits in the normal flow.
 */
export function SectionTransition() {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth ease across the whole crossing — fade up, hold, fade down.
  const auraOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0, 0.5, 0.7, 0.5, 0]);
  const auraScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  if (reduce) {
    return <div aria-hidden className="h-10 w-full" />;
  }

  return (
    <div ref={ref} aria-hidden className="pointer-events-none relative h-20 w-full overflow-hidden">
      {/* Soft aura bloom — blurred, edgeless, purple-dominant */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        style={{
          opacity: auraOpacity,
          scale: auraScale,
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.3), rgba(124,58,237,0.12) 40%, rgba(34,211,238,0.06) 60%, transparent 75%)",
          filter: "blur(34px)",
          willChange: "opacity, transform",
        }}
      />
    </div>
  );
}
