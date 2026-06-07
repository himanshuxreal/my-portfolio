"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Animated energy meter used for stats, project power, and quest progress.
 * Fills on scroll-into-view with a shimmer sweep.
 */
export function Meter({
  value,
  max = 100,
  variant = "monarch",
  className,
  showSheen = true,
}: {
  value: number;
  max?: number;
  variant?: "monarch" | "aura";
  className?: string;
  showSheen?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  const gradient =
    variant === "aura"
      ? "linear-gradient(90deg, #2563EB, #38BDF8)"
      : "linear-gradient(90deg, #6D28D9, #A78BFA)";

  return (
    <div
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06]", className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="relative h-full rounded-full"
        style={{ background: gradient, boxShadow: "0 0 16px rgba(139,92,246,0.65)" }}
        initial={reduce ? { width: `${pct}%` } : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {showSheen && !reduce && <span className="bar-sheen" />}
        {/* Bright leading-edge node */}
        <span
          aria-hidden
          className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white"
          style={{ boxShadow: "0 0 10px 2px rgba(196,181,253,0.9)" }}
        />
      </motion.div>
    </div>
  );
}
