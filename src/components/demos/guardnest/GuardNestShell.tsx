"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  RotateCcw,
  LogOut,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { GUEST_SESSION } from "@/components/demos/_shell/demoAuth";
import { BASE, guardNav, useGuardNest } from "./store";

const ICONS: Record<string, typeof LayoutDashboard> = {
  Dashboard: LayoutDashboard,
  งานทั้งหมด: ClipboardList,
  สรุปงาน: Wrench,
  ใบเสนอราคา: FileText,
  ปฏิทินทีม: CalendarDays,
  ลูกค้า: Users,
  สร้างงาน: Wrench,
  "บัญชีของฉัน": Users,
};

export function GuardNestShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state, reset, setState } = useGuardNest();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === BASE) return pathname === BASE || pathname === `${BASE}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const Nav = (
    <nav className="space-y-0.5 p-2">
      {guardNav.filter((item) => {
        const access = item.access ?? "all";
        return access === "all"
          || (access === "guest" && !state.session.loggedIn)
          || (access === "staff" && state.session.role === "staff")
          || (access === "member" && state.session.loggedIn);
      }).map((item) => {
        const active = isActive(item.href);
        const Icon = ICONS[item.label] ?? ClipboardList;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium transition ${
              active
                ? "bg-[#0f2744] text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon className="size-4 shrink-0 opacity-90" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-[88vh] bg-[#f0f2f5]">
      {/* Top bar — matches FleetCare cover */}
      <header className="sticky top-12 z-40 bg-[#0b1f3a] text-white">
        <div className="flex h-[52px] items-center gap-3 px-3 sm:px-5">
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="เปิดเมนู"
          >
            <Menu className="size-5" />
          </button>

          <Link href={BASE} className="flex shrink-0 items-center gap-2.5">
            <span className="flex size-8 items-center justify-center bg-sky-500">
              <ClipboardList className="size-4 text-white" strokeWidth={2} />
            </span>
            <span className="font-display text-sm font-bold tracking-wide sm:text-base">
              GUARDNEST
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 border-l border-white/15 pl-4 md:block">
            <p className="truncate text-sm font-semibold">ระบบ CRM / Job Order ทีมหน้างาน</p>
            <p className="truncate text-[11px] text-white/55">Field Service Operations</p>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden text-xs text-white/70 sm:inline">11 ก.ค. 2569</span>
            <button
              type="button"
              className="relative inline-flex size-8 items-center justify-center text-white/80 hover:text-white"
              aria-label="การแจ้งเตือน"
            >
              <Bell className="size-4" />
              <span className="absolute right-1 top-1 size-1.5 rounded-full bg-rose-500" />
            </button>
            {reset && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-white/70 hover:text-white"
                title="รีเซ็ตข้อมูลเดโม"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">รีเซ็ต</span>
              </button>
            )}
            {state.session.loggedIn ? (
              <div className="flex items-center gap-2 border-l border-white/15 pl-3">
                <User className="hidden size-3.5 sm:block" />
                <Link href={`${BASE}/account`} className="hidden text-xs font-medium sm:inline">{state.session.name}</Link>
                <button
                  type="button"
                  onClick={() => setState((current) => ({ ...current, session: GUEST_SESSION }))}
                  className="inline-flex items-center gap-1 px-2 py-1.5 text-xs text-white/80 hover:text-white"
                >
                  <LogOut className="size-3.5" />
                  <span className="hidden sm:inline">ออก</span>
                </button>
              </div>
            ) : (
              <Link href={`${BASE}/login`} className="border-l border-white/15 pl-3 text-xs font-semibold text-white/90 hover:text-white">
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-[calc(3rem+52px)] hidden h-[calc(100vh-3rem-52px)] w-[200px] shrink-0 overflow-y-auto border-r border-slate-200/80 bg-white lg:block">
          {Nav}
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-7 lg:py-6">{children}</main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="ปิด"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[78%] max-w-[260px] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="font-display text-sm font-bold text-[#0b1f3a]">GUARDNEST</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 text-slate-500"
                aria-label="ปิดเมนู"
              >
                <X className="size-4" />
              </button>
            </div>
            {Nav}
          </div>
        </div>
      )}
    </div>
  );
}
