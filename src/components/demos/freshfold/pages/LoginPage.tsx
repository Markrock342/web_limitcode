"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useFreshFold } from "../store";

export function FreshLoginPage() {
  const { state, setState } = useFreshFold();
  return <DemoLoginPage brandName="FreshFold Laundry" subtitle="เข้าสู่ระบบเพื่อติดตามงานซัก หรือจัดการหลังบ้านร้าน" basePath={BASE} session={state.session} onSession={(session) => setState((s) => ({ ...s, session }))} accentClass="bg-[#2C5F4F]" />;
}
