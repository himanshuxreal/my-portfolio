"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Decorative drifting rune sigils for section ambience. */
export function FloatingRunes() {
  const reduce = usePrefersReducedMotion();

  const glyphs = [
    { d: "M12 2 L22 12 L12 22 L2 12 Z", size: 28, top: "12%", left: "6%", dur: 9 },
    { d: "M12 2 L20 8 L20 16 L12 22 L4 16 L4 8 Z", size: 22, top: "70%", left: "10%", dur: 11 },
    { d: "M12 2 L22 20 L2 20 Z", size: 20, top: "30%", left: "88%", dur: 10 },
    { d: "M12 2 L20 8 L20 16 L12 22 L4 16 L4 8 Z", size: 30, top: "82%", left: "82%", dur: 13 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {glyphs.map((g, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(167,139,250,0.5)"
          strokeWidth="0.8"
          style={{ position: "absolute", top: g.top, left: g.left, width: g.size, height: g.size }}
          animate={reduce ? undefined : { y: [0, -16, 0], opacity: [0.3, 0.7, 0.3], rotate: [0, 180, 360] }}
          transition={{ duration: g.dur, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d={g.d} />
        </motion.svg>
      ))}
    </div>
  );
}
