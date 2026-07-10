"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, quickBrand, quickNav, useQuickDrop } from "./store";

export function QuickDropShell({ children }: { children: React.ReactNode }) {
  const { reset } = useQuickDrop();
  return (
    <DemoAppShell brand={quickBrand} nav={quickNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
