"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, blueBrand, blueNav, useBlueRoute } from "./store";

export function BlueRouteShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useBlueRoute();
  return (
    <DemoAppShell
      brand={blueBrand}
      nav={blueNav}
      basePath={BASE}
      onReset={reset}
      session={state.session}
      onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}
    >
      {children}
    </DemoAppShell>
  );
}
