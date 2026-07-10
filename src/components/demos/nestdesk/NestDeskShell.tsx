"use client";

import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import { BASE, nestBrand, nestNav, useNestDesk } from "./store";

export function NestDeskShell({ children }: { children: React.ReactNode }) {
  const { reset } = useNestDesk();
  return (
    <DemoAppShell brand={nestBrand} nav={nestNav} basePath={BASE} onReset={reset}>
      {children}
    </DemoAppShell>
  );
}
