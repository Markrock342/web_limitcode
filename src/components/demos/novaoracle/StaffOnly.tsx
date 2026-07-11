"use client";

import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useNovaOracle } from "./store";

export function NovaStaffOnly({ children }: { children: React.ReactNode }) {
  const { state } = useNovaOracle();
  return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>;
}
