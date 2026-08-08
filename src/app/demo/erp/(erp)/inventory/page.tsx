"use client";

import Link from "next/link";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, num } from "@/components/demos/erp/lib/format";
import { KpiCard, PageHeader } from "@/components/demos/erp/components/erp/ui";
import { DonutChart } from "@/components/demos/erp/components/charts";

export default function InventoryOverview() {
  const erp = useErp();

  const totals = erp.products.reduce(
    (acc, p) => {
      const onHand = p.stock.reduce((s, w) => s + w.onHand, 0);
      const reserved = p.stock.reduce((s, w) => s + w.reserved, 0);
      const incoming = p.stock.reduce((s, w) => s + w.incoming, 0);
      acc.onHand += onHand;
      acc.reserved += reserved;
      acc.incoming += incoming;
      acc.available += onHand - reserved;
      acc.value += onHand * p.landedCost;
      acc.incomingValue += incoming * p.landedCost;
      return acc;
    },
    { onHand: 0, reserved: 0, incoming: 0, available: 0, value: 0, incomingValue: 0 },
  );

  const byCategory = Object.entries(
    erp.products.reduce<Record<string, number>>((acc, p) => {
      const v = p.stock.reduce((s, w) => s + w.onHand, 0) * p.landedCost;
      acc[p.category] = (acc[p.category] ?? 0) + v;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const lowStock = erp.products.filter(
    (p) => p.reorderPoint > 0 && p.stock.reduce((s, w) => s + w.onHand - w.reserved, 0) <= p.reorderPoint,
  );

  return (
    <div>
      <PageHeader
        title="Stock Overview"
        subtitle={`คลัง ${erp.warehouse} • มูลค่าสต็อกคิดตาม Landed Cost จริง`}
        actions={
          <Link href="/demo/erp/inventory/products" className="btn-primary text-xs">
            เปิด Product Master
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="มูลค่าสต็อกรวม" value={displayMoney(totals.value, erp.currency)} accent />
        <KpiCard label="Available" value={num(totals.available)} sub="ชิ้น พร้อมขาย" />
        <KpiCard label="Reserved" value={num(totals.reserved)} sub="จองให้ SO แล้ว" />
        <KpiCard label="Incoming / In Transit" value={num(totals.incoming)} sub={displayMoney(totals.incomingValue, erp.currency)} />
        <KpiCard label="QC Hold / Damaged" value="420" sub="รอตัดสินใจ" />
        <KpiCard label="SKU ต่ำกว่าจุดสั่งซื้อ" value={String(lowStock.length)} sub="ต้องเปิด PR/PO" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="card-pad">
          <p className="section-title">มูลค่าสต็อกตามหมวด</p>
          <DonutChart data={byCategory} />
        </div>

        <div className="card overflow-hidden xl:col-span-2">
          <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
            สต็อกรายสินค้า (Available = On Hand − Reserved)
          </p>
          <div className="thin-scroll overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th className="!text-right">On Hand</th>
                  <th className="!text-right">Reserved</th>
                  <th className="!text-right">Incoming</th>
                  <th className="!text-right">Available</th>
                  <th className="!text-right">มูลค่า (Landed)</th>
                </tr>
              </thead>
              <tbody>
                {erp.products.map((p) => {
                  const onHand = p.stock.reduce((s, w) => s + w.onHand, 0);
                  const reserved = p.stock.reduce((s, w) => s + w.reserved, 0);
                  const incoming = p.stock.reduce((s, w) => s + w.incoming, 0);
                  const available = onHand - reserved;
                  const low = p.reorderPoint > 0 && available <= p.reorderPoint;
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link href={`/demo/erp/inventory/products/${p.id}`} className="num font-bold text-brand-600 hover:underline">
                          {p.sku}
                        </Link>
                        <p className="text-[11px] text-slate-400">{p.nameTh}</p>
                      </td>
                      <td className="num !text-right">{num(onHand)}</td>
                      <td className="num !text-right text-violet-600">{num(reserved)}</td>
                      <td className="num !text-right text-sky-600">{num(incoming)}</td>
                      <td className={`num !text-right font-bold ${low ? "text-red-600" : "text-slate-800"}`}>
                        {num(available)} {low ? "⚠" : ""}
                      </td>
                      <td className="num !text-right font-semibold">
                        {displayMoney(onHand * p.landedCost, erp.currency)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {lowStock.length > 0 ? (
        <div className="card-pad mt-4 border-amber-200 bg-amber-50/50">
          <p className="text-[13px] font-bold text-amber-800">
            ⚠ สินค้าต่ำกว่าจุดสั่งซื้อ {lowStock.length} รายการ:{" "}
            {lowStock.map((p) => p.sku).join(", ")}
          </p>
          <p className="mt-1 text-xs text-amber-700/80">
            ระบบแนะนำให้เปิด Purchase Request ไปยัง Preferred Supplier — Lead Time นำเข้าจีนเฉลี่ย 30-40 วัน
          </p>
        </div>
      ) : null}
    </div>
  );
}
