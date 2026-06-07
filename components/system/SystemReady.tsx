"use client";

import { createContext, useContext } from "react";

/** Broadcasts when the boot intro has finished so the hero can sync its reveal. */
export const SystemReadyContext = createContext(false);

export function useSystemReady() {
  return useContext(SystemReadyContext);
}
