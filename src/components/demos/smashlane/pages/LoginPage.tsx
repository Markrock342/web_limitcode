"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, smashBrand, useSmashLane } from "../store";

export function SmashLoginPage() {
  const { state, setState } = useSmashLane();

  return (
    <DemoLoginPage
      brandName={smashBrand.name}
      subtitle="เข้าสู่ระบบเพื่อดูรายการจองและจัดการคอร์ท"
      basePath={BASE}
      session={state.session}
      onSession={(session) => setState((current) => ({ ...current, session }))}
      accentClass={smashBrand.accent}
    />
  );
}
