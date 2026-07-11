"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useTableFlow } from "../store";

export function TableLoginPage() {
  const { state, setState } = useTableFlow();
  return <DemoLoginPage brandName="TableFlow Bistro" subtitle="บัญชีลูกค้าและพนักงานร้าน" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass="bg-amber-700" />;
}
