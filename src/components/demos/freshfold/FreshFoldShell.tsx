"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { usePathname } from "next/navigation";
import { BASE, freshBrand, freshNav, useFreshFold } from "./store";

export function FreshFoldShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useFreshFold();
  const pathname = usePathname();
  const staffOnly = ["/orders", "/order", "/pricing", "/customers"].some((path) => pathname.startsWith(`${BASE}${path}`));
  return (
    <DemoAppShell brand={freshBrand} nav={freshNav} basePath={BASE} onReset={reset} session={state.session} onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}>
      {staffOnly ? <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth> : children}
    </DemoAppShell>
  );
}
