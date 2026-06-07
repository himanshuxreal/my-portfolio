"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Layered atmospheric environment — depth-first:
 *   1. Deep-space radial wash (monarch purple + aura blue gradients)
 *   2. Custom artwork slot with parallax (uncomment when artwork is provided)
 *   3. Drifting fog blobs (larger, more numerous)
 *   5. Rising energy streaks (shadow particles)
 *   6. Floating ember motes
 *   7. Fine grain texture (kills banding)
 *   8. Vignette (focuses the center)
 *
 * All layers are fixed behind content. The image slot is structured for
 * masked, parallaxed, aura-synced blending — not flat wallpaper.
 */
export function AtmosphereBackground() {
  const reduce = usePrefersReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-void">
      {/* 1. Base deep-space wash — richer, more layered */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75rem 75rem at 80% -10%, rgba(109,40,217,0.22), transparent 60%)," +
            "radial-gradient(60rem 60rem at 5% 10%, rgba(37,99,235,0.16), transparent 55%)," +
            "radial-gradient(55rem 55rem at 50% 115%, rgba(139,92,246,0.14), transparent 60%)," +
            "radial-gradient(40rem 40rem at 50% 40%, rgba(56,189,248,0.06), transparent 70%)",
        }}
      />

      {/* 2. IMAGE LAYER SLOT — parallaxed, masked, aura-blended.
          When custom artwork is provided, uncomment and set the URL:

          <motion.div
            className="absolute inset-0 mask-fade-y opacity-40 mix-blend-screen"
            style={{
              backgroundImage: "url(/atmosphere/monarch-art.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
              y: parallaxY,
            }}
          />

          For hero-right placement with fade:

          <motion.div
            className="absolute right-0 top-0 h-full w-[55%] mask-fade-b opacity-35 mix-blend-screen"
            style={{
              backgroundImage: "url(/atmosphere/monarch-art.webp)",
              backgroundSize: "contain",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
              y: useTransform(scrollYProgress, [0, 0.3], ["0%", "8%"]),
            }}
          />
      */}

      {/* 3. Drifting fog blobs — larger, more dynamic */}
      {[
        { x: "10%", y: "18%", s: "52rem", c: "rgba(109,40,217,0.18)", d: 28, blur: 48 },
        { x: "82%", y: "55%", s: "56rem", c: "rgba(37,99,235,0.15)", d: 34, blur: 52 },
        { x: "44%", y: "85%", s: "48rem", c: "rgba(139,92,246,0.13)", d: 30, blur: 44 },
        { x: "70%", y: "25%", s: "38rem", c: "rgba(56,189,248,0.10)", d: 22, blur: 40 },
        { x: "25%", y: "65%", s: "44rem", c: "rgba(109,40,217,0.11)", d: 36, blur: 50 },
        { x: "58%", y: "10%", s: "36rem", c: "rgba(139,92,246,0.14)", d: 26, blur: 42 },
      ].map((f, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: f.x,
            top: f.y,
            width: f.s,
            height: f.s,
            background: `radial-gradient(circle, ${f.c}, transparent 68%)`,
            filter: `blur(${f.blur}px)`,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 50 + i * 8, -30 - i * 5, 20, 0],
                  y: [0, -35 - i * 5, 25 + i * 3, -15, 0],
                  opacity: [0.65, 1, 0.75, 0.9, 0.65],
                }
          }
          transition={{ duration: f.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* 5. Rising energy streaks — shadow particles */}
      {!reduce && (
        <div className="absolute inset-0">
          {[12, 25, 38, 52, 65, 78, 90].map((left, i) => (
            <motion.span
              key={left}
              className="absolute bottom-[-10%]"
              style={{
                left: `${left}%`,
                width: `${0.8 + Math.random() * 0.6}px`,
                height: `${28 + Math.random() * 35}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(to top, transparent, rgba(167,139,250,0.55), transparent)"
                    : "linear-gradient(to top, transparent, rgba(56,189,248,0.4), transparent)",
              }}
              animate={{
                y: ["10%", "-140%"],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 7 + i * 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.8,
              }}
            />
          ))}
        </div>
      )}

      {/* 6. Floating ember motes — tiny drifting lights */}
      {!reduce && (
        <div className="absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={`ember-${i}`}
              className="absolute h-0.5 w-0.5 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                background: i % 3 === 0 ? "#A78BFA" : i % 3 === 1 ? "#38BDF8" : "#C4B5FD",
              }}
              animate={{
                y: [0, -40 - Math.random() * 30, 0],
                x: [0, (Math.random() - 0.5) * 30, 0],
                opacity: [0, 0.7 + Math.random() * 0.3, 0],
                scale: [0.4, 1.4, 0.4],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
      )}

      {/* 7. Fine grain to kill banding and add film texture */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* 8. Vignette to focus the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 40%, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
