"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, novaBrand, novaNav, useNovaOracle } from "./store";

export function NovaOracleShell({ children }: { children: React.ReactNode }) {
  const { reset } = useNovaOracle();
  return (
    <DemoAppShell brand={novaBrand} nav={novaNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
