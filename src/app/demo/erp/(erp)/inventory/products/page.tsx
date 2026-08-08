"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/components/demos/erp/types/erp";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, num } from "@/components/demos/erp/lib/format";
import { DataTable } from "@/components/demos/erp/components/erp/DataTable";
import { PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";

export default function ProductsPage() {
  const erp = useErp();
  const router = useRouter();

  const avail = (p: Product) => p.stock.reduce((s, w) => s + w.onHand - w.reserved, 0);

  return (
    <div>
      <PageHeader
        title="Product Master"
        subtitle="สินค้าและบรรจุภัณฑ์ทั้งหมด พร้อมต้นทุน Landed Cost และราคาขายหลายระดับ"
        actions={<button className="btn-primary text-xs" onClick={() => erp.toast("Demo: ฟอร์มสร้างสินค้าใหม่", "info")}>+ สินค้าใหม่</button>}
      />

      <DataTable<Product>
        rows={erp.products}
        searchKeys={(p) => `${p.sku} ${p.nameTh} ${p.nameEn} ${p.nameCn ?? ""} ${p.category}`}
        filters={[
          {
            label: "หมวดสินค้า",
            options: ["Rigid Packaging", "Food Packaging", "Flexible Packaging", "Corrugated"],
            match: (p, v) => p.category === v,
          },
          {
            label: "แหล่งผลิต",
            options: ["จีน (นำเข้า)", "ไทย"],
            match: (p, v) => (v === "ไทย" ? p.origin === "TH" : p.origin === "CN"),
          },
          {
            label: "ประเภท",
            options: ["Stock Item", "Made-to-order", "Custom Sourcing"],
            match: (p, v) => p.type === v,
          },
        ]}
        onRowClick={(p) => router.push(`/demo/erp/inventory/products/${p.id}`)}
        columns={[
          { key: "sku", label: "SKU", sortable: true, render: (p) => <span className="num font-bold text-brand-600">{p.sku}</span> },
          {
            key: "name",
            label: "สินค้า",
            render: (p) => (
              <div>
                <p className="font-semibold text-slate-800">{p.nameTh}</p>
                <p className="font-display text-[11px] text-slate-400">{p.nameEn}</p>
              </div>
            ),
          },
          { key: "category", label: "หมวด" },
          { key: "origin", label: "แหล่ง", align: "center", render: (p) => (p.origin === "CN" ? "🇨🇳 จีน" : "🇹🇭 ไทย") },
          {
            key: "avail",
            label: "พร้อมขาย",
            align: "right",
            sortable: true,
            sortValue: avail,
            render: (p) => {
              const a = avail(p);
              const low = a <= p.reorderPoint;
              return (
                <span className={`num font-semibold ${low ? "text-red-600" : "text-slate-700"}`}>
                  {num(a)}
                  {low ? " ⚠" : ""}
                </span>
              );
            },
          },
          {
            key: "incoming",
            label: "กำลังเข้า",
            align: "right",
            render: (p) => <span className="num text-slate-500">{num(p.stock.reduce((s, w) => s + w.incoming, 0))}</span>,
          },
          {
            key: "landed",
            label: "Landed Cost",
            align: "right",
            sortable: true,
            sortValue: (p) => p.landedCost,
            render: (p) => <span className="num">{displayMoney(p.landedCost, erp.currency)}</span>,
          },
          {
            key: "wholesale",
            label: "ราคาส่ง",
            align: "right",
            render: (p) => <span className="num font-semibold">{displayMoney(p.wholesalePrice, erp.currency)}</span>,
          },
          {
            key: "margin",
            label: "Margin",
            align: "right",
            render: (p) => {
              const mg = ((p.wholesalePrice - p.landedCost) / p.wholesalePrice) * 100;
              return <span className={`num font-bold ${mg >= 30 ? "text-emerald-600" : mg >= 15 ? "text-amber-600" : "text-red-600"}`}>{mg.toFixed(1)}%</span>;
            },
          },
          {
            key: "type",
            label: "ประเภท",
            render: (p) => (
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${p.type === "Stock Item" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}>
                {p.type}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
