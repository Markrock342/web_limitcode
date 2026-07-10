"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, venueBrand, venueNav, useVenueHive } from "./store";

export function VenueHiveShell({ children }: { children: React.ReactNode }) {
  const { reset } = useVenueHive();
  return (
    <DemoAppShell brand={venueBrand} nav={venueNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
