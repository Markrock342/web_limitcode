"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Boxes, Ship, Warehouse, Users, LineChart, ShieldCheck } from "lucide-react";

const ROLES = [
  "Owner / CEO",
  "General Manager",
  "Sales Manager",
  "Purchasing Manager",
  "Import Officer",
  "Warehouse Manager",
  "Accounting",
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState(ROLES[0]);

  return (
    <div className="flex min-h-screen">
      {/* left — brand */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-[#0A1428] p-10 text-white lg:flex">
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-sky-400 font-display text-sm font-bold">
              LCS
            </span>
            <div>
              <p className="font-display text-lg font-bold tracking-wide">LCS Enterprise ERP</p>
              <p className="text-[11px] tracking-widest text-brand-300">
                IMPORT • DISTRIBUTION • PROCUREMENT • B2B
              </p>
            </div>
          </div>

          <h1 className="mt-14 max-w-md text-3xl font-bold leading-snug">
            ระบบบริหารธุรกิจนำเข้าและจัดจำหน่าย แบบครบวงจร
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
            ตั้งแต่ Sourcing จีน–ไทย, RFQ เปรียบเทียบซัพพลายเออร์, Import Control Tower,
            Landed Cost, คลังสินค้า, Credit Control ไปจนถึงกำไรต่อลูกค้าและต่อ SKU
          </p>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-3 text-[13px]">
            {[
              { icon: Users, label: "B2B CRM + Pipeline" },
              { icon: Ship, label: "Import Control Tower" },
              { icon: Boxes, label: "Landed Cost อัตโนมัติ" },
              { icon: Warehouse, label: "คลังสินค้า + จองสต็อก" },
              { icon: ShieldCheck, label: "Credit Control" },
              { icon: LineChart, label: "Profitability Reports" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3">
                <f.icon size={16} className="text-brand-300" />
                {f.label}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-[11px] text-slate-400">
          ERP Demo by LIMIT CODE STUDIO • www.limitcode.shop • Mark 084-265-2544 • LINE OA @026iaomj
        </p>
      </div>

      {/* right — login */}
      <div className="flex w-full flex-col items-center justify-center bg-[#F4F6FA] p-6 lg:max-w-[480px]">
        <div className="card w-full max-w-sm p-8">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-sky-400 font-display text-xs font-bold text-white">
              LCS
            </span>
            <div>
              <p className="font-display text-base font-bold text-slate-800">LCS Enterprise ERP</p>
              <p className="text-[11px] text-slate-400">Import • Distribution • B2B</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-800">เข้าสู่ระบบ</h2>
          <p className="mt-1 text-[13px] text-slate-500">
            Demo Mode — เลือก Role เพื่อทดลองมุมมองผู้ใช้แต่ละแบบ
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="label">อีเมล</label>
              <input className="input" defaultValue="demo@lcs-erp.example" readOnly />
            </div>
            <div>
              <label className="label">รหัสผ่าน</label>
              <input className="input" type="password" defaultValue="demo1234" readOnly />
            </div>
            <div>
              <label className="label">Role (Demo)</label>
              <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => router.push("/demo/erp/dashboard?tour=1")}
              className="btn-primary w-full !py-2.5"
            >
              เริ่มดู Demo
            </button>
            <button onClick={() => router.push("/demo/erp/portal")} className="btn-outline w-full !py-2.5">
              เข้าสู่ B2B Customer Portal (มุมมองลูกค้า)
            </button>
          </div>

          <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400">
            ERP Demo by LIMIT CODE STUDIO
            <br />
            www.limitcode.shop • LINE OA @026iaomj
          </p>
        </div>
      </div>
    </div>
  );
}
