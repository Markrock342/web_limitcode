"use client";

import { useMemo, useState } from "react";
import { PhoneCall } from "lucide-react";
import type { ARInvoice } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { daysOverdue, displayMoney, fmtDate, money } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { Drawer, FieldRow, KpiCard, PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";
import { AgingChart } from "@/components/demos/erp/components/charts";

export default function ArPage() {
  const erp = useErp();
  const [selected, setSelected] = useState<ARInvoice | null>(null);

  const customerName = (id: string) => erp.customers.find((c) => c.id === id)?.name ?? "-";
  const open = erp.arInvoices.filter((i) => i.status !== "Paid");
  const outstanding = open.reduce((s, i) => s + (i.amount - i.paid), 0);
  const overdue = open.filter((i) => daysOverdue(i.dueDate) > 0);
  const overdueAmt = overdue.reduce((s, i) => s + (i.amount - i.paid), 0);

  const aging = useMemo(() => {
    const buckets = [
      { bucket: "Current", amount: 0 },
      { bucket: "1-30", amount: 0 },
      { bucket: "31-60", amount: 0 },
      { bucket: "61-90", amount: 0 },
      { bucket: "90+", amount: 0 },
    ];
    for (const inv of open) {
      const d = daysOverdue(inv.dueDate);
      const out = inv.amount - inv.paid;
      if (d <= 0) buckets[0].amount += out;
      else if (d <= 30) buckets[1].amount += out;
      else if (d <= 60) buckets[2].amount += out;
      else if (d <= 90) buckets[3].amount += out;
      else buckets[4].amount += out;
    }
    return buckets;
  }, [open]);

  return (
    <div>
      <PageHeader
        title="Accounts Receivable"
        subtitle="ลูกหนี้การค้า — Aging, การติดตามหนี้ และบันทึกรับชำระ"
      />

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard label="ลูกหนี้คงค้างรวม" value={displayMoney(outstanding, erp.currency)} accent />
        <KpiCard label="เกินกำหนดชำระ" value={displayMoney(overdueAmt, erp.currency)} sub={`${overdue.length} ใบแจ้งหนี้`} />
        <KpiCard label="DSO (วันเก็บหนี้เฉลี่ย)" value="38 วัน" sub="เป้าหมาย ≤ 35 วัน" />
        <KpiCard label="คาดรับชำระ 7 วันนี้" value={displayMoney(496_480, erp.currency)} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="card-pad">
          <p className="section-title">AR Aging</p>
          <AgingChart data={aging} />
        </div>

        <div className="xl:col-span-2">
          <DataTable<ARInvoice>
            rows={erp.arInvoices}
            searchKeys={(i) => `${i.number} ${customerName(i.customerId)}`}
            filters={[
              { label: "สถานะ", options: ["Open", "Overdue", "Partial", "Paid"], match: (i, v) => i.status === v },
            ]}
            onRowClick={(i) => setSelected(i)}
            pageSize={8}
            columns={[
              { key: "number", label: "Invoice", render: (i) => <span className="num font-bold text-brand-600">{i.number}</span> },
              { key: "customer", label: "ลูกค้า", render: (i) => <span className="font-semibold text-slate-700">{customerName(i.customerId)}</span> },
              { key: "dueDate", label: "ครบกำหนด", sortable: true, sortValue: (i) => i.dueDate, render: (i) => fmtDate(i.dueDate) },
              {
                key: "overdue",
                label: "เกินกำหนด",
                align: "center",
                sortable: true,
                sortValue: (i) => daysOverdue(i.dueDate),
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
            ]}
          />
        </div>
      </div>

      {/* invoice drawer + collection activity */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="รายละเอียดใบแจ้งหนี้">
        {selected ? (
          <div>
            <p className="num text-lg font-bold text-slate-800">{selected.number}</p>
            <p className="text-[13px] text-slate-500">{customerName(selected.customerId)}</p>

            <div className="mt-4">
              <FieldRow label="วันที่ออก" value={fmtDate(selected.date)} />
              <FieldRow label="ครบกำหนด" value={fmtDate(selected.dueDate)} />
              <FieldRow label="ยอดรวม" value={<span className="num">{money(selected.amount, "THB", 0)}</span>} />
              <FieldRow label="รับชำระแล้ว" value={<span className="num">{money(selected.paid, "THB", 0)}</span>} />
              <FieldRow
                label="คงค้าง"
                value={<span className="num font-bold text-red-600">{money(selected.amount - selected.paid, "THB", 0)}</span>}
              />
              <FieldRow label="สถานะ" value={<StatusBadge status={selected.status} />} />
            </div>

            {selected.status !== "Paid" ? (
              <>
                <button
                  className="btn-success mt-5 w-full"
                  onClick={() => {
                    erp.recordPayment(selected.id);
                    setSelected(null);
                  }}
                >
                  บันทึกรับชำระเต็มจำนวน
                </button>

                <p className="mb-2 mt-6 text-xs font-bold text-slate-500">Collection Activity</p>
                <div className="space-y-2">
                  {["โทรติดตามลูกค้า", "ส่งจดหมายเตือน (Reminder)", "บันทึก Promise to Pay", "นัดรับเช็ค / โอน"].map((a) => (
                    <button
                      key={a}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 px-3.5 py-2.5 text-left text-[13px] text-slate-600 hover:border-brand-300"
                      onClick={() => erp.toast(`บันทึกกิจกรรม: ${a}`, "info")}
                    >
                      <PhoneCall size={14} className="text-brand-500" />
                      {a}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
