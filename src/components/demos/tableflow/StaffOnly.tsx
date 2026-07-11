"use client";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useTableFlow } from "./store";
export function TableStaffOnly({ children }: { children: React.ReactNode }) { const { state } = useTableFlow(); return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>; }
