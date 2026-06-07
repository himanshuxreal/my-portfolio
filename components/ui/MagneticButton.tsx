"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "icon";
  shape?: "pill" | "square";
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

/**
 * Premium magnetic button. Owns its own interaction model so the border-trace,
 * glow, cursor light, spring magnetism, scale, and energy pulse fire reliably
 * EVERY hover — unlike the global cursor's data-magnetic transform, which used
 * to shift the element out from under the pointer and drop the CSS :hover state.
 *
 * - Spring magnetism: element eases toward the cursor (capped).
 * - Latched hover: data-hovered drives `.btn-energy` so the trace never misses.
 * - Cursor-reactive light: a radial highlight tracks the pointer (--mx/--my).
 * - Spring scale + a one-shot energy pulse ring on enter.
 * - Fully static + un-transformed under reduced motion.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "md",
  shape = "pill",
  type = "button",
  disabled = false,
  external,
  className,
  onClick,
  ...rest
}: Props) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });
  const scale = useSpring(1, { stiffness: 320, damping: 20 });
  // Compose translate + scale into one transform so they don't override each other.
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) scale(${scale})`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduce || disabled) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - (r.left + r.width / 2);
    const py = e.clientY - (r.top + r.height / 2);
    // Capped magnetic pull (gentler for small/icon buttons).
    const max = size === "icon" ? 6 : 10;
    mx.set(Math.max(-max, Math.min(max, px * 0.35)));
    my.set(Math.max(-max, Math.min(max, py * 0.35)));
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const onEnter = () => {
    if (disabled) return;
    setHovered(true);
    if (!reduce) {
      scale.set(size === "icon" ? 1.08 : 1.04);
      setPulseKey((k) => k + 1);
    }
  };
  const onLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
    scale.set(1);
  };

  const radius = shape === "square" ? "rounded-xl" : "rounded-full";

  const base = cn(
    "btn-energy group relative inline-flex items-center justify-center gap-2 overflow-visible font-hud font-semibold uppercase focus-visible:outline-none",
    radius,
    disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
  );

  const sizes: Record<string, string> = {
    sm: "px-5 py-1.5 text-xs tracking-[0.2em]",
    md: "px-7 py-3.5 text-sm tracking-[0.16em]",
    icon: "h-10 w-10 p-0",
  };

  const variants: Record<string, string> = {
    primary: "bg-monarch-gradient text-white shadow-glow",
    ghost:
      "border border-white/15 bg-white/[0.05] text-white/90 backdrop-blur-sm hover:border-monarch/60 hover:text-white",
  };

  const showSheen = variant === "primary" && !reduce && !disabled;

  const inner = (
    <>
      {/* Cursor-reactive glow — brighter, follows the pointer */}
      {!reduce && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            radius
          )}
          style={{
            background:
              "radial-gradient(140px circle at var(--mx,50%) var(--my,50%), rgba(196,181,253,0.4), rgba(34,211,238,0.12) 45%, transparent 65%)",
          }}
        />
      )}

      {/* Soft pulsing aura behind the button on hover */}
      {!reduce && hovered && (
        <motion.span
          aria-hidden
          className={cn("pointer-events-none absolute -inset-1 -z-10", radius)}
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.5), rgba(34,211,238,0.18) 60%, transparent)",
            filter: "blur(10px)",
          }}
          animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Inner content (clipped so the light/sheen stay inside) */}
      <span className={cn("relative z-10 flex items-center justify-center gap-2 overflow-hidden", radius)}>
        {children}
        {showSheen && (
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
      </span>

      {/* One-shot energy pulse ring on enter */}
      {!reduce && hovered && (
        <motion.span
          key={pulseKey}
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 border border-monarch-glow/60", radius)}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 1.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}
    </>
  );

  const sharedProps = {
    ref,
    "data-hovered": hovered && !disabled ? "true" : "false",
    onPointerMove: onMove,
    onPointerEnter: onEnter,
    onPointerLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
    style: reduce ? undefined : { transform },
    className: cn(base, sizes[size], variants[variant], className),
    ...rest,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(sharedProps as object)}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} disabled={disabled} onClick={onClick} {...(sharedProps as object)}>
      {inner}
    </motion.button>
  );
}
