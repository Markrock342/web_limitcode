"use client";

import { useRouter } from "next/navigation";
import type { SalesOrder } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, docGrand, fmtDate } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";

export default function SalesOrdersPage() {
  const erp = useErp();
  const router = useRouter();
  const customerName = (id: string) => erp.customers.find((c) => c.id === id)?.name ?? "-";

  return (
    <div>
      <PageHeader
        title="Sales Orders"
        subtitle="คำสั่งขาย — เชื่อมสต็อก การจอง การส่งมอบ และการวางบิลอัตโนมัติ"
      />

      <DataTable<SalesOrder>
        rows={erp.salesOrders}
        searchKeys={(s) => `${s.number} ${s.customerPO ?? ""} ${customerName(s.customerId)}`}
        filters={[
          {
            label: "สถานะ",
            options: ["Confirmed", "Awaiting Stock", "Reserved", "Picking", "Packing", "Ready to Ship", "Delivered", "Invoiced", "Paid"],
            match: (s, v) => s.status === v,
          },
        ]}
        onRowClick={(s) => router.push(`/demo/erp/sales/orders/${s.id}`)}
        columns={[
          { key: "number", label: "SO", render: (s) => <span className="num font-bold text-brand-600">{s.number}</span> },
          { key: "customer", label: "ลูกค้า", render: (s) => <span className="font-semibold text-slate-800">{customerName(s.customerId)}</span> },
          { key: "customerPO", label: "Customer PO", render: (s) => <span className="num text-slate-500">{s.customerPO ?? "-"}</span> },
          { key: "date", label: "วันที่", sortable: true, sortValue: (s) => s.date, render: (s) => fmtDate(s.date) },
          { key: "requiredDate", label: "กำหนดส่ง", render: (s) => fmtDate(s.requiredDate) },
          { key: "warehouse", label: "คลัง" },
          {
            key: "total",
            label: "มูลค่ารวม VAT",
            align: "right",
            sortable: true,
            sortValue: (s) => docGrand(s.items, s.vatPct),
            render: (s) => <span className="num font-semibold">{displayMoney(docGrand(s.items, s.vatPct), erp.currency)}</span>,
          },
          { key: "status", label: "สถานะ", render: (s) => <StatusBadge status={s.status} /> },
        ]}
      />
    </div>
  );
}
