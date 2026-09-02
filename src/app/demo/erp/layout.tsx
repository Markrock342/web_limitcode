import type { Metadata } from "next";
import { ErpProvider } from "@/components/demos/erp/lib/store";
import { ErpLocaleBridge } from "@/components/demos/erp/lib/LocaleBridge";
import "./erp-demo.css";

export const metadata: Metadata = {
  title: "LCS Enterprise ERP — Interactive Demo",
  description: "ระบบ ERP สำหรับธุรกิจนำเข้า จัดจำหน่าย จัดซื้อ คลังสินค้า การเงิน และ B2B CRM",
};

export default function ErpDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErpProvider>
      <ErpLocaleBridge />
      <div className="erp-demo min-h-screen bg-[#eef0ec] text-[#303832] antialiased">
        {children}
      </div>
    </ErpProvider>
  );
}
