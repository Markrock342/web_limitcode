"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, pawBrand, pawNav, usePawCare } from "./store";

export function PawCareShell({ children }: { children: React.ReactNode }) {
  const { reset } = usePawCare();
  return (
    <DemoAppShell brand={pawBrand} nav={pawNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
