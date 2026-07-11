"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useIronPulse } from "../store";

export function IronLoginPage() {
  const { state, setState } = useIronPulse();
  return (
    <DemoLoginPage
      brandName="IronPulse Gym"
      subtitle="เข้าสู่ระบบเพื่อจัดการยิม หรือจองคลาสของคุณ"
      basePath={BASE}
      session={state.session}
      onSession={(session) => setState((current) => ({ ...current, session }))}
      accentClass="bg-zinc-900"
    />
  );
}
