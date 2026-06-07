"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/hooks";

type TrailPoint = { x: number; y: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; hue: number };

const INTERACTIVE =
  "a, button, input, textarea, select, label, [data-cursor], [data-magnetic], [role='button']";

/**
 * Living monarch cursor — a single canvas overlay that renders:
 *  - a soft energy aura + glow trailing the pointer,
 *  - a precise core dot at the true pointer position,
 *  - a fading motion trail,
 *  - particle emission scaling with pointer speed,
 *  - a ring that amplifies (expands + intensifies) over interactive elements,
 *  - magnetic attraction that nudges [data-magnetic] elements toward the cursor,
 *  - multi-hue particles (monarch purple + aura blue) for richer visuals.
 *
 * Disabled entirely on touch / coarse pointers and under reduced motion.
 */
export function MonarchCursor() {
  const reduce = usePrefersReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce || !fine) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.body.classList.add("monarch-cursor");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let raf = 0;
    let visible = false;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const last = { x: pointer.x, y: pointer.y };
    const core = { x: pointer.x, y: pointer.y };
    const ring = { x: pointer.x, y: pointer.y };

    let hovering = false;
    let pressing = false;
    let ringR = 16;
    let glow = 0.5;
    let auraPulse = 0;

    let magnetEl: HTMLElement | null = null;
    const trail: TrailPoint[] = [];
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const setMagnet = (el: HTMLElement | null) => {
      if (el === magnetEl) return;
      if (magnetEl) magnetEl.style.transform = "";
      magnetEl = el;
      if (magnetEl) magnetEl.style.transition = "transform 0.25s cubic-bezier(0.22,1,0.36,1)";
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      visible = true;

      const el = e.target as Element | null;
      hovering = !!el?.closest(INTERACTIVE);
      setMagnet((el?.closest("[data-magnetic]") as HTMLElement) ?? null);

      // Speed-based particle emission — richer bursts.
      const dx = pointer.x - last.x;
      const dy = pointer.y - last.y;
      const speed = Math.hypot(dx, dy);
      if (speed > 4 && particles.length < 100) {
        const n = Math.min(5, Math.floor(speed / 8));
        for (let i = 0; i < n; i++) {
          particles.push({
            x: pointer.x,
            y: pointer.y,
            vx: -dx * 0.05 + (Math.random() - 0.5) * 1.2,
            vy: -dy * 0.05 + (Math.random() - 0.5) * 1.2,
            life: 0,
            max: 24 + Math.random() * 34,
            r: 0.6 + Math.random() * 2.0,
            hue: Math.random() > 0.4 ? 260 : 200, // Monarch purple or aura blue
          });
        }
      }
      last.x = pointer.x;
      last.y = pointer.y;
    };

    const onDown = () => (pressing = true);
    const onUp = () => (pressing = false);
    const onLeave = () => (visible = false);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Magnetic pull on the active element.
      if (magnetEl) {
        const r = magnetEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const max = 16;
        magnetEl.style.transform = `translate(${Math.max(
          -max,
          Math.min(max, dx * 0.35)
        )}px, ${Math.max(-max, Math.min(max, dy * 0.35))}px)`;
        // Bias the ring toward the element center for a "snap".
        ring.x += (cx + dx * 0.5 - ring.x) * 0.28;
        ring.y += (cy + dy * 0.5 - ring.y) * 0.28;
      } else {
        ring.x += (pointer.x - ring.x) * 0.16;
        ring.y += (pointer.y - ring.y) * 0.16;
      }

      core.x += (pointer.x - core.x) * 0.45;
      core.y += (pointer.y - core.y) * 0.45;

      // Animate ring radius + glow toward targets.
      const targetR = (hovering ? 34 : 15) * (pressing ? 0.65 : 1);
      ringR += (targetR - ringR) * 0.22;
      const targetGlow = hovering ? 1 : 0.5;
      glow += (targetGlow - glow) * 0.1;
      auraPulse += 0.04;

      if (!visible) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // Trail — longer, more visible.
      trail.push({ x: core.x, y: core.y });
      if (trail.length > 22) trail.shift();
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const p = i / trail.length;
        ctx.beginPath();
        ctx.arc(t.x, t.y, p * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p * 0.3})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(139,92,246,0.6)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Particles — multi-hue with glow.
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.life++;
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.008;
        const lifeP = 1 - pt.life / pt.max;
        if (lifeP <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * lifeP, 0, Math.PI * 2);
        const c = pt.hue === 260 ? "196,181,253" : "56,189,248";
        ctx.fillStyle = `rgba(${c},${lifeP * 0.7})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${pt.hue === 260 ? "139,92,246" : "56,189,248"},0.9)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Outer aura glow — larger, more dramatic.
      const auraR = ringR * 3 + Math.sin(auraPulse) * 5;
      const aura = ctx.createRadialGradient(ring.x, ring.y, ringR * 0.3, ring.x, ring.y, auraR);
      aura.addColorStop(0, `rgba(139,92,246,${0.2 * glow})`);
      aura.addColorStop(0.4, `rgba(56,189,248,${0.09 * glow})`);
      aura.addColorStop(0.7, `rgba(139,92,246,${0.03 * glow})`);
      aura.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, auraR, 0, Math.PI * 2);
      ctx.fill();

      // Ring — sharper, more prominent.
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167,139,250,${0.55 + glow * 0.4})`;
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(139,92,246,0.95)";
      ctx.stroke();

      // Inner ring — subtle, for depth.
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ringR * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(196,181,253,${0.25 + glow * 0.2})`;
      ctx.lineWidth = 0.7;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Core dot at the true pointer — brighter.
      ctx.beginPath();
      ctx.arc(core.x, core.y, pressing ? 1.6 : 2.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,245,247,0.98)";
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(167,139,250,1)";
      ctx.fill();

      // Inner bright core.
      ctx.beginPath();
      ctx.arc(core.x, core.y, pressing ? 0.8 : 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(255,255,255,0.8)";
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("monarch-cursor");
      if (magnetEl) magnetEl.style.transform = "";
    };
  }, [reduce, fine]);

  if (reduce || !fine) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
