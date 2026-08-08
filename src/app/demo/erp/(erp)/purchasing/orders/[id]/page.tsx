"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate, money, num } from "@/components/demos/erp/lib/format";
import { DocFlow, FieldRow, PageHeader, StatusBadge, type DocFlowNode } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

export default function PurchaseOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const erp = useErp();
  const po = erp.purchaseOrders.find((x) => x.id === id);
  if (!po) return <p className="text-sm text-slate-500">ไม่พบใบสั่งซื้อ</p>;

  const supplier = SUPPLIERS.find((s) => s.id === po.supplierId);
  const shipment = po.shipmentId ? erp.shipments.find((s) => s.id === po.shipmentId) : undefined;
  const sourcing = po.sourcingId ? erp.sourcingProjects.find((s) => s.id === po.sourcingId) : undefined;
  const so = po.soId ? erp.salesOrders.find((s) => s.id === po.soId) : undefined;
  const apInvoice = erp.apInvoices.find((a) => a.poId === po.id);

  const subtotal = po.items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
  const total = subtotal + po.freight;
  const totalTHB = total * po.fxRate;

  const flow: DocFlowNode[] = [
    ...(sourcing ? [{ label: "Sourcing", code: sourcing.number, href: `/demo/erp/sourcing/projects/${sourcing.id}`, state: "done" as const }] : []),
    ...(so ? [{ label: "Sales Order", code: so.number, href: `/demo/erp/sales/orders/${so.id}`, state: "done" as const }] : []),
    { label: "Purchase Order", code: po.number, state: "current" },
    { label: "Shipment", code: shipment?.number, href: shipment ? `/demo/erp/import/shipments/${shipment.id}` : undefined, state: shipment ? (shipment.received ? "done" : "current") : "todo" },
    { label: "Goods Receipt", state: po.status === "Received" ? "done" : "todo" },
    { label: "Supplier Invoice", code: apInvoice?.number, href: apInvoice ? "/demo/erp/finance/ap" : undefined, state: apInvoice ? "done" : "todo" },
    { label: "Payment", state: apInvoice?.status === "Paid" ? "done" : "todo" },
  ];

  return (
    <div>
      <PageHeader
        title={`Purchase Order ${po.number}`}
        subtitle={`${supplier?.name ?? "-"} • ${po.incoterm}`}
        actions={
          <>
            <StatusBadge status={po.status} />
            {po.status === "Pending Approval" ? (
              <button className="btn-primary text-xs" onClick={() => erp.approvePO(po.id)}>
                อนุมัติ PO
              </button>
            ) : null}
            {shipment ? (
              <Link href={`/demo/erp/import/shipments/${shipment.id}`} className="btn-outline text-xs">
                ติดตาม Shipment →
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
            <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">รายการสั่งซื้อ</p>
            <div className="thin-scroll overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>SKU</th><th>สินค้า</th><th className="!text-right">จำนวน</th><th className="!text-right">ราคา/หน่วย ({po.currency})</th><th className="!text-right">รวม ({po.currency})</th><th className="!text-right">รวม (THB)</th>
                  </tr>
                </thead>
                <tbody>
                  {po.items.map((it, i) => (
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
                      <td className="num !text-right">{num(it.qty)}</td>
                      <td className="num !text-right">{money(it.unitPrice, po.currency)}</td>
                      <td className="num !text-right font-semibold">{money(it.qty * it.unitPrice, po.currency, 0)}</td>
                      <td className="num !text-right text-slate-500">{money(it.qty * it.unitPrice * po.fxRate, "THB", 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end border-t border-slate-100 px-5 py-4">
              <div className="w-80 space-y-1.5 text-[13px]">
                <div className="flex justify-between text-slate-500">
                  <span>รวมสินค้า</span>
                  <span className="num">{money(subtotal, po.currency, 0)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Freight</span>
                  <span className="num">{money(po.freight, po.currency, 0)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-800">
                  <span>รวม ({po.currency})</span>
                  <span className="num">{money(total, po.currency, 0)}</span>
                </div>
                <div className="flex justify-between text-[15px] font-bold text-brand-700">
                  <span>เทียบเท่า THB @ {po.fxRate}</span>
                  <span className="num">{displayMoney(totalTHB, erp.currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">เงื่อนไข</p>
            <FieldRow label="สกุลเงิน" value={po.currency} />
            <FieldRow label="Exchange Rate" value={<span className="num">{po.fxRate}</span>} />
            <FieldRow label="Incoterm" value={po.incoterm} />
            <FieldRow label="Payment Terms" value={po.paymentTerms} />
            <FieldRow label="กำหนดส่งออก (คาด)" value={fmtDate(po.expectedShip)} />
            <FieldRow label="ของถึงไทย (คาด)" value={fmtDate(po.expectedArrival)} />
          </div>

          {supplier ? (
            <div className="card-pad">
              <p className="section-title">Supplier</p>
              <p className="text-[13px] font-bold text-slate-800">
                {supplier.country === "CN" ? "🇨🇳 " : "🇹🇭 "}
                {supplier.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">{supplier.contact}</p>
              <FieldRow label="Rating" value={`★ ${supplier.rating.toFixed(1)} • คุณภาพ ${supplier.qualityPct}%`} />
              <FieldRow label="On-time" value={`${supplier.onTimePct}%`} />
              <FieldRow label="Lead Time เฉลี่ย" value={`${supplier.leadTimeDays} วัน`} />
            </div>
          ) : null}

          {shipment ? (
            <div className="card-pad">
              <p className="section-title">Shipment ที่เกี่ยวข้อง</p>
              <FieldRow label="เลขที่" value={<span className="num">{shipment.number}</span>} />
              <FieldRow label="ตู้" value={shipment.container} />
              <FieldRow label="ETA" value={fmtDate(shipment.eta)} />
              <FieldRow label="สถานะ" value={<StatusBadge status={shipment.status} />} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
