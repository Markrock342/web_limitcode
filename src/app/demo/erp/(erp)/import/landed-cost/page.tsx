"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { money, num } from "@/components/demos/erp/lib/format";
import { PageHeader } from "@/components/demos/erp/components/erp/ui";

/* =========================================================
   Landed Cost Calculator — โมดูลสำคัญของธุรกิจนำเข้า
   ปันส่วนต้นทุนนำเข้าเข้าสินค้าแต่ละ SKU ได้หลายวิธี
   ========================================================= */

type AllocMethod = "มูลค่า (Value)" | "จำนวน (Quantity)" | "น้ำหนัก (Weight)" | "ปริมาตร (CBM)";

interface CalcLine {
  sku: string;
  name: string;
  qty: number;
  unitPriceCny: number;
  weightKg: number;
  cbm: number;
}

/* รวม 245,000 CNY — ตรงกับ Commercial Invoice ของ SHP-2026-0091 */
const DEFAULT_LINES: CalcLine[] = [
  { sku: "PKG-PET-500", name: "Custom PET Bottle 500 ml", qty: 100_000, unitPriceCny: 0.92, weightKg: 0.028, cbm: 0.00095 },
  { sku: "PKG-CAP-28", name: "Plastic Cap 28 mm", qty: 100_000, unitPriceCny: 0.083, weightKg: 0.003, cbm: 0.00008 },
  { sku: "PKG-TRAY-PP", name: "Plastic Tray PP", qty: 30_000, unitPriceCny: 0.29, weightKg: 0.018, cbm: 0.0004 },
  { sku: "PKG-CUP-16OZ", name: "Paper Cup 16 oz", qty: 100_000, unitPriceCny: 0.24, weightKg: 0.012, cbm: 0.0006 },
  { sku: "PKG-PPBOX-750", name: "PP Food Box 750 ml", qty: 80_000, unitPriceCny: 0.62, weightKg: 0.032, cbm: 0.0011 },
  { sku: "PKG-POUCH-CST", name: "Custom Printed Pouch", qty: 120_000, unitPriceCny: 0.52, weightKg: 0.008, cbm: 0.0002 },
];

interface CostInput {
  label: string;
  amount: number;
}

const DEFAULT_COSTS: CostInput[] = [
  { label: "International Freight", amount: 85_000 },
  { label: "Insurance", amount: 12_500 },
  { label: "Custom Duty", amount: 92_000 },
  { label: "Import VAT", amount: 95_000 },
  { label: "Custom Broker", amount: 18_000 },
  { label: "Port Charge", amount: 22_500 },
  { label: "Local Transportation", amount: 16_000 },
  { label: "Other", amount: 8_500 },
];

export default function LandedCostPage() {
  const erp = useErp();
  const [fxRate, setFxRate] = useState(4.78);
  const [method, setMethod] = useState<AllocMethod>("มูลค่า (Value)");
  const [costs, setCosts] = useState<CostInput[]>(DEFAULT_COSTS);
  const [includeVat, setIncludeVat] = useState(false);
  const lines = DEFAULT_LINES;

  const productCostCny = lines.reduce((s, l) => s + l.qty * l.unitPriceCny, 0);
  const productCostThb = productCostCny * fxRate;
  const allocCosts = costs.filter((c) => includeVat || c.label !== "Import VAT");
  const totalAddCosts = costs.reduce((s, c) => s + c.amount, 0);
  const totalAllocatable = allocCosts.reduce((s, c) => s + c.amount, 0);
  const totalLanded = productCostThb + totalAddCosts;

  const allocation = useMemo(() => {
    const basis = (l: CalcLine) => {
      switch (method) {
        case "มูลค่า (Value)":
          return l.qty * l.unitPriceCny * fxRate;
        case "จำนวน (Quantity)":
          return l.qty;
        case "น้ำหนัก (Weight)":
          return l.qty * l.weightKg;
        case "ปริมาตร (CBM)":
          return l.qty * l.cbm;
      }
    };
    const totalBasis = lines.reduce((s, l) => s + basis(l), 0);
    return lines.map((l) => {
      const share = totalBasis > 0 ? basis(l) / totalBasis : 0;
      const allocated = totalAllocatable * share;
      const originalUnit = l.unitPriceCny * fxRate;
      const allocPerUnit = allocated / l.qty;
      return {
        ...l,
        share,
        allocated,
        originalUnit,
        allocPerUnit,
        landedUnit: originalUnit + allocPerUnit,
      };
    });
  }, [lines, method, fxRate, totalAllocatable]);

  const setCost = (i: number, amount: number) =>
    setCosts((cs) => cs.map((c, idx) => (idx === i ? { ...c, amount } : c)));

  return (
    <div>
      <PageHeader
        title="Landed Cost Calculator"
        subtitle="คำนวณต้นทุนนำเข้าจริงต่อหน่วย — อ้างอิง Shipment SHP-2026-0091 (PO-CN-2026-0188)"
        actions={
          <button className="btn-primary text-xs" onClick={() => erp.toast("บันทึก Landed Cost เข้าตัวสินค้าแล้ว (Demo) — ต้นทุนเฉลี่ยจะอัปเดตใน Product Master", "success")}>
            <Calculator size={14} />
            บันทึกเข้าต้นทุนสินค้า
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {/* inputs */}
        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">มูลค่าสินค้า (Commercial Invoice)</p>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-[11px] text-slate-400">Product Cost (CNY)</p>
              <p className="num text-xl font-bold text-slate-800">{money(productCostCny, "CNY", 0)}</p>
            </div>
            <div className="mt-3">
              <label className="label">Exchange Rate (THB/CNY)</label>
              <input
                type="number"
                step="0.01"
                className="input num"
                value={fxRate}
                onChange={(e) => setFxRate(Number(e.target.value) || 0)}
              />
            </div>
            <div className="mt-3 rounded-xl bg-brand-50 p-4">
              <p className="text-[11px] text-brand-600">Product Cost (THB)</p>
              <p className="num text-xl font-bold text-brand-700">{money(productCostThb, "THB", 0)}</p>
            </div>
          </div>

          <div className="card-pad">
            <p className="section-title">ค่าใช้จ่ายนำเข้า (แก้ตัวเลขได้)</p>
            <div className="space-y-2">
              {costs.map((c, i) => (
                <div key={c.label} className="flex items-center gap-2">
                  <span className="w-40 shrink-0 text-xs text-slate-500">{c.label}</span>
                  <input
                    type="number"
                    className="input num !py-1.5 text-right"
                    value={c.amount}
                    onChange={(e) => setCost(i, Number(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>
            <label className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <input type="checkbox" checked={includeVat} onChange={(e) => setIncludeVat(e.target.checked)} />
              รวม Import VAT เข้าต้นทุน (กรณีเครดิตภาษีไม่ได้)
            </label>
            <div className="mt-3 flex justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-xs font-bold text-slate-500">รวมค่าใช้จ่ายนำเข้า</span>
              <span className="num text-sm font-bold text-slate-800">{money(totalAddCosts, "THB", 0)}</span>
            </div>
          </div>

          <div className="card-pad bg-gradient-to-br from-[#0E1A34] to-[#152546] !text-white">
            <p className="text-xs font-semibold text-slate-300">Total Landed Cost</p>
            <p className="num mt-1 text-[26px] font-bold">{money(totalLanded, "THB", 0)}</p>
            <p className="mt-1 text-[11px] text-slate-400">
              = สินค้า {money(productCostThb, "THB", 0)} + ค่าใช้จ่าย {money(totalAddCosts, "THB", 0)}
            </p>
          </div>
        </div>

        {/* allocation */}
        <div className="xl:col-span-2">
          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
              <p className="text-sm font-bold text-slate-700">การปันส่วนต้นทุน (Allocation)</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">ปันส่วนตาม:</span>
                <select className="input w-auto !py-1.5 text-xs" value={method} onChange={(e) => setMethod(e.target.value as AllocMethod)}>
                  <option>มูลค่า (Value)</option>
                  <option>จำนวน (Quantity)</option>
                  <option>น้ำหนัก (Weight)</option>
                  <option>ปริมาตร (CBM)</option>
                </select>
              </div>
            </div>
            <div className="thin-scroll overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th className="!text-right">จำนวน</th>
                    <th className="!text-right">สัดส่วน</th>
                    <th className="!text-right">ต้นทุนเดิม/หน่วย</th>
                    <th className="!text-right">ปันส่วนนำเข้า/หน่วย</th>
                    <th className="!text-right">Landed Cost/หน่วย</th>
                    <th className="!text-right">ต้นทุนรวม</th>
                  </tr>
                </thead>
                <tbody>
                  {allocation.map((l) => (
                    <tr key={l.sku}>
                      <td>
                        <p className="num font-bold text-brand-600">{l.sku}</p>
                        <p className="text-[11px] text-slate-400">{l.name}</p>
                      </td>
                      <td className="num !text-right">{num(l.qty)}</td>
                      <td className="num !text-right text-slate-500">{(l.share * 100).toFixed(1)}%</td>
                      <td className="num !text-right">{money(l.originalUnit)}</td>
                      <td className="num !text-right text-amber-600">+{money(l.allocPerUnit)}</td>
                      <td className="num !text-right font-bold text-slate-800">{money(l.landedUnit)}</td>
                      <td className="num !text-right font-semibold">{money(l.landedUnit * l.qty, "THB", 0)}</td>
                    </tr>
                  ))}
                  <tr className="!bg-slate-50">
                    <td className="font-bold text-slate-800">รวม</td>
                    <td className="num !text-right font-bold">{num(allocation.reduce((s, l) => s + l.qty, 0))}</td>
                    <td className="num !text-right font-bold">100%</td>
                    <td />
                    <td className="num !text-right font-bold text-amber-600">{money(totalAllocatable, "THB", 0)}</td>
                    <td />
                    <td className="num !text-right font-bold text-slate-800">
                      {money(allocation.reduce((s, l) => s + l.landedUnit * l.qty, 0), "THB", 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-pad mt-4">
            <p className="section-title">ผลกระทบต่อ Margin (ตัวอย่าง SKU หลัก)</p>
            {(() => {
              const pet = allocation.find((l) => l.sku === "PKG-PET-500");
              if (!pet) return null;
              const sellPrice = 8.5;
              const gm = ((sellPrice - pet.landedUnit) / sellPrice) * 100;
              return (
                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-3.5">
                    <p className="text-[11px] text-slate-400">ราคาขาย (Quotation ABC)</p>
                    <p className="num mt-1 text-[15px] font-bold text-slate-800">{money(sellPrice)} / pc</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3.5">
                    <p className="text-[11px] text-slate-400">Landed Cost</p>
                    <p className="num mt-1 text-[15px] font-bold text-slate-800">{money(pet.landedUnit)} / pc</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3.5">
                    <p className="text-[11px] text-emerald-600">กำไร / หน่วย</p>
                    <p className="num mt-1 text-[15px] font-bold text-emerald-700">{money(sellPrice - pet.landedUnit)}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3.5">
                    <p className="text-[11px] text-emerald-600">Gross Margin</p>
                    <p className="num mt-1 text-[15px] font-bold text-emerald-700">{gm.toFixed(1)}%</p>
                  </div>
                </div>
              );
            })()}
            <p className="mt-3 text-[11px] text-slate-400">
              * โหมด Manual allocation (กำหนดเอง) มีในระบบจริง — Demo นี้แสดง 4 วิธีอัตโนมัติ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
