"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Sidebar } from "@/components/demos/erp/components/layout/Sidebar";
import { Topbar } from "@/components/demos/erp/components/layout/Topbar";
import { CommandPalette } from "@/components/demos/erp/components/layout/CommandPalette";
import { ToastViewport } from "@/components/demos/erp/components/erp/ui";

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* desktop sidebar */}
      <div className="hidden shrink-0 lg:block">
        <Sidebar />
      </div>

      {/* mobile sidebar */}
      {mobileNav ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileNav(false)} />
          <div className="absolute inset-y-0 left-0 flex">
            <Sidebar onNavigate={() => setMobileNav(false)} />
            <button
              onClick={() => setMobileNav(false)}
              className="mt-4 grid size-9 place-items-center self-start border border-l-0 border-[#d9ddd7] bg-[#f7f8f5] text-[#303832]"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileNav(true)} onOpenPalette={() => setPalette(true)} />
        <main className="thin-scroll flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>

      <CommandPalette open={palette} onClose={() => setPalette(false)} />
      <ToastViewport />
    </div>
  );
}
