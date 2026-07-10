"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, guardBrand, guardNav, useGuardNest } from "./store";

export function GuardNestShell({ children }: { children: React.ReactNode }) {
  const { reset } = useGuardNest();
  return (
    <DemoAppShell brand={guardBrand} nav={guardNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
