"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/hooks";

/**
 * Original "Shadow Monarch" figure — a hooded, armored silhouette rendered
 * entirely as procedural SVG. No copyrighted artwork is used; this is an
 * original design inspired only by the atmosphere of the hunter-system genre.
 *
 * - Float animation (framer) on the outer wrapper.
 * - Mouse parallax (imperative, no re-renders) on the inner wrapper.
 * - Bottom is masked so the figure dissolves into the page background.
 * - Fully disabled motion under reduced-motion / coarse pointers.
 */
export function ShadowFigure({ className }: { className?: string }) {
  const reduce = usePrefersReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !fine) return;
    const el = parallaxRef.current;
    if (!el) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.x = ((e.clientX - cx) / cx) * 16;
      target.y = ((e.clientY - cy) / cy) * 12;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.06;
      pos.y += (target.y - pos.y) * 0.06;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, fine]);

  return (
    <div className={className} aria-hidden="true">
      <motion.div
        className="h-full w-full will-change-transform"
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          ref={parallaxRef}
          className="h-full w-full will-change-transform"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, #000 68%, transparent 95%)",
            maskImage: "linear-gradient(to bottom, #000 68%, transparent 95%)",
          }}
        >
          <svg
            viewBox="0 0 400 640"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              <radialGradient id="sf-aura" cx="50%" cy="42%" r="55%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
                <stop offset="45%" stopColor="#6D28D9" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sf-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14101f" />
                <stop offset="55%" stopColor="#0a0a12" />
                <stop offset="100%" stopColor="#050509" />
              </linearGradient>
              <linearGradient id="sf-rim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="55%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
              <radialGradient id="sf-eye" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A5F3FC" />
                <stop offset="40%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </radialGradient>
              <filter id="sf-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Aura halo */}
            <ellipse
              cx="200"
              cy="270"
              rx="190"
              ry="280"
              fill="url(#sf-aura)"
              className={reduce ? undefined : "origin-center animate-pulse-glow"}
            />

            {/* Body silhouette (symmetric hooded cloak) */}
            <path
              d="M200 48
                 C170 50 145 88 140 150
                 C136 185 120 200 110 215
                 C95 235 88 246 85 262
                 C72 360 70 470 100 632
                 L300 632
                 C330 470 328 360 315 262
                 C312 246 305 235 290 215
                 C280 200 264 185 260 150
                 C255 88 230 50 200 48 Z"
              fill="url(#sf-body)"
              stroke="url(#sf-rim)"
              strokeWidth="1.6"
              strokeOpacity="0.55"
            />

            {/* Rim-light highlight along the left edge */}
            <path
              d="M140 150 C136 185 120 200 110 215 C95 235 88 246 85 262 C74 350 71 450 92 600"
              stroke="url(#sf-rim)"
              strokeWidth="2.4"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />

            {/* Hood opening / face shadow */}
            <ellipse cx="200" cy="150" rx="40" ry="54" fill="#050509" />
            <path
              d="M160 150 C160 112 178 92 200 92 C222 92 240 112 240 150"
              stroke="url(#sf-rim)"
              strokeWidth="2"
              strokeOpacity="0.7"
              fill="none"
            />

            {/* Glowing eyes */}
            <g filter="url(#sf-glow)">
              <ellipse cx="186" cy="152" rx="11" ry="7" fill="url(#sf-eye)" />
              <ellipse cx="214" cy="152" rx="11" ry="7" fill="url(#sf-eye)" />
              <path d="M180 153 L194 149 L193 156 L179 158 Z" fill="#E0FBFF" />
              <path d="M220 153 L206 149 L207 156 L221 158 Z" fill="#E0FBFF" />
            </g>

            {/* Armored pauldrons */}
            <g stroke="url(#sf-rim)" strokeWidth="1.6" strokeOpacity="0.85">
              <polygon points="92,206 148,192 158,238 100,252" fill="rgba(109,40,217,0.22)" />
              <polygon points="308,206 252,192 242,238 300,252" fill="rgba(109,40,217,0.22)" />
              <line x1="104" y1="214" x2="150" y2="204" strokeOpacity="0.5" />
              <line x1="296" y1="214" x2="250" y2="204" strokeOpacity="0.5" />
            </g>

            {/* Chest rune emblem */}
            <g
              stroke="url(#sf-rim)"
              strokeWidth="1.6"
              fill="none"
              className={reduce ? undefined : "animate-pulse-glow"}
              style={{ transformOrigin: "200px 312px" }}
            >
              <polygon points="200,284 226,312 200,340 174,312" />
              <line x1="200" y1="296" x2="200" y2="328" strokeOpacity="0.7" />
              <line x1="184" y1="312" x2="216" y2="312" strokeOpacity="0.7" />
            </g>

            {/* Cloak seam lines for depth */}
            <g stroke="#1a1430" strokeWidth="1.4" strokeOpacity="0.8" fill="none">
              <path d="M200 344 C198 440 196 540 190 624" />
              <path d="M150 280 C140 400 132 520 128 624" />
              <path d="M250 280 C260 400 268 520 272 624" />
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
