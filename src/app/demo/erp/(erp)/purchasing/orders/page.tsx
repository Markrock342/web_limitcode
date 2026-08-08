"use client";

import { useRouter } from "next/navigation";
import type { PurchaseOrder } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate, money } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

export default function PurchaseOrdersPage() {
  const erp = useErp();
  const router = useRouter();
  const supplierName = (id: string) => SUPPLIERS.find((s) => s.id === id)?.name ?? "-";
  const poTotal = (po: PurchaseOrder) =>
    po.items.reduce((s, it) => s + it.qty * it.unitPrice, 0) + po.freight;

  return (
    <div>
      <PageHeader
        title="Purchase Orders"
        subtitle="ใบสั่งซื้อในประเทศและนำเข้า — Multi-currency พร้อมอัตราแลกเปลี่ยน"
        actions={<button className="btn-primary text-xs" onClick={() => erp.toast("Demo: ฟอร์มสร้าง PO ใหม่", "info")}>+ สร้าง PO</button>}
      />

      <DataTable<PurchaseOrder>
        rows={erp.purchaseOrders}
        searchKeys={(p) => `${p.number} ${supplierName(p.supplierId)}`}
        filters={[
          { label: "สถานะ", options: ["Pending Approval", "Approved", "Production", "Shipped", "Received"], match: (p, v) => p.status === v },
          { label: "ประเทศ", options: ["จีน (นำเข้า)", "ไทย"], match: (p, v) => (v === "ไทย" ? p.currency === "THB" : p.currency !== "THB") },
        ]}
        onRowClick={(p) => router.push(`/demo/erp/purchasing/orders/${p.id}`)}
        columns={[
          { key: "number", label: "PO", render: (p) => <span className="num font-bold text-brand-600">{p.number}</span> },
          {
            key: "supplier",
            label: "Supplier",
            render: (p) => {
              const s = SUPPLIERS.find((x) => x.id === p.supplierId);
              return (
                <div className="flex items-center gap-2">
                  <span>{s?.country === "CN" ? "🇨🇳" : "🇹🇭"}</span>
                  <span className="font-semibold text-slate-800">{s?.name}</span>
                </div>
              );
            },
          },
          { key: "date", label: "วันที่", sortable: true, sortValue: (p) => p.date, render: (p) => fmtDate(p.date) },
          { key: "incoterm", label: "Incoterm" },
          {
            key: "totalForeign",
            label: "มูลค่า (สกุล PO)",
            align: "right",
            render: (p) => <span className="num font-semibold">{money(poTotal(p), p.currency)}</span>,
          },
          {
            key: "fx",
            label: "Rate",
            align: "right",
            render: (p) => <span className="num text-slate-400">{p.currency === "THB" ? "-" : p.fxRate.toFixed(2)}</span>,
          },
          {
            key: "totalTHB",
            label: "มูลค่า (THB)",
            align: "right",
            sortable: true,
            sortValue: (p) => poTotal(p) * p.fxRate,
            render: (p) => <span className="num font-bold">{displayMoney(poTotal(p) * p.fxRate, erp.currency)}</span>,
          },
          { key: "expectedArrival", label: "ของถึง (คาด)", render: (p) => fmtDate(p.expectedArrival) },
          { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
        ]}
      />
    </div>
  );
}
