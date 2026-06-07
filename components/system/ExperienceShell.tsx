"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BootSequence } from "./BootSequence";
import { AtmosphereBackground } from "./AtmosphereBackground";
import { ParticleField } from "./ParticleField";
import { MonarchCursor } from "./MonarchCursor";
import { ScrollProgress } from "./ScrollProgress";
import { SystemNav } from "./SystemNav";
import { SystemReadyContext } from "./SystemReady";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Client wrapper that orchestrates the boot intro, ambient layers, and nav,
 * then fades in the page content once the System is "online". Broadcasts the
 * ready state via context so the hero artwork can reveal in sync.
 */
export function ExperienceShell({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <SystemReadyContext.Provider value={ready}>
      <BootSequence onDone={() => setReady(true)} />

      {/* Ambient background layers */}
      <AtmosphereBackground />
      <ParticleField />
      <MonarchCursor />
      <ScrollProgress />
      <SystemNav />

      {reduce ? (
        <main className="relative w-full max-w-[100vw] overflow-x-clip">{children}</main>
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[100vw] overflow-x-clip"
        >
          {children}
        </motion.main>
      )}
    </SystemReadyContext.Provider>
  );
}
