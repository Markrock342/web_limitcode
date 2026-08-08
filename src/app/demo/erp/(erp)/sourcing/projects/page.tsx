"use client";

import { useRouter } from "next/navigation";
import type { SourcingProject } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate, num } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";

export default function SourcingProjectsPage() {
  const erp = useErp();
  const router = useRouter();

  const customerName = (id: string) => erp.customers.find((c) => c.id === id)?.name ?? "-";

  return (
    <div>
      <PageHeader
        title="Sourcing Projects"
        subtitle="งานจัดหาสินค้าตาม Requirement ลูกค้า — เทียบซัพพลายเออร์จีน/ไทย พร้อม Landed Cost"
        actions={
          <button className="btn-primary text-xs" onClick={() => erp.toast("Demo: ฟอร์มเปิด Sourcing Request ใหม่", "info")}>
            + Sourcing Request
          </button>
        }
      />

      <DataTable<SourcingProject>
        rows={erp.sourcingProjects}
        searchKeys={(p) => `${p.number} ${p.title} ${customerName(p.customerId)}`}
        filters={[
          {
            label: "สถานะ",
            options: ["New Request", "Supplier RFQ", "Comparing", "Supplier Selected", "Quotation Sent", "Customer PO", "In Procurement", "Completed"],
            match: (p, v) => p.status === v,
          },
        ]}
        onRowClick={(p) => router.push(`/demo/erp/sourcing/projects/${p.id}`)}
        columns={[
          { key: "number", label: "เลขที่", render: (p) => <span className="num font-bold text-brand-600">{p.number}</span> },
          {
            key: "title",
            label: "Requirement",
            render: (p) => (
              <div>
                <p className="font-semibold text-slate-800">{p.title}</p>
                <p className="text-[11px] text-slate-400">{customerName(p.customerId)}</p>
              </div>
            ),
          },
          { key: "qty", label: "จำนวน", align: "right", render: (p) => <span className="num">{num(p.qty)}</span> },
          {
            key: "target",
            label: "Target Price",
            align: "right",
            render: (p) => <span className="num">{displayMoney(p.targetPrice, erp.currency)}</span>,
          },
          { key: "options", label: "ตัวเลือก Supplier", align: "center", render: (p) => `${p.options.length} ราย` },
          { key: "requiredDate", label: "ต้องการภายใน", render: (p) => fmtDate(p.requiredDate) },
          { key: "salesperson", label: "ผู้ดูแล" },
          { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
        ]}
      />
    </div>
  );
}
