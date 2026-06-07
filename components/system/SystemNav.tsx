"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X, Hexagon } from "lucide-react";
import { navItems, character } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const ids = navItems.map((n) => n.id);

export function SystemNav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Hide on scroll down, reveal on scroll up; condense after a threshold.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open) return;
    setHidden(y > prev && y > 220);
  });

  // The pill highlights the hovered item, or falls back to the active section.
  const highlightId = hoveredId ?? active;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-5",
            scrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-4"
          )}
        >
          <a href="#hero" className="group flex items-center gap-2 sm:gap-3" aria-label="Back to top">
            {/* S-rank insignia */}
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center sm:h-9 sm:w-9">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(37,99,235,0.4), transparent 65%)" }}
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.85, 1.05, 0.85] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Hexagon
                className="absolute inset-0 h-7 w-7 fill-monarch/10 text-aura-cyan/70 transition group-hover:text-aura-cyan sm:h-9 sm:w-9"
                strokeWidth={1.5}
              />
              <span className="relative font-display text-[11px] font-extrabold leading-none text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] sm:text-[13px]">
                {character.rank}
              </span>
            </span>
            {/* Name + level — baseline-aligned, balanced */}
            <span className="flex items-center gap-2 leading-none">
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-white/90 transition group-hover:text-white sm:text-sm">
                {character.hunterName.toUpperCase()}
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <span className="h-3 w-px bg-white/20" />
                <span className="font-hud text-xs font-medium tracking-[0.1em] text-mist">
                  LV.{character.level}
                </span>
              </span>
            </span>
          </a>

          {/* Desktop inline links */}
          <nav
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "hidden items-center gap-1 rounded-full border border-white/10 p-1 backdrop-blur-md transition-colors lg:flex",
              scrolled ? "glass" : "bg-white/[0.03]"
            )}
          >
            {navItems.slice(1).map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.short}
                isActive={active === item.id}
                isHighlight={highlightId === item.id}
                onHover={() => setHoveredId(item.id)}
              />
            ))}
          </nav>

          <MagneticButton
            href="#contact"
            variant="ghost"
            size="sm"
            className="hidden border-monarch/50 bg-monarch/10 text-white hover:bg-monarch/25 md:inline-flex"
          >
            Summon
          </MagneticButton>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white transition hover:border-monarch/40 hover:bg-white/[0.08] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-monarch/40 to-transparent" />
      </motion.header>

      {/* Desktop vertical "Gate" rail */}
      <GateRail active={active} />

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dimming backdrop */}
            <motion.div
              className="fixed inset-0 z-[59] bg-void/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Compact panel sliding from the top */}
            <motion.div
              className="fixed inset-x-3 top-3 z-[60] overflow-hidden rounded-2xl border border-white/10 bg-abyss/95 shadow-panel backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                <span className="font-mono text-xs tracking-[0.2em] text-mist">SYSTEM MENU</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 p-1.5 text-white transition hover:border-monarch/40 hover:bg-white/[0.08]"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-col p-2">
              {navItems.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                      isActive ? "bg-monarch/15" : "hover:bg-white/[0.04]"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px]",
                        isActive ? "text-aura-cyan" : "text-monarch-glow/70"
                      )}
                    >
                      {item.index}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-base font-semibold tracking-wide transition-colors",
                        isActive ? "text-white" : "text-white/80 group-hover:text-white"
                      )}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rotate-45 bg-aura-cyan shadow-glow" />
                    )}
                  </motion.a>
                );
              })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/** A single desktop nav item with sliding pill, border trace, text glow, reactive light. */
function NavLink({
  id,
  label,
  isActive,
  isHighlight,
  onHover,
}: {
  id: string;
  label: string;
  isActive: boolean;
  isHighlight: boolean;
  onHover: () => void;
}) {
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--nx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--ny", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <a
      href={`#${id}`}
      data-cursor
      onMouseEnter={onHover}
      onMouseMove={onMove}
      className="nav-item relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5"
    >
      {/* Sliding highlight pill (springs between items) */}
      {isHighlight && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-monarch/25 shadow-glow"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      {/* Cursor-reactive light + border trace */}
      <span aria-hidden className="nav-item__light" />
      <span aria-hidden className="nav-item__trace" />
      <span
        className={cn(
          "nav-text relative z-10 whitespace-nowrap font-hud text-xs font-semibold uppercase tracking-wider",
          isActive ? "text-white" : "text-mist/90"
        )}
      >
        {label}
      </span>
    </a>
  );
}

/** Vertical right-side "Gate" rail with scroll progress + pulsing active diamond. */
function GateRail({ active }: { active: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {/* Progress spine behind the diamonds */}
      <div className="pointer-events-none absolute right-[5px] top-0 h-full w-px -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-monarch via-aura-cyan to-monarch"
          style={{ height: "100%", scaleY: progress }}
        />
      </div>

      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <a key={item.id} href={`#${item.id}`} className="group relative flex items-center gap-3 pr-0.5">
            <span
              className={cn(
                "font-hud text-[10px] font-semibold uppercase tracking-widest opacity-0 transition group-hover:opacity-100",
                isActive ? "text-white opacity-100" : "text-mist"
              )}
            >
              {item.label}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center">
              {/* Energy-transfer pulse on the active node */}
              {isActive && (
                <motion.span
                  layoutId="gate-active-glow"
                  className="absolute inset-0 rounded-full bg-monarch-glow/40 blur-[3px]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-monarch-glow"
                  animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span
                className={cn(
                  "relative h-2 w-2 rotate-45 border transition-all duration-300",
                  isActive
                    ? "scale-125 border-monarch-glow bg-monarch-glow shadow-glow"
                    : "border-mist/50 bg-transparent group-hover:scale-110 group-hover:border-monarch-glow group-hover:shadow-glow"
                )}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
