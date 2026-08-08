"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import type { PipelineStage } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, fmtDate } from "@/components/demos/erp/lib/format";
import { PageHeader } from "@/components/demos/erp/components/erp/ui";

const STAGES: PipelineStage[] = [
  "New Lead",
  "Contacted",
  "Requirement",
  "Sourcing",
  "Quotation",
  "Negotiation",
  "Customer PO",
  "Won",
  "Lost",
];

const STAGE_COLOR: Record<string, string> = {
  "New Lead": "border-t-slate-300",
  Contacted: "border-t-sky-400",
  Requirement: "border-t-cyan-400",
  Sourcing: "border-t-amber-400",
  Quotation: "border-t-indigo-400",
  Negotiation: "border-t-violet-400",
  "Customer PO": "border-t-teal-400",
  Won: "border-t-emerald-500",
  Lost: "border-t-red-300",
};

export default function PipelinePage() {
  const erp = useErp();

  const move = (id: string, dir: 1 | -1, current: PipelineStage) => {
    const idx = STAGES.indexOf(current);
    const next = STAGES[idx + dir];
    if (next) erp.moveOpportunity(id, next);
  };

  const pipelineValue = erp.opportunities
    .filter((o) => !["Won", "Lost"].includes(o.stage))
    .reduce((s, o) => s + o.value, 0);

  return (
    <div>
      <PageHeader
        title="Sales Pipeline"
        subtitle={`มูลค่า Pipeline ที่เปิดอยู่ ${displayMoney(pipelineValue, erp.currency)} • ${
          erp.opportunities.filter((o) => !["Won", "Lost"].includes(o.stage)).length
        } โอกาสการขาย`}
        actions={
          <Link href="/demo/erp/crm/customers?new=1" className="btn-primary text-xs">
            + สร้างลูกค้าใหม่
          </Link>
        }
      />

      <div className="thin-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-3">
        {STAGES.map((stage) => {
          const cards = erp.opportunities.filter((o) => o.stage === stage);
          const total = cards.reduce((s, c) => s + c.value, 0);
          return (
            <div key={stage} className="w-[240px] shrink-0">
              <div className={`card border-t-[3px] ${STAGE_COLOR[stage]} px-3 py-2.5`}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-700">{stage}</p>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-display text-[10px] font-bold text-slate-500">
                    {cards.length}
                  </span>
                </div>
                <p className="num mt-0.5 text-[11px] text-slate-400">
                  {displayMoney(total, erp.currency)}
                </p>
              </div>

              <div className="mt-2 space-y-2">
                {cards.map((c) => (
                  <div key={c.id} className="card p-3">
                    <p className="text-xs font-bold leading-snug text-slate-800">{c.title}</p>
                    {c.customerId ? (
                      <Link
                        href={`/demo/erp/crm/customers/${c.customerId}`}
                        className="mt-0.5 block text-[11px] text-brand-600 hover:underline"
                      >
                        {c.customerName}
                      </Link>
                    ) : (
                      <p className="mt-0.5 text-[11px] text-slate-500">{c.customerName}</p>
                    )}
                    <p className="num mt-1.5 text-sm font-bold text-slate-800">
                      {displayMoney(c.value, erp.currency)}
                    </p>

                    {/* probability */}
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          c.probability >= 70 ? "bg-emerald-500" : c.probability >= 40 ? "bg-amber-400" : "bg-slate-300"
                        }`}
                        style={{ width: `${c.probability}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <User size={10} />
                        {c.salesperson}
                      </span>
                      <span>{c.probability}%</span>
                    </div>
                    {c.nextFollowUp !== "-" ? (
                      <p className="mt-1 text-[10px] text-slate-400">
                        ติดตาม: <span className="font-semibold text-slate-500">{fmtDate(c.nextFollowUp)}</span>
                      </p>
                    ) : null}

                    <div className="mt-2 flex justify-between border-t border-slate-100 pt-2">
                      <button
                        className="btn-ghost !p-1"
                        disabled={STAGES.indexOf(c.stage) === 0}
                        onClick={() => move(c.id, -1, c.stage)}
                        title="ย้ายกลับ"
                      >
                        <ChevronLeft size={13} />
                      </button>
                      <button
                        className="btn-ghost !p-1"
                        disabled={STAGES.indexOf(c.stage) === STAGES.length - 1}
                        onClick={() => move(c.id, 1, c.stage)}
                        title="ย้ายไปขั้นถัดไป"
                      >
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
