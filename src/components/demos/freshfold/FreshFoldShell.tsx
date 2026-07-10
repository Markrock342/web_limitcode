"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, freshBrand, freshNav, useFreshFold } from "./store";

export function FreshFoldShell({ children }: { children: React.ReactNode }) {
  const { reset } = useFreshFold();
  return (
    <DemoAppShell brand={freshBrand} nav={freshNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
