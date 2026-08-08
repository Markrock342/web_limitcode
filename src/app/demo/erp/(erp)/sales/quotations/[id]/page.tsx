"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useErp } from "@/components/demos/erp/lib/store";
import {
  displayMoney,
  docGrand,
  docMarginPct,
  docSubtotal,
  docVat,
  fmtDate,
  lineTotal,
  money,
  num,
} from "@/components/demos/erp/lib/format";
import { DocFlow, FieldRow, PageHeader, StatusBadge, type DocFlowNode } from "@/components/demos/erp/components/erp/ui";

export default function QuotationDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const erp = useErp();
  const q = erp.quotations.find((x) => x.id === id);
  if (!q) return <p className="text-sm text-slate-500">ไม่พบใบเสนอราคา</p>;

  const customer = erp.customers.find((c) => c.id === q.customerId);
  const so = q.soId ? erp.salesOrders.find((s) => s.id === q.soId) : undefined;
  const sourcing = q.sourcingId ? erp.sourcingProjects.find((s) => s.id === q.sourcingId) : undefined;
  const margin = docMarginPct(q.items);

  const flow: DocFlowNode[] = [
    ...(sourcing
      ? [{ label: "Sourcing", code: sourcing.number, href: `/demo/erp/sourcing/projects/${sourcing.id}`, state: "done" as const }]
      : []),
    { label: "Quotation", code: q.number, state: so ? "done" : "current" },
    { label: "Sales Order", code: so?.number, href: so ? `/demo/erp/sales/orders/${so.id}` : undefined, state: so ? "current" : "todo" },
    { label: "Delivery", state: so?.deliveryId ? "done" : "todo" },
    { label: "Invoice", href: so?.invoiceId ? "/demo/erp/finance/ar" : undefined, state: so?.invoiceId ? "done" : "todo" },
    { label: "Payment", state: so?.status === "Paid" ? "done" : "todo" },
  ];

  const convert = () => {
    const soId = erp.convertQuotation(q.id);
    if (soId) router.push(`/demo/erp/sales/orders/${soId}`);
  };

  return (
    <div>
      <PageHeader
        title={`Quotation ${q.number}`}
        subtitle={`${customer?.name ?? "-"} • ${q.salesperson}`}
        actions={
          <>
            <StatusBadge status={q.status} />
            <button className="btn-outline text-xs" onClick={() => erp.toast("Demo: ส่ง PDF ให้ลูกค้าทางอีเมล/LINE", "info")}>
              ส่งให้ลูกค้า (PDF)
            </button>
            {q.status !== "Converted" ? (
              <button className="btn-primary text-xs" onClick={convert}>
                แปลงเป็น Sales Order →
              </button>
            ) : so ? (
              <Link href={`/demo/erp/sales/orders/${so.id}`} className="btn-primary text-xs">
                เปิด {so.number} →
              </Link>
            ) : null}
          </>
        }
      />

      <div className="card-pad mb-4">
        <p className="section-title">Document Flow</p>
        <DocFlow nodes={flow} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="card overflow-hidden">
            <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">รายการสินค้า</p>
            <div className="thin-scroll overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>SKU</th><th>สินค้า</th><th className="!text-right">จำนวน</th><th className="!text-right">ราคา/หน่วย</th><th className="!text-right">ส่วนลด</th><th className="!text-right">รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {q.items.map((it, i) => (
                    <tr key={i}>
                      <td className="num text-slate-500">{it.sku}</td>
                      <td className="font-semibold text-slate-800">{it.name}</td>
                      <td className="num !text-right">{num(it.qty)} {it.unit}</td>
                      <td className="num !text-right">{money(it.unitPrice)}</td>
                      <td className="num !text-right">{it.discountPct ? `${it.discountPct}%` : "-"}</td>
                      <td className="num !text-right font-semibold">{money(lineTotal(it), "THB", 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end border-t border-slate-100 px-5 py-4">
              <div className="w-72 space-y-1.5 text-[13px]">
                <div className="flex justify-between text-slate-500">
                  <span>รวม</span>
                  <span className="num">{money(docSubtotal(q.items), "THB", 0)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>VAT {q.vatPct}%</span>
                  <span className="num">{money(docVat(q.items, q.vatPct), "THB", 0)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-[15px] font-bold text-slate-800">
                  <span>ยอดรวมสุทธิ</span>
                  <span className="num">{displayMoney(docGrand(q.items, q.vatPct), erp.currency)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* internal margin — ไม่แสดงให้ลูกค้า */}
          <div className="card-pad mt-4 border-dashed border-amber-200 bg-amber-50/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[13px] font-bold text-amber-800">Internal — Estimated Margin (ไม่แสดงในเอกสารลูกค้า)</p>
                <p className="text-xs text-amber-700/70">คำนวณจาก Landed Cost ล่าสุดของแต่ละ SKU</p>
              </div>
              <p className={`num text-xl font-bold ${margin >= 30 ? "text-emerald-600" : margin >= 15 ? "text-amber-600" : "text-red-600"}`}>
                {margin.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">เงื่อนไข</p>
            <FieldRow label="วันที่" value={fmtDate(q.date)} />
            <FieldRow label="ยืนราคาถึง" value={fmtDate(q.validUntil)} />
            <FieldRow label="เงื่อนไขชำระเงิน" value={q.paymentTerms} />
            <FieldRow label="การส่งมอบ" value={q.deliveryTerms} />
            <FieldRow label="พนักงานขาย" value={q.salesperson} />
          </div>
          <div className="card-pad">
            <p className="section-title">ลูกค้า</p>
            <p className="text-[13px] font-bold text-slate-800">{customer?.name}</p>
            <p className="mt-1 text-xs text-slate-500">{customer?.contact}</p>
            <p className="text-xs text-slate-500">{customer?.phone}</p>
            <Link href={`/demo/erp/crm/customers/${customer?.id}`} className="btn-outline mt-3 w-full text-xs">
              เปิดโปรไฟล์ลูกค้า
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
