"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, smashBrand, smashNav, useSmashLane } from "./store";

export function SmashLaneShell({ children }: { children: React.ReactNode }) {
  const { reset } = useSmashLane();
  return (
    <DemoAppShell brand={smashBrand} nav={smashNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
