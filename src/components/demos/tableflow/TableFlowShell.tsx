"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, tableBrand, tableNav, useTableFlow } from "./store";

export function TableFlowShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useTableFlow();
  return (
    <DemoAppShell
      brand={tableBrand}
      nav={tableNav}
      basePath={BASE}
      onReset={reset}
      session={state.session}
      onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}
    >
      {children}
    </DemoAppShell>
  );
}
