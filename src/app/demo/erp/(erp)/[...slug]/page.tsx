"use client";

/* =========================================================
   Generic module pages — เมนูรองทั้งหมด render จาก registry นี้
   ทุกหน้ามีข้อมูลจริงจาก store / mock (ไม่มีหน้าเปล่า)
   ========================================================= */

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { useErp } from "@/components/demos/erp/lib/store";
import { daysOverdue, displayMoney, fmtDate, money, num } from "@/components/demos/erp/lib/format";
import { PageHeader, StatusBadge } from "@/components/demos/erp/components/erp/ui";
import { ACTIVITIES, AUDIT_LOGS, EMPLOYEES } from "@/components/demos/erp/data/ops";
import { SUPPLIERS } from "@/components/demos/erp/data/masters";

interface GenericConfig {
  title: string;
  subtitle?: string;
  note?: string;
  header: string[];
  rows: ReactNode[][];
}

function useConfig(slug: string): GenericConfig | null {
  const erp = useErp();
  const cName = (id: string) => erp.customers.find((c) => c.id === id)?.name ?? "-";
  const sName = (id: string) => SUPPLIERS.find((s) => s.id === id)?.name ?? "-";
  const m = (v: number) => displayMoney(v, erp.currency);

  switch (slug) {
    /* ---------------- CRM ---------------- */
    case "crm/leads":
      return {
        title: "Leads",
        subtitle: "โอกาสการขายขั้นต้นที่ยังไม่ผ่าน Qualification",
        header: ["ลูกค้า/บริษัท", "โอกาสการขาย", "มูลค่า", "แหล่งที่มา", "ผู้ดูแล", "ติดตามถัดไป", "สถานะ"],
        rows: erp.opportunities
          .filter((o) => ["New Lead", "Contacted", "Requirement"].includes(o.stage))
          .map((o) => [
            <span key="a" className="font-semibold text-slate-800">{o.customerName}</span>,
            o.title,
            <span key="b" className="num font-semibold">{m(o.value)}</span>,
            o.source ?? "-",
            o.salesperson,
            fmtDate(o.nextFollowUp),
            <StatusBadge key="c" status={o.stage === "New Lead" ? "Draft" : "Sent"} />,
          ]),
        note: "จัดการ Pipeline แบบเต็มได้ที่เมนู Sales Pipeline",
      };
    case "crm/contacts":
      return {
        title: "Contacts",
        subtitle: "ผู้ติดต่อของลูกค้าแต่ละบริษัท",
        header: ["ผู้ติดต่อ", "บริษัท", "โทรศัพท์", "อีเมล", "LINE"],
        rows: erp.customers.map((c) => [
          <span key="a" className="font-semibold text-slate-800">{c.contact}</span>,
          <Link key="b" href={`/demo/erp/crm/customers/${c.id}`} className="text-brand-600 hover:underline">{c.name}</Link>,
          <span key="c" className="num">{c.phone}</span>,
          c.email,
          c.line ?? "-",
        ]),
      };
    case "crm/activities":
      return {
        title: "Activities & Follow-ups",
        subtitle: "กิจกรรม CRM ล่าสุด และนัดติดตามที่กำลังจะถึง",
        header: ["วันที่", "ประเภท", "ลูกค้า", "รายละเอียด", "ผู้รับผิดชอบ"],
        rows: ACTIVITIES.map((a) => [
          fmtDate(a.date),
          <span key="t" className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase text-brand-600">{a.type}</span>,
          cName(a.customerId),
          a.note,
          a.owner,
        ]),
      };

    /* ---------------- Sales ---------------- */
    case "sales/customer-po":
      return {
        title: "Customer PO",
        subtitle: "ใบสั่งซื้อจากลูกค้า ที่ผูกกับ Sales Order ในระบบ",
        header: ["Customer PO", "ลูกค้า", "Sales Order", "วันที่", "มูลค่า", "สถานะ"],
        rows: erp.salesOrders
          .filter((s) => s.customerPO)
          .map((s) => [
            <span key="a" className="num font-bold text-slate-800">{s.customerPO}</span>,
            cName(s.customerId),
            <Link key="b" href={`/demo/erp/sales/orders/${s.id}`} className="num font-semibold text-brand-600 hover:underline">{s.number}</Link>,
            fmtDate(s.date),
            <span key="c" className="num">{m(s.items.reduce((t, i) => t + i.qty * i.unitPrice, 0) * 1.07)}</span>,
            <StatusBadge key="d" status={s.status} />,
          ]),
      };
    case "sales/price-lists":
      return {
        title: "Price Lists",
        subtitle: "โครงสร้างราคาหลายระดับ — Retail / Wholesale / Distributor / Customer-specific",
        header: ["SKU", "สินค้า", "Retail", "Wholesale", "Volume 1,000+", "Customer-specific"],
        rows: erp.products.map((p) => [
          <Link key="a" href={`/demo/erp/inventory/products/${p.id}`} className="num font-bold text-brand-600 hover:underline">{p.sku}</Link>,
          p.nameTh,
          <span key="b" className="num">{money(p.retailPrice)}</span>,
          <span key="c" className="num font-semibold">{money(p.wholesalePrice)}</span>,
          <span key="d" className="num">{money(p.volumePricing[p.volumePricing.length - 1]?.price ?? p.wholesalePrice)}</span>,
          p.id === "p1" ? <span key="e" className="num font-semibold text-brand-700">ABC Food: {money(8.5)}</span> : "-",
        ]),
        note: "ราคาเฉพาะลูกค้า (Contract Price) กำหนดที่หน้าโปรไฟล์ลูกค้าแต่ละราย",
      };
    case "sales/returns":
      return {
        title: "Sales Returns (RMA)",
        subtitle: "การรับคืนสินค้าจากลูกค้า",
        header: ["RMA", "ลูกค้า", "อ้างอิง SO", "เหตุผล", "จำนวน", "มูลค่า", "สถานะ"],
        rows: [
          ["RMA-2026-0021", "Bangkok Retail Supply", "SO-2026-0311", "สินค้าเสียหายจากขนส่ง", <span key="a" className="num">1,200 PCS</span>, <span key="b" className="num">{m(16_200)}</span>, <StatusBadge key="c" status="Approved" />],
          ["RMA-2026-0022", "Thai Premium Foods", "SO-2026-0328", "สเปคไม่ตรง (ฝาไม่พอดี)", <span key="a" className="num">500 PCS</span>, <span key="b" className="num">{m(3_200)}</span>, <StatusBadge key="c" status="Pending" />],
        ],
        note: "Workflow: แจ้งคืน → อนุมัติ RMA → รับสินค้าคืน → QC → คืนเงิน/ออก Credit Note",
      };
    case "sales/credit-notes":
      return {
        title: "Credit Notes",
        subtitle: "ใบลดหนี้",
        header: ["เลขที่", "ลูกค้า", "อ้างอิง Invoice", "เหตุผล", "มูลค่า", "วันที่"],
        rows: [
          ["CN-2026-0009", "Bangkok Retail Supply", "INV-2026-0801", "รับคืนสินค้าเสียหาย (RMA-2026-0021)", <span key="a" className="num">{m(16_200)}</span>, fmtDate("2026-07-22")],
        ],
      };

    /* ---------------- Sourcing ---------------- */
    case "sourcing/suppliers":
      return {
        title: "Supplier Discovery",
        subtitle: "ฐานข้อมูลซัพพลายเออร์จีน–ไทย สำหรับงาน Sourcing",
        header: ["Supplier", "ประเทศ", "ประเภท", "MOQ", "Lead Time", "Quality", "Rating"],
        rows: SUPPLIERS.filter((s) => ["China Supplier", "Thai Factory", "Thai Distributor"].includes(s.type)).map((s) => [
          <span key="a" className="font-semibold text-slate-800">{s.country === "CN" ? "🇨🇳 " : "🇹🇭 "}{s.name}</span>,
          s.country === "CN" ? "จีน" : "ไทย",
          s.type,
          s.moq ?? "-",
          `${s.leadTimeDays} วัน`,
          <span key="b" className="num font-bold text-emerald-600">{s.qualityPct}%</span>,
          <span key="c" className="num font-bold text-amber-500">★ {s.rating.toFixed(1)}</span>,
        ]),
        note: "ดู Scorecard เต็มได้ที่ Purchasing → Suppliers",
      };
    case "sourcing/samples":
      return {
        title: "Samples",
        subtitle: "การสั่งและติดตามตัวอย่างสินค้า",
        header: ["Sample", "โปรเจกต์", "Supplier", "ค่าตัวอย่าง", "ส่งถึง", "ผลตรวจ"],
        rows: [
          ["SMP-0041", <Link key="l" href="/demo/erp/sourcing/projects/src1" className="text-brand-600 hover:underline">SRC-2026-00128</Link>, "Guangzhou Premium Packaging", <span key="a" className="num">{m(3_500)}</span>, fmtDate("2026-06-10"), <StatusBadge key="b" status="Pass" />],
          ["SMP-0042", <Link key="l" href="/demo/erp/sourcing/projects/src1" className="text-brand-600 hover:underline">SRC-2026-00128</Link>, "Shenzhen Global Source", <span key="a" className="num">{m(2_800)}</span>, fmtDate("2026-06-12"), <StatusBadge key="b" status="Conditional Pass" />],
          ["SMP-0043", <Link key="l" href="/demo/erp/sourcing/projects/src2" className="text-brand-600 hover:underline">SRC-2026-00131</Link>, "Shenzhen Global Source", <span key="a" className="num">{m(4_200)}</span>, fmtDate("2026-08-02"), <StatusBadge key="b" status="Pending" />],
        ],
      };

    /* ---------------- Purchasing ---------------- */
    case "purchasing/requests":
      return {
        title: "Purchase Requests",
        subtitle: "คำขอซื้อจากทีมงาน ก่อนแปลงเป็น PO",
        header: ["PR", "ผู้ขอ", "รายการ", "จำนวน", "ประมาณการ", "สถานะ", ""],
        rows: [
          ["PR-2026-0088", "คลังสินค้า", "Food Grade Container 1000ml (ต่ำกว่า Reorder)", <span key="a" className="num">40,000 PCS</span>, <span key="b" className="num">{m(150_000)}</span>, <StatusBadge key="c" status="Converted" />, <Link key="d" href="/demo/erp/purchasing/orders/po4" className="text-xs font-semibold text-brand-600 hover:underline">→ PO-TH-2026-0204</Link>],
          ["PR-2026-0089", "ฝ่ายขาย (วิชัย ส.)", "Paper Cup 16 oz พิมพ์โลโก้ลูกค้าใหม่", <span key="a" className="num">30,000 PCS</span>, <span key="b" className="num">{m(38_000)}</span>, <StatusBadge key="c" status="Pending" />, ""],
        ],
      };

    /* ---------------- Import ---------------- */
    case "import/customs": {
      const inCustoms = erp.shipments.filter((s) => ["ถึงท่าเรือไทย", "Customs Clearance", "รอรับเข้าโกดัง"].includes(s.status));
      return {
        title: "Customs",
        subtitle: "พิธีการศุลกากรของ Shipment ที่ถึงไทยแล้ว",
        header: ["Shipment", "Broker", "ท่าเรือ", "Duty", "Import VAT", "เอกสาร", "สถานะ"],
        rows: inCustoms.map((s) => [
          <Link key="a" href={`/demo/erp/import/shipments/${s.id}`} className="num font-bold text-brand-600 hover:underline">{s.number}</Link>,
          "TP Customs Broker",
          s.portDest,
          <span key="b" className="num">{money(s.costs.find((c) => c.label === "Custom Duty")?.amount ?? 0, "THB", 0)}</span>,
          <span key="c" className="num">{money(s.costs.find((c) => c.label === "Import VAT")?.amount ?? 0, "THB", 0)}</span>,
          s.docs.join(", "),
          <StatusBadge key="d" status={s.status} />,
        ]),
        note: "Demo — แนวคิดหน้าจอเท่านั้น ไม่ใช่ระบบพิธีการศุลกากรจริง",
      };
    }
    case "import/schedule":
      return {
        title: "Shipping Schedule",
        subtitle: "ตาราง ETD / ETA ของทุก Shipment",
        header: ["Shipment", "Supplier", "Mode", "ETD", "ETA", "Port", "สถานะ"],
        rows: [...erp.shipments]
          .sort((a, b) => a.eta.localeCompare(b.eta))
          .map((s) => [
            <Link key="a" href={`/demo/erp/import/shipments/${s.id}`} className="num font-bold text-brand-600 hover:underline">{s.number}</Link>,
            sName(s.supplierId),
            s.mode,
            fmtDate(s.etd),
            <span key="b" className="font-semibold">{fmtDate(s.eta)}</span>,
            s.portDest,
            <StatusBadge key="c" status={s.status} />,
          ]),
      };

    /* ---------------- Inventory ---------------- */
    case "inventory/movement":
      return {
        title: "Stock Movement",
        subtitle: "ประวัติการเคลื่อนไหวสต็อก (รับเข้า / จ่ายออก / ปรับปรุง)",
        header: ["วันที่", "เอกสาร", "SKU", "ประเภท", "จำนวน", "คลัง", "ผู้ทำรายการ"],
        rows: [
          [fmtDate("2026-08-03"), "DO-2026-0405", "PKG-FGC-1000", <span key="a" className="font-semibold text-red-600">จ่ายออก (ขาย)</span>, <span key="b" className="num text-red-600">-10,000</span>, "Bangkok WH", "สมพร ก."],
          [fmtDate("2026-08-01"), "ADJ-2026-0014", "PKG-CTN-B01", <span key="a" className="font-semibold text-amber-600">ปรับปรุง (Count)</span>, <span key="b" className="num text-amber-600">-60</span>, "Bangkok WH", "สมพร ก."],
          [fmtDate("2026-07-15"), "GRN-2026-0071", "PKG-POUCH-CST", <span key="a" className="font-semibold text-emerald-600">รับเข้า (นำเข้า)</span>, <span key="b" className="num text-emerald-600">+120,000</span>, "Bangkok WH", "ชัยวัฒน์ อ."],
          [fmtDate("2026-07-12"), "TRF-2026-0009", "PKG-PET-500", <span key="a" className="font-semibold text-sky-600">โอนย้ายคลัง</span>, <span key="b" className="num">6,200</span>, "Bangkok → Chonburi", "สมพร ก."],
        ],
      };
    case "inventory/reservation": {
      const reserved = erp.salesOrders.filter((s) => ["Reserved", "Picking", "Packing", "Ready to Ship"].includes(s.status));
      return {
        title: "Stock Reservation",
        subtitle: "สต็อกที่ถูกจองให้ Sales Order",
        header: ["Sales Order", "ลูกค้า", "SKU", "จำนวนที่จอง", "คลัง", "สถานะ"],
        rows: reserved.flatMap((s) =>
          s.items.map((it) => [
            <Link key="a" href={`/demo/erp/sales/orders/${s.id}`} className="num font-bold text-brand-600 hover:underline">{s.number}</Link>,
            cName(s.customerId),
            <span key="b" className="num">{it.sku}</span>,
            <span key="c" className="num font-semibold text-violet-600">{num(it.qty)}</span>,
            s.warehouse,
            <StatusBadge key="d" status={s.status} />,
          ]),
        ),
      };
    }
    case "inventory/reorder": {
      const low = erp.products.filter((p) => p.reorderPoint > 0 && p.stock.reduce((t, w) => t + w.onHand - w.reserved, 0) <= p.reorderPoint);
      return {
        title: "Reorder Suggestions",
        subtitle: "สินค้าที่ต่ำกว่าจุดสั่งซื้อ — ระบบแนะนำปริมาณและซัพพลายเออร์",
        header: ["SKU", "Available", "Reorder Point", "แนะนำสั่ง", "Supplier", "Lead Time"],
        rows: low.map((p) => {
          const avail = p.stock.reduce((t, w) => t + w.onHand - w.reserved, 0);
          return [
            <Link key="a" href={`/demo/erp/inventory/products/${p.id}`} className="num font-bold text-brand-600 hover:underline">{p.sku}</Link>,
            <span key="b" className="num font-bold text-red-600">{num(avail)}</span>,
            <span key="c" className="num">{num(p.reorderPoint)}</span>,
            <span key="d" className="num font-semibold">{num(Math.max(p.moq, p.reorderPoint * 2 - avail))}</span>,
            sName(p.preferredSupplierId),
            `${p.leadTimeDays} วัน`,
          ];
        }),
      };
    }
    case "inventory/count":
      return {
        title: "Stock Count / Cycle Count",
        subtitle: "การตรวจนับสต็อก",
        header: ["รอบนับ", "คลัง", "ขอบเขต", "นับแล้ว", "ผลต่าง", "สถานะ"],
        rows: [
          ["CC-2026-08A", "Bangkok WH", "หมวด Corrugated (2 SKU)", <span key="a" className="num">2/2</span>, <span key="b" className="num text-amber-600">-60 ชิ้น</span>, <StatusBadge key="c" status="Approved" />],
          ["CC-2026-08B", "Bangkok WH", "หมวด Food Packaging (4 SKU)", <span key="a" className="num">1/4</span>, "-", <StatusBadge key="c" status="Pending" />],
        ],
      };

    /* ---------------- Warehouse ---------------- */
    case "warehouse/receiving": {
      const incoming = erp.purchaseOrders.filter((p) => ["Approved", "Production", "Shipped"].includes(p.status));
      return {
        title: "Goods Receiving",
        subtitle: "รายการรอรับเข้า จาก PO / Shipment (รับเข้า → QC → Put Away)",
        header: ["PO / Shipment", "Supplier", "คาดว่าถึง", "จำนวนรวม", "QC", "สถานะ"],
        rows: [
          ...incoming.map((p) => {
            const shp = p.shipmentId ? erp.shipments.find((s) => s.id === p.shipmentId) : undefined;
            return [
              <span key="a">
                <Link href={`/demo/erp/purchasing/orders/${p.id}`} className="num font-bold text-brand-600 hover:underline">{p.number}</Link>
                {shp ? <Link href={`/demo/erp/import/shipments/${shp.id}`} className="num block text-[11px] text-slate-400 hover:underline">{shp.number}</Link> : null}
              </span>,
              sName(p.supplierId),
              fmtDate(p.expectedArrival),
              <span key="b" className="num">{num(p.items.reduce((t, i) => t + i.qty, 0))}</span>,
              "รอของถึง",
              <StatusBadge key="c" status={p.status} />,
            ];
          }),
          [
            <span key="a" className="num font-bold text-slate-500">GRN-2026-0071</span>,
            "Shenzhen Global Source",
            fmtDate("2026-07-15"),
            <span key="b" className="num">120,000</span>,
            <StatusBadge key="q" status="Pass" />,
            <StatusBadge key="c" status="Completed" />,
          ],
        ],
      };
    }
    case "warehouse/picking": {
      const picking = erp.salesOrders.filter((s) => ["Reserved", "Picking", "Packing", "Ready to Ship"].includes(s.status));
      return {
        title: "Picking & Packing",
        subtitle: "งานหยิบและแพ็คสินค้าตาม Sales Order",
        header: ["SO", "ลูกค้า", "รายการ", "จำนวนรวม", "กำหนดส่ง", "ขั้นตอน"],
        rows: picking.map((s) => [
          <Link key="a" href={`/demo/erp/sales/orders/${s.id}`} className="num font-bold text-brand-600 hover:underline">{s.number}</Link>,
          cName(s.customerId),
          `${s.items.length} รายการ`,
          <span key="b" className="num">{num(s.items.reduce((t, i) => t + i.qty, 0))}</span>,
          fmtDate(s.requiredDate),
          <StatusBadge key="c" status={s.status} />,
        ]),
        note: "กดเข้าไปที่ SO เพื่อเลื่อนขั้นตอน Picking → Packing → Ship ได้จริง",
      };
    }
    case "warehouse/tasks":
      return {
        title: "Warehouse Tasks",
        subtitle: "งานคลังวันนี้",
        header: ["งาน", "ประเภท", "อ้างอิง", "ผู้รับผิดชอบ", "กำหนด", "สถานะ"],
        rows: [
          ["รับเข้า + QC ตู้ SHP-2026-0086 (Air)", "Receiving", <Link key="l" href="/demo/erp/import/shipments/shp4" className="text-brand-600 hover:underline">SHP-2026-0086</Link>, "ทีมรับเข้า A", "วันนี้ 14:00", <StatusBadge key="s" status="Pending" />],
          ["หยิบสินค้า SO-2026-0358", "Picking", <Link key="l" href="/demo/erp/sales/orders/so3" className="text-brand-600 hover:underline">SO-2026-0358</Link>, "ทีมหยิบ B", "วันนี้ 15:30", <StatusBadge key="s" status="Picking" />],
          ["เตรียมพื้นที่รับตู้ 40'HQ (ETA 14 ส.ค.)", "Put Away", <Link key="l" href="/demo/erp/import/shipments/shp1" className="text-brand-600 hover:underline">SHP-2026-0091</Link>, "หัวหน้าคลัง", "13 ส.ค.", <StatusBadge key="s" status="Draft" />],
          ["Cycle Count หมวด Food Packaging", "Count", "CC-2026-08B", "ทีมนับสต็อก", "ศุกร์นี้", <StatusBadge key="s" status="Pending" />],
        ],
      };

    /* ---------------- Delivery ---------------- */
    case "delivery/orders":
      return {
        title: "Delivery Orders",
        subtitle: "ใบส่งสินค้าและสถานะการจัดส่ง พร้อม Proof of Delivery",
        header: ["DO", "ลูกค้า", "SO", "วันที่ส่ง", "รถ / คนขับ", "กล่อง", "น้ำหนัก", "สถานะ", "POD"],
        rows: erp.deliveries.map((d) => [
          <span key="a" className="num font-bold text-brand-600">{d.number}</span>,
          cName(d.customerId),
          <Link key="b" href={`/demo/erp/sales/orders/${d.soId}`} className="num text-brand-600 hover:underline">
            {erp.salesOrders.find((s) => s.id === d.soId)?.number ?? "-"}
          </Link>,
          fmtDate(d.date),
          `${d.vehicle} • ${d.driver}`,
          <span key="c" className="num">{num(d.packages)}</span>,
          <span key="d" className="num">{num(d.weightKg)} kg</span>,
          <StatusBadge key="e" status={d.status} />,
          d.status === "Delivered" ? (
            <span key="f" className="text-[11px] text-emerald-600">✓ ลายเซ็น + รูปถ่าย</span>
          ) : (
            <span key="f" className="text-[11px] text-slate-400">-</span>
          ),
        ]),
      };
    case "delivery/providers":
      return {
        title: "Shipping Providers",
        subtitle: "ผู้ให้บริการขนส่งในประเทศ",
        header: ["ผู้ให้บริการ", "ประเภท", "พื้นที่", "เรทเริ่มต้น", "SLA", "สถานะ"],
        rows: [
          ["รถบริษัท (6 ล้อ × 2)", "Own Fleet", "กทม.-ปริมณฑล + ตะวันออก", "-", "D+1", <StatusBadge key="s" status="Approved" />],
          ["Flash Express (B2B)", "3PL", "ทั่วประเทศ", <span key="a" className="num">{m(45)}/กล่อง</span>, "D+2", <StatusBadge key="s" status="Approved" />],
          ["ไทยขนส่งภาคตะวันออก", "Charter", "ชลบุรี-ระยอง", <span key="a" className="num">{m(3_500)}/เที่ยว</span>, "D+1", <StatusBadge key="s" status="Approved" />],
        ],
      };

    /* ---------------- Finance ---------------- */
    case "finance/credit":
      return {
        title: "Credit Control",
        subtitle: "วงเงินเครดิตลูกค้า B2B — ระบบเตือนอัตโนมัติเมื่อ SO ทำให้เกินวงเงิน",
        header: ["ลูกค้า", "วงเงิน", "คงค้าง (AR)", "คงเหลือ", "% ใช้ไป", "เทอม", "สถานะ"],
        rows: erp.customers.map((c) => {
          const out = erp.outstandingAR(c.id);
          const avail = c.creditLimit - out;
          const pct = c.creditLimit > 0 ? (out / c.creditLimit) * 100 : 0;
          return [
            <Link key="a" href={`/demo/erp/crm/customers/${c.id}`} className="font-semibold text-brand-600 hover:underline">{c.name}</Link>,
            <span key="b" className="num">{m(c.creditLimit)}</span>,
            <span key="c" className="num">{m(out)}</span>,
            <span key="d" className={`num font-bold ${avail < 0 ? "text-red-600" : "text-emerald-600"}`}>{m(avail)}</span>,
            <span key="e" className={`num font-bold ${pct > 90 ? "text-red-600" : pct > 70 ? "text-amber-600" : "text-slate-600"}`}>{pct.toFixed(0)}%</span>,
            `${c.paymentTermDays} วัน`,
            pct > 90 ? <StatusBadge key="f" status="Overdue" /> : pct > 70 ? <StatusBadge key="f" status="Pending" /> : <StatusBadge key="f" status="Approved" />,
          ];
        }),
        note: "SO ที่ทำให้เกินวงเงิน จะแสดงคำเตือน “วงเงินเครดิตไม่เพียงพอ” และต้องขออนุมัติผู้จัดการ",
      };
    case "finance/expenses":
      return {
        title: "Expenses",
        subtitle: "ค่าใช้จ่ายตามหมวด พร้อมแนบใบเสร็จ",
        header: ["วันที่", "หมวด", "รายละเอียด", "ผู้เบิก", "จำนวนเงิน", "ใบเสร็จ", "สถานะ"],
        rows: [
          [fmtDate("2026-08-05"), "Freight", "ค่า Freight SHP-2026-0091 (Ocean Link)", "ชัยวัฒน์ อ.", <span key="a" className="num">{m(85_000)}</span>, "📎 receipt-0871.pdf", <StatusBadge key="s" status="Approved" />],
          [fmtDate("2026-08-03"), "Travel", "เดินทางตรวจโรงงาน Guangzhou (รออนุมัติ)", "นิภา ก.", <span key="a" className="num">{m(62_000)}</span>, "📎 quote-trip.pdf", <StatusBadge key="s" status="Pending" />],
          [fmtDate("2026-07-30"), "Customs", "ค่า Broker + Port SHP-2026-0089", "ชัยวัฒน์ อ.", <span key="a" className="num">{m(34_500)}</span>, "📎 tpc-inv.pdf", <StatusBadge key="s" status="Approved" />],
          [fmtDate("2026-07-28"), "Sample", "ค่าตัวอย่าง Pouch (SRC-2026-00131)", "อรทัย พ.", <span key="a" className="num">{m(4_200)}</span>, "📎 slip.jpg", <StatusBadge key="s" status="Approved" />],
          [fmtDate("2026-07-25"), "Warehouse", "ค่าซ่อม Forklift + ชั้นวาง", "สมพร ก.", <span key="a" className="num">{m(18_700)}</span>, "📎 receipt.pdf", <StatusBadge key="s" status="Approved" />],
        ],
      };
    case "finance/cashflow":
      return {
        title: "Cash Flow (13-week view)",
        subtitle: "ประมาณการกระแสเงินสดจาก AR / AP / ค่าใช้จ่ายที่ผูกพัน",
        header: ["สัปดาห์", "เงินเข้า (AR)", "เงินออก (AP)", "ค่าใช้จ่ายดำเนินงาน", "สุทธิ", "เงินสดปลายงวด"],
        rows: [
          ["10-16 ส.ค.", <span key="a" className="num text-emerald-600">+{m(496_480)}</span>, <span key="b" className="num text-red-600">-{m(468_440)}</span>, <span key="c" className="num text-red-600">-{m(180_000)}</span>, <span key="d" className="num font-bold text-red-600">-{m(151_960)}</span>, <span key="e" className="num font-bold">{m(2_648_040)}</span>],
          ["17-23 ส.ค.", <span key="a" className="num text-emerald-600">+{m(428_000)}</span>, <span key="b" className="num text-red-600">-{m(96_300)}</span>, <span key="c" className="num text-red-600">-{m(165_000)}</span>, <span key="d" className="num font-bold text-emerald-600">+{m(166_700)}</span>, <span key="e" className="num font-bold">{m(2_814_740)}</span>],
          ["24-30 ส.ค.", <span key="a" className="num text-emerald-600">+{m(312_500)}</span>, <span key="b" className="num text-red-600">-{m(148_000)}</span>, <span key="c" className="num text-red-600">-{m(160_000)}</span>, <span key="d" className="num font-bold text-emerald-600">+{m(4_500)}</span>, <span key="e" className="num font-bold">{m(2_819_240)}</span>],
          ["31 ส.ค.-6 ก.ย.", <span key="a" className="num text-emerald-600">+{m(668_480)}</span>, <span key="b" className="num text-red-600">-{m(351_330)}</span>, <span key="c" className="num text-red-600">-{m(210_000)}</span>, <span key="d" className="num font-bold text-emerald-600">+{m(107_150)}</span>, <span key="e" className="num font-bold">{m(2_926_390)}</span>],
        ],
        note: "Demo — ตัวเลขจำลองเพื่อแสดงแนวคิดหน้าจอ",
      };
    case "finance/banks":
      return {
        title: "Bank Accounts",
        subtitle: "บัญชีธนาคารของบริษัท",
        header: ["ธนาคาร", "เลขบัญชี", "ประเภท", "สกุลเงิน", "ยอดคงเหลือ (Demo)"],
        rows: [
          ["กสิกรไทย (KBank)", <span key="a" className="num">012-3-45678-9</span>, "กระแสรายวัน — หลัก", "THB", <span key="b" className="num font-bold">{m(2_140_000)}</span>],
          ["กรุงเทพ (BBL)", <span key="a" className="num">987-6-54321-0</span>, "ออมทรัพย์ — สำรอง", "THB", <span key="b" className="num font-bold">{m(660_000)}</span>],
          ["กสิกรไทย FCD", <span key="a" className="num">012-8-11223-4</span>, "บัญชีเงินตราต่างประเทศ (T/T จีน)", "USD/CNY", <span key="b" className="num font-bold">{money(18_400, "USD", 0)}</span>],
        ],
      };

    /* ---------------- Accounting ---------------- */
    case "accounting/coa":
      return {
        title: "Chart of Accounts",
        subtitle: "ผังบัญชี (ตัวอย่างย่อ)",
        header: ["รหัส", "ชื่อบัญชี", "หมวด", "ยอดคงเหลือ (Demo)"],
        rows: [
          ["1100", "เงินสดและเงินฝากธนาคาร", "สินทรัพย์", <span key="a" className="num">{m(2_800_000)}</span>],
          ["1200", "ลูกหนี้การค้า", "สินทรัพย์", <span key="a" className="num">{m(2_723_988)}</span>],
          ["1300", "สินค้าคงเหลือ", "สินทรัพย์", <span key="a" className="num">{m(3_180_000)}</span>],
          ["1400", "สินค้าระหว่างทาง (GIT)", "สินทรัพย์", <span key="a" className="num">{m(2_250_000)}</span>],
          ["2100", "เจ้าหนี้การค้า", "หนี้สิน", <span key="a" className="num">{m(816_240)}</span>],
          ["2200", "ภาษีขายรอนำส่ง", "หนี้สิน", <span key="a" className="num">{m(186_000)}</span>],
          ["4100", "รายได้จากการขาย", "รายได้", <span key="a" className="num">{m(8_420_000)}</span>],
          ["5100", "ต้นทุนขาย (COGS)", "ค่าใช้จ่าย", <span key="a" className="num">{m(6_280_000)}</span>],
        ],
        note: "Demo — แนวคิดหน้าจอ ไม่ใช่ระบบบัญชีที่รับรองตามกฎหมาย",
      };
    case "accounting/journal":
      return {
        title: "Journal Entries",
        subtitle: "สมุดรายวันทั่วไป (ตัวอย่าง)",
        header: ["เลขที่", "วันที่", "รายการ", "เดบิต", "เครดิต", "อ้างอิง"],
        rows: [
          ["JV-2026-0912", fmtDate("2026-08-03"), "บันทึกขาย SO-2026-0349 (Thai Premium Foods)", <span key="a" className="num">ลูกหนี้ {m(68_480)}</span>, <span key="b" className="num">รายได้ {m(64_000)} + VAT {m(4_480)}</span>, "INV-2026-0889"],
          ["JV-2026-0913", fmtDate("2026-08-03"), "ตัดต้นทุนขาย (Landed Cost)", <span key="a" className="num">COGS {m(37_500)}</span>, <span key="b" className="num">สินค้าคงเหลือ {m(37_500)}</span>, "DO-2026-0405"],
          ["JV-2026-0908", fmtDate("2026-07-28"), "จ่าย Deposit 30% PO-CN-2026-0188 @4.78", <span key="a" className="num">เงินมัดจำ {m(351_330)}</span>, <span key="b" className="num">ธนาคาร {m(351_330)}</span>, "SINV-GZ-4471"],
        ],
        note: "Demo — แนวคิดหน้าจอ ไม่ใช่คำแนะนำด้านบัญชี/ภาษี",
      };
    case "accounting/vat":
      return {
        title: "VAT — ภาษีขาย / ภาษีซื้อ",
        subtitle: "สรุป VAT ประจำเดือน สิงหาคม 2026 (Demo)",
        header: ["รายการ", "ฐานภาษี", "VAT 7%", "หมายเหตุ"],
        rows: [
          ["ภาษีขาย (Output VAT)", <span key="a" className="num">{m(2_657_000)}</span>, <span key="b" className="num font-bold">{m(186_000)}</span>, "จากใบกำกับภาษีขาย 46 ฉบับ"],
          ["ภาษีซื้อ (Input VAT)", <span key="a" className="num">{m(1_642_000)}</span>, <span key="b" className="num font-bold">{m(114_940)}</span>, "รวม Import VAT ใบขนสินค้า"],
          ["สุทธิ (นำส่ง)", "", <span key="b" className="num font-bold text-brand-700">{m(71_060)}</span>, "ภ.พ.30 กำหนดยื่น 15 ก.ย."],
        ],
        note: "Demo — แนวคิดหน้าจอ ไม่ใช่คำแนะนำด้านภาษี",
      };
    case "accounting/wht":
      return {
        title: "Withholding Tax",
        subtitle: "ภาษีหัก ณ ที่จ่าย (Demo)",
        header: ["วันที่", "ผู้รับเงิน", "ประเภท", "อัตรา", "ฐาน", "ภาษีหัก"],
        rows: [
          [fmtDate("2026-08-01"), "Ocean Link Logistics", "ค่าขนส่ง (ทป.4)", "1%", <span key="a" className="num">{m(85_000)}</span>, <span key="b" className="num font-bold">{m(850)}</span>],
          [fmtDate("2026-07-30"), "TP Customs Broker", "ค่าบริการ", "3%", <span key="a" className="num">{m(18_000)}</span>, <span key="b" className="num font-bold">{m(540)}</span>],
        ],
      };
    case "accounting/trial-balance":
      return {
        title: "Trial Balance",
        subtitle: "งบทดลอง ณ 31 ก.ค. 2026 (Demo)",
        header: ["บัญชี", "เดบิต", "เครดิต"],
        rows: [
          ["เงินสดและเงินฝาก", <span key="a" className="num">{m(2_800_000)}</span>, ""],
          ["ลูกหนี้การค้า", <span key="a" className="num">{m(2_723_988)}</span>, ""],
          ["สินค้าคงเหลือ + GIT", <span key="a" className="num">{m(5_430_000)}</span>, ""],
          ["เจ้าหนี้การค้า", "", <span key="b" className="num">{m(816_240)}</span>],
          ["ทุน + กำไรสะสม", "", <span key="b" className="num">{m(7_997_748)}</span>],
          ["รายได้ (YTD)", "", <span key="b" className="num">{m(49_210_000)}</span>],
          ["ค่าใช้จ่าย (YTD)", <span key="a" className="num">{m(47_070_000)}</span>, ""],
        ],
      };
    case "accounting/pnl":
      return {
        title: "Profit & Loss",
        subtitle: "งบกำไรขาดทุน — สิงหาคม 2026 (Demo)",
        header: ["รายการ", "เดือนนี้", "% ของยอดขาย", "YTD"],
        rows: [
          [<span key="a" className="font-bold text-slate-800">รายได้จากการขาย</span>, <span key="b" className="num font-bold">{m(8_420_000)}</span>, "100%", <span key="c" className="num">{m(49_210_000)}</span>],
          ["ต้นทุนขาย (Landed COGS)", <span key="b" className="num">({m(6_280_000)})</span>, "74.6%", <span key="c" className="num">({m(36_850_000)})</span>],
          [<span key="a" className="font-bold text-emerald-700">กำไรขั้นต้น</span>, <span key="b" className="num font-bold text-emerald-700">{m(2_140_000)}</span>, "25.4%", <span key="c" className="num font-bold text-emerald-700">{m(12_360_000)}</span>],
          ["ค่าใช้จ่ายขายและบริหาร", <span key="b" className="num">({m(1_260_000)})</span>, "15.0%", <span key="c" className="num">({m(7_940_000)})</span>],
          [<span key="a" className="font-bold text-slate-800">กำไรจากการดำเนินงาน</span>, <span key="b" className="num font-bold">{m(880_000)}</span>, "10.5%", <span key="c" className="num font-bold">{m(4_420_000)}</span>],
        ],
        note: "Demo — ตัวเลขจำลอง ไม่ใช่งบการเงินจริง",
      };

    /* ---------------- Documents ---------------- */
    case "documents":
      return {
        title: "Document Center",
        subtitle: "เอกสารทั้งหมดในระบบ เชื่อมกับเอกสารต้นทาง",
        header: ["เอกสาร", "ประเภท", "อ้างอิง", "คู่ค้า", "วันที่", ""],
        rows: [
          ["Commercial Invoice GZ-4471", "Import", <Link key="l" href="/demo/erp/import/shipments/shp1" className="text-brand-600 hover:underline">SHP-2026-0091</Link>, "Guangzhou Premium Packaging", fmtDate("2026-07-28"), "📎 PDF"],
          ["Packing List GZ-4471", "Import", <Link key="l" href="/demo/erp/import/shipments/shp1" className="text-brand-600 hover:underline">SHP-2026-0091</Link>, "Guangzhou Premium Packaging", fmtDate("2026-07-28"), "📎 PDF"],
          ["Bill of Lading SITC-88421", "Import", <Link key="l" href="/demo/erp/import/shipments/shp1" className="text-brand-600 hover:underline">SHP-2026-0091</Link>, "SITC", fmtDate("2026-07-30"), "📎 PDF"],
          ["Form E (C/O)", "Import", <Link key="l" href="/demo/erp/import/shipments/shp1" className="text-brand-600 hover:underline">SHP-2026-0091</Link>, "-", fmtDate("2026-07-30"), "📎 PDF"],
          ["Quotation QT-2026-0215", "Sales", <Link key="l" href="/demo/erp/sales/quotations/q1" className="text-brand-600 hover:underline">QT-2026-0215</Link>, "ABC Food Manufacturing", fmtDate("2026-06-18"), "📎 PDF"],
          ["Customer PO ABC-PO-88041", "Sales", <Link key="l" href="/demo/erp/sales/orders/so1" className="text-brand-600 hover:underline">SO-2026-0342</Link>, "ABC Food Manufacturing", fmtDate("2026-06-25"), "📎 PDF"],
          ["Artwork ABC Logo (AI)", "Product Spec", <Link key="l" href="/demo/erp/sourcing/projects/src1" className="text-brand-600 hover:underline">SRC-2026-00128</Link>, "ABC Food Manufacturing", fmtDate("2026-06-17"), "📎 AI"],
          ["สัญญาซื้อขายรายปี SBP", "Contract", "-", "Siam Beverage Packaging", fmtDate("2026-01-05"), "📎 PDF"],
        ],
      };

    /* ---------------- Organization ---------------- */
    case "organization/employees":
      return {
        title: "Employees",
        subtitle: "พนักงานและสิทธิ์การใช้งานระบบ",
        header: ["พนักงาน", "ตำแหน่ง", "แผนก", "Role", "สถานะ"],
        rows: EMPLOYEES.map((e) => [
          <span key="a" className="font-semibold text-slate-800">{e.name}</span>,
          e.position,
          e.department,
          <span key="b" className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700">{e.role}</span>,
          <StatusBadge key="c" status="Approved" />,
        ]),
      };
    case "organization/departments":
      return {
        title: "Departments",
        subtitle: "โครงสร้างแผนก",
        header: ["แผนก", "หัวหน้า", "จำนวนพนักงาน", "โมดูลหลักที่ใช้"],
        rows: [
          ["Executive", "คุณมาร์ค", "2", "Dashboard, Reports, Approvals"],
          ["Sales", "วิชัย สุขสันต์", "3", "CRM, Quotation, SO"],
          ["Purchasing", "นิภา กาญจนา", "1", "Sourcing, RFQ, PO"],
          ["Import", "ชัยวัฒน์ อินทร", "1", "Import Control Tower, Landed Cost"],
          ["Warehouse", "สมพร แก้วใส", "1", "Receiving, Picking, Stock"],
          ["Accounting / Finance", "สุดา วรรณศรี", "2", "AR, AP, VAT, Reports"],
        ],
      };
    case "organization/roles":
      return {
        title: "Roles & Permissions",
        subtitle: "สิทธิ์การเข้าถึงตามบทบาท (Role-based Access Control)",
        header: ["Role", "Dashboard", "CRM/Sales", "Purchasing/Import", "Inventory", "Finance", "Approvals"],
        rows: [
          ["Owner / CEO", "✓ ทั้งหมด", "✓ ทั้งหมด", "✓ ทั้งหมด", "✓ ทั้งหมด", "✓ ทั้งหมด", "✓ อนุมัติทุกระดับ"],
          ["General Manager", "✓", "✓", "✓", "✓", "✓ ดู", "✓ ตามเพดาน"],
          ["Sales Manager", "✓ ฝ่ายขาย", "✓ ทั้งหมด", "อ่าน", "อ่าน", "AR เท่านั้น", "ส่วนลด ≤ 20%"],
          ["Sales", "✓ ของตัวเอง", "✓ ลูกค้าตัวเอง (ไม่เห็นต้นทุน)", "—", "ดูสต็อก", "—", "ส่งคำขอ"],
          ["Purchasing Manager", "✓ จัดซื้อ", "อ่าน", "✓ ทั้งหมด", "✓", "AP ดู", "PO ≤ ฿500,000"],
          ["Import Officer", "✓ นำเข้า", "—", "✓ Shipment/Landed", "รับเข้า", "—", "ส่งคำขอ"],
          ["Warehouse Staff", "—", "—", "GRN เท่านั้น", "✓ ปฏิบัติงาน", "—", "—"],
          ["Accounting", "✓ การเงิน", "อ่าน", "อ่าน", "อ่าน", "✓ ทั้งหมด", "Expense"],
          ["Viewer", "✓ ดูเท่านั้น", "อ่าน", "อ่าน", "อ่าน", "อ่าน", "—"],
        ],
        note: "Demo — แต่ละ Role เห็นเมนู/ปุ่มต่างกันในระบบจริง (เช่น Sales ไม่เห็น Margin ภายใน)",
      };

    /* ---------------- Settings ---------------- */
    case "settings/company":
      return {
        title: "Company / Branch",
        subtitle: "ข้อมูลบริษัทและสาขา",
        header: ["รายการ", "ค่า"],
        rows: [
          ["ชื่อบริษัท", "บริษัท แอลซีเอส เทรดดิ้ง จำกัด (Demo)"],
          ["เลขผู้เสียภาษี", <span key="a" className="num">0105569000111</span>],
          ["สาขา", "สำนักงานใหญ่ (กรุงเทพฯ) • สาขาชลบุรี"],
          ["คลังสินค้า", "Bangkok WH (บางนา) • Chonburi WH (อมตะซิตี้)"],
          ["ปีบัญชี", "1 ม.ค. – 31 ธ.ค."],
        ],
      };
    case "settings/currency":
      return {
        title: "Currency & Tax",
        subtitle: "สกุลเงินและอัตราภาษี",
        header: ["รายการ", "ค่า"],
        rows: [
          ["สกุลเงินหลัก", "THB (บาท)"],
          ["สกุลเงินรอง", "CNY (Book Rate 4.78) • USD (Book Rate 34.60)"],
          ["นโยบาย FX", "บันทึก Book Rate ณ วันเปิด PO และ Actual Rate ณ วันจ่าย — ผลต่างลง FX Gain/Loss"],
          ["VAT", "7%"],
          ["WHT", "1% ขนส่ง • 3% บริการ"],
        ],
      };
    case "settings/doc-number":
      return {
        title: "Document Numbering",
        subtitle: "รูปแบบเลขที่เอกสารอัตโนมัติ",
        header: ["เอกสาร", "รูปแบบ", "เลขล่าสุด"],
        rows: [
          ["Quotation", "QT-{YYYY}-{####}", <span key="a" className="num">QT-2026-0240</span>],
          ["Sales Order", "SO-{YYYY}-{####}", <span key="a" className="num">SO-2026-0361</span>],
          ["Purchase Order (นำเข้า)", "PO-CN-{YYYY}-{####}", <span key="a" className="num">PO-CN-2026-0192</span>],
          ["Purchase Order (ในประเทศ)", "PO-TH-{YYYY}-{####}", <span key="a" className="num">PO-TH-2026-0204</span>],
          ["Shipment", "SHP-{YYYY}-{####}", <span key="a" className="num">SHP-2026-0094</span>],
          ["Invoice / ใบกำกับภาษี", "INV-{YYYY}-{####}", <span key="a" className="num">INV-2026-0895</span>],
          ["Sourcing Project", "SRC-{YYYY}-{#####}", <span key="a" className="num">SRC-2026-00134</span>],
        ],
      };
    case "settings/audit":
      return {
        title: "Audit Logs",
        subtitle: "บันทึกการใช้งานระบบ — ใครแก้อะไร เมื่อไหร่",
        header: ["เวลา", "ผู้ใช้", "การกระทำ", "โมดูล", "รายการ", "ก่อน → หลัง", "IP"],
        rows: AUDIT_LOGS.map((a) => [
          <span key="a" className="num text-slate-500">{a.time}</span>,
          <span key="b" className="font-semibold text-slate-700">{a.user}</span>,
          a.action,
          a.module,
          <span key="c" className="num">{a.record}</span>,
          a.before ? (
            <span key="d" className="text-xs">
              <span className="text-red-500 line-through">{a.before}</span>
              {" → "}
              <span className="font-semibold text-emerald-600">{a.after}</span>
            </span>
          ) : (
            "-"
          ),
          <span key="e" className="num text-slate-400">{a.ip}</span>,
        ]),
      };

    default:
      return null;
  }
}

export default function GenericModulePage() {
  const params = useParams<{ slug: string[] }>();
  const slug = (params.slug ?? []).join("/");
  const config = useConfig(slug);

  if (!config) {
    return (
      <div>
        <PageHeader title="โมดูล (Demo)" subtitle={`เส้นทาง: /${slug}`} />
        <div className="card-pad text-center">
          <p className="text-sm text-slate-500">
            หน้านี้เป็นส่วนหนึ่งของสถาปัตยกรรมเต็มของระบบ — เปิดดูโมดูลหลักได้จากเมนูซ้ายมือ
          </p>
          <Link href="/demo/erp/dashboard" className="btn-primary mt-4 text-xs">
            กลับ Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={config.title} subtitle={config.subtitle} />
      <div className="card overflow-hidden">
        <div className="thin-scroll overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                {config.header.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {config.rows.length === 0 ? (
                <tr>
                  <td colSpan={config.header.length} className="!py-10 text-center text-slate-400">
                    ไม่มีรายการในขณะนี้
                  </td>
                </tr>
              ) : (
                config.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {config.note ? <p className="mt-3 text-xs text-slate-400">💡 {config.note}</p> : null}
    </div>
  );
}
