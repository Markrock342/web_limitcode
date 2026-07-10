"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, brightBrand, brightNav, useBrightSlot } from "./store";

export function BrightSlotShell({ children }: { children: React.ReactNode }) {
  const { reset } = useBrightSlot();
  return (
    <DemoAppShell brand={brightBrand} nav={brightNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
