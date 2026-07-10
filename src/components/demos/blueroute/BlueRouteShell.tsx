"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, blueBrand, blueNav, useBlueRoute } from "./store";

export function BlueRouteShell({ children }: { children: React.ReactNode }) {
  const { reset } = useBlueRoute();
  return (
    <DemoAppShell brand={blueBrand} nav={blueNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
