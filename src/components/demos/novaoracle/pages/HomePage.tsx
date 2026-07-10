"use client";

import Link from "next/link";
import { BASE, useNovaOracle } from "../store";

export function NovaHomePage() {
  const { state } = useNovaOracle();
  const totalCredits = state.users.reduce((s, u) => s + u.credits, 0);
  const activePersonas = state.personas.filter((p) => p.enabled).length;
  const published = state.articles.filter((a) => a.status === "published").length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-900">
        ม็อกอัพหลายหน้า — เติมเครดิต เปิด/ปิด Persona เผยแพร่บทความ และดู KPI ข้อมูลเก็บในเบราว์เซอร์
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-violet-800">ยินดีต้อนรับสู่ NovaOracle AI</h1>
        <p className="mt-1 text-slate-600">แอดมินผลิตภัณฑ์ AI · ผู้ใช้ แพ็กเกจ Persona และ CMS</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { k: "ผู้ใช้", v: String(state.users.length) },
          { k: "เครดิตรวม", v: String(totalCredits) },
          { k: "Persona เปิด", v: String(activePersonas) },
          { k: "เผยแพร่แล้ว", v: String(published) },
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{x.k}</p>
            <p className="mt-1 font-display text-2xl font-bold text-violet-800">{x.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`${BASE}/users`}
          className="rounded-2xl bg-violet-700 p-5 text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">จัดการผู้ใช้</p>
          <p className="mt-1 text-sm text-white/80">เติมเครดิตและดูแพ็กเกจ</p>
        </Link>
        <Link
          href={`${BASE}/content`}
          className="rounded-2xl border border-violet-200 bg-violet-50 p-5 text-violet-800 shadow-sm transition hover:-translate-y-0.5"
        >
          <p className="font-display text-lg font-bold">เปิด CMS</p>
          <p className="mt-1 text-sm text-violet-700/80">สร้าง Draft และเผยแพร่</p>
        </Link>
      </div>
    </div>
  );
}
