"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Add a subtle 3D tilt toward the cursor. */
  tilt?: boolean;
  /** Cursor-tracking spotlight (default on). */
  spotlight?: boolean;
  /** Flowing energy border on hover (default on). */
  border?: boolean;
  /** One-shot scan sweep on hover (default on). */
  scan?: boolean;
  /** Card lifts on hover (default on). */
  lift?: boolean;
  as?: "div" | "article" | "li";
  glow?: boolean;
};

/**
 * A panel that responds to the cursor: spotlight, flowing energy border, scan sweep,
 * elevation lift, and optional depth tilt. Effects are real child layers (not
 * pseudo-elements) so they compose without collisions, and all reduce to a static
 * panel under reduced motion.
 */
export function InteractiveCard({
  children,
  className,
  tilt = false,
  spotlight = true,
  border = true,
  scan = true,
  lift = true,
  glow = true,
  as = "div",
}: Props) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt && !reduce) {
      ry.set((px - 0.5) * 12);
      rx.set(-(py - 0.5) * 12);
    }
  };

  const onLeave = () => {
    if (tilt && !reduce) {
      rx.set(0);
      ry.set(0);
    }
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt && !reduce ? { transform } : undefined}
      className={cn(
        "panel card-fx relative overflow-hidden",
        glow && "panel-glow",
        lift && !reduce && "card-lift",
        className
      )}
    >
      {spotlight && !reduce && <span aria-hidden className="card-fx__spot" />}
      {border && !reduce && <span aria-hidden className="card-fx__border" />}
      {scan && !reduce && <span aria-hidden className="card-fx__scan" />}
      <div className="relative z-[2] h-full">{children}</div>
    </MotionTag>
  );
}
