"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Award, FileText, Star } from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate, money, num } from "@/components/demos/erp/lib/format";
import { DocFlow, FieldRow, PageHeader, StatusBadge, type DocFlowNode } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

export default function SourcingProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const erp = useErp();
  const p = erp.sourcingProjects.find((x) => x.id === id);
  if (!p) return <p className="text-sm text-slate-500">ไม่พบโปรเจกต์ Sourcing</p>;

  const customer = erp.customers.find((c) => c.id === p.customerId);
  const quotation = p.quotationId ? erp.quotations.find((q) => q.id === p.quotationId) : undefined;
  const so = quotation?.soId ? erp.salesOrders.find((s) => s.id === quotation.soId) : undefined;
  const po = erp.purchaseOrders.find((x) => x.sourcingId === p.id);
  const shipment = po?.shipmentId ? erp.shipments.find((s) => s.id === po.shipmentId) : undefined;

  const supplierOf = (sid: string) => SUPPLIERS.find((s) => s.id === sid);

  const flow: DocFlowNode[] = [
    { label: "Sourcing", code: p.number, state: "done" },
    {
      label: "Quotation",
      code: quotation?.number,
      href: quotation ? `/demo/erp/sales/quotations/${quotation.id}` : undefined,
      state: quotation ? "done" : "todo",
    },
    {
      label: "Sales Order",
      code: so?.number,
      href: so ? `/demo/erp/sales/orders/${so.id}` : undefined,
      state: so ? "done" : "todo",
    },
    {
      label: "PO Supplier",
      code: po?.number,
      href: po ? `/demo/erp/purchasing/orders/${po.id}` : undefined,
      state: po ? "done" : "todo",
    },
    {
      label: "Shipment",
      code: shipment?.number,
      href: shipment ? `/demo/erp/import/shipments/${shipment.id}` : undefined,
      state: shipment ? (shipment.received ? "done" : "current") : "todo",
    },
    { label: "Invoice", code: so?.invoiceId ? "ออกแล้ว" : undefined, href: so?.invoiceId ? "/demo/erp/finance/ar" : undefined, state: so?.invoiceId ? "done" : "todo" },
  ];

  return (
    <div>
      <PageHeader
        title={`${p.number} — ${p.title}`}
        subtitle={`${customer?.name ?? "-"} • ผู้ดูแล ${p.salesperson}`}
        actions={<StatusBadge status={p.status} />}
      />

      {/* document flow */}
      <div className="card-pad mb-4">
        <p className="section-title">Document Flow — ความสัมพันธ์เอกสารทั้งสาย</p>
        <DocFlow nodes={flow} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {/* requirement */}
        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">Product Requirement</p>
            <ul className="space-y-1.5">
              {p.requirement.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[13px] text-slate-600">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-400" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <FieldRow label="จำนวน" value={<span className="num">{num(p.qty)} pcs</span>} />
              <FieldRow label="Target Price" value={<span className="num font-bold">{money(p.targetPrice)} / pc</span>} />
              <FieldRow label="ต้องการรับของภายใน" value={fmtDate(p.requiredDate)} />
              <FieldRow
                label="มูลค่าโปรเจกต์"
                value={<span className="num font-bold text-brand-700">{displayMoney(p.qty * p.targetPrice, erp.currency)}</span>}
              />
            </div>
          </div>

          <div className="card-pad">
            <p className="section-title">Reference / Specification</p>
            <div className="space-y-1.5">
              {p.attachments.map((f) => (
                <button
                  key={f}
                  onClick={() => erp.toast(`Demo: เปิดไฟล์ ${f}`, "info")}
                  className="flex w-full items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2 text-left text-[13px] text-slate-600 hover:border-brand-300"
                >
                  <FileText size={14} className="text-brand-500" />
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* comparison */}
        <div className="xl:col-span-2">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <p className="text-sm font-bold text-slate-700">Supplier Comparison ({p.options.length} ราย)</p>
              {!p.quotationId && p.selectedSupplierId ? (
                <button className="btn-primary !py-1.5 text-xs" onClick={() => erp.sendSourcingQuotation(p.id)}>
                  สร้าง Quotation ให้ลูกค้า
                </button>
              ) : null}
            </div>

            {p.options.length === 0 ? (
              <p className="px-5 py-10 text-center text-[13px] text-slate-400">
                อยู่ระหว่างส่ง RFQ — ยังไม่มีใบเสนอราคาจากซัพพลายเออร์
              </p>
            ) : (
              <div className="thin-scroll overflow-x-auto">
                <table className="erp-table">
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th className="!text-right">Unit Price</th>
                      <th className="!text-right">Landed Cost/pc</th>
                      <th className="!text-right">MOQ</th>
                      <th className="!text-center">Lead Time</th>
                      <th>Payment</th>
                      <th className="!text-right">Sample</th>
                      <th className="!text-center">Quality</th>
                      <th className="!text-center">Rating</th>
                      <th className="!text-center">เลือก</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.options.map((o) => {
                      const s = supplierOf(o.supplierId);
                      const selected = p.selectedSupplierId === o.supplierId;
                      const marginPct = ((p.targetPrice - o.landedUnitCostTHB) / p.targetPrice) * 100;
                      return (
                        <tr key={o.supplierId} className={selected ? "!bg-emerald-50/60" : ""}>
                          <td>
                            <div className="flex items-center gap-2">
                              <span>{s?.country === "CN" ? "🇨🇳" : "🇹🇭"}</span>
                              <div>
                                <p className="font-semibold text-slate-800">{s?.name}</p>
                                <p className="text-[11px] text-slate-400">
                                  {s?.type}
                                  {o.recommended ? (
                                    <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-bold text-brand-600">
                                      <Award size={9} /> แนะนำ
                                    </span>
                                  ) : null}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="num !text-right font-semibold">
                            {money(o.unitPrice, o.currency)}
                          </td>
                          <td className="!text-right">
                            <p className="num font-bold text-slate-800">{money(o.landedUnitCostTHB)}</p>
                            <p className={`num text-[11px] font-semibold ${marginPct >= 30 ? "text-emerald-600" : "text-amber-600"}`}>
                              margin {marginPct.toFixed(1)}%
                            </p>
                          </td>
                          <td className="num !text-right">{num(o.moq)}</td>
                          <td className="num !text-center">{o.leadTimeDays + o.productionDays} วัน</td>
                          <td className="text-xs">{o.paymentTerm}</td>
                          <td className="num !text-right">{money(o.sampleCost)}</td>
                          <td className="num !text-center">{o.qualityScore}%</td>
                          <td className="!text-center">
                            <span className="inline-flex items-center gap-0.5 font-display text-xs font-bold text-amber-500">
                              <Star size={11} fill="currentColor" /> {s?.rating.toFixed(1)}
                            </span>
                          </td>
                          <td className="!text-center">
                            {selected ? (
                              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                ✓ เลือกแล้ว
                              </span>
                            ) : (
                              <button
                                className="btn-outline !px-2.5 !py-1 text-[11px]"
                                onClick={() => erp.selectSourcingSupplier(p.id, o.supplierId)}
                              >
                                เลือก
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* cost & margin summary ของ supplier ที่เลือก */}
          {p.selectedSupplierId ? (
            <div className="card-pad mt-4">
              <p className="section-title">สรุปต้นทุน–กำไร (Supplier ที่เลือก)</p>
              {(() => {
                const o = p.options.find((x) => x.supplierId === p.selectedSupplierId)!;
                const s = supplierOf(o.supplierId);
                const revenue = p.qty * p.targetPrice;
                const cost = p.qty * o.landedUnitCostTHB;
                const gp = revenue - cost;
                return (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <p className="text-[11px] text-slate-400">Supplier</p>
                      <p className="mt-1 text-[13px] font-bold text-slate-700">{s?.name}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <p className="text-[11px] text-slate-400">รายได้ (Target)</p>
                      <p className="num mt-1 text-[15px] font-bold text-slate-800">{displayMoney(revenue, erp.currency)}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <p className="text-[11px] text-slate-400">ต้นทุน Landed รวม</p>
                      <p className="num mt-1 text-[15px] font-bold text-slate-800">{displayMoney(cost, erp.currency)}</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-3.5">
                      <p className="text-[11px] text-emerald-600">กำไรขั้นต้นคาดการณ์</p>
                      <p className="num mt-1 text-[15px] font-bold text-emerald-700">
                        {displayMoney(gp, erp.currency)} ({((gp / revenue) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                );
              })()}
              <p className="mt-3 text-[11px] text-slate-400">
                * ต้นทุนภายใน — ไม่แสดงในเอกสารที่ส่งให้ลูกค้า
              </p>
            </div>
          ) : null}

          {quotation ? (
            <div className="card-pad mt-4 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold text-slate-700">
                  Quotation <span className="num text-brand-600">{quotation.number}</span> สร้างจากโปรเจกต์นี้แล้ว
                </p>
                <p className="text-xs text-slate-400">สถานะ: {quotation.status}</p>
              </div>
              <Link href={`/demo/erp/sales/quotations/${quotation.id}`} className="btn-outline text-xs">
                เปิด Quotation →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
