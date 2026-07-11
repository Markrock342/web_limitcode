"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useIronPulse } from "./store";

export function IronStaffOnly({ children }: { children: React.ReactNode }) {
  const { state } = useIronPulse();
  return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>;
}
