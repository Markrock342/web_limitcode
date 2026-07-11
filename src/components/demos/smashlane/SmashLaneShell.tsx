"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, smashBrand, smashNav, useSmashLane } from "./store";

export function SmashLaneShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useSmashLane();
  return (
    <DemoAppShell
      brand={smashBrand}
      nav={smashNav}
      basePath={BASE}
      onReset={reset}
      session={state.session}
      onLogout={() => setState((current) => ({ ...current, session: GUEST_SESSION }))}
    >
      {children}
    </DemoAppShell>
  );
}
