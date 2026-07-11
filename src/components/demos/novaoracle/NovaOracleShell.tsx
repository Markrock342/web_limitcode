"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, novaBrand, novaNav, useNovaOracle } from "./store";

export function NovaOracleShell({ children }: { children: React.ReactNode }) {
  const { state, reset, setState } = useNovaOracle();
  return (
    <DemoAppShell
      brand={novaBrand}
      nav={novaNav}
      basePath={BASE}
      onReset={reset}
      session={state.session}
      onLogout={() => setState((current) => ({ ...current, session: GUEST_SESSION }))}
    >
      {children}
    </DemoAppShell>
  );
}
