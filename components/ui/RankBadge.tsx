"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Hexagonal rank insignia. For high ranks (S/A) it manifests Shadow-Monarch
 * energy: wispy blue/cyan shadow flames, a breathing aura, floating embers,
 * and a rank glow — "immense power", not cartoon fire. Original geometric design.
 */
export function RankBadge({
  rank,
  label,
  className,
}: {
  rank: string;
  label?: string;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const elite = rank === "S" || rank === "A";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative flex h-16 w-16 items-center justify-center">
        {/* Breathing Monarch aura */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background: elite
              ? "radial-gradient(circle, rgba(37,99,235,0.55), rgba(124,58,237,0.32) 55%, transparent 75%)"
              : "radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)",
          }}
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.14, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outer rotating energy ring (elite) */}
        {elite && !reduce && (
          <motion.span
            aria-hidden
            className="absolute -inset-1 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.5) 60deg, transparent 130deg, rgba(124,58,237,0.5) 240deg, transparent 320deg)",
              maskImage: "radial-gradient(transparent 58%, #000 64%, #000 72%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(transparent 58%, #000 64%, #000 72%, transparent 78%)",
              filter: "blur(1px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Shadow flames — wispy blue/cyan energy tongues rising from the badge */}
        {elite && !reduce && (
          <span aria-hidden className="absolute inset-0 overflow-visible">
            {[
              { left: "32%", delay: 0, h: 20, c: "rgba(37,99,235,0.9)" },
              { left: "50%", delay: 0.35, h: 28, c: "rgba(96,165,250,0.95)" },
              { left: "68%", delay: 0.7, h: 20, c: "rgba(34,211,238,0.9)" },
              { left: "42%", delay: 0.5, h: 15, c: "rgba(124,58,237,0.85)" },
              { left: "60%", delay: 0.18, h: 15, c: "rgba(34,211,238,0.8)" },
            ].map((f, i) => (
              <motion.span
                key={i}
                className="absolute bottom-[56%] w-2 rounded-full"
                style={{
                  left: f.left,
                  height: f.h,
                  background: `linear-gradient(to top, ${f.c}, transparent)`,
                  filter: "blur(2.5px)",
                  transformOrigin: "bottom center",
                }}
                animate={{
                  scaleY: [0.6, 1.3, 0.8, 1.15, 0.6],
                  scaleX: [1, 0.8, 1.1, 0.85, 1],
                  opacity: [0.4, 0.95, 0.6, 0.9, 0.4],
                  x: [0, i % 2 ? 2.5 : -2.5, 0],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
              />
            ))}
          </span>
        )}

        {/* Floating embers drifting upward */}
        {elite && !reduce && (
          <span aria-hidden className="absolute inset-0 overflow-visible">
            {[
              { left: "38%", delay: 0, c: "#60A5FA" },
              { left: "56%", delay: 1.1, c: "#22D3EE" },
              { left: "48%", delay: 0.6, c: "#9B6CFF" },
              { left: "64%", delay: 1.6, c: "#60A5FA" },
            ].map((e, i) => (
              <motion.span
                key={i}
                className="absolute bottom-[55%] h-1 w-1 rounded-full"
                style={{ left: e.left, background: e.c, boxShadow: `0 0 6px ${e.c}` }}
                animate={{
                  y: [0, -26 - i * 4],
                  opacity: [0, 0.9, 0],
                  scale: [0.4, 1, 0.3],
                }}
                transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeOut", delay: e.delay }}
              />
            ))}
          </span>
        )}

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="rank-grad" x1="0" y1="0" x2="1" y2="1">
              {elite ? (
                <>
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#B794FF" />
                  <stop offset="100%" stopColor="#2563EB" />
                </>
              )}
            </linearGradient>
          </defs>
          <polygon
            points="50,4 92,28 92,72 50,96 8,72 8,28"
            fill={elite ? "rgba(37,99,235,0.12)" : "rgba(124,58,237,0.08)"}
            stroke="url(#rank-grad)"
            strokeWidth="2.5"
          />
          {/* Inner hexagon — slowly counter-rotates for a living insignia */}
          <motion.polygon
            points="50,16 81,34 81,66 50,84 19,66 19,34"
            fill="none"
            stroke="url(#rank-grad)"
            strokeWidth="0.8"
            opacity="0.5"
            style={{ transformOrigin: "50px 50px" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <span
          className="relative font-display text-2xl font-extrabold text-white"
          style={{
            textShadow: elite
              ? "0 0 14px rgba(34,211,238,0.9), 0 0 30px rgba(37,99,235,0.7)"
              : "0 0 12px rgba(124,58,237,0.8)",
          }}
        >
          {rank}
        </span>
      </span>
      {label && (
        <span className="font-hud text-sm font-medium uppercase tracking-[0.2em] text-mist">
          {label}
        </span>
      )}
    </div>
  );
}
