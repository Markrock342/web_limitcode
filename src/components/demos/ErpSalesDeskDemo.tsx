"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, ChevronRight, Plus } from "lucide-react";

type Stage = {
  label: string;
  deals: number;
  value: string;
  width: string;
};

const stages: Stage[] = [
  { label: "ลีดใหม่", deals: 2, value: "฿725,000", width: "79%" },
  { label: "ติดต่อแล้ว", deals: 1, value: "฿96,000", width: "11%" },
  { label: "เก็บความต้องการ", deals: 1, value: "฿420,000", width: "46%" },
  { label: "จัดหาและเทียบราคา", deals: 1, value: "฿310,000", width: "34%" },
  { label: "เสนอราคา", deals: 2, value: "฿919,750", width: "100%" },
  { label: "เจรจา", deals: 1, value: "฿76,800", width: "8%" },
  { label: "รอรับ PO", deals: 1, value: "฿850,000", width: "92%" },
];

const followUps = [
  { date: "09", customer: "Thai Premium Foods", work: "กล่องอาหาร 1000ml ล็อตประจำไตรมาส", owner: "วิชัย ส.", value: "฿76,800" },
  { date: "10", customer: "Eastern Industrial Products", work: "ถาด ESD ตามแบบ CAD", owner: "ธนกร ล.", value: "฿310,000" },
  { date: "11", customer: "Siam Beverage Packaging", work: "Stand-up Pouch พิมพ์ 6 สี", owner: "อรทัย พ.", value: "฿760,000" },
  { date: "11", customer: "Nature Soap Co.", work: "กล่อง Rigid + ถุงผ้า Custom", owner: "อรทัย พ.", value: "฿185,000" },
  { date: "12", customer: "Bangkok Retail Supply", work: "แก้วกระดาษ + กล่องลูกฟูก Q4", owner: "อรทัย พ.", value: "฿159,750" },
];

const opportunities = [
  { customer: "ABC Food Manufacturing", work: "Custom PET Bottle 500ml", stage: "รอรับ PO", owner: "วิชัย ส.", date: "15 ส.ค. 69", chance: "95%", value: "฿850,000" },
  { customer: "Siam Beverage Packaging", work: "Stand-up Pouch พิมพ์ 6 สี", stage: "เสนอราคา", owner: "อรทัย พ.", date: "11 ส.ค. 69", chance: "70%", value: "฿760,000" },
  { customer: "โรงงานน้ำพริกแม่ศรี", work: "ขวดแก้ว + ฝาล็อค 250ml", stage: "เก็บความต้องการ", owner: "วิชัย ส.", date: "13 ส.ค. 69", chance: "40%", value: "฿420,000" },
  { customer: "Eastern Industrial Products", work: "ถาด ESD ตามแบบ CAD", stage: "จัดหาและเทียบราคา", owner: "ธนกร ล.", date: "10 ส.ค. 69", chance: "55%", value: "฿310,000" },
  { customer: "Bangkok Retail Supply", work: "แก้วกระดาษ + กล่องลูกฟูก Q4", stage: "เสนอราคา", owner: "อรทัย พ.", date: "12 ส.ค. 69", chance: "65%", value: "฿159,750" },
];

const team = [
  { name: "วิชัย ส.", target: "฿3,500,000", actual: "฿3,680,000", progress: "100%" },
  { name: "อรทัย พ.", target: "฿3,000,000", actual: "฿2,940,000", progress: "98%" },
  { name: "ธนกร ล.", target: "฿2,000,000", actual: "฿1,800,000", progress: "90%" },
];

export function ErpSalesDeskDemo() {
  const [range, setRange] = useState("เดือนนี้");
  const rangeLabel = useMemo(() => (range === "เดือนนี้" ? "ส.ค. 2569" : range), [range]);

  return (
    <div className="min-h-[calc(100vh-3rem)] bg-[#f3f5f9] text-slate-800">
      <div className="mx-auto max-w-[1540px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-slate-300 pb-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              <span>ERP</span><span className="h-px w-6 bg-slate-300" /><span>Sales operations</span>
            </div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-slate-950">โต๊ะทำงานฝ่ายขาย</h1>
            <p className="mt-1 text-[13px] text-slate-500">จัดลำดับดีลและงานติดตาม · {rangeLabel}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="ช่วงเวลารายงาน"
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="h-9 border border-slate-300 bg-transparent px-3 text-xs font-semibold text-slate-600 outline-none focus:border-slate-700"
            >
              <option>เดือนนี้</option><option>ไตรมาสนี้</option><option>ปีนี้</option>
            </select>
            <button type="button" className="h-9 px-3 text-xs font-semibold text-slate-500 hover:text-slate-950">แนะนำระบบ</button>
            <button type="button" className="inline-flex h-9 items-center gap-2 bg-slate-950 px-4 text-xs font-semibold text-slate-50 transition-colors hover:bg-slate-800">
              <Plus className="size-3.5" /> สร้างลูกค้า
            </button>
          </div>
        </header>

        <section aria-label="ตัวเลขสำคัญ" className="grid grid-cols-2 border-b border-slate-300 xl:grid-cols-4">
          {[
            ["Pipeline ที่เปิดอยู่", "฿3,397,550", "9 โอกาสการขาย"],
            ["Weighted forecast", "฿2,007,828", "คำนวณตามความน่าจะเป็น"],
            ["ต้องติดตามใน 3 วัน", "04", "จาก 5 รายการถัดไป"],
            ["Win rate", "50%", "2 ดีลที่ปิดผลแล้ว"],
          ].map(([label, value, detail], index) => (
            <div key={label} className={`px-3 py-4 sm:px-5 sm:py-5 ${index % 2 ? "border-l border-slate-200" : ""} ${index > 1 ? "border-t border-slate-200 xl:border-t-0" : ""} ${index ? "xl:border-l xl:border-slate-200" : ""}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p>
              <p className="mt-2 font-display text-[27px] font-bold leading-none tracking-[-0.02em] text-slate-950 tabular-nums">{value}</p>
              <p className="mt-2 text-[11px] text-slate-400">{detail}</p>
            </div>
          ))}
        </section>

        <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
          <section className="border border-slate-200 bg-white/70">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <div><p className="text-[15px] font-semibold text-slate-900">จังหวะของ Pipeline</p><p className="mt-0.5 text-[11px] text-slate-400">มูลค่าเปิดอยู่ในแต่ละขั้น ไม่รวม Won / Lost</p></div>
              <button type="button" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950">เปิด Pipeline <ArrowUpRight className="size-3.5" /></button>
            </div>
            <div className="divide-y divide-slate-100 px-5">
              {stages.map((stage, index) => (
                <div key={stage.label} className="grid grid-cols-[24px_minmax(105px,1fr)_minmax(80px,1.3fr)] items-center gap-2 py-3 sm:grid-cols-[28px_minmax(125px,0.8fr)_minmax(130px,1.8fr)_84px] sm:gap-3">
                  <span className="font-display text-[13px] font-semibold text-slate-300">{String(index + 1).padStart(2, "0")}</span>
                  <div><p className="text-xs font-semibold text-slate-700">{stage.label}</p><p className="mt-0.5 text-[10px] text-slate-400">{stage.deals} ดีล</p></div>
                  <div className="h-1.5 bg-slate-100"><div className="h-full bg-slate-700" style={{ width: stage.width }} /></div>
                  <span className="hidden text-right font-display text-[13px] font-semibold text-slate-700 sm:block">{stage.value}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-3">
              <Metric label="Actual revenue" value="฿8,420,000" />
              <Metric label="Monthly target" value="฿9,000,000" />
              <div className="bg-slate-900 px-5 py-4 text-slate-50"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Gap to target</p><p className="mt-1 font-display text-xl font-bold">฿580,000</p></div>
            </div>
          </section>

          <aside className="border-t-2 border-slate-900 bg-white px-5 pb-2">
            <div className="flex items-center justify-between border-b border-slate-200 py-4"><div><p className="text-[15px] font-semibold text-slate-900">คิวติดตาม</p><p className="mt-0.5 text-[11px] text-slate-400">เรียงตามวันที่นัดหมาย</p></div><CalendarDays className="size-4 text-slate-400" /></div>
            <div className="divide-y divide-slate-100">
              {followUps.map((item, index) => (
                <div key={item.customer} className="flex gap-4 py-4">
                  <div className="flex w-12 shrink-0 flex-col border-r border-slate-200 pr-3 text-center"><span className={`font-display text-[24px] font-bold leading-none ${index < 2 ? "text-rose-700" : "text-slate-800"}`}>{item.date}</span><span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">ส.ค.</span></div>
                  <div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold text-slate-900">{item.customer}</p><p className="mt-0.5 truncate text-[11px] text-slate-500">{item.work}</p><div className="mt-2 flex items-center justify-between gap-3 text-[10px]"><span className="text-slate-400">{item.owner}</span><span className="font-display text-xs font-semibold text-slate-600">{item.value}</span></div></div>
                </div>
              ))}
            </div>
            <button type="button" className="flex w-full items-center justify-between border-t border-slate-200 py-3 text-xs font-semibold text-slate-600 hover:text-slate-950">ดูงานติดตามทั้งหมด <ChevronRight className="size-3.5" /></button>
          </aside>
        </div>

        <section className="mt-6 overflow-hidden border border-slate-200 bg-white">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 px-5 py-4"><div><p className="text-[15px] font-semibold text-slate-900">ดีลที่มีผลต่อ Forecast</p><p className="mt-0.5 text-[11px] text-slate-400">เรียงจากมูลค่าถ่วงน้ำหนักสูงสุด</p></div><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Live pipeline · {rangeLabel}</span></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[780px] border-collapse text-left"><thead><tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400"><th className="px-5 py-3">ลูกค้า / งาน</th><th className="px-4 py-3">ขั้นตอน</th><th className="px-4 py-3">เจ้าของ</th><th className="px-4 py-3">ติดตาม</th><th className="px-4 py-3 text-right">โอกาส</th><th className="px-5 py-3 text-right">มูลค่า</th></tr></thead><tbody className="divide-y divide-slate-100">{opportunities.map((item) => <tr key={item.customer} className="transition-colors hover:bg-slate-50"><td className="px-5 py-3.5"><p className="text-[12px] font-semibold text-slate-900">{item.customer}</p><p className="mt-0.5 max-w-[330px] truncate text-[11px] text-slate-400">{item.work}</p></td><td className="px-4 py-3.5 text-[11px] font-medium text-slate-600">{item.stage}</td><td className="px-4 py-3.5 text-[11px] text-slate-500">{item.owner}</td><td className="px-4 py-3.5 text-[11px] text-slate-500">{item.date}</td><td className="px-4 py-3.5 text-right font-display text-xs font-semibold text-slate-700">{item.chance}</td><td className="px-5 py-3.5 text-right font-display text-[13px] font-semibold text-slate-900">{item.value}</td></tr>)}</tbody></table></div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-t-2 border-slate-900 bg-white px-5 pb-3"><div className="flex items-center justify-between border-b border-slate-200 py-4"><div><p className="text-[15px] font-semibold text-slate-900">ผลงานทีมขาย</p><p className="mt-0.5 text-[11px] text-slate-400">ยอดเดือนนี้เทียบเป้ารายบุคคล</p></div><button type="button" className="text-xs font-semibold text-slate-500 hover:text-slate-950">รายงานเต็ม →</button></div><div className="divide-y divide-slate-100">{team.map((person) => <div key={person.name} className="grid grid-cols-[88px_minmax(70px,1fr)_64px] items-center gap-3 py-3.5 sm:grid-cols-[110px_minmax(120px,1fr)_78px] sm:gap-4"><div><p className="text-[12px] font-semibold text-slate-800">{person.name}</p><p className="mt-0.5 font-display text-[11px] text-slate-400">เป้า {person.target}</p></div><div className="h-1.5 bg-slate-100"><div className="h-full bg-slate-800" style={{ width: person.progress }} /></div><div className="text-right"><p className="font-display text-[13px] font-semibold text-slate-800">{person.actual}</p><p className="font-display text-[11px] text-slate-400">{person.progress}</p></div></div>)}</div></div>
          <div className="border border-slate-200 bg-slate-50 px-5"><div className="border-b border-slate-200 py-4"><p className="text-[15px] font-semibold text-slate-900">งานส่งต่อหลังการขาย</p><p className="mt-0.5 text-[11px] text-slate-400">จุดที่ฝ่ายขายควรประสานทีมอื่น</p></div>{[["Sales Order ที่ยังเปิด", "06"], ["Shipment ที่กำลังเดินทาง", "03"], ["Invoice เกินกำหนด", "01"]].map(([label, value]) => <button key={label} type="button" className="group flex w-full items-center justify-between border-b border-slate-200 py-4 text-left last:border-0"><span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-950">{label}</span><span className="flex items-center gap-3"><span className="font-display text-xl font-bold text-slate-900">{value}</span><ChevronRight className="size-3.5 text-slate-300 group-hover:text-slate-700" /></span></button>)}</div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="bg-slate-50 px-5 py-4"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p><p className="mt-1 font-display text-xl font-bold text-slate-900">{value}</p></div>;
}
