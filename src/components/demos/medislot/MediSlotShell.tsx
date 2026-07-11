"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, mediBrand, mediNav, useMediSlot } from "./store";

export function MediSlotShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useMediSlot();
  return (
    <DemoAppShell
      brand={mediBrand}
      nav={mediNav}
      basePath={BASE}
      onReset={reset}
      session={state.session}
      onLogout={() => setState((current) => ({ ...current, session: GUEST_SESSION }))}
    >
      {children}
    </DemoAppShell>
  );
}
