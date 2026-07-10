"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, tableBrand, tableNav, useTableFlow } from "./store";

export function TableFlowShell({ children }: { children: React.ReactNode }) {
  const { reset } = useTableFlow();
  return (
    <DemoAppShell brand={tableBrand} nav={tableNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
