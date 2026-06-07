import type { Config } from "tailwindcss";

/**
 * Shadow Monarch design tokens.
 * Palette anchored on the README: void black (#050505), monarch purple (#6D28D9),
 * neon purple glow, and a "monarch blue" aura layered on top for depth.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050510",
        abyss: "#0a0a1a",
        obsidian: "#11111f",
        // Monarch purple — the restricted anchor (dominant accent).
        monarch: {
          DEFAULT: "#7C3AED",
          light: "#9B6CFF",
          glow: "#B794FF",
          deep: "#4C1D95",
        },
        // Aura — electric royal blue + cyan dragon-flame, pulled from the artwork.
        aura: {
          DEFAULT: "#2563EB",
          royal: "#1D4ED8",
          cyan: "#22D3EE",
          glow: "#60A5FA",
        },
        // Ember — crimson accent from the base of the artwork (used sparingly).
        ember: {
          DEFAULT: "#F43F5E",
          glow: "#FB7185",
          deep: "#BE123C",
        },
        rune: "#C4B5FD",
        mist: "#C2C2D6",
        "mist-dim": "#9A9AB4",
      },
      fontFamily: {
        // Sora — hero name & display.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        // Outfit — section headings, card titles, HUD labels.
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        hud: ["var(--font-heading)", "system-ui", "sans-serif"],
        // JetBrains Mono — numerals & technical data.
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // Inter — body copy (default).
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px -2px rgba(139,92,246,0.45)",
        "glow-lg": "0 0 60px -6px rgba(139,92,246,0.55)",
        "glow-xl": "0 0 90px -8px rgba(139,92,246,0.6), 0 0 40px -12px rgba(56,189,248,0.4)",
        aura: "0 0 28px -4px rgba(56,189,248,0.45)",
        panel: "0 24px 80px -28px rgba(0,0,0,0.85)",
        "panel-hover":
          "0 28px 90px -24px rgba(0,0,0,0.8), 0 0 40px -6px rgba(139,92,246,0.28)",
      },
      backgroundImage: {
        "monarch-gradient":
          "linear-gradient(135deg, #9B6CFF 0%, #7C3AED 40%, #2563EB 75%, #22D3EE 100%)",
        "monarch-flow":
          "linear-gradient(100deg, #B794FF 0%, #7C3AED 25%, #2563EB 50%, #22D3EE 70%, #7C3AED 100%)",
        "ember-gradient":
          "linear-gradient(135deg, #FB7185 0%, #F43F5E 50%, #7C3AED 100%)",
        "rune-grid":
          "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", filter: "drop-shadow(0 0 6px rgba(139,92,246,0.5))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 18px rgba(139,92,246,0.9))" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "spin-reverse": { to: { transform: "rotate(-360deg)" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "border-rotate": { to: { "--angle": "360deg" } },
        "btn-energy-rotate": { to: { "--btn-angle": "360deg" } },
        "aura-breathe": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.06)" },
        },
        // Flowing gradient for the animated hero name.
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Flickering flame for the S-rank badge.
        flame: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1) translateY(0)", opacity: "0.9" },
          "25%": { transform: "scaleY(1.15) scaleX(0.95) translateY(-2px)", opacity: "1" },
          "50%": { transform: "scaleY(0.92) scaleX(1.05) translateY(1px)", opacity: "0.85" },
          "75%": { transform: "scaleY(1.1) scaleX(0.97) translateY(-1px)", opacity: "1" },
        },
        "flame-flicker": {
          "0%, 100%": { opacity: "0.85", filter: "brightness(1)" },
          "33%": { opacity: "1", filter: "brightness(1.25)" },
          "66%": { opacity: "0.78", filter: "brightness(0.95)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "spin-reverse": "spin-reverse 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        "border-rotate": "border-rotate 3.2s linear infinite",
        "btn-energy-rotate": "btn-energy-rotate 1.8s linear infinite",
        "aura-breathe": "aura-breathe 4s ease-in-out infinite",
        "gradient-flow": "gradient-flow 6s ease-in-out infinite",
        flame: "flame 1.6s ease-in-out infinite",
        "flame-flicker": "flame-flicker 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
