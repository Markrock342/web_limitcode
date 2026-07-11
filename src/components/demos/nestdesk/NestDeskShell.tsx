"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, nestBrand, nestNav, useNestDesk } from "./store";

export function NestDeskShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useNestDesk();
  return (
    <DemoAppShell brand={nestBrand} nav={nestNav} basePath={BASE} onReset={reset} session={state.session} onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}>
      {children}
    </DemoAppShell>
  );
}
