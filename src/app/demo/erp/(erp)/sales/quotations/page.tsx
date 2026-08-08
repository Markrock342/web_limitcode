"use client";

import { useRouter } from "next/navigation";
import type { Quotation } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, docGrand, docMarginPct, fmtDate } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";

export default function QuotationsPage() {
  const erp = useErp();
  const router = useRouter();
  const customerName = (id: string) => erp.customers.find((c) => c.id === id)?.name ?? "-";

  return (
    <div>
      <PageHeader
        title="Quotations"
        subtitle="ใบเสนอราคา — เห็น Margin ภายใน และแปลงเป็น Sales Order ได้ทันที"
        actions={<button className="btn-primary text-xs" onClick={() => erp.toast("Demo: ฟอร์มสร้าง Quotation ใหม่", "info")}>+ สร้าง Quotation</button>}
      />

      <DataTable<Quotation>
        rows={erp.quotations}
        searchKeys={(q) => `${q.number} ${customerName(q.customerId)} ${q.salesperson}`}
        filters={[
          { label: "สถานะ", options: ["Draft", "Sent", "Approved", "Converted", "Expired"], match: (q, v) => q.status === v },
          { label: "พนักงานขาย", options: ["วิชัย ส.", "อรทัย พ.", "ธนกร ล."], match: (q, v) => q.salesperson === v },
        ]}
        onRowClick={(q) => router.push(`/demo/erp/sales/quotations/${q.id}`)}
        columns={[
          { key: "number", label: "เลขที่", render: (q) => <span className="num font-bold text-brand-600">{q.number}</span> },
          {
            key: "customer",
            label: "ลูกค้า",
            render: (q) => <span className="font-semibold text-slate-800">{customerName(q.customerId)}</span>,
          },
          { key: "date", label: "วันที่", sortable: true, sortValue: (q) => q.date, render: (q) => fmtDate(q.date) },
          { key: "validUntil", label: "ยืนราคาถึง", render: (q) => fmtDate(q.validUntil) },
          { key: "salesperson", label: "พนักงานขาย" },
          {
            key: "total",
            label: "มูลค่ารวม VAT",
            align: "right",
            sortable: true,
            sortValue: (q) => docGrand(q.items, q.vatPct),
            render: (q) => <span className="num font-semibold">{displayMoney(docGrand(q.items, q.vatPct), erp.currency)}</span>,
          },
          {
            key: "margin",
            label: "Margin (ภายใน)",
            align: "right",
            render: (q) => {
              const mg = docMarginPct(q.items);
              return <span className={`num font-bold ${mg >= 30 ? "text-emerald-600" : mg >= 15 ? "text-amber-600" : "text-red-600"}`}>{mg.toFixed(1)}%</span>;
            },
          },
          { key: "status", label: "สถานะ", render: (q) => <StatusBadge status={q.status} /> },
        ]}
      />
    </div>
  );
}
