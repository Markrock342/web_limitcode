"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useBrightSlot } from "./store";

export function BrightStaffOnly({ children }: { children: React.ReactNode }) {
  const { state } = useBrightSlot();
  return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>;
}
