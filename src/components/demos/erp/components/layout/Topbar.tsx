"use client";

import Link from "next/link";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";
import type { Currency } from "@/components/demos/erp/types/erp";
import { BRANCHES, WAREHOUSES } from "@/components/demos/erp/data/masters";
import { useErp } from "@/components/demos/erp/lib/store";
import { erpText, type UiLanguage } from "@/components/demos/erp/lib/i18n";
import { Drawer } from "@/components/demos/erp/components/erp/ui";

export function Topbar({ onMenu, onOpenPalette }: { onMenu: () => void; onOpenPalette: () => void }) {
  const erp = useErp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unread = erp.notifications.filter((item) => !item.read).length;
  const t = (en: string, th: string) => erpText(erp.language, en, th);

  return (
    <header className="sticky top-0 z-40 flex h-[68px] items-center gap-3 border-b border-[#d9ddd7] bg-[#f7f8f5] px-4 lg:px-5">
      <button type="button" aria-label={t("Open navigation", "เปิดเมนูหลัก")} onClick={onMenu} className="grid size-9 place-items-center text-[#4f5951] hover:bg-[#e9ece7] lg:hidden">
        <Menu size={18} />
      </button>

      <button
        onClick={onOpenPalette}
        className="hidden h-9 w-[min(360px,35vw)] items-center gap-2 border border-[#cfd4cd] bg-[#fbfcf9] px-3 text-left text-[12px] text-[#7d857e] transition-colors hover:border-[#8f9991] sm:flex"
      >
        <Search size={14} />
        <span className="flex-1 truncate">{t("Search customer, item or document", "ค้นหาลูกค้า สินค้า หรือเลขที่เอกสาร")}</span>
        <kbd className="border border-[#d8dcd6] px-1.5 py-0.5 text-[9px] text-[#8b928c]">⌘K</kbd>
      </button>
      <button type="button" aria-label={t("Search", "ค้นหา")} onClick={onOpenPalette} className="grid size-9 place-items-center text-[#4f5951] hover:bg-[#e9ece7] sm:hidden">
        <Search size={17} />
      </button>

      <div className="ml-auto flex min-w-0 items-center gap-1.5">
        <select
          className="hidden h-9 max-w-[170px] border-0 bg-transparent px-2 text-[11px] font-medium text-[#59625b] outline-none xl:block"
          value={erp.branch}
          onChange={(event) => erp.setBranch(event.target.value)}
          aria-label={t("Branch", "สาขา")}
        >
          {BRANCHES.map((branch) => <option key={branch}>{branch}</option>)}
        </select>

        <select
          className="hidden h-9 max-w-[135px] border-0 bg-transparent px-2 text-[11px] font-medium text-[#59625b] outline-none 2xl:block"
          value={erp.warehouse}
          onChange={(event) => erp.setWarehouse(event.target.value)}
          aria-label={t("Warehouse", "คลังสินค้า")}
        >
          {WAREHOUSES.map((warehouse) => <option key={warehouse}>{warehouse}</option>)}
        </select>

        <select
          className="h-9 border-0 bg-transparent px-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#59625b] outline-none"
          value={erp.language}
          onChange={(event) => erp.setLanguage(event.target.value as UiLanguage)}
          aria-label={t("Language", "ภาษา")}
        >
          <option value="th">TH</option>
          <option value="en">EN</option>
        </select>

        <select
          className="hidden h-9 border-0 bg-transparent px-1 text-[10px] font-bold text-[#59625b] outline-none sm:block"
          value={erp.currency}
          onChange={(event) => erp.setCurrency(event.target.value as Currency)}
          aria-label={t("Display currency", "สกุลเงินที่แสดง")}
        >
          <option>THB</option><option>CNY</option><option>USD</option>
        </select>

        <button
          type="button"
          aria-label={t("Notifications", "การแจ้งเตือน")}
          onClick={() => setNotificationsOpen(true)}
          className="relative grid size-9 place-items-center text-[#4f5951] hover:bg-[#e9ece7]"
        >
          <Bell size={17} />
          {unread > 0 ? <span className="absolute right-1 top-1 size-1.5 rounded-full bg-[#b74735]" /> : null}
        </button>

        <Link href="/demo/erp/login" className="ml-1 flex h-9 items-center gap-2 border-l border-[#d7dbd5] pl-3 text-[#313a33] hover:text-[#17231d]">
          <span className="grid size-7 place-items-center bg-[#26342d] text-[9px] font-bold uppercase text-[#f1f4f0]">AD</span>
          <span className="hidden text-left leading-tight md:block">
            <span className="block text-[11px] font-semibold">admin</span>
            <span className="block text-[9px] text-[#8a928b]">{t("Demo administrator", "ผู้ดูแลเดโม")}</span>
          </span>
          <ChevronDown size={12} className="hidden text-[#929991] md:block" />
        </Link>
      </div>

      <Drawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} title={t("Notifications", "การแจ้งเตือน")}>
        <div className="mb-3 flex justify-end">
          <button className="btn-ghost !py-1 text-[11px]" onClick={() => erp.markNotificationsRead()}>
            {t("Mark all as read", "ทำเครื่องหมายว่าอ่านแล้วทั้งหมด")}
          </button>
        </div>
        <div className="divide-y divide-[#e1e4df] border-y border-[#e1e4df]">
          {erp.notifications.map((item) => (
            <div key={item.id} className={`py-4 ${item.read ? "opacity-65" : ""}`}>
              <p className="text-[13px] font-semibold text-[#303832]">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#626b64]">{item.detail}</p>
              <p className="mt-2 text-[10px] text-[#919891]">{item.time}</p>
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  );
}
