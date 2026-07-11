"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, shineBrand, shineNav, useShineAuto } from "./store";

export function ShineAutoShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useShineAuto();
  return (
    <DemoAppShell brand={shineBrand} nav={shineNav} basePath={BASE} onReset={reset} session={state.session} onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}>
      {children}
    </DemoAppShell>
  );
}
