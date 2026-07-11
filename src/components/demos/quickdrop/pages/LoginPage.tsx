"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useQuickDrop } from "../store";

export function QuickLoginPage() {
  const { state, setState } = useQuickDrop();
  return <DemoLoginPage brandName="QuickDrop Logistics" subtitle="เข้าสู่ระบบเพื่อติดตามรายการส่ง หรือจัดการศูนย์กระจายงาน" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass="bg-indigo-700" />;
}
