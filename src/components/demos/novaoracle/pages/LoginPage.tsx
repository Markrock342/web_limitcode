"use client";

import { DemoLoginPage } from "@/components/demos/_shell/DemoLoginPage";
import { BASE, useNovaOracle } from "../store";

export function NovaLoginPage() {
  const { state, setState } = useNovaOracle();
  return (
    <DemoLoginPage
      brandName="NovaOracle AI"
      subtitle="เข้าสู่ระบบเพื่อเปิด CMS และ workspace เครดิต"
      basePath={BASE}
      session={state.session}
      onSession={(session) => setState((current) => ({ ...current, session }))}
      accentClass="bg-violet-700"
    />
  );
}
