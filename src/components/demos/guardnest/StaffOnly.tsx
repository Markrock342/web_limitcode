"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useGuardNest } from "./store";

export function GuardStaffOnly({ children }: { children: React.ReactNode }) {
  const { state } = useGuardNest();
  return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>;
}
