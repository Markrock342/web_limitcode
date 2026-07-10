"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, shineBrand, shineNav, useShineAuto } from "./store";

export function ShineAutoShell({ children }: { children: React.ReactNode }) {
  const { reset } = useShineAuto();
  return (
    <DemoAppShell brand={shineBrand} nav={shineNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
