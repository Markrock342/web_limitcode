"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, stayBrand, stayNav, useStayNest } from "./store";

export function StayNestShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useStayNest();
  return (
    <DemoAppShell
      brand={stayBrand}
      nav={stayNav}
      basePath={BASE}
      onReset={reset}
      session={state.session}
      onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}
    >
      {children}
    </DemoAppShell>
  );
}
