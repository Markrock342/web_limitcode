"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { usePathname } from "next/navigation";
import { BASE, quickBrand, quickNav, useQuickDrop } from "./store";

export function QuickDropShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useQuickDrop();
  const pathname = usePathname();
  const staffOnly = ["/orders", "/order", "/couriers", "/zones", "/summary"].some((path) => pathname.startsWith(`${BASE}${path}`));
  return (
    <DemoAppShell brand={quickBrand} nav={quickNav} basePath={BASE} onReset={reset} session={state.session} onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}>
      {staffOnly ? <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth> : children}
    </DemoAppShell>
  );
}
