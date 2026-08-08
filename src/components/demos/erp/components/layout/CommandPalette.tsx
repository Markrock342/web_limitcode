"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, Zap } from "lucide-react";
import { QUICK_ACTIONS } from "@/components/demos/erp/lib/nav";
import { useErp } from "@/components/demos/erp/lib/store";

interface Hit {
  group: string;
  label: string;
  detail?: string;
  href: string;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const erp = useErp();
  const router = useRouter();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const out: Hit[] = [];
    const push = (group: string, label: string, href: string, detail?: string) => {
      if (label.toLowerCase().includes(needle) || (detail ?? "").toLowerCase().includes(needle))
        out.push({ group, label, href, detail });
    };
    erp.customers.forEach((c) => push("ลูกค้า", c.name, `/demo/erp/crm/customers/${c.id}`, c.code));
    erp.products.forEach((p) => push("สินค้า / SKU", `${p.sku} — ${p.nameTh}`, `/demo/erp/inventory/products/${p.id}`, p.nameEn));
    erp.quotations.forEach((x) => push("Quotation", x.number, `/demo/erp/sales/quotations/${x.id}`));
    erp.salesOrders.forEach((x) => push("Sales Order", x.number, `/demo/erp/sales/orders/${x.id}`));
    erp.purchaseOrders.forEach((x) => push("Purchase Order", x.number, `/demo/erp/purchasing/orders/${x.id}`));
    erp.shipments.forEach((x) => push("Shipment", x.number, `/demo/erp/import/shipments/${x.id}`, x.container));
    erp.arInvoices.forEach((x) => push("Invoice", x.number, "/demo/erp/finance/ar"));
    erp.sourcingProjects.forEach((x) => push("Sourcing", `${x.number} — ${x.title}`, `/demo/erp/sourcing/projects/${x.id}`));
    return out.slice(0, 12);
  }, [q, erp]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-4">
          <Search size={16} className="text-slate-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="พิมพ์เพื่อค้นหา ลูกค้า / SKU / เอกสาร... "
            className="w-full py-3.5 text-sm outline-none placeholder:text-slate-400"
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "Enter" && hits[0]) go(hits[0].href);
            }}
          />
          <kbd className="rounded border border-slate-200 px-1.5 font-display text-[10px] text-slate-400">ESC</kbd>
        </div>

        <div className="thin-scroll max-h-[50vh] overflow-y-auto p-2">
          {q === "" ? (
            <>
              <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Quick Actions
              </p>
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  onClick={() => go(a.href)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-700 hover:bg-brand-50"
                >
                  <Zap size={14} className="text-brand-500" />
                  {a.label}
                </button>
              ))}
            </>
          ) : hits.length === 0 ? (
            <p className="px-3 py-8 text-center text-[13px] text-slate-400">ไม่พบผลลัพธ์สำหรับ “{q}”</p>
          ) : (
            hits.map((h, i) => (
              <button
                key={i}
                onClick={() => go(h.href)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-brand-50"
              >
                <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  {h.group}
                </span>
                <span className="flex-1 truncate text-[13px] font-medium text-slate-700">{h.label}</span>
                {h.detail ? <span className="text-[11px] text-slate-400">{h.detail}</span> : null}
                <ArrowRight size={13} className="text-slate-300" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
