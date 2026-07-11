"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useMediSlot } from "../store";

export function MediLoginPage() {
  const { state, setState } = useMediSlot();
  return (
    <DemoLoginPage
      brandName="MediSlot Clinic"
      subtitle="เข้าสู่ระบบเพื่อจองคิว หรือจัดการหลังบ้านคลินิก"
      basePath={BASE}
      session={state.session}
      onSession={(session) => setState((current) => ({ ...current, session }))}
      accentClass="bg-[#0F6B6B]"
    />
  );
}
