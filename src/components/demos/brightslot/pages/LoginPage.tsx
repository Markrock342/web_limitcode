"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useBrightSlot } from "../store";

export function BrightLoginPage() {
  const { state, setState } = useBrightSlot();
  return <DemoLoginPage brandName="BrightSlot Tutor" subtitle="เข้าสู่ระบบเพื่อจองคาบหรือจัดการสถาบัน" basePath={BASE} session={state.session} onSession={(session) => setState((current) => ({ ...current, session }))} accentClass="bg-[#1B3A5C]" />;
}
