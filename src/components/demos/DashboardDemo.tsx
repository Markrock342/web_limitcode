"use client";

import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";
import logo from "../../../public/brand/lcs-logo.png";

const KPIS = [
  { label: "ยอดขายวันนี้", value: "฿256,780", delta: "+16.5%", sub: "จากเมื่อวาน", up: true },
  { label: "ออเดอร์วันนี้", value: "124", delta: "+12.3%", sub: "จากเมื่อวาน", up: true },
  { label: "ลูกค้าใหม่", value: "36", delta: "+8.6%", sub: "จากเมื่อวาน", up: true },
  { label: "รายได้รวม (เดือนนี้)", value: "฿1,245,680", delta: "+22.7%", sub: "จากเดือนที่แล้ว", up: true },
];

// 30-day series (in thousands)
const SERIES = [
  120, 150, 138, 170, 160, 200, 185, 168, 210, 230, 215, 250, 240, 268, 255, 280, 300, 285, 270, 305,
  320, 300, 335, 350, 330, 360, 345, 380, 365, 400,
];

const SHARE = [
  { n: "สินค้า A", v: 45, c: "#1479ef" },
  { n: "สินค้า B", v: 25, c: "#36c4ff" },
  { n: "สินค้า C", v: 20, c: "#6ee7ff" },
  { n: "อื่น ๆ", v: 10, c: "#1f3a6b" },
];

type Status = "รอดำเนินการ" | "กำลังจัดส่ง" | "จัดส่งแล้ว" | "ยกเลิก";
const ORDERS: { id: string; name: string; total: string; status: Status }[] = [
  { id: "#OD-250503", name: "คุณวรรัญญา ภ..", total: "฿2,450", status: "รอดำเนินการ" },
  { id: "#OD-250502", name: "บริษัท สยาม จำกัด", total: "฿18,900", status: "กำลังจัดส่ง" },
  { id: "#OD-250501", name: "คุณธนวัฒน์ ว.", total: "฿6,780", status: "จัดส่งแล้ว" },
  { id: "#OD-250500", name: "คุณกานต์พงศ์ ส.", total: "฿1,120", status: "ยกเลิก" },
];
const STATUS_STYLE: Record<Status, string> = {
  รอดำเนินการ: "bg-amber-400/15 text-amber-300 ring-amber-400/30",
  กำลังจัดส่ง: "bg-sky-400/15 text-sky-300 ring-sky-400/30",
  จัดส่งแล้ว: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30",
  ยกเลิก: "bg-rose-400/15 text-rose-300 ring-rose-400/30",
};

const BEST = [
  { n: "สินค้า A", q: "1,250 ชิ้น", w: 100 },
  { n: "สินค้า B", q: "850 ชิ้น", w: 68 },
  { n: "สินค้า C", q: "620 ชิ้น", w: 50 },
  { n: "สินค้า D", q: "410 ชิ้น", w: 33 },
];

const NAV = [
  { i: "M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z", label: "Dashboard" },
  { i: "M3 6h18M3 12h18M3 18h18", label: "ออเดอร์" },
  { i: "M16 14a4 4 0 1 0-8 0M12 7a3 3 0 1 0 0-2", label: "ลูกค้า" },
  { i: "M4 7l8-4 8 4-8 4-8-4Zm0 5l8 4 8-4", label: "สินค้า" },
  { i: "M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-3", label: "รายงาน" },
  { i: "M12 2v20M5 7h9a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h10", label: "การเงิน" },
  { i: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 1-.1 1l2 1.6-2 3.4-2.3-.9a8 8 0 0 1-1.7 1l-.4 2.4H10l-.4-2.4a8 8 0 0 1-1.7-1l-2.3.9-2-3.4 2-1.6a8 8 0 0 1 0-2l-2-1.6 2-3.4 2.3.9a8 8 0 0 1 1.7-1L10 2h4l.4 2.4a8 8 0 0 1 1.7 1l2.3-.9 2 3.4-2 1.6a8 8 0 0 1 .1 1Z", label: "ตั้งค่า" },
];

function buildPath(data: number[], w: number, h: number, max: number) {
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - (v / max) * h]);
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return { line, area };
}

export function DashboardDemo() {
  const [active, setActive] = useState("Dashboard");
  const { line, area } = buildPath(SERIES, 600, 200, 420);

  return (
    <div className="flex min-h-[88vh] bg-[#070d1f] font-sans text-slate-200">
      {/* sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-white/5 bg-[#0a1430] p-4 lg:flex">
        <div className="flex items-center gap-2.5 px-1 py-2">
          <span className="relative inline-flex size-9 overflow-hidden rounded-full ring-1 ring-brand-400/40">
            <Image src={logo} alt="LCS" fill sizes="36px" className="object-cover" />
          </span>
          <span className="font-display text-base font-bold text-white">LIMIT CODE</span>
        </div>
        <nav className="mt-6 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.label}
              onClick={() => setActive(n.label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active === n.label
                  ? "bg-brand-500/15 text-brand-200 ring-1 ring-brand-400/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <path d={n.i} />
              </svg>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-brand-400/20 bg-brand-500/10 p-3 text-xs text-slate-300">
          <p className="font-semibold text-white">แพ็กเกจ Business</p>
          <p className="mt-1 text-slate-400">ใช้งานเต็มรูปแบบ</p>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 overflow-hidden">
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-display text-lg font-bold text-white">ภาพรวมธุรกิจ</h1>
            <p className="text-xs text-slate-500">อัปเดตล่าสุดเมื่อสักครู่ · วันนี้ยอดขายเติบโตดี</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 sm:inline-flex"><Search className="size-3.5" /> ค้นหา…</span>
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-sky-500 text-sm font-bold text-white">LC</span>
          </div>
        </header>

        <div className="space-y-5 p-4 sm:p-6">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <p className="text-sm text-slate-400">{k.label}</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">{k.value}</p>
                <p className="mt-1 text-xs font-semibold text-emerald-400">
                  ▲ {k.delta} <span className="font-normal text-slate-500">{k.sub}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {/* line chart */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 xl:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-white">ยอดขายรวม</h2>
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">30 วัน ▾</span>
              </div>
              <div className="mt-5">
                <svg viewBox="0 0 600 200" className="h-48 w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1479ef" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#1479ef" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.05" />
                  ))}
                  <path d={area} fill="url(#area)" />
                  <path d={line} fill="none" stroke="#36c4ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                </svg>
                <div className="mt-1 flex justify-between text-[11px] text-slate-500">
                  <span>0</span><span>10</span><span>20</span><span>30 วัน</span>
                </div>
              </div>
            </div>

            {/* donut */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="font-display font-bold text-white">สัดส่วนยอดขาย</h2>
              <div className="mt-4 flex items-center gap-5">
                <div
                  className="relative size-28 shrink-0 rounded-full"
                  style={{
                    background: `conic-gradient(#1479ef 0 45%, #36c4ff 45% 70%, #6ee7ff 70% 90%, #1f3a6b 90% 100%)`,
                  }}
                >
                  <div className="absolute inset-[22%] grid place-items-center rounded-full bg-[#0a1430] text-center">
                    <span className="font-display text-lg font-bold text-white">45%</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-2 text-sm">
                  {SHARE.map((s) => (
                    <li key={s.n} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-300">
                        <span className="size-2.5 rounded-full" style={{ background: s.c }} />
                        {s.n}
                      </span>
                      <span className="font-semibold text-white">{s.v}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {/* orders */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] xl:col-span-2">
              <div className="flex items-center justify-between border-b border-white/5 p-5">
                <h2 className="font-display font-bold text-white">ออเดอร์ล่าสุด</h2>
                <button className="rounded-lg bg-brand-500 px-3.5 py-2 text-xs font-semibold text-white hover:bg-brand-600">+ เพิ่มออเดอร์</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase text-slate-500">
                    <tr className="border-b border-white/5">
                      <th className="px-5 py-3 font-medium">#ID</th>
                      <th className="px-5 py-3 font-medium">ลูกค้า</th>
                      <th className="px-5 py-3 font-medium">ยอดรวม</th>
                      <th className="px-5 py-3 font-medium">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o) => (
                      <tr key={o.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                        <td className="px-5 py-3 font-mono text-slate-400">{o.id}</td>
                        <td className="px-5 py-3 font-medium text-slate-200">{o.name}</td>
                        <td className="px-5 py-3 font-semibold text-white">{o.total}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_STYLE[o.status]}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* best sellers */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="font-display font-bold text-white">สินค้าขายดี</h2>
              <ul className="mt-4 space-y-4">
                {BEST.map((b) => (
                  <li key={b.n}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-300">
                        <span className="grid size-7 place-items-center rounded-lg bg-brand-500/15 text-xs font-bold text-brand-200">
                          {b.n.slice(-1)}
                        </span>
                        {b.n}
                      </span>
                      <span className="font-semibold text-white">{b.q}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400" style={{ width: `${b.w}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
