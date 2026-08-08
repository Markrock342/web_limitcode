"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FileText, Package } from "lucide-react";
import { useErp } from "@/components/demos/erp/lib/store";
import { displayMoney, num } from "@/components/demos/erp/lib/format";
import { FieldRow, KpiCard, PageHeader } from "@/components/demos/erp/components/erp/ui";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const erp = useErp();
  const p = erp.products.find((x) => x.id === id);
  if (!p) return <p className="text-sm text-slate-500">ไม่พบสินค้า</p>;

  const m = (thb: number, d = 2) => displayMoney(thb, erp.currency, d);
  const supplier = SUPPLIERS.find((s) => s.id === p.preferredSupplierId);
  const totalOnHand = p.stock.reduce((s, w) => s + w.onHand, 0);
  const totalReserved = p.stock.reduce((s, w) => s + w.reserved, 0);
  const totalIncoming = p.stock.reduce((s, w) => s + w.incoming, 0);
  const available = totalOnHand - totalReserved;
  const marginWholesale = ((p.wholesalePrice - p.landedCost) / p.wholesalePrice) * 100;

  return (
    <div>
      <PageHeader
        title={`${p.sku} — ${p.nameTh}`}
        subtitle={`${p.nameEn}${p.nameCn ? ` • ${p.nameCn}` : ""} • ${p.category} / ${p.subcategory ?? "-"}`}
        actions={
          <>
            <Link href="/demo/erp/import/landed-cost" className="btn-outline text-xs">
              คำนวณ Landed Cost
            </Link>
            <button className="btn-primary text-xs" onClick={() => erp.toast("Demo: แก้ไขข้อมูลสินค้า", "info")}>
              แก้ไขสินค้า
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="พร้อมขาย (Available)" value={num(available)} sub={`Reorder ที่ ${num(p.reorderPoint)}`} accent />
        <KpiCard label="On Hand" value={num(totalOnHand)} />
        <KpiCard label="จองแล้ว (Reserved)" value={num(totalReserved)} />
        <KpiCard label="กำลังเข้า (Incoming)" value={num(totalIncoming)} />
        <KpiCard label="Landed Cost / หน่วย" value={m(p.landedCost)} />
        <KpiCard label="Margin ราคาส่ง" value={`${marginWholesale.toFixed(1)}%`} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {/* info */}
        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">ข้อมูลสินค้า</p>
            <FieldRow label="ประเภท" value={p.type} />
            <FieldRow label="หน่วยซื้อ / หน่วยขาย" value={`${p.purchaseUnit} / ${p.salesUnit}`} />
            <FieldRow label="MOQ" value={`${num(p.moq)} ${p.unit}`} />
            <FieldRow label="น้ำหนัก" value={`${p.weightKg} kg`} />
            <FieldRow label="CBM / หน่วย" value={<span className="num">{p.cbm}</span>} />
            <FieldRow label="ขนาด" value={p.dimensions ?? "-"} />
            <FieldRow label="Barcode" value={<span className="num">{p.barcode ?? "-"}</span>} />
            <FieldRow label="HS Code" value={<span className="num">{p.hsCode ?? "-"}</span>} />
            <FieldRow label="แหล่งผลิต" value={p.origin === "CN" ? "จีน (นำเข้า)" : "ไทย"} />
            <FieldRow
              label="Preferred Supplier"
              value={supplier ? supplier.name : "-"}
            />
            <FieldRow label="Lead Time" value={`${p.leadTimeDays} วัน`} />
          </div>

          {p.spec ? (
            <div className="card-pad">
              <p className="section-title">Packaging Specification</p>
              {p.spec.material ? <FieldRow label="Material" value={p.spec.material} /> : null}
              {p.spec.color ? <FieldRow label="Color" value={p.spec.color} /> : null}
              {p.spec.size ? <FieldRow label="Size" value={p.spec.size} /> : null}
              {p.spec.volume ? <FieldRow label="Volume" value={p.spec.volume} /> : null}
              {p.spec.thickness ? <FieldRow label="Thickness" value={p.spec.thickness} /> : null}
              {p.spec.printing ? <FieldRow label="Printing" value={p.spec.printing} /> : null}
              {p.spec.pantone ? <FieldRow label="Pantone" value={p.spec.pantone} /> : null}
              {p.spec.packagingType ? <FieldRow label="Packaging Type" value={p.spec.packagingType} /> : null}
              {p.spec.note ? <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">{p.spec.note}</p> : null}
            </div>
          ) : null}

          {p.attachments?.length ? (
            <div className="card-pad">
              <p className="section-title">ไฟล์แนบ (Spec / Artwork)</p>
              <div className="space-y-1.5">
                {p.attachments.map((f) => (
                  <button
                    key={f}
                    onClick={() => erp.toast(`Demo: เปิดไฟล์ ${f}`, "info")}
                    className="flex w-full items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2 text-left text-[13px] text-slate-600 hover:border-brand-300"
                  >
                    <FileText size={14} className="text-brand-500" />
                    {f}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* costs & prices */}
        <div className="space-y-4">
          <div className="card-pad">
            <p className="section-title">ต้นทุน</p>
            <FieldRow label="Standard Cost" value={<span className="num">{m(p.stdCost)}</span>} />
            <FieldRow label="Average Cost" value={<span className="num">{m(p.avgCost)}</span>} />
            <FieldRow label="Last Purchase Cost" value={<span className="num">{m(p.lastCost)}</span>} />
            <FieldRow
              label="Landed Cost"
              value={<span className="num font-bold text-brand-700">{m(p.landedCost)}</span>}
            />
            <p className="mt-2 text-[11px] text-slate-400">
              Landed Cost รวมค่าขนส่งระหว่างประเทศ อากร ภาษี และค่าใช้จ่ายนำเข้าที่ปันส่วนแล้ว
            </p>
          </div>

          <div className="card-pad">
            <p className="section-title">ราคาขาย</p>
            <FieldRow label="Retail Price" value={<span className="num">{m(p.retailPrice)}</span>} />
            <FieldRow label="Wholesale Price" value={<span className="num font-bold">{m(p.wholesalePrice)}</span>} />
            <p className="mb-2 mt-4 text-xs font-bold text-slate-500">Volume Pricing</p>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>จำนวน (ชิ้น)</th>
                  <th className="!text-right">ราคา/หน่วย</th>
                </tr>
              </thead>
              <tbody>
                {p.volumePricing.map((t, i) => (
                  <tr key={i}>
                    <td className="num">
                      {num(t.min)}
                      {t.max ? ` – ${num(t.max)}` : "+"}
                    </td>
                    <td className="num !text-right font-semibold">{m(t.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
              ราคาลูกค้ารายบริษัท (Customer-specific Price) กำหนดได้ที่ Price List ของลูกค้าแต่ละราย
            </p>
          </div>
        </div>

        {/* stock by warehouse */}
        <div className="space-y-4">
          <div className="card overflow-hidden">
            <p className="border-b border-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
              สต็อกตามคลัง
            </p>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>คลัง</th>
                  <th className="!text-right">On Hand</th>
                  <th className="!text-right">จอง</th>
                  <th className="!text-right">กำลังเข้า</th>
                  <th className="!text-right">พร้อมขาย</th>
                </tr>
              </thead>
              <tbody>
                {p.stock.map((w) => (
                  <tr key={w.warehouse}>
                    <td className="font-semibold">{w.warehouse}</td>
                    <td className="num !text-right">{num(w.onHand)}</td>
                    <td className="num !text-right text-violet-600">{num(w.reserved)}</td>
                    <td className="num !text-right text-sky-600">{num(w.incoming)}</td>
                    <td className="num !text-right font-bold">{num(w.onHand - w.reserved)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-pad">
            <p className="section-title">การเติมสต็อก</p>
            <FieldRow label="Safety Stock" value={<span className="num">{num(p.safetyStock)}</span>} />
            <FieldRow label="Reorder Point" value={<span className="num">{num(p.reorderPoint)}</span>} />
            {available <= p.reorderPoint ? (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5">
                <Package size={15} className="text-amber-600" />
                <p className="text-xs font-semibold text-amber-700">
                  ต่ำกว่าจุดสั่งซื้อ — ควรเปิด PR/PO กับ {supplier?.name ?? "ซัพพลายเออร์"}
                </p>
              </div>
            ) : null}
            <Link href="/demo/erp/purchasing/orders" className="btn-outline mt-3 w-full text-xs">
              เปิด Purchase Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
