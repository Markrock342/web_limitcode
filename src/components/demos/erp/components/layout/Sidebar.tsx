"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3, Boxes, Building2, Calculator, CheckCircle2, ChevronDown, FolderOpen,
  Gauge, Receipt, Search, Settings, Ship, ShoppingCart, Truck, Users, Wallet,
  Warehouse, type LucideIcon,
} from "lucide-react";
import { NAV } from "@/components/demos/erp/lib/nav";
import { useErp } from "@/components/demos/erp/lib/store";
import { erpText } from "@/components/demos/erp/lib/i18n";

const ICONS: Record<string, LucideIcon> = {
  gauge: Gauge, users: Users, receipt: Receipt, search: Search,
  "shopping-cart": ShoppingCart, ship: Ship, boxes: Boxes, warehouse: Warehouse,
  truck: Truck, wallet: Wallet, calculator: Calculator, "bar-chart": BarChart3,
  "check-circle": CheckCircle2, folder: FolderOpen, building: Building2, settings: Settings,
};

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const erp = useErp();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of NAV) {
      if (group.items?.some((item) => pathname.startsWith(item.href.split("?")[0]))) initial[group.label] = true;
    }
    return initial;
  });

  const label = (value: string) => erpText(erp.language, value);
  const isActive = (href: string) => {
    const clean = href.split("?")[0];
    return clean !== "/" && (pathname === clean || pathname.startsWith(`${clean}/`));
  };

  return (
    <aside className="flex h-full w-[252px] flex-col border-r border-[#d9ddd7] bg-[#f7f8f5] text-[#3d463f]">
      <Link href="/demo/erp/dashboard" className="flex h-[68px] items-center gap-3 border-b border-[#d9ddd7] px-5">
        <span className="grid size-8 shrink-0 place-items-center bg-[#1f2d27] text-[10px] font-bold tracking-[-0.04em] text-[#f2f5f1]">LCS</span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[13px] font-semibold text-[#202722]">LCS Enterprise</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#879087]">Operations ERP</p>
        </div>
      </Link>

      <div className="px-5 pb-2 pt-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#929a92]">
          {erpText(erp.language, "Workspace", "พื้นที่ทำงาน")}
        </p>
      </div>

      <nav className="thin-scroll flex-1 overflow-y-auto px-2.5 pb-5">
        {NAV.map((group) => {
          const Icon = ICONS[group.icon] ?? Gauge;
          if (!group.items) {
            const active = group.href ? isActive(group.href) : false;
            return (
              <Link
                key={group.label}
                href={group.href ?? "#"}
                onClick={onNavigate}
                className={`mb-0.5 flex h-9 items-center gap-2.5 px-2.5 text-[12px] font-medium transition-colors ${
                  active ? "bg-[#dfe8e1] text-[#193226]" : "hover:bg-[#ecefea] hover:text-[#1f2821]"
                }`}
              >
                <Icon size={15} strokeWidth={1.8} className={active ? "text-[#305b45]" : "text-[#7d877f]"} />
                {label(group.label)}
              </Link>
            );
          }

          const expanded = open[group.label] ?? false;
          const groupActive = group.items.some((item) => isActive(item.href));
          return (
            <div key={group.label} className="mb-0.5">
              <button
                onClick={() => setOpen((current) => ({ ...current, [group.label]: !expanded }))}
                className={`flex h-9 w-full items-center gap-2.5 px-2.5 text-[12px] font-medium transition-colors hover:bg-[#ecefea] hover:text-[#1f2821] ${groupActive ? "text-[#264c39]" : ""}`}
              >
                <Icon size={15} strokeWidth={1.8} className={groupActive ? "text-[#305b45]" : "text-[#7d877f]"} />
                <span className="flex-1 text-left">{label(group.label)}</span>
                <ChevronDown size={12} className={`text-[#929a92] transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-200 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="mb-1 ml-[17px] border-l border-[#d5dad4] py-1 pl-4">
                    {group.items.map((item, index) => {
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={`${item.label}-${index}`}
                          href={item.href}
                          onClick={onNavigate}
                          className={`block px-2 py-1.5 text-[11px] transition-colors ${
                            active ? "bg-[#e5ebe6] font-semibold text-[#214232]" : "text-[#6f7871] hover:bg-[#ecefea] hover:text-[#242b26]"
                          }`}
                        >
                          {label(item.label)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-[#d9ddd7] px-5 py-4">
        <div className="flex items-center justify-between text-[10px] text-[#7c857d]">
          <span>{erpText(erp.language, "Demo data", "ข้อมูลทดลอง")}</span>
          <span className="size-1.5 rounded-full bg-[#4e8a68]" />
        </div>
        <p className="mt-1 text-[9px] text-[#9aa19a]">LIMIT CODE STUDIO</p>
      </div>
    </aside>
  );
}
