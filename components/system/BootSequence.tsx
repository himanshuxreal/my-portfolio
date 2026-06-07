"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { RuneRing } from "./RuneRing";
import { character } from "@/data/portfolio";

const KEY = "sm_boot_seen";
const LINES = [
  "Establishing connection to the System…",
  "Authenticating Hunter credentials…",
  `Welcome, ${character.hunterName}.`,
];

/**
 * One-time portal "boot" intro. Skippable, plays once per session, and is
 * skipped entirely for reduced-motion users so it never blocks a recruiter.
 */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    // SSR-safe: decide on the client only.
    const seen = typeof window !== "undefined" && sessionStorage.getItem(KEY);
    if (seen || reduce) {
      onDone();
      return;
    }
    setShow(true);
    sessionStorage.setItem(KEY, "1");

    const lineTimers = LINES.map((_, i) => setTimeout(() => setLine(i), 500 + i * 600));
    const end = setTimeout(() => finish(), 2600);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const finish = () => {
    setShow(false);
    // Allow the exit animation to play before unmounting.
    setTimeout(onDone, 650);
  };

  // Allow Esc / click to skip.
  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          role="status"
          aria-live="polite"
          onClick={finish}
        >
          {/* Expanding portal */}
          <motion.div
            className="relative flex h-72 w-72 items-center justify-center"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 65%)" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <RuneRing className="h-full w-full drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]" />
          </motion.div>

          <div className="mt-10 h-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={line}
                className="font-hud text-sm uppercase tracking-[0.3em] text-monarch-glow"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {LINES[line]}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
            className="absolute bottom-10 font-hud text-xs uppercase tracking-[0.3em] text-mist transition hover:text-white"
          >
            Skip intro · Esc
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
