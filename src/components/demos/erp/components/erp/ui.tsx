"use client";

import Link from "next/link";
import { X, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useId, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useErp } from "@/components/demos/erp/lib/store";

const subscribeToClient = () => () => undefined;

function OverlayPortal({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(subscribeToClient, () => true, () => false);
  if (!isClient) return null;
  return createPortal(children, document.querySelector(".erp-demo") ?? document.body);
}

function useOverlay(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);
}

/* ---------- Page header ---------- */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/* ---------- KPI card ---------- */

export function KpiCard({
  label,
  value,
  sub,
  trend,
  accent = false,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: number;
  accent?: boolean;
}) {
  return (
    <div className={`card p-4 ${accent ? "border-brand-200 bg-gradient-to-br from-brand-50 to-white" : ""}`}>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="num mt-1.5 text-[22px] font-bold leading-tight text-slate-800">{value}</p>
      <div className="mt-1 flex items-center gap-1.5">
        {trend !== undefined ? (
          <span
            className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
              trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}
          >
            {trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trend >= 0 ? "+" : ""}
            {trend.toFixed(1)}%
          </span>
        ) : null}
        {sub ? <span className="text-[11px] text-slate-400">{sub}</span> : null}
      </div>
    </div>
  );
}

/* ---------- Status badge (map กลางทั้งระบบ) ---------- */

const STATUS_STYLE: Record<string, string> = {
  // generic
  Draft: "bg-slate-100 text-slate-600",
  Sent: "bg-sky-50 text-sky-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Converted: "bg-indigo-50 text-indigo-700",
  Expired: "bg-slate-100 text-slate-400",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-600",
  // SO
  Confirmed: "bg-sky-50 text-sky-700",
  "Awaiting Stock": "bg-amber-50 text-amber-700",
  Reserved: "bg-violet-50 text-violet-700",
  Picking: "bg-indigo-50 text-indigo-700",
  Packing: "bg-indigo-50 text-indigo-700",
  "Ready to Ship": "bg-cyan-50 text-cyan-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Invoiced: "bg-teal-50 text-teal-700",
  Paid: "bg-emerald-100 text-emerald-800",
  // PO
  "Pending Approval": "bg-amber-50 text-amber-700",
  Production: "bg-blue-50 text-blue-700",
  Shipped: "bg-cyan-50 text-cyan-700",
  Received: "bg-emerald-50 text-emerald-700",
  Closed: "bg-slate-100 text-slate-500",
  // Shipment (Thai)
  "กำลังผลิต": "bg-blue-50 text-blue-700",
  "รอโหลดสินค้า": "bg-sky-50 text-sky-700",
  "ออกจากจีนแล้ว": "bg-cyan-50 text-cyan-700",
  "อยู่ระหว่างขนส่ง": "bg-indigo-50 text-indigo-700",
  "ถึงท่าเรือไทย": "bg-violet-50 text-violet-700",
  "Customs Clearance": "bg-amber-50 text-amber-700",
  "รอรับเข้าโกดัง": "bg-orange-50 text-orange-600",
  Completed: "bg-emerald-50 text-emerald-700",
  // Invoice
  Open: "bg-sky-50 text-sky-700",
  Overdue: "bg-red-50 text-red-600",
  Partial: "bg-amber-50 text-amber-700",
  // Delivery
  Preparing: "bg-slate-100 text-slate-600",
  Loaded: "bg-sky-50 text-sky-700",
  "On Route": "bg-indigo-50 text-indigo-700",
  Failed: "bg-red-50 text-red-600",
  // QC
  Pass: "bg-emerald-50 text-emerald-700",
  "Conditional Pass": "bg-amber-50 text-amber-700",
  Reject: "bg-red-50 text-red-600",
  // sourcing
  "New Request": "bg-slate-100 text-slate-600",
  "Supplier RFQ": "bg-sky-50 text-sky-700",
  Comparing: "bg-amber-50 text-amber-700",
  "Supplier Selected": "bg-violet-50 text-violet-700",
  "Quotation Sent": "bg-indigo-50 text-indigo-700",
  "Customer PO": "bg-teal-50 text-teal-700",
  "In Procurement": "bg-blue-50 text-blue-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
        STATUS_STYLE[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

/* ---------- Drawer ---------- */

export function Drawer({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const titleId = useId();
  useOverlay(open, onClose);
  if (!open) return null;
  return (
    <OverlayPortal>
      <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button
          type="button"
          aria-label="ปิดหน้าต่าง"
          className="absolute inset-0 cursor-default bg-slate-900/40 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[calc(100%-1rem)] flex-col bg-white shadow-2xl sm:w-full ${
            wide ? "max-w-2xl" : "max-w-md"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h3 id={titleId} className="text-sm font-bold text-slate-800">{title}</h3>
            <button type="button" aria-label="ปิด" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
              <X size={17} />
            </button>
          </div>
          <div className="thin-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">{children}</div>
        </div>
      </div>
    </OverlayPortal>
  );
}

/* ---------- Modal ---------- */

export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const titleId = useId();
  useOverlay(open, onClose);
  if (!open) return null;
  return (
    <OverlayPortal>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button
          type="button"
          aria-label="ปิดหน้าต่าง"
          className="absolute inset-0 cursor-default bg-slate-900/40 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <div
          className={`relative flex max-h-[calc(100dvh-1.5rem)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[88vh] ${
            wide ? "max-w-3xl" : "max-w-lg"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h3 id={titleId} className="text-sm font-bold text-slate-800">{title}</h3>
            <button type="button" aria-label="ปิด" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
              <X size={17} />
            </button>
          </div>
          <div className="thin-scroll min-h-0 overflow-y-auto p-4 sm:p-5">{children}</div>
        </div>
      </div>
    </OverlayPortal>
  );
}

/* ---------- Field row (รายละเอียดเอกสาร) ---------- */

export function FieldRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-2 text-[13px] last:border-0">
      <span className="shrink-0 text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-800">{value}</span>
    </div>
  );
}

/* ---------- Document flow (ความสัมพันธ์เอกสาร) ---------- */

export interface DocFlowNode {
  label: string;
  code?: string;
  href?: string;
  state: "done" | "current" | "todo";
}

export function DocFlow({ nodes }: { nodes: DocFlowNode[] }) {
  return (
    <div className="thin-scroll flex items-center gap-1 overflow-x-auto pb-1">
      {nodes.map((n, i) => (
        <div key={i} className="flex shrink-0 items-center gap-1">
          {i > 0 && <ArrowRight size={13} className="shrink-0 text-slate-300" />}
          {n.href ? (
            <Link
              href={n.href}
              className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                n.state === "done"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400"
                  : n.state === "current"
                    ? "border-brand-300 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20"
                    : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              <span className="block">{n.label}</span>
              {n.code ? <span className="num block font-bold">{n.code}</span> : null}
            </Link>
          ) : (
            <div
              className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold ${
                n.state === "done"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : n.state === "current"
                    ? "border-brand-300 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20"
                    : "border-dashed border-slate-200 bg-white text-slate-400"
              }`}
            >
              <span className="block">{n.label}</span>
              {n.code ? <span className="num block font-bold">{n.code}</span> : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Toast viewport ---------- */

export function ToastViewport() {
  const { toasts, dismissToast } = useErp();
  return (
    <OverlayPortal>
      <div aria-live="polite" aria-atomic="false" className="pointer-events-none fixed inset-x-3 bottom-3 z-[120] flex flex-col-reverse gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-[13px] font-medium leading-5 shadow-xl ${
              t.type === "success"
                ? "border-emerald-200 bg-white text-emerald-700"
                : t.type === "warning"
                  ? "border-amber-200 bg-white text-amber-700"
                  : "border-brand-200 bg-white text-brand-700"
            }`}
          >
            <span className="flex-1">{t.msg}</span>
            <button type="button" aria-label="ปิดการแจ้งเตือน" onClick={() => dismissToast(t.id)} className="mt-0.5 shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </OverlayPortal>
  );
}

/* ---------- Demo badge ---------- */

export function DemoBadge() {
  const { resetDemo } = useErp();
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
        Demo Mode
      </span>
      <button
        onClick={resetDemo}
        className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:border-brand-300 hover:text-brand-600"
      >
        Reset Demo
      </button>
    </div>
  );
}
