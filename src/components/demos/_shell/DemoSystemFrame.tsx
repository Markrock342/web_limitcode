"use client";

import { DemoChrome } from "@/components/DemoChrome";
import { getDemo } from "@/lib/demos";
import { DemoAppShell } from "@/components/demos/_shell/DemoAppShell";
import type { DemoBrandMeta, DemoNavItem } from "@/components/demos/_shell/types";

export function DemoSystemFrame({
  slug,
  brand,
  nav,
  basePath,
  onReset,
  children,
}: {
  slug: string;
  brand: DemoBrandMeta;
  nav: DemoNavItem[];
  basePath: string;
  onReset?: () => void;
  children: React.ReactNode;
}) {
  const demo = getDemo(slug)!;
  return (
    <DemoChrome demo={demo}>
      <DemoAppShell brand={brand} nav={nav} basePath={basePath} onReset={onReset}>
        {children}
      </DemoAppShell>
    </DemoChrome>
  );
}
