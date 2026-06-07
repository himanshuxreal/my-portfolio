"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "energy";
  external?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

/**
 * GlowButton with optional traveling-energy-border animation.
 * - `primary` — monarch gradient + inner sheen + energy border
 * - `ghost` — transparent with subtle border, energy border on hover
 * - `energy` — same as ghost but the energy line is always more prominent
 * All variants get the `btn-energy` treatment for the premium border animation.
 */
export function GlowButton({
  href,
  children,
  variant = "primary",
  external,
  className,
  onClick,
  ...rest
}: Props) {
  const base =
    "btn-energy group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-hud text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 will-change-transform focus-visible:outline-none active:scale-[0.97]";

  const styles: Record<string, string> = {
    primary:
      "bg-monarch-gradient text-white shadow-glow hover:shadow-glow-lg px-7 py-3.5",
    ghost:
      "border border-white/15 bg-white/[0.03] text-white/90 hover:border-monarch/60 hover:bg-white/[0.06] hover:text-white px-6 py-3",
    energy:
      "border border-white/20 bg-white/[0.04] text-white/90 hover:border-monarch/60 hover:bg-white/[0.07] hover:text-white px-6 py-3.5",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        data-magnetic
        className={cn(base, styles[variant], className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} data-magnetic className={cn(base, styles[variant], className)} {...rest}>
      {content}
    </button>
  );
}
