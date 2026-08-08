"use client";

import type { APInvoice } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { daysOverdue, displayMoney, fmtDate } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { KpiCard, PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

export default function ApPage() {
  const erp = useErp();
  const supplierName = (id: string) => SUPPLIERS.find((s) => s.id === id)?.name ?? "-";

  const open = erp.apInvoices.filter((i) => i.status !== "Paid");
  const outstanding = open.reduce((s, i) => s + (i.amount - i.paid), 0);
  const due7 = open.filter((i) => i.dueDate <= "2026-08-15").reduce((s, i) => s + (i.amount - i.paid), 0);
  const overseas = open.filter((i) => i.currency !== "THB").reduce((s, i) => s + (i.amount - i.paid), 0);

  return (
    <div>
      <PageHeader
        title="Accounts Payable"
        subtitle="เจ้าหนี้การค้า — รวมเจ้าหนี้ต่างประเทศ (Deposit / T/T) และในประเทศ"
      />

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard label="เจ้าหนี้คงค้างรวม" value={displayMoney(outstanding, erp.currency)} accent />
        <KpiCard label="ครบกำหนดใน 7 วัน" value={displayMoney(due7, erp.currency)} sub="เตรียมสภาพคล่อง" />
        <KpiCard label="เจ้าหนี้ต่างประเทศ" value={displayMoney(overseas, erp.currency)} sub="ชำระเป็น CNY (T/T)" />
        <KpiCard label="Deposit จ่ายล่วงหน้า" value={displayMoney(351_330, erp.currency)} sub="30% ของ PO-CN-2026-0188" />
      </div>

      <div className="mt-4">
        <DataTable<APInvoice>
          rows={erp.apInvoices}
          searchKeys={(i) => `${i.number} ${supplierName(i.supplierId)}`}
          filters={[
            { label: "สถานะ", options: ["Open", "Overdue", "Partial", "Paid"], match: (i, v) => i.status === v },
            { label: "สกุลเงิน", options: ["THB", "CNY"], match: (i, v) => i.currency === v },
          ]}
          columns={[
            { key: "number", label: "Supplier Invoice", render: (i) => <span className="num font-bold text-brand-600">{i.number}</span> },
            {
              key: "supplier",
              label: "Supplier",
              render: (i) => {
                const s = SUPPLIERS.find((x) => x.id === i.supplierId);
                return (
                  <span className="font-semibold text-slate-700">
                    {s?.country === "CN" ? "🇨🇳 " : "🇹🇭 "}
                    {s?.name}
                  </span>
                );
              },
            },
            { key: "currency", label: "สกุลเงิน", align: "center" },
            { key: "date", label: "วันที่", render: (i) => fmtDate(i.date) },
            { key: "dueDate", label: "ครบกำหนด", sortable: true, sortValue: (i) => i.dueDate, render: (i) => fmtDate(i.dueDate) },
            {
              key: "overdue",
              label: "เกินกำหนด",
              align: "center",
              render: (i) => {
                if (i.status === "Paid") return <span className="text-slate-300">-</span>;
                const d = daysOverdue(i.dueDate);
                return d > 0 ? <span className="num font-bold text-red-600">{d} วัน</span> : <span className="text-slate-400">-</span>;
              },
            },
            {
              key: "outstanding",
              label: "คงค้าง",
              align: "right",
              sortable: true,
              sortValue: (i) => i.amount - i.paid,
              render: (i) => <span className="num font-bold">{displayMoney(i.amount - i.paid, erp.currency)}</span>,
            },
            { key: "status", label: "สถานะ", render: (i) => <StatusBadge status={i.status} /> },
            {
              key: "action",
              label: "",
              render: (i) =>
                i.status !== "Paid" ? (
                  <button
                    className="btn-outline !px-2.5 !py-1 text-[11px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      erp.toast(`Demo: สร้างรายการจ่ายชำระ ${i.number}${i.currency !== "THB" ? " (T/T ต่างประเทศ + บันทึก FX Gain/Loss)" : ""}`, "info");
                    }}
                  >
                    ตั้งจ่าย
                  </button>
                ) : null,
            },
          ]}
        />
      </div>
    </div>
  );
}
