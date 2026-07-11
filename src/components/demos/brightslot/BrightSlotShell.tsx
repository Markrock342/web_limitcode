"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, brightBrand, brightNav, useBrightSlot } from "./store";

export function BrightSlotShell({ children }: { children: React.ReactNode }) {
  const { state, reset, setState } = useBrightSlot();
  return (
    <DemoAppShell brand={brightBrand} nav={brightNav} basePath={BASE} onReset={reset} session={state.session} onLogout={() => setState((current) => ({ ...current, session: GUEST_SESSION }))}>
      {children}
    </DemoAppShell>
  );
}
