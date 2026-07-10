"use client";

import { Sparkles } from "lucide-react";
import { useNovaOracle } from "../store";

export function NovaAnalyticsPage() {
  const { state } = useNovaOracle();
  const totalCredits = state.users.reduce((s, u) => s + u.credits, 0);
  const proPlus = state.users.filter((u) => u.plan !== "Free").length;
  const activePersonas = state.personas.filter((p) => p.enabled).length;
  const published = state.articles.filter((a) => a.status === "published").length;
  const drafts = state.articles.filter((a) => a.status === "draft").length;

  const kpis = [
    { k: "ผู้ใช้ทั้งหมด", v: String(state.users.length) },
    { k: "เครดิตรวม", v: String(totalCredits) },
    { k: "แพ็กเกจเสียเงิน", v: String(proPlus) },
    { k: "Persona เปิด", v: String(activePersonas) },
    { k: "บทความเผยแพร่", v: String(published) },
    { k: "Draft ค้าง", v: String(drafts) },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-violet-800">วิเคราะห์</h1>
        <p className="mt-1 text-sm text-slate-600">KPI สรุปจากข้อมูลเดโมในเบราว์เซอร์</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{x.k}</p>
            <p className="mt-2 font-display text-3xl font-bold text-violet-800">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-5">
        <Sparkles className="mt-0.5 size-5 shrink-0 text-violet-600" />
        <div>
          <p className="font-display font-bold text-violet-900">สรุปผลิตภัณฑ์</p>
          <p className="mt-1 text-sm text-violet-800/80">
            ผู้ใช้เสียเงิน {proPlus}/{state.users.length} · Persona เปิด {activePersonas} · เผยแพร่ {published}{" "}
            บทความ · เติมเครดิตและสลับสถานะได้จากเมนูอื่น
          </p>
        </div>
      </div>
    </div>
  );
}
