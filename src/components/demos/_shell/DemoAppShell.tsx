"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, RotateCcw, User, X } from "lucide-react";
import type { DemoBrandMeta, DemoNavItem } from "./types";
import type { DemoSession } from "./demoAuth";
import { GUEST_SESSION } from "./demoAuth";

function filterNav(nav: DemoNavItem[], session: DemoSession): DemoNavItem[] {
  return nav.filter((item) => {
    const access = item.access ?? "all";
    if (access === "all") return true;
    if (access === "guest") return !session.loggedIn || session.role === "guest";
    if (access === "staff") return session.loggedIn && session.role === "staff";
    if (access === "member") return session.loggedIn && (session.role === "member" || session.role === "staff");
    return true;
  });
}

export function DemoAppShell({
  brand,
  nav,
  basePath,
  onReset,
  session,
  onLogout,
  children,
}: {
  brand: DemoBrandMeta;
  nav: DemoNavItem[];
  basePath: string;
  onReset?: () => void;
  session?: DemoSession;
  onLogout?: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sess = session ?? GUEST_SESSION;
  const visible = filterNav(nav, sess);

  const groups = visible.reduce<Record<string, DemoNavItem[]>>((acc, item) => {
    const g = item.group ?? "เมนู";
    (acc[g] ??= []).push(item);
    return acc;
  }, {});

  function isActive(href: string) {
    if (href === basePath) return pathname === basePath || pathname === `${basePath}/`;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const NavLinks = (
    <nav className="space-y-5">
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{group}</p>
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active ? `${brand.accentBg} ${brand.accentText}` : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-[88vh] bg-slate-50">
      <header className={`sticky top-12 z-40 border-b border-black/10 text-white ${brand.accent}`}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-xl bg-white/15 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="เปิดเมนู"
            >
              <Menu className="size-4" />
            </button>
            <Link href={basePath} className="min-w-0">
              <p className="truncate font-display text-base font-bold">{brand.name}</p>
              <p className="truncate text-[11px] text-white/75">{brand.subtitle}</p>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {sess.loggedIn ? (
              <div className="hidden items-center gap-2 sm:flex">
                <User className="size-3.5 opacity-80" />
                <span className="max-w-[120px] truncate text-xs font-medium">
                  {sess.name}
                  <span className="opacity-70"> · {sess.role}</span>
                </span>
                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-1 rounded-full border border-white/25 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/10"
                  >
                    <LogOut className="size-3" />
                    ออก
                  </button>
                )}
              </div>
            ) : (
              <Link
                href={`${basePath}/login`}
                className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25"
              >
                เข้าสู่ระบบ
              </Link>
            )}
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
              ม็อกอัพ
            </span>
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">รีเซ็ต</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-0 lg:gap-6 lg:px-6 lg:py-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">{NavLinks}</div>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-0 lg:py-0">{children}</main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="ปิด" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[80%] max-w-xs flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="font-display font-bold text-slate-900">{brand.name}</p>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100" aria-label="ปิดเมนู">
                <X className="size-4" />
              </button>
            </div>
            {sess.loggedIn && (
              <div className="border-b border-slate-100 px-4 py-3 text-xs text-slate-600">
                {sess.name} · {sess.role}
                {onLogout && (
                  <button type="button" onClick={onLogout} className="ml-2 font-semibold text-sky-600">
                    ออกจากระบบ
                  </button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-3">{NavLinks}</div>
          </div>
        </div>
      )}
    </div>
  );
}
