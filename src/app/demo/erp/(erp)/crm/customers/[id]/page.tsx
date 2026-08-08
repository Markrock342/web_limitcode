"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, docCost, docSubtotal, fmtDate, num, pct } from "@/components/demos/erp/lib/format";
import { FieldRow, KpiCard, PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const erp = useErp();
  const c = erp.customers.find((x) => x.id === id);

  if (!c) return <p className="text-sm text-slate-500">ไม่พบลูกค้า</p>;

  const m = (thb: number) => displayMoney(thb, erp.currency);
  const outstanding = erp.outstandingAR(c.id);
  const available = c.creditLimit - outstanding;
  const usagePct = Math.min(100, (outstanding / c.creditLimit) * 100);

  const orders = erp.salesOrders.filter((s) => s.customerId === c.id);
  const invoices = erp.arInvoices.filter((i) => i.customerId === c.id);
  const quotes = erp.quotations.filter((q) => q.customerId === c.id);
  const acts = [
    ...(erp.sourcingProjects.some((p) => p.customerId === c.id) ? [] : []),
  ];

  const sales = orders.reduce((s, o) => s + docSubtotal(o.items), 0);
  const cogs = orders.reduce((s, o) => s + docCost(o.items), 0);
  const gp = sales - cogs;
  const margin = sales > 0 ? (gp / sales) * 100 : 0;

  // top products
  const productTotals = new Map<string, { name: string; qty: number; value: number }>();
  for (const o of orders)
    for (const it of o.items) {
      const cur = productTotals.get(it.sku) ?? { name: it.name, qty: 0, value: 0 };
      cur.qty += it.qty;
      cur.value += it.qty * it.unitPrice;
      productTotals.set(it.sku, cur);
    }
  const topProducts = Array.from(productTotals.entries())
    .sort((a, b) => b[1].value - a[1].value)
    .slice(0, 5);

  const activities = erp.customers.length ? [] : [];

  return (
    <div>
      <PageHeader
        title={c.name}
        subtitle={`${c.code} • ${c.industry} • ดูแลโดย ${c.salesperson}`}
        actions={
          <>
            <Link href="/demo/erp/sales/quotations" className="btn-outline text-xs">
              + Quotation
            </Link>
            <Link href="/demo/erp/sourcing/projects" className="btn-outline text-xs">
              + Sourcing Request
            </Link>
          </>
        }
      />

      {/* profitability KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="ยอดขายสะสม" value={m(sales)} accent />
        <KpiCard label="COGS (Landed)" value={m(cogs)} />
        <KpiCard label="กำไรขั้นต้น" value={m(gp)} sub={pct(margin, 2)} />
        <KpiCard label="จำนวนออเดอร์" value={String(orders.length)} />
        <KpiCard label="ลูกหนี้คงค้าง" value={m(outstanding)} />
        <KpiCard label="ระยะชำระเฉลี่ย" value="34 วัน" sub={`เทอม ${c.paymentTermDays} วัน`} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {/* left — info */}
        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">ข้อมูลบริษัท</p>
            <FieldRow label="เลขผู้เสียภาษี" value={<span className="num">{c.taxId}</span>} />
            <FieldRow label="สาขา" value={c.branch} />
            <FieldRow label="กลุ่มลูกค้า" value={c.group} />
            <FieldRow label="Price List" value={c.priceList} />
            <FieldRow label="เครดิตเทอม" value={`${c.paymentTermDays} วัน`} />
            <FieldRow label="ลูกค้าตั้งแต่" value={fmtDate(c.since)} />
          </div>

          <div className="card-pad">
            <p className="section-title">ผู้ติดต่อ</p>
            <p className="text-[13px] font-semibold text-slate-700">{c.contact}</p>
            <div className="mt-2 space-y-1.5 text-[13px] text-slate-500">
              <p className="flex items-center gap-2"><Phone size={13} className="text-slate-400" /> {c.phone}</p>
              <p className="flex items-center gap-2"><Mail size={13} className="text-slate-400" /> {c.email}</p>
              {c.line ? (
                <p className="flex items-center gap-2"><MessageCircle size={13} className="text-slate-400" /> LINE {c.line}</p>
              ) : null}
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <p className="mb-1 flex items-start gap-2">
                <MapPin size={13} className="mt-0.5 shrink-0 text-slate-400" />
                <span><span className="font-semibold text-slate-600">ที่อยู่วางบิล:</span> {c.billingAddress}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={13} className="mt-0.5 shrink-0 text-slate-400" />
                <span><span className="font-semibold text-slate-600">ที่อยู่จัดส่ง:</span> {c.shippingAddress}</span>
              </p>
            </div>
          </div>

          {/* credit control */}
          <div className={`card-pad ${available < 0 ? "border-red-200" : ""}`}>
            <p className="section-title">Credit Control</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] text-slate-400">วงเงินเครดิต</p>
                <p className="num text-lg font-bold text-slate-800">{m(c.creditLimit)}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-400">คงเหลือ</p>
                <p className={`num text-lg font-bold ${available < 0 ? "text-red-600" : "text-emerald-600"}`}>
                  {m(available)}
                </p>
              </div>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${usagePct > 90 ? "bg-red-500" : usagePct > 70 ? "bg-amber-400" : "bg-brand-500"}`}
                style={{ width: `${usagePct}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              ใช้ไป {m(outstanding)} ({usagePct.toFixed(0)}%)
            </p>
            {available < 0 ? (
              <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                ⚠ วงเงินเครดิตไม่เพียงพอ — ออเดอร์ใหม่ต้องขออนุมัติผู้จัดการ
              </p>
            ) : null}
          </div>
        </div>

        {/* right — history */}
        <div className="space-y-4 xl:col-span-2">
          <div className="card overflow-hidden">
            <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
              Sales Orders / Customer PO
            </p>
            <div className="thin-scroll overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>SO</th><th>Customer PO</th><th>วันที่</th><th className="!text-right">มูลค่า</th><th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <Link href={`/demo/erp/sales/orders/${o.id}`} className="num font-bold text-brand-600 hover:underline">
                          {o.number}
                        </Link>
                      </td>
                      <td className="num">{o.customerPO ?? "-"}</td>
                      <td>{fmtDate(o.date)}</td>
                      <td className="num !text-right font-semibold">{m(docSubtotal(o.items) * 1.07)}</td>
                      <td><StatusBadge status={o.status} /></td>
                    </tr>
                  ))}
                  {quotes.filter((q) => q.status !== "Converted").map((q) => (
                    <tr key={q.id}>
                      <td>
                        <Link href={`/demo/erp/sales/quotations/${q.id}`} className="num font-bold text-slate-500 hover:underline">
                          {q.number}
                        </Link>
                      </td>
                      <td className="text-[11px] text-slate-400">Quotation</td>
                      <td>{fmtDate(q.date)}</td>
                      <td className="num !text-right">{m(docSubtotal(q.items) * 1.07)}</td>
                      <td><StatusBadge status={q.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="card overflow-hidden">
              <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">สินค้าขายดี</p>
              <div className="p-3">
                {topProducts.length === 0 ? (
                  <p className="px-2 py-4 text-xs text-slate-400">ยังไม่มีประวัติ</p>
                ) : (
                  topProducts.map(([sku, t]) => (
                    <div key={sku} className="flex items-center justify-between border-b border-slate-50 px-2 py-2 text-[13px] last:border-0">
                      <div>
                        <p className="font-semibold text-slate-700">{t.name}</p>
                        <p className="num text-[11px] text-slate-400">{sku} • {num(t.qty)} ชิ้น</p>
                      </div>
                      <span className="num font-bold text-slate-700">{m(t.value)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card overflow-hidden">
              <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">ใบแจ้งหนี้</p>
              <div className="p-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between border-b border-slate-50 px-2 py-2 text-[13px] last:border-0">
                    <div>
                      <p className="num font-semibold text-slate-700">{inv.number}</p>
                      <p className="text-[11px] text-slate-400">ครบกำหนด {fmtDate(inv.dueDate)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="num font-bold">{m(inv.amount - inv.paid)}</span>
                      <StatusBadge status={inv.status} />
                    </div>
                  </div>
                ))}
                {invoices.length === 0 ? <p className="px-2 py-4 text-xs text-slate-400">ไม่มีใบแจ้งหนี้</p> : null}
              </div>
            </div>
          </div>

          {/* activities */}
          <div className="card-pad">
            <p className="section-title">กิจกรรมล่าสุด (CRM Activities)</p>
            <div className="space-y-2.5">
              {ACT_PLACEHOLDER(c.id).map((a, i) => (
                <div key={i} className="flex gap-3 text-[13px]">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-brand-400" />
                  <div>
                    <p className="text-slate-700">{a.note}</p>
                    <p className="text-[11px] text-slate-400">{fmtDate(a.date)} • {a.owner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ACTIVITIES } from "@/components/demos/erp/data/ops";
function ACT_PLACEHOLDER(customerId: string) {
  const list = ACTIVITIES.filter((a) => a.customerId === customerId);
  return list.length > 0
    ? list
    : [{ note: "ยังไม่มีกิจกรรมบันทึกไว้ — เพิ่มการโทร/นัดหมายได้จากโมดูล CRM", date: "-", owner: "-" }];
}
