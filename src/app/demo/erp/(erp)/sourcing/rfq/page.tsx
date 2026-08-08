"use client";

import Link from "next/link";
import { Award } from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { fmtDate, money, num } from "@/components/demos/erp/lib/format";
import { PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

/* RFQ ตัวอย่าง — ผูกกับ Sourcing Project src1 */
const RFQS = [
  { id: "rfq1", number: "RFQ-2026-0048", title: "Custom PET Bottle 500ml (ABC Food)", sentTo: 3, replied: 3, due: "2026-06-12", status: "ปิดแล้ว — เลือก Supplier แล้ว", projectId: "src1" },
  { id: "rfq2", number: "RFQ-2026-0052", title: "Stand-up Pouch พิมพ์ 6 สี (Siam Beverage)", sentTo: 2, replied: 2, due: "2026-08-15", status: "รอเปรียบเทียบ", projectId: "src2" },
  { id: "rfq3", number: "RFQ-2026-0055", title: "ถาด ESD ตามแบบ CAD (Eastern Industrial)", sentTo: 4, replied: 1, due: "2026-08-22", status: "รอใบเสนอราคา", projectId: "src3" },
];

export default function RfqPage() {
  const erp = useErp();
  const project = erp.sourcingProjects.find((p) => p.id === "src1");

  return (
    <div>
      <PageHeader
        title="RFQ — Request for Quotation"
        subtitle="ส่งคำขอใบเสนอราคาไปหลายซัพพลายเออร์ แล้วเปรียบเทียบในหน้าจอเดียว"
        actions={<button className="btn-primary text-xs" onClick={() => erp.toast("Demo: สร้าง RFQ ใหม่", "info")}>+ สร้าง RFQ</button>}
      />

      <div className="card mb-5 overflow-hidden">
        <table className="erp-table">
          <thead>
            <tr>
              <th>RFQ</th><th>รายการ</th><th className="!text-center">ส่งถึง</th><th className="!text-center">ตอบกลับ</th><th>กำหนดตอบ</th><th>สถานะ</th><th></th>
            </tr>
          </thead>
          <tbody>
            {RFQS.map((r) => (
              <tr key={r.id}>
                <td><span className="num font-bold text-brand-600">{r.number}</span></td>
                <td className="font-semibold text-slate-700">{r.title}</td>
                <td className="num !text-center">{r.sentTo} ราย</td>
                <td className="num !text-center">{r.replied} ราย</td>
                <td>{fmtDate(r.due)}</td>
                <td className="text-xs text-slate-500">{r.status}</td>
                <td>
                  <Link href={`/demo/erp/sourcing/projects/${r.projectId}`} className="text-xs font-semibold text-brand-600 hover:underline">
                    เปิดเปรียบเทียบ →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ตัวอย่างตารางเปรียบเทียบของ RFQ-2026-0048 */}
      {project ? (
        <div className="card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-3">
            <p className="text-sm font-bold text-slate-700">
              RFQ-2026-0048 — เปรียบเทียบใบเสนอราคา ({project.title})
            </p>
            <StatusBadge status={project.status} />
          </div>
          <div className="thin-scroll overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th className="!text-center">สกุลเงิน</th>
                  <th className="!text-right">ราคา/หน่วย</th>
                  <th className="!text-right">MOQ</th>
                  <th className="!text-center">Lead Time</th>
                  <th>Payment</th>
                  <th className="!text-right">Freight (THB)</th>
                  <th className="!text-right">Est. Landed/pc</th>
                  <th className="!text-center">Quality</th>
                </tr>
              </thead>
              <tbody>
                {project.options.map((o) => {
                  const s = SUPPLIERS.find((x) => x.id === o.supplierId);
                  return (
                    <tr key={o.supplierId} className={o.recommended ? "!bg-brand-50/60" : ""}>
                      <td>
                        <div className="flex items-center gap-2">
                          {s?.country === "CN" ? "🇨🇳" : "🇹🇭"}
                          <span className="font-semibold text-slate-800">{s?.name}</span>
                          {o.recommended ? (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-100 px-2 py-0.5 text-[9px] font-bold text-brand-700">
                              <Award size={10} /> RECOMMENDED
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="num !text-center">{o.currency}</td>
                      <td className="num !text-right font-semibold">{money(o.unitPrice, o.currency)}</td>
                      <td className="num !text-right">{num(o.moq)}</td>
                      <td className="num !text-center">{o.leadTimeDays + o.productionDays} วัน</td>
                      <td className="text-xs">{o.paymentTerm}</td>
                      <td className="num !text-right">{money(o.shippingCostTHB, "THB", 0)}</td>
                      <td className="num !text-right font-bold text-slate-800">{money(o.landedUnitCostTHB)}</td>
                      <td className="num !text-center">{o.qualityScore}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end border-t border-slate-100 px-5 py-3">
            <Link href="/demo/erp/sourcing/projects/src1" className="btn-primary text-xs">
              ไปหน้าเลือกซัพพลายเออร์ →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
