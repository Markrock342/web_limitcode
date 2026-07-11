"use client";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useBlueRoute } from "./store";
export function BlueStaffOnly({ children }: { children: React.ReactNode }) { const { state } = useBlueRoute(); return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>; }
