"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";
import type { Currency } from "@/components/demos/erp/types/erp";
import { BRANCHES, WAREHOUSES } from "@/components/demos/erp/data/masters";
import { useErp } from "@/components/demos/erp/lib/store";
import { DemoBadge, Drawer } from "@/components/demos/erp/components/erp/ui";

export function Topbar({
  onMenu,
  onOpenPalette,
}: {
  onMenu: () => void;
  onOpenPalette: () => void;
}) {
  const erp = useErp();
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = erp.notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur">
      <button type="button" aria-label="เปิดเมนูหลัก" onClick={onMenu} className="btn-ghost shrink-0 !p-2 lg:hidden">
        <Menu size={18} />
      </button>

      <button
        onClick={onOpenPalette}
        className="hidden w-72 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-[13px] text-slate-400 transition-colors hover:border-brand-300 sm:flex"
      >
        <Search size={14} />
        <span className="flex-1">ค้นหาลูกค้า / SKU / SO / PO / Shipment...</span>
        <kbd className="rounded border border-slate-200 bg-white px-1.5 font-display text-[10px] text-slate-400">
          ⌘K
        </kbd>
      </button>
      <button type="button" aria-label="ค้นหา" onClick={onOpenPalette} className="btn-ghost shrink-0 !p-2 sm:hidden">
        <Search size={17} />
      </button>

      <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
        <div className="hidden md:block">
          <DemoBadge />
        </div>

        {/* branch */}
        <select
          className="input hidden w-auto !py-1.5 text-xs xl:block"
          value={erp.branch}
          onChange={(e) => erp.setBranch(e.target.value)}
          title="สาขา"
        >
          {BRANCHES.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        {/* warehouse */}
        <select
          className="input hidden w-auto !py-1.5 text-xs xl:block"
          value={erp.warehouse}
          onChange={(e) => erp.setWarehouse(e.target.value)}
          title="คลังสินค้า"
        >
          {WAREHOUSES.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>

        {/* currency */}
        <select
          className="input hidden w-[4.5rem] shrink-0 !py-1.5 font-display text-xs sm:block"
          value={erp.currency}
          onChange={(e) => erp.setCurrency(e.target.value as Currency)}
          title="สกุลเงินแสดงผล"
        >
          <option>THB</option>
          <option>CNY</option>
          <option>USD</option>
        </select>

        {/* notifications */}
        <button type="button" aria-label={`เปิดการแจ้งเตือน${unread > 0 ? ` (${unread} รายการยังไม่อ่าน)` : ""}`} onClick={() => setNotifOpen(true)} className="btn-ghost relative shrink-0 !p-2">
          <Bell size={17} />
          {unread > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-red-500 font-display text-[9px] font-bold text-white">
              {unread}
            </span>
          ) : null}
        </button>

        {/* user */}
        <Link href="/demo/erp/login" aria-label="ออกจากระบบหรือเปลี่ยนผู้ใช้" className="flex shrink-0 items-center gap-2 rounded-lg px-1.5 py-1.5 hover:bg-slate-100 sm:px-2">
          <span className="grid size-8 place-items-center rounded-full bg-[#0E1A34] font-display text-xs font-bold text-white">
            MK
          </span>
          <span className="hidden text-left leading-tight md:block">
            <span className="block text-xs font-bold text-slate-700">คุณมาร์ค</span>
            <span className="block text-[10px] text-slate-400">Owner / CEO</span>
          </span>
        </Link>
      </div>

      <Drawer open={notifOpen} onClose={() => setNotifOpen(false)} title="การแจ้งเตือน">
        <div className="mb-3 flex justify-end">
          <button className="btn-ghost !py-1 text-[11px]" onClick={() => erp.markNotificationsRead()}>
            ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
          </button>
        </div>
        <div className="space-y-2.5">
          {erp.notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl border p-3.5 ${
                n.read ? "border-slate-100 bg-white" : "border-brand-200 bg-brand-50/50"
              }`}
            >
              <p className="text-[13px] font-bold text-slate-700">{n.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{n.detail}</p>
              <p className="mt-1.5 text-[10px] text-slate-400">{n.time}</p>
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  );
}
