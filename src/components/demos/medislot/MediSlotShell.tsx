"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, mediBrand, mediNav, useMediSlot } from "./store";

export function MediSlotShell({ children }: { children: React.ReactNode }) {
  const { reset } = useMediSlot();
  return (
    <DemoAppShell brand={mediBrand} nav={mediNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
