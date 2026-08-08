"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Supplier } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { Drawer, FieldRow, PageHeader } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

export default function SuppliersPage() {
  const erp = useErp();
  const [selected, setSelected] = useState<Supplier | null>(null);

  return (
    <div>
      <PageHeader
        title="Suppliers"
        subtitle="ซัพพลายเออร์จีน–ไทย, Forwarder, Broker พร้อม Scorecard คุณภาพและการส่งมอบ"
        actions={<button className="btn-primary text-xs" onClick={() => erp.toast("Demo: Supplier ใหม่ต้องผ่าน Approval Workflow", "info")}>+ Supplier ใหม่</button>}
      />

      <DataTable<Supplier>
        rows={SUPPLIERS}
        searchKeys={(s) => `${s.code} ${s.name} ${s.type} ${s.contact}`}
        filters={[
          { label: "ประเทศ", options: ["จีน", "ไทย"], match: (s, v) => (v === "จีน" ? s.country === "CN" : s.country === "TH") },
          {
            label: "ประเภท",
            options: ["China Supplier", "Thai Factory", "Freight Forwarder", "Custom Broker"],
            match: (s, v) => s.type === v,
          },
        ]}
        onRowClick={(s) => setSelected(s)}
        columns={[
          { key: "code", label: "รหัส", render: (s) => <span className="num text-slate-500">{s.code}</span> },
          {
            key: "name",
            label: "Supplier",
            render: (s) => (
              <div className="flex items-center gap-2">
                <span>{s.country === "CN" ? "🇨🇳" : "🇹🇭"}</span>
                <div>
                  <p className="font-semibold text-slate-800">{s.name}</p>
                  <p className="text-[11px] text-slate-400">{s.type}</p>
                </div>
              </div>
            ),
          },
          { key: "currency", label: "สกุลเงิน", align: "center" },
          { key: "paymentTerm", label: "Payment Term" },
          { key: "leadTimeDays", label: "Lead Time", align: "center", render: (s) => (s.leadTimeDays ? `${s.leadTimeDays} วัน` : "-") },
          {
            key: "quality",
            label: "Quality",
            align: "center",
            sortable: true,
            sortValue: (s) => s.qualityPct,
            render: (s) => <span className={`num font-bold ${s.qualityPct >= 94 ? "text-emerald-600" : "text-amber-600"}`}>{s.qualityPct}%</span>,
          },
          {
            key: "ontime",
            label: "On-time",
            align: "center",
            render: (s) => <span className="num">{s.onTimePct}%</span>,
          },
          {
            key: "rating",
            label: "Rating",
            align: "center",
            sortable: true,
            sortValue: (s) => s.rating,
            render: (s) => (
              <span className="inline-flex items-center gap-1 font-display text-xs font-bold text-amber-500">
                <Star size={11} fill="currentColor" />
                {s.rating.toFixed(1)}
              </span>
            ),
          },
          {
            key: "ytd",
            label: "ยอดซื้อ YTD",
            align: "right",
            sortable: true,
            sortValue: (s) => s.purchaseValueYTD,
            render: (s) => <span className="num font-semibold">{displayMoney(s.purchaseValueYTD, erp.currency)}</span>,
          },
        ]}
      />

      {/* supplier scorecard drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Supplier Scorecard" wide>
        {selected ? (
          <div>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-base font-bold text-slate-800">
                  {selected.country === "CN" ? "🇨🇳 " : "🇹🇭 "}
                  {selected.name}
                </p>
                <p className="text-xs text-slate-400">{selected.code} • {selected.type}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-display text-sm font-bold text-amber-600">
                <Star size={13} fill="currentColor" /> {selected.rating.toFixed(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Quality", value: `${selected.qualityPct}%`, good: selected.qualityPct >= 94 },
                { label: "On-time Delivery", value: `${selected.onTimePct}%`, good: selected.onTimePct >= 90 },
                { label: "Rejected Rate", value: `${selected.rejectedPct}%`, good: selected.rejectedPct <= 2 },
                { label: "Avg Lead Time", value: selected.leadTimeDays ? `${selected.leadTimeDays} วัน` : "-", good: true },
              ].map((k) => (
                <div key={k.label} className="rounded-xl bg-slate-50 p-3.5">
                  <p className="text-[11px] text-slate-400">{k.label}</p>
                  <p className={`num mt-1 text-lg font-bold ${k.good ? "text-emerald-600" : "text-amber-600"}`}>{k.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-brand-50 p-4">
              <p className="text-[11px] text-brand-600">ยอดซื้อสะสมปีนี้</p>
              <p className="num text-xl font-bold text-brand-700">{displayMoney(selected.purchaseValueYTD, erp.currency)}</p>
            </div>

            <div className="mt-4">
              <FieldRow label="ผู้ติดต่อ" value={selected.contact} />
              {selected.wechat ? <FieldRow label="WeChat" value={selected.wechat} /> : null}
              {selected.line ? <FieldRow label="LINE" value={selected.line} /> : null}
              {selected.alibaba ? <FieldRow label="Alibaba" value={<span className="num text-xs">{selected.alibaba}</span>} /> : null}
              <FieldRow label="Payment Term" value={selected.paymentTerm} />
              {selected.moq ? <FieldRow label="MOQ" value={selected.moq} /> : null}
            </div>

            <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
              การเปลี่ยนบัญชีธนาคาร Supplier ต้องผ่าน Approval + ยืนยันทางโทรศัพท์เสมอ (นโยบายป้องกันการฉ้อโกง)
            </p>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
