# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project identity

Shadow Monarch Portfolio — a Next.js 16 (App Router) professional portfolio for **Himanshu** (aspiring DevOps Engineer, Dehradun India). The UI is a dark, cinematic "hunter system interface" inspired by Solo Leveling's atmosphere but uses only original/procedural art — no copyrighted assets.

## Stack

- **Next.js 16** (App Router, React 19, `"use client"` for interactivity)
- **TypeScript 5.7** (strict, path alias `@/*` → `./*`)
- **Tailwind CSS 3.4** (custom design tokens in `tailwind.config.ts`)
- **Framer Motion 11** (all animations)
- **Lucide React** (icons)
- **Resend** REST API (contact form email, no SDK — just `fetch`)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (extends next/core-web-vitals)
```

## Architecture

```
app/
  layout.tsx          # Root layout: fonts (Cinzel/Rajdhani/Inter/Space Grotesk), metadata, JSON-LD schema
  page.tsx            # Single-page portfolio — composes all sections inside <ExperienceShell>
  globals.css         # Design system: custom properties, panel/glow/hud/card-fx classes, keyframes
  api/contact/route.ts # POST endpoint → Resend; returns 503 NO_PROVIDER if RESEND_API_KEY missing
  robots.ts / sitemap.ts

components/
  system/             # Reusable client-side "OS layer" components
    ExperienceShell.tsx   # Boot intro → ambient layers → nav → fade-in main content
    BootSequence.tsx      # One-time portal animation (skippable, gated on reduced motion)
    AtmosphereBackground.tsx  # Fixed background: radial gradients, drifting fog, light rays, grain, vignette
    MonarchCursor.tsx     # Canvas-based custom cursor: aura glow, trail, particles, magnetic snap
    InteractiveCard.tsx   # Panel with cursor-tracking spotlight, flowing border, scan sweep, optional tilt
    SystemNav.tsx         # Sticky header + desktop vertical rail + mobile overlay; auto-hides on scroll down
    ParticleField.tsx     # Ambient floating particles
    ScrollProgress.tsx    # Top-of-page progress bar
    ShadowFigure.tsx      # Original procedural SVG hooded monarch figure (NOT Sung Jinwoo)
    FloatingRunes.tsx / Counter.tsx / Meter.tsx / Reveal.tsx / RuneRing.tsx / Section.tsx

  sections/           # Page sections (one per nav item)
    Hero.tsx / HunterProfile.tsx / ShadowAbilities.tsx / ShadowArmy.tsx
    DungeonRecords.tsx / MonarchAchievements.tsx / SystemQuests.tsx
    Contact.tsx / ContactForm.tsx / Footer.tsx

  ui/                 # Generic primitives
    GlowButton.tsx / RankBadge.tsx

data/
  portfolio.ts        # SINGLE SOURCE OF TRUTH — all content: profile, stats, abilities, projects, quests, nav
                      # Every gamified label carries a `real` field with the plain-language equivalent

lib/
  utils.ts            # cn() class joiner, clamp()
  hooks.ts            # useMounted, useMediaQuery, usePrefersReducedMotion, useActiveSection (IntersectionObserver)
```

## Key patterns

- **Reduced motion everywhere.** Every animation component calls `usePrefersReducedMotion()` and either disables or replaces animation with a static fallback. `globals.css` has a global `prefers-reduced-motion` kill-switch. Never add animation without gating it.
- **Data-driven content.** All portfolio text (name, stats, projects, quests, nav items, SEO metadata) lives in `data/portfolio.ts`. To update content, edit that file.
- **Font discipline.** Cinzel = hero name only (`.font-display`). Rajdhani = section headings + HUD labels (`.font-heading`, `.font-hud`). Inter = body (`.font-sans`). Space Grotesk = numerals/data (`.font-mono`). Don't use Orbitron or Manrope — they were removed.
- **Custom cursor.** `MonarchCursor` renders on a full-screen `<canvas>` and hides the native cursor via `.monarch-cursor` class. Interactive elements tagged with `data-cursor` or `data-magnetic` get amplified ring / magnetic pull respectively. Disabled on touch devices and under reduced motion.
- **Card effects.** `InteractiveCard` uses real child `<span>` layers (not pseudo-elements) for spotlight, border, and scan so effects stack without collisions. CSS custom properties `--mx`/`--my` (set via JS `onMouseMove`) drive the radial spotlight position.
- **Contact form.** Client-side validation + honeypot → `POST /api/contact` → Resend API. If `RESEND_API_KEY` is unset, the route returns `{code: "NO_PROVIDER"}` and the client falls back to a `mailto:` link so no message is lost. Configure via `.env` (copy `.env.example`).
- **No external image dependencies.** Hero uses the procedural `ShadowFigure` SVG, and `AtmosphereBackground` has a commented slot for future custom art placed with blend modes and parallax — not flat wallpaper.
- **Next.js version.** README originally specified Next 15 but project upgraded to 16.x to avoid CVE-2025-66478. Do not downgrade.

## Stats/quest numbers

The power values, XP totals, ability tiers, and quest progress percentages in `data/portfolio.ts` are self-assessed estimates. Confirm real values with Himanshu before changing.
