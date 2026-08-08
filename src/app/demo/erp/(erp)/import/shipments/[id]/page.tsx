"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Circle, FileText, PackageCheck } from "lucide-react";
import { SHIPMENT_FLOW } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate, money } from "@/components/demos/erp/lib/format";
import { DocFlow, FieldRow, PageHeader, StatusBadge, type DocFlowNode } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

/* timeline label mapping (ธุรกิจจริง 9 ขั้น) */
const TIMELINE = [
  "PO Confirmed",
  "Supplier Production",
  "Booking",
  "Loaded",
  "Departed China",
  "At Sea",
  "Arrived Thailand",
  "Customs",
  "Warehouse",
];

/* map สถานะ shipment → ขั้น timeline ที่ผ่านแล้ว */
function timelineIndex(status: string): number {
  const map: Record<string, number> = {
    "กำลังผลิต": 1,
    "รอโหลดสินค้า": 3,
    "ออกจากจีนแล้ว": 4,
    "อยู่ระหว่างขนส่ง": 5,
    "ถึงท่าเรือไทย": 6,
    "Customs Clearance": 7,
    "รอรับเข้าโกดัง": 7,
    Completed: 8,
  };
  return map[status] ?? 0;
}

export default function ShipmentDetail() {
  const { id } = useParams<{ id: string }>();
  const erp = useErp();
  const shp = erp.shipments.find((x) => x.id === id);
  if (!shp) return <p className="text-sm text-slate-500">ไม่พบ Shipment</p>;

  const supplier = SUPPLIERS.find((s) => s.id === shp.supplierId);
  const po = erp.purchaseOrders.find((p) => p.id === shp.poId);
  const so = po?.soId ? erp.salesOrders.find((s) => s.id === po.soId) : undefined;
  const totalCosts = shp.costs.reduce((s, c) => s + c.amount, 0);
  const landed = shp.valueTHB + totalCosts;
  const tlIdx = timelineIndex(shp.status);
  const statusIdx = SHIPMENT_FLOW.indexOf(shp.status);

  const flow: DocFlowNode[] = [
    { label: "PO", code: po?.number, href: po ? `/demo/erp/purchasing/orders/${po.id}` : undefined, state: "done" },
    { label: "Shipment", code: shp.number, state: "current" },
    { label: "Customs", state: statusIdx >= 5 ? "done" : "todo" },
    { label: "Goods Receipt + QC", state: shp.received ? "done" : "todo" },
    { label: "Stock", state: shp.received ? "done" : "todo" },
    ...(so ? [{ label: "Sales Order", code: so.number, href: `/demo/erp/sales/orders/${so.id}`, state: "done" as const }] : []),
  ];

  return (
    <div>
      <PageHeader
        title={`Shipment ${shp.number}`}
        subtitle={`${supplier?.name ?? "-"} • ${shp.container} • ${shp.incoterm}`}
        actions={
          <>
            <StatusBadge status={shp.status} />
            {!shp.received && shp.status !== "รอรับเข้าโกดัง" && shp.status !== "Completed" ? (
              <button className="btn-primary text-xs" onClick={() => erp.advanceShipment(shp.id)}>
                อัปเดตสถานะถัดไป →
              </button>
            ) : null}
            {shp.status === "รอรับเข้าโกดัง" && !shp.received ? (
              <button className="btn-success text-xs" onClick={() => erp.receiveShipment(shp.id)}>
                <PackageCheck size={14} />
                รับเข้าโกดัง + QC
              </button>
            ) : null}
          </>
        }
      />

      {/* timeline */}
      <div className="card-pad mb-4">
        <p className="section-title">Shipment Timeline</p>
        <div className="thin-scroll overflow-x-auto pb-2">
          <div className="flex min-w-[820px] items-start">
            {TIMELINE.map((step, i) => {
              const done = i < tlIdx;
              const current = i === tlIdx && shp.status !== "Completed";
              const completed = shp.status === "Completed";
              return (
                <div key={step} className="relative flex-1">
                  {i > 0 ? (
                    <span
                      className={`absolute left-[-50%] right-[50%] top-[13px] h-0.5 ${
                        done || completed || current ? "bg-brand-500" : "bg-slate-200"
                      }`}
                    />
                  ) : null}
                  <div className="relative flex flex-col items-center text-center">
                    {done || completed ? (
                      <CheckCircle2 size={26} className="rounded-full bg-white text-brand-600" />
                    ) : current ? (
                      <span className="grid size-[26px] place-items-center rounded-full border-2 border-brand-500 bg-brand-50">
                        <span className="size-2.5 animate-pulse rounded-full bg-brand-500" />
                      </span>
                    ) : (
                      <Circle size={26} className="rounded-full bg-white text-slate-300" />
                    )}
                    <p className={`mt-2 text-[10px] font-semibold ${done || completed ? "text-slate-700" : current ? "text-brand-600" : "text-slate-400"}`}>
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card-pad mb-4">
        <p className="section-title">Document Flow</p>
        <DocFlow nodes={flow} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">รายละเอียดการขนส่ง</p>
            <FieldRow label="โหมด" value={shp.mode === "SEA" ? "ทางเรือ (SEA)" : "ทางอากาศ (AIR)"} />
            <FieldRow label="Container" value={shp.container} />
            <FieldRow label="Incoterm" value={shp.incoterm} />
            <FieldRow label="ต้นทาง" value={shp.portOrigin} />
            <FieldRow label="ปลายทาง" value={shp.portDest} />
            <FieldRow label="สายเรือ" value={shp.shippingLine} />
            <FieldRow label="Forwarder" value={shp.forwarder} />
            <FieldRow label="ETD" value={fmtDate(shp.etd)} />
            <FieldRow label="ETA" value={<span className="font-bold">{fmtDate(shp.eta)}</span>} />
            {shp.qcResult ? <FieldRow label="ผล QC" value={<StatusBadge status={shp.qcResult} />} /> : null}
          </div>

          <div className="card-pad">
            <p className="section-title">เอกสารนำเข้า</p>
            <div className="space-y-1.5">
              {shp.docs.map((d) => (
                <button
                  key={d}
                  onClick={() => erp.toast(`Demo: เปิดเอกสาร ${d}`, "info")}
                  className="flex w-full items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2 text-left text-[13px] text-slate-600 hover:border-brand-300"
                >
                  <FileText size={14} className="text-brand-500" />
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <p className="text-sm font-bold text-slate-700">Landed Cost Summary</p>
              <Link href="/demo/erp/import/landed-cost" className="text-xs font-semibold text-brand-600 hover:underline">
                เปิด Landed Cost Calculator →
              </Link>
            </div>
            <div className="p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[11px] text-slate-400">มูลค่าสินค้า (CIF/FOB)</p>
                  <p className="num mt-1 text-lg font-bold text-slate-800">{displayMoney(shp.valueTHB, erp.currency)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[11px] text-slate-400">ค่าใช้จ่ายนำเข้ารวม</p>
                  <p className="num mt-1 text-lg font-bold text-slate-800">{displayMoney(totalCosts, erp.currency)}</p>
                </div>
                <div className="rounded-xl bg-brand-50 p-4">
                  <p className="text-[11px] text-brand-600">Total Landed Cost</p>
                  <p className="num mt-1 text-lg font-bold text-brand-700">{displayMoney(landed, erp.currency)}</p>
                </div>
              </div>

              <table className="erp-table mt-4">
                <thead>
                  <tr>
                    <th>รายการค่าใช้จ่าย</th>
                    <th className="!text-right">จำนวนเงิน</th>
                    <th className="!text-right">% ของมูลค่าสินค้า</th>
                  </tr>
                </thead>
                <tbody>
                  {shp.costs.map((c) => (
                    <tr key={c.label}>
                      <td>{c.label}</td>
                      <td className="num !text-right font-semibold">{money(c.amount, "THB", 0)}</td>
                      <td className="num !text-right text-slate-400">
                        {((c.amount / shp.valueTHB) * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="!bg-slate-50">
                    <td className="font-bold text-slate-800">รวมค่าใช้จ่ายนำเข้า</td>
                    <td className="num !text-right font-bold text-slate-800">{money(totalCosts, "THB", 0)}</td>
                    <td className="num !text-right font-bold text-slate-500">
                      {((totalCosts / shp.valueTHB) * 100).toFixed(2)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {po ? (
            <div className="card mt-4 overflow-hidden">
              <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
                สินค้าใน Shipment (จาก {po.number})
              </p>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>SKU</th><th>สินค้า</th><th className="!text-right">จำนวน</th><th className="!text-right">มูลค่า ({po.currency})</th>
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
                          it.sku
                        )}
                      </td>
                      <td className="font-semibold text-slate-700">{it.name}</td>
                      <td className="num !text-right">{it.qty.toLocaleString()}</td>
                      <td className="num !text-right">{money(it.qty * it.unitPrice, po.currency, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
