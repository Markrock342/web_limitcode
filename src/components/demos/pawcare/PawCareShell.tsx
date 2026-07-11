"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { usePathname } from "next/navigation";
import { BASE, pawBrand, pawNav, usePawCare } from "./store";

export function PawCareShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = usePawCare();
  const pathname = usePathname();
  const staffOnly = ["/appointments", "/patients", "/vets", "/admin"].some((path) => pathname.startsWith(`${BASE}${path}`));
  return (
    <DemoAppShell brand={pawBrand} nav={pawNav} basePath={BASE} onReset={reset} session={state.session} onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}>
      {staffOnly ? <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth> : children}
    </DemoAppShell>
  );
}
