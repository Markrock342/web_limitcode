import type { Currency, DocItem } from "@/components/demos/erp/types/erp";
import { FX_RATES } from "@/components/demos/erp/data/ops";

const currencySymbol: Record<Currency, string> = {
  THB: "฿",
  CNY: "¥",
  USD: "$",
};

/** ฿125,450.00 */
export function money(n: number, currency: Currency = "THB", decimals = 2): string {
  return (
    currencySymbol[currency] +
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  );
}

/** แปลง THB → สกุลที่เลือกแสดงผล */
export function displayMoney(thb: number, display: Currency, decimals = 0): string {
  const v = thb / FX_RATES[display];
  return money(v, display, display === "THB" ? decimals : 0);
}

export function num(n: number): string {
  return n.toLocaleString("en-US");
}

export function pct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function fmtDate(iso: string): string {
  if (!iso || iso === "-") return "-";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
}

export const TODAY = "2026-08-08";

export function daysOverdue(dueDate: string): number {
  const due = new Date(dueDate + "T00:00:00").getTime();
  const today = new Date(TODAY + "T00:00:00").getTime();
  return Math.floor((today - due) / 86_400_000);
}

/* ---------- document math ---------- */

export function lineTotal(it: DocItem): number {
  const gross = it.qty * it.unitPrice;
  return gross * (1 - (it.discountPct ?? 0) / 100);
}

export function docSubtotal(items: DocItem[]): number {
  return items.reduce((s, it) => s + lineTotal(it), 0);
}

export function docVat(items: DocItem[], vatPct: number): number {
  return docSubtotal(items) * (vatPct / 100);
}

export function docGrand(items: DocItem[], vatPct: number): number {
  return docSubtotal(items) + docVat(items, vatPct);
}

/** margin ภายใน (ห้ามแสดงให้ลูกค้าเห็น) */
export function docMarginPct(items: DocItem[]): number {
  const rev = docSubtotal(items);
  const cost = items.reduce((s, it) => s + it.qty * (it.cost ?? 0), 0);
  if (rev === 0 || cost === 0) return 0;
  return ((rev - cost) / rev) * 100;
}

export function docCost(items: DocItem[]): number {
  return items.reduce((s, it) => s + it.qty * (it.cost ?? 0), 0);
}
