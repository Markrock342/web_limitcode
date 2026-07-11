"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useBlueRoute } from "../store";

export function BlueLoginPage() {
  const { state, setState } = useBlueRoute();
  return <DemoLoginPage brandName="BlueRoute Fleet" subtitle="เข้าสู่ระบบพนักงานหรือสมาชิกเดโม" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass="bg-[#16234A]" />;
}
