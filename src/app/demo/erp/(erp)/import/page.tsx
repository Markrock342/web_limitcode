"use client";

import { useRouter } from "next/navigation";
import { Anchor, Container, Plane, Ship } from "lucide-react";
import type { Shipment } from "@/components/demos/erp/types/erp";
import { SHIPMENT_FLOW } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { KpiCard, PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

export default function ImportControlTower() {
  const erp = useErp();
  const router = useRouter();

  const active = erp.shipments.filter((s) => !s.received);
  const inTransitValue = active.reduce((s, x) => s + x.valueTHB, 0);
  const estLanded = (s: Shipment) => s.valueTHB + s.costs.reduce((t, c) => t + c.amount, 0);
  const arriving7d = active.filter((s) => s.eta <= "2026-08-15").length;
  const inCustoms = active.filter((s) => s.status === "Customs Clearance").length;

  const supplierName = (id: string) => SUPPLIERS.find((x) => x.id === id)?.name ?? "-";
  const poNumber = (id: string) => erp.purchaseOrders.find((p) => p.id === id)?.number ?? "-";

  return (
    <div>
      <PageHeader
        title="Import Control Tower"
        subtitle="ศูนย์ควบคุมการนำเข้า — ติดตามทุกตู้จากโรงงานจีนถึงโกดังไทยในหน้าจอเดียว"
      />

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard label="Active Shipments" value={String(active.length)} sub="SEA + AIR" accent />
        <KpiCard label="มูลค่าสินค้าระหว่างทาง" value={displayMoney(inTransitValue, erp.currency)} />
        <KpiCard label="ถึงไทยภายใน 7 วัน" value={String(arriving7d)} sub="เตรียมแผนรับเข้าโกดัง" />
        <KpiCard label="อยู่ระหว่างพิธีการศุลกากร" value={String(inCustoms)} />
      </div>

      {/* pipeline overview */}
      <div className="card-pad mt-4">
        <p className="section-title">สถานะตาม Shipment Pipeline</p>
        <div className="thin-scroll flex gap-2 overflow-x-auto pb-1">
          {SHIPMENT_FLOW.map((st) => {
            const count = erp.shipments.filter((s) => s.status === st).length;
            return (
              <div
                key={st}
                className={`min-w-[110px] flex-1 rounded-xl border p-3 text-center ${
                  count > 0 ? "border-brand-200 bg-brand-50/60" : "border-slate-100 bg-slate-50/50"
                }`}
              >
                <p className={`num text-xl font-bold ${count > 0 ? "text-brand-700" : "text-slate-300"}`}>{count}</p>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-500">{st}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <DataTable<Shipment>
          rows={erp.shipments}
          searchKeys={(s) => `${s.number} ${s.container} ${supplierName(s.supplierId)} ${poNumber(s.poId)}`}
          filters={[
            { label: "สถานะ", options: [...SHIPMENT_FLOW], match: (s, v) => s.status === v },
            { label: "โหมด", options: ["SEA", "AIR"], match: (s, v) => s.mode === v },
          ]}
          onRowClick={(s) => router.push(`/demo/erp/import/shipments/${s.id}`)}
          columns={[
            {
              key: "number",
              label: "Shipment",
              render: (s) => (
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#0E1A34]/5 text-[#0E1A34]">
                    {s.mode === "SEA" ? <Ship size={15} /> : <Plane size={15} />}
                  </span>
                  <div>
                    <p className="num font-bold text-brand-600">{s.number}</p>
                    <p className="text-[11px] text-slate-400">{s.incoterm}</p>
                  </div>
                </div>
              ),
            },
            { key: "supplier", label: "Supplier", render: (s) => <span className="font-semibold text-slate-700">🇨🇳 {supplierName(s.supplierId)}</span> },
            { key: "po", label: "PO", render: (s) => <span className="num text-slate-500">{poNumber(s.poId)}</span> },
            {
              key: "container",
              label: "Container",
              render: (s) => (
                <span className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Container size={13} className="text-slate-400" />
                  {s.container}
                </span>
              ),
            },
            { key: "etd", label: "ETD", render: (s) => fmtDate(s.etd) },
            { key: "eta", label: "ETA", sortable: true, sortValue: (s) => s.eta, render: (s) => <span className="font-semibold">{fmtDate(s.eta)}</span> },
            {
              key: "port",
              label: "Port / Line",
              render: (s) => (
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Anchor size={12} className="text-slate-400" />
                  {s.portDest} • {s.shippingLine}
                </span>
              ),
            },
            {
              key: "value",
              label: "มูลค่าสินค้า",
              align: "right",
              sortable: true,
              sortValue: (s) => s.valueTHB,
              render: (s) => <span className="num font-semibold">{displayMoney(s.valueTHB, erp.currency)}</span>,
            },
            {
              key: "landed",
              label: "Est. Landed",
              align: "right",
              render: (s) => <span className="num font-bold text-slate-800">{displayMoney(estLanded(s), erp.currency)}</span>,
            },
            { key: "status", label: "สถานะ", render: (s) => <StatusBadge status={s.status} /> },
          ]}
        />
      </div>
    </div>
  );
}
