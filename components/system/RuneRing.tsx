"use client";

/**
 * Original geometric "rune" sigil — concentric rings, tick marks, and an
 * angular glyph. Purely procedural SVG, no copyrighted artwork.
 */
export function RuneRing({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rune-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="60%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <radialGradient id="rune-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer rotating ring with ticks */}
      <g className={animate ? "origin-center animate-spin-slow" : "origin-center"}>
        <circle cx="100" cy="100" r="92" stroke="url(#rune-stroke)" strokeWidth="0.8" opacity="0.7" />
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          const long = i % 4 === 0;
          const r1 = long ? 84 : 88;
          const r2 = 92;
          return (
            <line
              key={i}
              x1={100 + Math.cos(angle) * r1}
              y1={100 + Math.sin(angle) * r1}
              x2={100 + Math.cos(angle) * r2}
              y2={100 + Math.sin(angle) * r2}
              stroke="url(#rune-stroke)"
              strokeWidth={long ? 1.4 : 0.6}
              opacity={long ? 0.9 : 0.5}
            />
          );
        })}
      </g>

      {/* Counter-rotating inner ring */}
      <g className={animate ? "origin-center animate-spin-reverse" : "origin-center"}>
        <circle cx="100" cy="100" r="64" stroke="url(#rune-stroke)" strokeWidth="0.8" strokeDasharray="3 7" opacity="0.7" />
        <polygon
          points="100,46 146,73 146,127 100,154 54,127 54,73"
          stroke="url(#rune-stroke)"
          strokeWidth="1"
          opacity="0.6"
        />
      </g>

      {/* Static inner glyph */}
      <circle cx="100" cy="100" r="38" stroke="url(#rune-stroke)" strokeWidth="0.8" opacity="0.8" />
      <path
        d="M100 70 L122 112 L78 112 Z M100 130 L122 88 L78 88 Z"
        stroke="url(#rune-stroke)"
        strokeWidth="1.1"
        opacity="0.85"
      />
      <circle cx="100" cy="100" r="46" fill="url(#rune-core)" />
    </svg>
  );
}
