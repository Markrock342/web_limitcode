"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, ironBrand, ironNav, useIronPulse } from "./store";

export function IronPulseShell({ children }: { children: React.ReactNode }) {
  const { state, reset, setState } = useIronPulse();
  return (
    <DemoAppShell
      brand={ironBrand}
      nav={ironNav}
      basePath={BASE}
      onReset={reset}
      session={state.session}
      onLogout={() => setState((current) => ({ ...current, session: GUEST_SESSION }))}
    >
      {children}
    </DemoAppShell>
  );
}
