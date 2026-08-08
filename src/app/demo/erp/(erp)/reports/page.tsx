"use client";

import { useState } from "react";
import Link from "next/link";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, docCost, docSubtotal, num } from "@/components/demos/erp/lib/format";
import { KpiCard, PageHeader } from "@/components/demos/erp/components/erp/ui";
import { HBarChart, PurchaseSplitChart, RevenueChart } from "@/components/demos/erp/components/charts";
import { MONTHLY_REVENUE, PURCHASE_CN_TH, SALES_BY_SALESPERSON } from "@/components/demos/erp/data/ops";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

const TABS = ["Profitability", "Sales", "Purchasing & Import", "Supplier Scorecard"] as const;

export default function ReportsPage() {
  const erp = useErp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Profitability");
  const m = (thb: number) => displayMoney(thb, erp.currency);

  /* ---- customer profitability (จาก SO จริงใน store) ---- */
  const customerRows = erp.customers
    .map((c) => {
      const orders = erp.salesOrders.filter((s) => s.customerId === c.id);
      const sales = orders.reduce((s, o) => s + docSubtotal(o.items), 0);
      const cogs = orders.reduce((s, o) => s + docCost(o.items), 0);
      const ar = erp.outstandingAR(c.id);
      return {
        id: c.id,
        name: c.name,
        sales,
        cogs,
        gp: sales - cogs,
        margin: sales > 0 ? ((sales - cogs) / sales) * 100 : 0,
        orders: orders.length,
        ar,
      };
    })
    .filter((r) => r.sales > 0)
    .sort((a, b) => b.gp - a.gp);

  /* ---- product profitability ---- */
  const productRows = erp.products
    .map((p) => {
      let qty = 0;
      let revenue = 0;
      for (const so of erp.salesOrders)
        for (const it of so.items)
          if (it.productId === p.id) {
            qty += it.qty;
            revenue += it.qty * it.unitPrice;
          }
      const cost = qty * p.landedCost;
      return {
        sku: p.sku,
        id: p.id,
        qty,
        revenue,
        avgPrice: qty ? revenue / qty : 0,
        landed: p.landedCost,
        gp: revenue - cost,
        margin: revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0,
      };
    })
    .filter((r) => r.qty > 0)
    .sort((a, b) => b.gp - a.gp);

  return (
    <div>
      <PageHeader
        title="Management Reports"
        subtitle="รายงานผู้บริหาร — กำไรต่อลูกค้า / SKU / พนักงานขาย จาก Landed Cost จริง"
      />

      {/* tabs */}
      <div className="mb-5 flex flex-wrap gap-1.5">
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

      {tab === "Profitability" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <KpiCard label="Gross Profit (เดือนนี้)" value={m(2_140_000)} sub="25.4% margin" accent />
            <KpiCard label="ลูกค้าที่ทำกำไรสูงสุด" value="ABC Food" sub={m(customerRows[0]?.gp ?? 0)} />
            <KpiCard label="SKU กำไรสูงสุด" value={productRows[0]?.sku ?? "-"} sub={m(productRows[0]?.gp ?? 0)} />
            <KpiCard label="Margin เฉลี่ยพอร์ต" value="27.2%" />
          </div>

          <div className="card overflow-hidden">
            <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
              Customer Profitability
            </p>
            <div className="thin-scroll overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>ลูกค้า</th>
                    <th className="!text-right">Sales</th>
                    <th className="!text-right">COGS (Landed)</th>
                    <th className="!text-right">Gross Profit</th>
                    <th className="!text-right">Margin</th>
                    <th className="!text-center">Orders</th>
                    <th className="!text-right">AR คงค้าง</th>
                  </tr>
                </thead>
                <tbody>
                  {customerRows.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <Link href={`/demo/erp/crm/customers/${r.id}`} className="font-semibold text-brand-600 hover:underline">
                          {r.name}
                        </Link>
                      </td>
                      <td className="num !text-right">{m(r.sales)}</td>
                      <td className="num !text-right text-slate-500">{m(r.cogs)}</td>
                      <td className="num !text-right font-bold text-emerald-600">{m(r.gp)}</td>
                      <td className="num !text-right font-bold">{r.margin.toFixed(2)}%</td>
                      <td className="num !text-center">{r.orders}</td>
                      <td className="num !text-right">{m(r.ar)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card overflow-hidden">
            <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
              Product Profitability
            </p>
            <div className="thin-scroll overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th className="!text-right">Revenue</th>
                    <th className="!text-right">Quantity</th>
                    <th className="!text-right">Avg Sell Price</th>
                    <th className="!text-right">Landed Cost</th>
                    <th className="!text-right">Gross Profit</th>
                    <th className="!text-right">Margin %</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((r) => (
                    <tr key={r.sku}>
                      <td>
                        <Link href={`/demo/erp/inventory/products/${r.id}`} className="num font-bold text-brand-600 hover:underline">
                          {r.sku}
                        </Link>
                      </td>
                      <td className="num !text-right">{m(r.revenue)}</td>
                      <td className="num !text-right">{num(r.qty)}</td>
                      <td className="num !text-right">{displayMoney(r.avgPrice, erp.currency, 2)}</td>
                      <td className="num !text-right text-slate-500">{displayMoney(r.landed, erp.currency, 2)}</td>
                      <td className="num !text-right font-bold text-emerald-600">{m(r.gp)}</td>
                      <td className={`num !text-right font-bold ${r.margin >= 30 ? "text-emerald-600" : "text-amber-600"}`}>
                        {r.margin.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {tab === "Sales" ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="card-pad xl:col-span-2">
            <p className="section-title">Revenue & Gross Profit (12 เดือน)</p>
            <RevenueChart data={MONTHLY_REVENUE} />
          </div>
          <div className="card-pad">
            <p className="section-title">ยอดขายตามพนักงานขาย vs เป้า</p>
            <HBarChart data={SALES_BY_SALESPERSON.map((s) => ({ name: s.name, value: s.value }))} />
            <div className="mt-2 space-y-1.5">
              {SALES_BY_SALESPERSON.map((s) => (
                <div key={s.name} className="flex justify-between text-xs text-slate-500">
                  <span>{s.name}</span>
                  <span className="num">
                    {((s.value / s.target) * 100).toFixed(0)}% ของเป้า {m(s.target)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-pad">
            <p className="section-title">Sales by Industry / Province (ตัวอย่าง)</p>
            <HBarChart
              data={[
                { name: "อาหาร-เครื่องดื่ม", value: 3_960_000 },
                { name: "ค้าปลีก", value: 1_680_000 },
                { name: "อุตสาหกรรม", value: 1_240_000 },
                { name: "HoReCa", value: 850_000 },
                { name: "อื่น ๆ", value: 690_000 },
              ]}
            />
          </div>
        </div>
      ) : null}

      {tab === "Purchasing & Import" ? (
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="card-pad">
            <p className="section-title">ยอดซื้อ จีน vs ไทย (6 เดือน)</p>
            <PurchaseSplitChart data={PURCHASE_CN_TH} />
          </div>
          <div className="card-pad">
            <p className="section-title">Import Performance</p>
            <div className="grid grid-cols-2 gap-3">
              <KpiCard label="Import Value (YTD)" value={m(13_670_000)} />
              <KpiCard label="Freight Cost (YTD)" value={m(1_120_000)} sub="8.2% ของมูลค่า" />
              <KpiCard label="Duty + ภาษี (YTD)" value={m(1_540_000)} />
              <KpiCard label="Avg Import Lead Time" value="34 วัน" sub="ETD → รับเข้าคลัง" />
              <KpiCard label="Shipment ล่าช้า" value="2 / 18" sub="11% (12 เดือน)" />
              <KpiCard label="Landed Cost เฉลี่ย" value="+22.9%" sub="เทียบราคาหน้าโรงงาน" />
            </div>
          </div>
        </div>
      ) : null}

      {tab === "Supplier Scorecard" ? (
        <div className="card overflow-hidden">
          <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
            Supplier Performance Scorecard
          </p>
          <div className="thin-scroll overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th className="!text-center">Quality</th>
                  <th className="!text-center">On-time Delivery</th>
                  <th className="!text-center">Rejected Rate</th>
                  <th className="!text-center">Avg Lead Time</th>
                  <th className="!text-right">Purchase Value</th>
                  <th className="!text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLIERS.filter((s) => ["China Supplier", "Thai Factory"].includes(s.type)).map((s) => (
                  <tr key={s.id}>
                    <td>
                      <span className="font-semibold text-slate-800">
                        {s.country === "CN" ? "🇨🇳 " : "🇹🇭 "}
                        {s.name}
                      </span>
                    </td>
                    <td className={`num !text-center font-bold ${s.qualityPct >= 94 ? "text-emerald-600" : "text-amber-600"}`}>
                      {s.qualityPct}%
                    </td>
                    <td className={`num !text-center font-bold ${s.onTimePct >= 90 ? "text-emerald-600" : "text-amber-600"}`}>
                      {s.onTimePct}%
                    </td>
                    <td className={`num !text-center ${s.rejectedPct <= 2 ? "text-slate-600" : "text-red-600"}`}>
                      {s.rejectedPct}%
                    </td>
                    <td className="num !text-center">{s.leadTimeDays} วัน</td>
                    <td className="num !text-right font-semibold">{m(s.purchaseValueYTD)}</td>
                    <td className="num !text-center font-bold text-amber-500">★ {s.rating.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
