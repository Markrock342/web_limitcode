"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, usePawCare } from "../store";

export function PawLoginPage() {
  const { state, setState } = usePawCare();
  return <DemoLoginPage brandName="PawCare Vet Clinic" subtitle="เข้าสู่ระบบเพื่อจองคิวสัตว์เลี้ยง หรือตรวจสอบตารางคลินิก" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass="bg-[#5B4B8A]" />;
}
