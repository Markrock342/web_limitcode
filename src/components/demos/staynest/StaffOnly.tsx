"use client";
import { RequireAuth } from "@/components/demos/_shell/RequireAuth";
import { BASE, useStayNest } from "./store";
export function StayStaffOnly({ children }: { children: React.ReactNode }) { const { state } = useStayNest(); return <RequireAuth session={state.session} basePath={BASE}>{children}</RequireAuth>; }
