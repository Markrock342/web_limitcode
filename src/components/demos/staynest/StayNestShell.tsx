"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, stayBrand, stayNav, useStayNest } from "./store";

export function StayNestShell({ children }: { children: React.ReactNode }) {
  const { reset } = useStayNest();
  return (
    <DemoAppShell brand={stayBrand} nav={stayNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
