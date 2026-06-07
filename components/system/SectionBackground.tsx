"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Atmospheric artwork backdrop for a section. Mirrors the HeroBackground
 * treatment (mask + scrim + color-grade) so the image dissolves into the page
 * instead of reading as a pasted-on photo, and keeps all overlaid content
 * readable. Sits behind a section's content via the `<Section background>` slot.
 *
 * - Edge masking fades the image into the adjacent sections (no hard box).
 * - A void scrim + center vignette preserve text/card contrast.
 * - A purple-anchored color-grade pulls the art into the monarch palette.
 * - A slow ambient zoom keeps it cinematic; disabled under reduced motion.
 */
export function SectionBackground({
  src,
  position = "object-center",
  priority = false,
}: {
  src: string;
  /** Tailwind object-position classes, e.g. "object-center" or "object-[70%_30%]". */
  position?: string;
  priority?: boolean;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Artwork layer — masked top + bottom so it melts into the page. */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 18%, #000 70%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 18%, #000 70%, transparent 100%)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1.06, 1.12, 1.06], x: ["0%", "-1.5%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className={`object-cover opacity-80 ${position}`}
          />
        </motion.div>
      </div>

      {/* Color-grade wash — pull the art toward the monarch purple anchor. */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.5) 0%, rgba(37,99,235,0.22) 50%, rgba(34,211,238,0.14) 80%, rgba(244,63,94,0.16) 100%)",
        }}
      />

      {/* Readability scrims — light enough to keep the art clearly visible, with
          the cards' own backdrop-blur carrying content legibility. Mobile keeps
          a touch more contrast at the very top/bottom where the header sits. */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--void) 0%, rgba(5,5,5,0.5) 22%, rgba(5,5,5,0.42) 50%, rgba(5,5,5,0.5) 78%, var(--void) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(180deg, var(--void) 0%, rgba(5,5,5,0.42) 28%, rgba(5,5,5,0.36) 50%, rgba(5,5,5,0.42) 72%, var(--void) 100%)",
        }}
      />
      {/* Soft center vignette so the section edges blend without dimming the art. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 90% at 50% 50%, transparent 42%, rgba(5,5,5,0.4) 82%, var(--void) 100%)",
        }}
      />
    </div>
  );
}
