"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, venueBrand, venueNav, useVenueHive } from "./store";

export function VenueHiveShell({ children }: { children: React.ReactNode }) {
  const { state, setState, reset } = useVenueHive();
  return (
    <DemoAppShell brand={venueBrand} nav={venueNav} basePath={BASE} onReset={reset} session={state.session} onLogout={() => setState((s) => ({ ...s, session: GUEST_SESSION }))}>
      {children}
    </DemoAppShell>
  );
}
