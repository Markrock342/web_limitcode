"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import type { SoStatus } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import {
  displayMoney,
  docGrand,
  docSubtotal,
  docVat,
  fmtDate,
  lineTotal,
  money,
  num,
} from "@/components/demos/erp/lib/format";
import { DocFlow, FieldRow, PageHeader, StatusBadge, type DocFlowNode } from "@/components/demos/erp/components/erp/ui";

const WORKFLOW: SoStatus[] = [
  "Confirmed",
  "Awaiting Stock",
  "Reserved",
  "Picking",
  "Packing",
  "Ready to Ship",
  "Delivered",
  "Invoiced",
  "Paid",
];

export default function SalesOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const erp = useErp();
  const so = erp.salesOrders.find((x) => x.id === id);
  if (!so) return <p className="text-sm text-slate-500">ไม่พบ Sales Order</p>;

  const customer = erp.customers.find((c) => c.id === so.customerId);
  const quotation = so.quotationId ? erp.quotations.find((q) => q.id === so.quotationId) : undefined;
  const invoice = so.invoiceId ? erp.arInvoices.find((i) => i.id === so.invoiceId) : undefined;
  const delivery = so.deliveryId ? erp.deliveries.find((d) => d.id === so.deliveryId) : undefined;
  const sourcing = quotation?.sourcingId
    ? erp.sourcingProjects.find((s) => s.id === quotation.sourcingId)
    : undefined;
  const relatedPO = sourcing ? erp.purchaseOrders.find((p) => p.sourcingId === sourcing.id) : undefined;
  const shipment = relatedPO?.shipmentId ? erp.shipments.find((s) => s.id === relatedPO.shipmentId) : undefined;

  const grand = docGrand(so.items, so.vatPct);
  const outstanding = customer ? erp.outstandingAR(customer.id) : 0;
  const overCredit = customer ? outstanding + grand > customer.creditLimit && so.status === "Confirmed" : false;

  // stock availability ต่อบรรทัด
  const stockInfo = so.items.map((it) => {
    const p = erp.products.find((pp) => pp.id === it.productId);
    const wh = p?.stock[0];
    const available = wh ? wh.onHand - wh.reserved : 0;
    return { it, available, enough: available >= it.qty };
  });
  const allInStock = stockInfo.every((x) => x.enough);

  const flow: DocFlowNode[] = [
    ...(sourcing
      ? [{ label: "Sourcing", code: sourcing.number, href: `/demo/erp/sourcing/projects/${sourcing.id}`, state: "done" as const }]
      : []),
    ...(quotation
      ? [{ label: "Quotation", code: quotation.number, href: `/demo/erp/sales/quotations/${quotation.id}`, state: "done" as const }]
      : []),
    { label: "Sales Order", code: so.number, state: "current" },
    ...(relatedPO
      ? [{ label: "PO Supplier", code: relatedPO.number, href: `/demo/erp/purchasing/orders/${relatedPO.id}`, state: relatedPO.status === "Received" ? ("done" as const) : ("current" as const) }]
      : []),
    ...(shipment
      ? [{ label: "Shipment", code: shipment.number, href: `/demo/erp/import/shipments/${shipment.id}`, state: shipment.received ? ("done" as const) : ("current" as const) }]
      : []),
    { label: "Delivery", code: delivery?.number, state: delivery ? "done" : "todo" },
    { label: "Invoice", code: invoice?.number, href: invoice ? "/demo/erp/finance/ar" : undefined, state: invoice ? "done" : "todo" },
    { label: "Payment", state: so.status === "Paid" ? "done" : "todo" },
  ];

  const stepIdx = WORKFLOW.indexOf(so.status);

  return (
    <div>
      <PageHeader
        title={`Sales Order ${so.number}`}
        subtitle={`${customer?.name ?? "-"} • Customer PO: ${so.customerPO ?? "-"}`}
        actions={
          <>
            <StatusBadge status={so.status} />
            {so.status === "Awaiting Stock" || so.status === "Confirmed" ? (
              <button className="btn-primary text-xs" onClick={() => erp.reserveSO(so.id)}>
                จองสต็อก (Reserve)
              </button>
            ) : null}
            {["Reserved", "Picking", "Packing", "Ready to Ship"].includes(so.status) ? (
              <button className="btn-primary text-xs" onClick={() => erp.advanceSO(so.id)}>
                {so.status === "Reserved"
                  ? "เริ่มหยิบสินค้า (Picking)"
                  : so.status === "Picking"
                    ? "แพ็คสินค้า (Packing)"
                    : so.status === "Packing"
                      ? "พร้อมจัดส่ง"
                      : "ส่งมอบสินค้า (Delivery)"}
              </button>
            ) : null}
            {so.status === "Delivered" ? (
              <button className="btn-primary text-xs" onClick={() => erp.issueInvoice(so.id)}>
                ออกใบแจ้งหนี้ (Invoice)
              </button>
            ) : null}
            {so.status === "Invoiced" && invoice ? (
              <button className="btn-success text-xs" onClick={() => erp.recordPayment(invoice.id)}>
                บันทึกรับชำระเงิน
              </button>
            ) : null}
          </>
        }
      />

      {/* credit warning */}
      {overCredit ? (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
          <div className="flex-1">
            <p className="text-[13px] font-bold text-red-700">วงเงินเครดิตไม่เพียงพอ</p>
            <p className="mt-0.5 text-xs text-red-600">
              ยอดคงค้าง {money(outstanding, "THB", 0)} + ออเดอร์นี้ {money(grand, "THB", 0)} เกินวงเงิน{" "}
              {money(customer?.creditLimit ?? 0, "THB", 0)} — ต้องขออนุมัติผู้จัดการก่อนดำเนินการ
            </p>
          </div>
          <Link href="/demo/erp/approvals" className="btn-danger !py-1.5 text-xs">
            ส่งขออนุมัติ
          </Link>
        </div>
      ) : null}

      {/* workflow steps */}
      <div className="card-pad mb-4">
        <p className="section-title">สถานะคำสั่งขาย</p>
        <div className="thin-scroll flex items-center gap-0 overflow-x-auto pb-1">
          {WORKFLOW.map((st, i) => {
            const done = i < stepIdx;
            const current = i === stepIdx;
            return (
              <div key={st} className="flex shrink-0 items-center">
                {i > 0 ? <span className={`h-px w-5 ${i <= stepIdx ? "bg-brand-400" : "bg-slate-200"}`} /> : null}
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    current
                      ? "bg-brand-600 text-white"
                      : done
                        ? "bg-brand-50 text-brand-600"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {st}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-pad mb-4">
        <p className="section-title">Document Flow</p>
        <DocFlow nodes={flow} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="card overflow-hidden">
            <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">รายการสินค้า + สต็อก</p>
            <div className="thin-scroll overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>SKU</th><th>สินค้า</th><th className="!text-right">จำนวน</th><th className="!text-right">พร้อมขาย</th><th className="!text-right">ราคา/หน่วย</th><th className="!text-right">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {stockInfo.map(({ it, available, enough }, i) => (
                    <tr key={i}>
                      <td>
                        {it.productId ? (
                          <Link href={`/demo/erp/inventory/products/${it.productId}`} className="num font-semibold text-brand-600 hover:underline">
                            {it.sku}
                          </Link>
                        ) : (
                          <span className="num">{it.sku}</span>
                        )}
                      </td>
                      <td className="font-semibold text-slate-800">{it.name}</td>
                      <td className="num !text-right">{num(it.qty)} {it.unit}</td>
                      <td className={`num !text-right font-semibold ${enough ? "text-emerald-600" : "text-red-600"}`}>
                        {num(available)} {enough ? "✓" : "⚠"}
                      </td>
                      <td className="num !text-right">{money(it.unitPrice)}</td>
                      <td className="num !text-right font-semibold">{money(lineTotal(it), "THB", 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
              {!allInStock && ["Confirmed", "Awaiting Stock"].includes(so.status) ? (
                <p className="text-xs font-semibold text-amber-600">
                  ⚠ สต็อกยังไม่พอ — รอสินค้าเข้าจาก Shipment{shipment ? ` ${shipment.number}` : ""} ก่อนจึงจะจองได้
                </p>
              ) : (
                <span />
              )}
              <div className="w-72 space-y-1.5 text-[13px]">
                <div className="flex justify-between text-slate-500">
                  <span>รวม</span>
                  <span className="num">{money(docSubtotal(so.items), "THB", 0)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>VAT {so.vatPct}%</span>
                  <span className="num">{money(docVat(so.items, so.vatPct), "THB", 0)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-[15px] font-bold text-slate-800">
                  <span>ยอดรวมสุทธิ</span>
                  <span className="num">{displayMoney(grand, erp.currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">ข้อมูลคำสั่งขาย</p>
            <FieldRow label="วันที่สั่ง" value={fmtDate(so.date)} />
            <FieldRow label="กำหนดส่งมอบ" value={fmtDate(so.requiredDate)} />
            <FieldRow label="คลังสินค้า" value={so.warehouse} />
            <FieldRow label="Customer PO" value={<span className="num">{so.customerPO ?? "-"}</span>} />
          </div>

          {customer ? (
            <div className="card-pad">
              <p className="section-title">Credit Check</p>
              <FieldRow label="วงเงิน" value={<span className="num">{money(customer.creditLimit, "THB", 0)}</span>} />
              <FieldRow label="คงค้างปัจจุบัน" value={<span className="num">{money(outstanding, "THB", 0)}</span>} />
              <FieldRow
                label="หลังรวมออเดอร์นี้"
                value={
                  <span className={`num font-bold ${outstanding + grand > customer.creditLimit ? "text-red-600" : "text-emerald-600"}`}>
                    {money(outstanding + grand, "THB", 0)}
                  </span>
                }
              />
              <FieldRow label="เครดิตเทอม" value={`${customer.paymentTermDays} วัน`} />
            </div>
          ) : null}

          {delivery ? (
            <div className="card-pad">
              <p className="section-title">การส่งมอบ</p>
              <FieldRow label="Delivery Order" value={<span className="num">{delivery.number}</span>} />
              <FieldRow label="รถ / คนขับ" value={`${delivery.vehicle} • ${delivery.driver}`} />
              <FieldRow label="จำนวนกล่อง" value={<span className="num">{num(delivery.packages)}</span>} />
              <FieldRow label="สถานะ" value={<StatusBadge status={delivery.status} />} />
            </div>
          ) : null}

          {invoice ? (
            <div className="card-pad">
              <p className="section-title">ใบแจ้งหนี้</p>
              <FieldRow label="เลขที่" value={<span className="num">{invoice.number}</span>} />
              <FieldRow label="ครบกำหนด" value={fmtDate(invoice.dueDate)} />
              <FieldRow label="ยอด" value={<span className="num">{money(invoice.amount, "THB", 0)}</span>} />
              <FieldRow label="สถานะ" value={<StatusBadge status={invoice.status} />} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
