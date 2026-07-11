"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useGuardNest } from "../store";

export function GuardLoginPage() {
  const { state, setState } = useGuardNest();
  return <DemoLoginPage brandName="GuardNest Field" subtitle="เข้าสู่ระบบเพื่อจัดการงานภาคสนาม" basePath={BASE} session={state.session} onSession={(session) => setState((current) => ({ ...current, session }))} accentClass="bg-[#0b1f3a]" />;
}
