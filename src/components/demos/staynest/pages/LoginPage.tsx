"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useStayNest } from "../store";

export function StayLoginPage() {
  const { state, setState } = useStayNest();
  return <DemoLoginPage brandName="StayNest Hotel" subtitle="เข้าดูรายการจอง หรือทำงานเป็นพนักงาน" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass="bg-slate-900" />;
}
