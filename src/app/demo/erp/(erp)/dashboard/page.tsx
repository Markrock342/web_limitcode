"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Plus,
} from "lucide-react";
import type { Opportunity, PipelineStage } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate, TODAY } from "@/components/demos/erp/lib/format";
import { Modal } from "@/components/demos/erp/components/erp/ui";
import { SALES_BY_SALESPERSON } from "@/components/demos/erp/data/ops";

const TOUR_STEPS = [
  { title: "CRM Overview", desc: "ดู Pipeline แบบถ่วงน้ำหนัก งานติดตาม และดีลที่ต้องตัดสินใจจากหน้าเดียว", href: "/demo/erp/dashboard" },
  { title: "B2B CRM", desc: "จัดการโอกาสการขายตั้งแต่ Lead จนถึง Customer PO และเลื่อนขั้นของแต่ละดีล", href: "/demo/erp/crm/pipeline" },
  { title: "Customer 360", desc: "ดูเครดิต เอกสาร กิจกรรม และกำไรของลูกค้าแต่ละราย", href: "/demo/erp/crm/customers" },
  { title: "Sourcing", desc: "เปิด RFQ และเทียบซัพพลายเออร์จีน–ไทยพร้อม Landed Cost", href: "/demo/erp/sourcing/projects/src1" },
  { title: "Sales Documents", desc: "เปลี่ยนโอกาสเป็น Quotation และ Sales Order โดยข้อมูลเชื่อมกันทั้งสาย", href: "/demo/erp/sales/quotations" },
  { title: "Import Control", desc: "ติดตามสินค้าที่ผูกกับดีลจนถึงกำหนดส่งให้ลูกค้า", href: "/demo/erp/import" },
];

const PIPELINE_STAGES: PipelineStage[] = [
  "New Lead",
  "Contacted",
  "Requirement",
  "Sourcing",
  "Quotation",
  "Negotiation",
  "Customer PO",
];

const STAGE_LABEL: Record<PipelineStage, string> = {
  "New Lead": "ลีดใหม่",
  Contacted: "ติดต่อแล้ว",
  Requirement: "เก็บความต้องการ",
  Sourcing: "จัดหาและเทียบราคา",
  Quotation: "เสนอราคา",
  Negotiation: "เจรจา",
  "Customer PO": "รอรับ PO",
  Won: "ปิดการขาย",
  Lost: "ไม่สำเร็จ",
};

function daysFromToday(iso: string) {
  return Math.round((new Date(`${iso}T00:00:00`).getTime() - new Date(`${TODAY}T00:00:00`).getTime()) / 86_400_000);
}

function FollowUpDate({ opportunity }: { opportunity: Opportunity }) {
  const days = daysFromToday(opportunity.nextFollowUp);
  const urgent = days <= 2;

  return (
    <div className="flex w-12 shrink-0 flex-col border-r border-slate-200 pr-3 text-center">
      <span className={`font-display text-[24px] font-semibold leading-none ${urgent ? "text-rose-700" : "text-slate-800"}`}>
        {opportunity.nextFollowUp.slice(-2)}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">ส.ค.</span>
    </div>
  );
}

export default function DashboardPage() {
  const erp = useErp();
  const [tour, setTour] = useState<number | null>(null);
  const [range, setRange] = useState("เดือนนี้");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("tour=1")) {
      setTour(0);
      window.history.replaceState(null, "", "/demo/erp/dashboard");
    }
  }, []);

  const cur = erp.currency;
  const m = (thb: number) => displayMoney(thb, cur);
  const openOpportunities = erp.opportunities.filter((item) => !["Won", "Lost"].includes(item.stage));
  const pipelineValue = openOpportunities.reduce((sum, item) => sum + item.value, 0);
  const weightedForecast = openOpportunities.reduce((sum, item) => sum + item.value * item.probability / 100, 0);
  const followUps = useMemo(
    () => erp.opportunities
      .filter((item) => item.nextFollowUp !== "-" && item.nextFollowUp >= TODAY)
      .slice()
      .sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp))
      .slice(0, 5),
    [erp.opportunities],
  );
  const priorityDeals = useMemo(
    () => openOpportunities.slice().sort((a, b) => (b.value * b.probability) - (a.value * a.probability)).slice(0, 6),
    [erp.opportunities],
  );
  const urgentFollowUps = followUps.filter((item) => daysFromToday(item.nextFollowUp) <= 3).length;
  const closed = erp.opportunities.filter((item) => ["Won", "Lost"].includes(item.stage));
  const winRate = closed.length ? Math.round(erp.opportunities.filter((item) => item.stage === "Won").length / closed.length * 100) : 0;
  const pipelineMax = Math.max(...PIPELINE_STAGES.map((stage) => openOpportunities
    .filter((item) => item.stage === stage)
    .reduce((sum, item) => sum + item.value, 0)), 1);

  return (
    <div className="mx-auto max-w-[1540px] pb-10">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-slate-300 pb-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <span>CRM</span>
            <span className="h-px w-6 bg-slate-300" />
            <span>Sales operations</span>
          </div>
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-slate-950">โต๊ะทำงานฝ่ายขาย</h1>
          <p className="mt-1 text-[13px] text-slate-500">ภาพรวมเพื่อจัดลำดับดีลและงานติดตาม · 8 สิงหาคม 2026</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="ช่วงเวลารายงาน"
            className="h-9 border border-slate-300 bg-transparent px-3 text-xs font-semibold text-slate-600 outline-none transition-colors focus:border-slate-700"
            value={range}
            onChange={(event) => setRange(event.target.value)}
          >
            <option>เดือนนี้</option>
            <option>ไตรมาสนี้</option>
            <option>ปีนี้</option>
          </select>
          <button onClick={() => setTour(0)} className="h-9 px-3 text-xs font-semibold text-slate-500 hover:text-slate-950">
            แนะนำระบบ
          </button>
          <Link href="/demo/erp/crm/customers?new=1" className="inline-flex h-9 items-center gap-2 bg-slate-950 px-4 text-xs font-semibold text-slate-50 transition-colors hover:bg-slate-800">
            <Plus size={14} /> สร้างลูกค้า
          </Link>
        </div>
      </header>

      <section aria-label="ตัวเลขสำคัญ" className="grid grid-cols-2 border-b border-slate-300 xl:grid-cols-4">
        {[
          { label: "Pipeline ที่เปิดอยู่", value: m(pipelineValue), detail: `${openOpportunities.length} โอกาสการขาย` },
          { label: "Weighted forecast", value: m(weightedForecast), detail: "คำนวณตามความน่าจะเป็น" },
          { label: "ต้องติดตามใน 3 วัน", value: String(urgentFollowUps).padStart(2, "0"), detail: `จาก ${followUps.length} รายการถัดไป` },
          { label: "Win rate", value: `${winRate}%`, detail: `${closed.length} ดีลที่ปิดผลแล้ว` },
        ].map((metric, index) => (
          <div
            key={metric.label}
            className={`px-3 py-4 sm:px-5 sm:py-5 ${index % 2 === 1 ? "border-l border-slate-200" : ""} ${index > 1 ? "border-t border-slate-200 xl:border-t-0" : ""} ${index > 0 ? "xl:border-l xl:border-slate-200" : ""}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">{metric.label}</p>
            <p className="num mt-2 text-[25px] font-semibold leading-none tracking-[-0.02em] text-slate-950">{metric.value}</p>
            <p className="mt-2 text-[11px] text-slate-400">{metric.detail}</p>
          </div>
        ))}
      </section>

      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
        <section className="border border-slate-200 bg-[rgba(255,255,255,0.72)]">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-[15px] font-semibold text-slate-900">จังหวะของ Pipeline</p>
              <p className="mt-0.5 text-[11px] text-slate-400">มูลค่าเปิดอยู่ในแต่ละขั้น ไม่รวม Won / Lost</p>
            </div>
            <Link href="/demo/erp/crm/pipeline" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950">
              เปิด Pipeline <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 px-5">
            {PIPELINE_STAGES.map((stage, index) => {
              const deals = openOpportunities.filter((item) => item.stage === stage);
              const value = deals.reduce((sum, item) => sum + item.value, 0);
              return (
                <div key={stage} className="grid grid-cols-[24px_minmax(105px,1fr)_minmax(80px,1.3fr)] items-center gap-2 py-3 sm:grid-cols-[28px_minmax(125px,0.8fr)_minmax(130px,1.8fr)_84px] sm:gap-3">
                  <span className="font-display text-[13px] font-semibold text-slate-300">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{STAGE_LABEL[stage]}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">{deals.length} ดีล</p>
                  </div>
                  <div className="h-1.5 bg-slate-100">
                    <div className="h-full bg-slate-700" style={{ width: `${value === 0 ? 0 : Math.max(8, value / pipelineMax * 100)}%` }} />
                  </div>
                  <span className="num hidden text-right text-[12px] font-semibold text-slate-700 sm:block">{m(value)}</span>
                </div>
              );
            })}
          </div>
          <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-3">
            <div className="bg-slate-50 px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Actual revenue</p>
              <p className="num mt-1 text-lg font-semibold text-slate-900">{m(8_420_000)}</p>
            </div>
            <div className="bg-slate-50 px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Monthly target</p>
              <p className="num mt-1 text-lg font-semibold text-slate-900">{m(9_000_000)}</p>
            </div>
            <div className="bg-slate-900 px-5 py-4 text-slate-50">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Gap to target</p>
              <p className="num mt-1 text-lg font-semibold">{m(580_000)}</p>
            </div>
          </div>
        </section>

        <aside className="border-t-2 border-slate-900 bg-white px-5 pb-2">
          <div className="flex items-center justify-between border-b border-slate-200 py-4">
            <div>
              <p className="text-[15px] font-semibold text-slate-900">คิวติดตาม</p>
              <p className="mt-0.5 text-[11px] text-slate-400">เรียงตามวันที่นัดหมาย</p>
            </div>
            <CalendarDays size={17} className="text-slate-400" />
          </div>
          <div className="divide-y divide-slate-100">
            {followUps.map((item) => (
              <div key={item.id} className="flex gap-4 py-4">
                <FollowUpDate opportunity={item} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-slate-900">{item.customerName}</p>
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500">{item.title}</p>
                  <div className="mt-2 flex items-center justify-between gap-3 text-[10px]">
                    <span className="text-slate-400">{item.salesperson}</span>
                    <span className="num font-semibold text-slate-600">{m(item.value)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/demo/erp/crm/pipeline" className="flex items-center justify-between border-t border-slate-200 py-3 text-xs font-semibold text-slate-600 hover:text-slate-950">
            ดูงานติดตามทั้งหมด <ChevronRight size={14} />
          </Link>
        </aside>
      </div>

      <section className="mt-6 overflow-hidden border border-slate-200 bg-white">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-[15px] font-semibold text-slate-900">ดีลที่มีผลต่อ Forecast</p>
            <p className="mt-0.5 text-[11px] text-slate-400">เรียงจากมูลค่าถ่วงน้ำหนักสูงสุด</p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Live pipeline · {range}</span>
        </div>
        <div className="thin-scroll overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                <th className="px-5 py-3">ลูกค้า / งาน</th>
                <th className="px-4 py-3">ขั้นตอน</th>
                <th className="px-4 py-3">เจ้าของ</th>
                <th className="px-4 py-3">ติดตาม</th>
                <th className="px-4 py-3 text-right">โอกาส</th>
                <th className="px-5 py-3 text-right">มูลค่า</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priorityDeals.map((item) => (
                <tr key={item.id} className="group transition-colors hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    {item.customerId ? (
                      <Link href={`/demo/erp/crm/customers/${item.customerId}`} className="text-[12px] font-semibold text-slate-900 group-hover:text-brand-700">
                        {item.customerName}
                      </Link>
                    ) : <p className="text-[12px] font-semibold text-slate-900">{item.customerName}</p>}
                    <p className="mt-0.5 max-w-[330px] truncate text-[11px] text-slate-400">{item.title}</p>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] font-medium text-slate-600">{STAGE_LABEL[item.stage]}</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">{item.salesperson}</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">{fmtDate(item.nextFollowUp)}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="num text-[11px] font-semibold text-slate-700">{item.probability}%</span>
                  </td>
                  <td className="num px-5 py-3.5 text-right text-[12px] font-semibold text-slate-900">{m(item.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border-t-2 border-slate-900 bg-white px-5 pb-3">
          <div className="flex items-center justify-between border-b border-slate-200 py-4">
            <div>
              <p className="text-[15px] font-semibold text-slate-900">ผลงานทีมขาย</p>
              <p className="mt-0.5 text-[11px] text-slate-400">ยอดเดือนนี้เทียบเป้ารายบุคคล</p>
            </div>
            <Link href="/demo/erp/reports" className="text-xs font-semibold text-slate-500 hover:text-slate-950">รายงานเต็ม →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {SALES_BY_SALESPERSON.map((person) => {
              const progress = Math.min(100, person.value / person.target * 100);
              return (
                <div key={person.name} className="grid grid-cols-[88px_minmax(70px,1fr)_64px] items-center gap-3 py-3.5 sm:grid-cols-[110px_minmax(120px,1fr)_78px] sm:gap-4">
                  <div>
                    <p className="text-[12px] font-semibold text-slate-800">{person.name}</p>
                    <p className="num mt-0.5 text-[10px] text-slate-400">เป้า {m(person.target)}</p>
                  </div>
                  <div className="h-1.5 bg-slate-100">
                    <div className="h-full bg-slate-800" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-right">
                    <p className="num text-[12px] font-semibold text-slate-800">{m(person.value)}</p>
                    <p className="num text-[10px] text-slate-400">{progress.toFixed(0)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-slate-200 bg-slate-50 px-5">
          <div className="border-b border-slate-200 py-4">
            <p className="text-[15px] font-semibold text-slate-900">งานส่งต่อหลังการขาย</p>
            <p className="mt-0.5 text-[11px] text-slate-400">จุดที่ฝ่ายขายควรประสานทีมอื่น</p>
          </div>
          <div className="divide-y divide-slate-200">
            {[
              { label: "Sales Order ที่ยังเปิด", value: erp.salesOrders.filter((item) => !["Paid", "Delivered", "Invoiced"].includes(item.status)).length, href: "/demo/erp/sales/orders" },
              { label: "Shipment ที่กำลังเดินทาง", value: erp.shipments.filter((item) => !item.received).length, href: "/demo/erp/import" },
              { label: "Invoice เกินกำหนด", value: erp.arInvoices.filter((item) => item.status === "Overdue").length, href: "/demo/erp/finance/ar" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="group flex items-center justify-between py-4">
                <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-950">{item.label}</span>
                <span className="flex items-center gap-3">
                  <span className="font-display text-xl font-semibold text-slate-900">{String(item.value).padStart(2, "0")}</span>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-700" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Modal open={tour !== null} onClose={() => setTour(null)} title={`Demo Walkthrough — ${tour !== null ? tour + 1 : 1}/${TOUR_STEPS.length}`}>
        {tour !== null ? (
          <div>
            <div className="mb-4 flex gap-1">
              {TOUR_STEPS.map((_, index) => (
                <span key={index} className={`h-1 flex-1 ${index <= tour ? "bg-slate-900" : "bg-slate-200"}`} />
              ))}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{tour + 1}. {TOUR_STEPS[tour].title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{TOUR_STEPS[tour].desc}</p>
            <div className="mt-6 flex items-center justify-between">
              <button className="btn-ghost text-xs" onClick={() => setTour(null)}>ข้าม</button>
              <div className="flex gap-2">
                {tour > 0 ? <button className="btn-outline text-xs" onClick={() => setTour(tour - 1)}>ก่อนหน้า</button> : null}
                <Link href={TOUR_STEPS[tour].href} className="btn-outline text-xs" onClick={() => setTour(null)}>ไปที่หน้านี้</Link>
                {tour < TOUR_STEPS.length - 1 ? (
                  <button className="btn-primary text-xs" onClick={() => setTour(tour + 1)}>ถัดไป <ArrowRight size={13} /></button>
                ) : (
                  <button className="btn-primary text-xs" onClick={() => setTour(null)}>เริ่มใช้งาน</button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
