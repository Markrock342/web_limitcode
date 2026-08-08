"use client";

/* =========================================================
   B2B Customer Portal — มุมมองลูกค้า (Demo: ABC Food Manufacturing)
   ========================================================= */

import Link from "next/link";
import { useState } from "react";
import {
  Download,
  FileText,
  LogOut,
  PackageSearch,
  RefreshCcw,
  Ship,
  Ticket,
} from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { daysOverdue, docGrand, docSubtotal, fmtDate, money, num } from "@/components/demos/erp/lib/format";
import { StatusBadge, ToastViewport } from "@/components/demos/erp/components/erp/ui";

const CUSTOMER_ID = "c1"; // ABC Food Manufacturing

const TABS = ["ใบเสนอราคา", "คำสั่งซื้อ", "ติดตามการนำเข้า", "ใบแจ้งหนี้ / Statement", "สั่งซื้อซ้ำ", "แจ้งความต้องการ"] as const;

export default function PortalPage() {
  const erp = useErp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("ใบเสนอราคา");

  const customer = erp.customers.find((c) => c.id === CUSTOMER_ID)!;
  const quotes = erp.quotations.filter((q) => q.customerId === CUSTOMER_ID);
  const orders = erp.salesOrders.filter((s) => s.customerId === CUSTOMER_ID);
  const invoices = erp.arInvoices.filter((i) => i.customerId === CUSTOMER_ID);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount - i.paid, 0);

  // shipment ที่เกี่ยวกับออเดอร์ของลูกค้า (ผ่าน sourcing → po)
  const relatedShipments = erp.shipments.filter((shp) => {
    const po = erp.purchaseOrders.find((p) => p.id === shp.poId);
    return po?.soId && orders.some((o) => o.id === po.soId);
  });

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      {/* portal topbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-sky-400 font-display text-xs font-bold text-white">
              LCS
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-slate-800">B2B Customer Portal</p>
              <p className="text-[10px] text-slate-400">LCS Enterprise ERP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold text-slate-700">{customer.name}</p>
              <p className="text-[10px] text-slate-400">คุณสมชาย (จัดซื้อ) • เครดิต {customer.paymentTermDays} วัน</p>
            </div>
            <Link href="/demo/erp/login" className="btn-outline !px-3 !py-2 text-xs">
              <LogOut size={13} />
              ออกจากระบบ
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-6">
        {/* summary */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="card p-4">
            <p className="text-xs text-slate-400">คำสั่งซื้อทั้งหมด</p>
            <p className="num mt-1 text-xl font-bold text-slate-800">{orders.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-slate-400">รอส่งมอบ</p>
            <p className="num mt-1 text-xl font-bold text-slate-800">
              {orders.filter((o) => !["Delivered", "Invoiced", "Paid"].includes(o.status)).length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-slate-400">ยอดค้างชำระ</p>
            <p className="num mt-1 text-xl font-bold text-red-600">{money(outstanding, "THB", 0)}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs text-slate-400">Shipment กำลังเข้ามา</p>
            <p className="num mt-1 text-xl font-bold text-brand-600">{relatedShipments.filter((s) => !s.received).length}</p>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                tab === t ? "bg-brand-600 text-white" : "bg-white text-slate-500 shadow-sm hover:text-brand-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === "ใบเสนอราคา" ? (
            <div className="space-y-3">
              {quotes.map((q) => (
                <div key={q.id} className="card flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="num text-[14px] font-bold text-slate-800">{q.number}</p>
                    <p className="text-xs text-slate-500">
                      {q.items[0]?.name} {q.items.length > 1 ? `+ อีก ${q.items.length - 1} รายการ` : ""}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">ยืนราคาถึง {fmtDate(q.validUntil)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="num text-[15px] font-bold text-slate-800">
                      {money(docGrand(q.items, q.vatPct), "THB", 0)}
                    </span>
                    <StatusBadge status={q.status} />
                    {q.status === "Sent" ? (
                      <button className="btn-primary !py-1.5 text-xs" onClick={() => erp.toast("อนุมัติใบเสนอราคาแล้ว — ทีมขายจะติดต่อกลับ", "success")}>
                        อนุมัติใบเสนอราคา
                      </button>
                    ) : null}
                    <button className="btn-outline !py-1.5 text-xs" onClick={() => erp.toast("Demo: ดาวน์โหลด PDF", "info")}>
                      <Download size={13} />
                      PDF
                    </button>
                  </div>
                </div>
              ))}
              <div className="card flex items-center justify-between p-5">
                <p className="text-[13px] text-slate-500">มี PO พร้อมสั่งซื้อแล้ว? อัปโหลดไฟล์ Customer PO ได้ที่นี่</p>
                <button className="btn-outline text-xs" onClick={() => erp.toast("Demo: อัปโหลด Customer PO (PDF)", "info")}>
                  <FileText size={13} />
                  อัปโหลด PO
                </button>
              </div>
            </div>
          ) : null}

          {tab === "คำสั่งซื้อ" ? (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="num text-[14px] font-bold text-slate-800">
                        {o.number} <span className="text-xs font-normal text-slate-400">• PO ของท่าน: {o.customerPO ?? "-"}</span>
                      </p>
                      <p className="text-xs text-slate-500">{o.items[0]?.name}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">กำหนดส่งมอบ {fmtDate(o.requiredDate)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="num text-[15px] font-bold">{money(docSubtotal(o.items) * 1.07, "THB", 0)}</span>
                      <StatusBadge status={o.status} />
                    </div>
                  </div>
                  {/* order progress สำหรับลูกค้า */}
                  <div className="mt-4 flex items-center gap-0 overflow-x-auto">
                    {["ยืนยันคำสั่งซื้อ", "จัดเตรียม / ผลิต", "สินค้าเข้าคลัง", "กำลังจัดส่ง", "ส่งมอบแล้ว"].map((step, i) => {
                      const map: Record<string, number> = {
                        Confirmed: 1, "Awaiting Stock": 1, Reserved: 2, Picking: 3, Packing: 3,
                        "Ready to Ship": 3, Delivered: 4, Invoiced: 4, Paid: 4,
                      };
                      const idx = map[o.status] ?? 0;
                      const done = i <= idx;
                      return (
                        <div key={step} className="flex shrink-0 items-center">
                          {i > 0 ? <span className={`h-px w-6 ${done ? "bg-brand-400" : "bg-slate-200"}`} /> : null}
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${done ? "bg-brand-50 text-brand-600" : "bg-slate-100 text-slate-400"}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "ติดตามการนำเข้า" ? (
            <div className="space-y-3">
              {relatedShipments.length === 0 ? (
                <div className="card p-8 text-center text-sm text-slate-400">ไม่มี Shipment ที่เกี่ยวข้องกับคำสั่งซื้อของท่าน</div>
              ) : (
                relatedShipments.map((s) => (
                  <div key={s.id} className="card p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-[#0E1A34]/5 text-[#0E1A34]">
                          <Ship size={18} />
                        </span>
                        <div>
                          <p className="text-[13px] font-bold text-slate-800">
                            การผลิตและขนส่งสำหรับคำสั่งซื้อของท่าน
                          </p>
                          <p className="text-xs text-slate-500">
                            เดินทางถึงไทย (ประมาณ): <span className="font-bold text-brand-600">{fmtDate(s.eta)}</span>
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={s.status} />
                    </div>
                    <p className="mt-3 rounded-lg bg-slate-50 px-3.5 py-2.5 text-xs text-slate-500">
                      <PackageSearch size={13} className="mr-1.5 inline text-brand-500" />
                      สินค้าอยู่ระหว่างขนส่งทางเรือจากโรงงาน — เมื่อถึงคลังและผ่าน QC แล้ว
                      ทีมงานจะนัดหมายการส่งมอบตามกำหนด {fmtDate("2026-10-25")}
                    </p>
                  </div>
                ))
              )}
            </div>
          ) : null}

          {tab === "ใบแจ้งหนี้ / Statement" ? (
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <p className="text-sm font-bold text-slate-700">
                  Statement — ยอดค้างชำระรวม <span className="num text-red-600">{money(outstanding, "THB", 0)}</span>
                </p>
                <button className="btn-outline !py-1.5 text-xs" onClick={() => erp.toast("Demo: ดาวน์โหลด Statement PDF", "info")}>
                  <Download size={13} />
                  ดาวน์โหลด Statement
                </button>
              </div>
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Invoice</th><th>วันที่</th><th>ครบกำหนด</th><th className="!text-right">ยอด</th><th className="!text-right">คงค้าง</th><th>สถานะ</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="num font-bold text-slate-700">{inv.number}</td>
                      <td>{fmtDate(inv.date)}</td>
                      <td className={daysOverdue(inv.dueDate) > 0 && inv.status !== "Paid" ? "font-bold text-red-600" : ""}>
                        {fmtDate(inv.dueDate)}
                      </td>
                      <td className="num !text-right">{money(inv.amount, "THB", 0)}</td>
                      <td className="num !text-right font-bold">{money(inv.amount - inv.paid, "THB", 0)}</td>
                      <td><StatusBadge status={inv.status} /></td>
                      <td>
                        <button className="text-xs font-semibold text-brand-600 hover:underline" onClick={() => erp.toast("Demo: ดาวน์โหลด Invoice PDF", "info")}>
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {tab === "สั่งซื้อซ้ำ" ? (
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { sku: "PKG-PET-500", name: "Custom PET Bottle 500 ml + โลโก้ ABC", last: "100,000 PCS", price: 8.5 },
                { sku: "PKG-CAP-28", name: "Plastic Cap 28 mm (White)", last: "100,000 PCS", price: 0.85 },
              ].map((p) => (
                <div key={p.sku} className="card flex items-center justify-between p-5">
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">{p.name}</p>
                    <p className="num text-[11px] text-slate-400">{p.sku} • ครั้งล่าสุด {p.last}</p>
                    <p className="num mt-1 text-sm font-bold text-brand-600">{money(p.price)} / ชิ้น</p>
                  </div>
                  <button className="btn-primary !py-2 text-xs" onClick={() => erp.toast(`ส่งคำขอสั่งซื้อซ้ำ ${p.sku} แล้ว — ทีมขายจะยืนยันราคาและคิวผลิต`, "success")}>
                    <RefreshCcw size={13} />
                    สั่งซื้อซ้ำ
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "แจ้งความต้องการ" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card-pad">
                <p className="section-title">ส่งคำขอ Sourcing สินค้าใหม่</p>
                <label className="label">สินค้า / สเปคที่ต้องการ</label>
                <textarea className="input min-h-24" placeholder="เช่น ขวด PET 750ml สีชา พร้อมฝาล็อค จำนวน 50,000 ชิ้น..." />
                <label className="label mt-3">แนบไฟล์อ้างอิง (รูป / Spec / Artwork)</label>
                <div className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-xs text-slate-400">
                  ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์ (Demo)
                </div>
                <button className="btn-primary mt-4 w-full text-xs" onClick={() => erp.toast("ส่งคำขอ Sourcing แล้ว — ทีมจัดหาจะติดต่อกลับภายใน 1 วันทำการ", "success")}>
                  ส่งคำขอ Sourcing
                </button>
              </div>
              <div className="card-pad">
                <p className="section-title">แจ้งปัญหา / Support Ticket</p>
                <label className="label">หัวข้อ</label>
                <input className="input" placeholder="เช่น สอบถามสถานะการส่งมอบ" />
                <label className="label mt-3">รายละเอียด</label>
                <textarea className="input min-h-24" placeholder="รายละเอียดเพิ่มเติม..." />
                <button className="btn-outline mt-4 w-full text-xs" onClick={() => erp.toast("เปิด Ticket แล้ว — เลขที่ TCK-2026-0112", "success")}>
                  <Ticket size={13} />
                  เปิด Ticket
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <p className="mt-10 text-center text-[11px] text-slate-400">
          ERP Demo by LIMIT CODE STUDIO • www.limitcode.shop • LINE OA @026iaomj
        </p>
      </main>
      <ToastViewport />
    </div>
  );
}
