"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, ironBrand, ironNav, useIronPulse } from "./store";

export function IronPulseShell({ children }: { children: React.ReactNode }) {
  const { reset } = useIronPulse();
  return (
    <DemoAppShell brand={ironBrand} nav={ironNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
