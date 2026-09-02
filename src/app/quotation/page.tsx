import type { Metadata } from "next";
import { QuotationIndexView } from "@/components/quotation/QuotationIndexView";

export const metadata: Metadata = {
  title: "ใบเสนอราคา — Limit Code Studio",
  robots: { index: false, follow: false },
};

export default function QuotationIndexPage() {
  return <QuotationIndexView />;
}
