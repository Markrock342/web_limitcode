"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check, FileText, PackageCheck, ReceiptText } from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { erpText } from "@/components/demos/erp/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const CAPABILITIES = [
  { icon: FileText, en: "Quotation to invoice", th: "ใบเสนอราคาถึงใบกำกับภาษี" },
  { icon: PackageCheck, en: "Purchasing and inventory", th: "จัดซื้อและสินค้าคงคลัง" },
  { icon: ReceiptText, en: "Receipts and accounting", th: "ใบเสร็จรับเงินและงานบัญชี" },
];

export default function LoginPage() {
  const router = useRouter();
  const erp = useErp();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const language = erp.language;
  const t = (en: string, th: string) => erpText(language, en, th);

  const login = () => {
    if (username.trim() !== "admin" || password !== "admin") {
      setError(t("Use admin / admin for this demo.", "เดโมนี้ใช้ชื่อผู้ใช้และรหัสผ่าน admin / admin"));
      return;
    }
    router.push("/demo/erp/dashboard?tour=1");
  };

  return (
    <main className="min-h-screen bg-[#eef0ec] px-4 py-6 text-[#202420] sm:px-8 lg:grid lg:grid-cols-[minmax(360px,0.86fr)_minmax(520px,1.14fr)] lg:gap-6 lg:p-6">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[560px] flex-col justify-between bg-[#18231f] p-7 text-[#edf2ec] sm:p-10 lg:mx-0 lg:max-w-none lg:p-12">
        <div>
          <div className="flex items-center justify-between gap-5 border-b border-[#415047] pb-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center bg-[#edf2ec] text-[12px] font-bold tracking-[-0.04em] text-[#18231f]">LCS</span>
              <div>
                <p className="text-sm font-semibold tracking-[0.01em]">LCS Enterprise</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-[#aab8ae]">Business operations system</p>
              </div>
            </div>
            <LanguageSwitcher size="compact" tone="onDark" />
          </div>

          <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#aab8ae]">ERP / Distribution / B2B</p>
          <h1 className="mt-4 max-w-lg text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            {t("One place for every business document.", "เอกสารธุรกิจทุกขั้นตอน อยู่ในระบบเดียว")}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#c1cbc3]">
            {t(
              "A working ERP demo for sales, purchasing, import, inventory and finance teams.",
              "เดโม ERP สำหรับทีมขาย จัดซื้อ นำเข้า คลังสินค้า และการเงิน พร้อมข้อมูลทดลองที่เชื่อมโยงกัน",
            )}
          </p>

          <div className="mt-12 border-t border-[#415047]">
            {CAPABILITIES.map((item) => (
              <div key={item.en} className="flex items-center gap-4 border-b border-[#415047] py-4 text-sm">
                <item.icon size={17} className="text-[#aab8ae]" />
                <span className="flex-1">{erpText(language, item.en, item.th)}</span>
                <Check size={14} className="text-[#93b69e]" />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 text-[10px] leading-5 text-[#87968b]">LIMIT CODE STUDIO · Interactive business system demo</p>
      </section>

      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[720px] items-center justify-center py-12 lg:mx-0 lg:max-w-none lg:py-0">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7c847c]">Demo access</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">{t("Sign in", "เข้าสู่ระบบ")}</h2>
            </div>
            <LanguageSwitcher size="full" />
          </div>

          <form
            className="border-y border-[#c6cbc4] py-8"
            onSubmit={(event) => {
              event.preventDefault();
              login();
            }}
          >
            <label className="block">
              <span className="text-[12px] font-semibold text-[#4c544d]">{t("Username", "ชื่อผู้ใช้")}</span>
              <input
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 h-11 w-full border border-[#b9c0b8] bg-[#f7f8f5] px-3.5 text-sm outline-none transition-colors focus:border-[#253d32] focus:ring-2 focus:ring-[#253d32]/10"
              />
            </label>
            <label className="mt-5 block">
              <span className="text-[12px] font-semibold text-[#4c544d]">{t("Password", "รหัสผ่าน")}</span>
              <input
                autoComplete="current-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 h-11 w-full border border-[#b9c0b8] bg-[#f7f8f5] px-3.5 text-sm outline-none transition-colors focus:border-[#253d32] focus:ring-2 focus:ring-[#253d32]/10"
              />
            </label>

            {error ? <p role="alert" className="mt-4 bg-[#f2dfd9] px-3 py-2.5 text-xs text-[#7e2f24]">{error}</p> : null}

            <button type="submit" className="mt-7 flex h-11 w-full items-center justify-between bg-[#202b26] px-4 text-sm font-semibold text-[#f5f7f3] transition-colors hover:bg-[#314139]">
              <span>{t("Open demo workspace", "เปิดพื้นที่ทำงานเดโม")}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-5 flex items-start justify-between gap-6 text-[11px] leading-5 text-[#727a72]">
            <p>{t("Demo credentials", "บัญชีสำหรับทดลอง")}<br /><strong className="font-semibold text-[#303630]">admin / admin</strong></p>
            <button onClick={() => router.push("/demo/erp/portal")} className="text-right font-semibold text-[#303630] underline decoration-[#9ba29a] underline-offset-4 hover:decoration-[#303630]">
              {t("Customer portal", "พอร์ทัลสำหรับลูกค้า")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
