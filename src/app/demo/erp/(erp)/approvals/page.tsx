"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { fmtDate, money } from "@/components/demos/erp/lib/format";
import { KpiCard, PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";

export default function ApprovalsPage() {
  const erp = useErp();
  const pending = erp.approvals.filter((a) => a.status === "Pending");

  return (
    <div>
      <PageHeader
        title="Approval Center"
        subtitle="ศูนย์รวมรายการรออนุมัติ — PO, ส่วนลดเกินเพดาน, เครดิตเกินวงเงิน, ค่าใช้จ่าย, เปลี่ยนบัญชี Supplier"
      />

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard label="รออนุมัติ" value={String(pending.length)} accent />
        <KpiCard label="อนุมัติแล้ว (เดือนนี้)" value={String(erp.approvals.filter((a) => a.status === "Approved").length + 11)} />
        <KpiCard label="มูลค่ารวมที่รออนุมัติ" value={money(pending.reduce((s, a) => s + (a.amount ?? 0), 0), "THB", 0)} />
        <KpiCard label="SLA เฉลี่ย" value="4.2 ชม." sub="เวลาอนุมัติเฉลี่ย" />
      </div>

      <div className="mt-5 space-y-3">
        {erp.approvals.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#0E1A34]/5 px-2 py-0.5 text-[11px] font-bold text-[#0E1A34]">
                    {a.type}
                  </span>
                  <StatusBadge status={a.status} />
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock3 size={11} />
                    {fmtDate(a.date)}
                  </span>
                </div>
                <p className="mt-2 text-[14px] font-bold text-slate-800">{a.title}</p>
                <p className="mt-1 text-[13px] text-slate-500">{a.reason}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span>ผู้ขอ: <span className="font-semibold text-slate-600">{a.requester}</span></span>
                  <span>แผนก: {a.department}</span>
                  <span>ผู้อนุมัติ: <span className="font-semibold text-slate-600">{a.approver}</span></span>
                  {a.amount ? (
                    <span>มูลค่า: <span className="num font-bold text-slate-700">{money(a.amount, "THB", 0)}</span></span>
                  ) : null}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {a.refLink ? (
                  <Link href={a.refLink} className="btn-ghost text-xs">
                    เปิดเอกสาร
                  </Link>
                ) : null}
                {a.status === "Pending" ? (
                  <>
                    <button className="btn-outline text-xs" onClick={() => erp.toast("Demo: ส่งกลับให้แก้ไข (Request Change)", "info")}>
                      ขอแก้ไข
                    </button>
                    <button className="btn-danger text-xs" onClick={() => erp.decideApproval(a.id, false)}>
                      <XCircle size={14} />
                      ปฏิเสธ
                    </button>
                    <button className="btn-success text-xs" onClick={() => erp.decideApproval(a.id, true)}>
                      <CheckCircle2 size={14} />
                      อนุมัติ
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
