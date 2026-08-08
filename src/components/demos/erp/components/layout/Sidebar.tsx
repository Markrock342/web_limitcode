"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Boxes,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronDown,
  FolderOpen,
  Gauge,
  Receipt,
  Search,
  Settings,
  Ship,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { NAV } from "@/components/demos/erp/lib/nav";

const ICONS: Record<string, LucideIcon> = {
  gauge: Gauge,
  users: Users,
  receipt: Receipt,
  search: Search,
  "shopping-cart": ShoppingCart,
  ship: Ship,
  boxes: Boxes,
  warehouse: Warehouse,
  truck: Truck,
  wallet: Wallet,
  calculator: Calculator,
  "bar-chart": BarChart3,
  "check-circle": CheckCircle2,
  folder: FolderOpen,
  building: Building2,
  settings: Settings,
};

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    // เปิด group ที่ path ปัจจุบันอยู่
    const init: Record<string, boolean> = {};
    for (const g of NAV) {
      if (g.items?.some((it) => pathname.startsWith(it.href.split("?")[0]))) init[g.label] = true;
    }
    return init;
  });

  const isActive = (href: string) => {
    const clean = href.split("?")[0];
    return clean !== "/" && (pathname === clean || pathname.startsWith(clean + "/"));
  };

  return (
    <aside className="flex h-full w-60 flex-col bg-[#0A1428] text-slate-300">
      {/* brand */}
      <Link href="/demo/erp/dashboard" className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-sky-400 font-display text-xs font-bold text-white">
          LCS
        </span>
        <div className="leading-tight">
          <p className="font-display text-[13px] font-bold text-white">LCS Enterprise ERP</p>
          <p className="text-[9px] tracking-[0.14em] text-slate-400">IMPORT • DISTRIBUTION • B2B</p>
        </div>
      </Link>

      {/* nav */}
      <nav className="thin-scroll flex-1 overflow-y-auto px-2.5 py-3">
        {NAV.map((group) => {
          const Icon = ICONS[group.icon] ?? Gauge;
          if (!group.items) {
            const active = group.href ? isActive(group.href) : false;
            return (
              <Link
                key={group.label}
                href={group.href ?? "#"}
                onClick={onNavigate}
                className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                  active ? "bg-brand-600 text-white" : "hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon size={16} className={active ? "text-white" : "text-slate-400"} />
                {group.label}
              </Link>
            );
          }
          const expanded = open[group.label] ?? false;
          const groupActive = group.items.some((it) => isActive(it.href));
          return (
            <div key={group.label} className="mb-0.5">
              <button
                onClick={() => setOpen((o) => ({ ...o, [group.label]: !expanded }))}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                  groupActive && !expanded ? "text-white" : ""
                } hover:bg-white/[0.06] hover:text-white`}
              >
                <Icon size={16} className={groupActive ? "text-brand-300" : "text-slate-400"} />
                <span className="flex-1 text-left">{group.label}</span>
                <ChevronDown
                  size={13}
                  className={`text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
              {expanded ? (
                <div className="mb-1 ml-[21px] border-l border-white/[0.08] pl-3">
                  {group.items.map((item, idx) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={`${item.label}-${idx}`}
                        href={item.href}
                        onClick={onNavigate}
                        className={`block rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                          active
                            ? "bg-brand-600/20 font-semibold text-brand-200"
                            : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      {/* footer branding — สุภาพ ไม่โฆษณา */}
      <div className="border-t border-white/[0.07] px-4 py-3">
        <p className="text-[9px] leading-relaxed text-slate-500">
          ERP Demo by LIMIT CODE STUDIO
          <br />
          www.limitcode.shop
        </p>
      </div>
    </aside>
  );
}
