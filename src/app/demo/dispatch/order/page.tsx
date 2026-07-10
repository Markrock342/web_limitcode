import { Suspense } from "react";
import { QuickOrderPage } from "@/components/demos/quickdrop/pages/OrderPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "QuickDrop Logistics — รายละเอียดออเดอร์",
  description: "ดูรายละเอียดออเดอร์และอัปเดตสถานะ",
  path: "/demo/dispatch/order",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดออเดอร์…</div>}>
      <QuickOrderPage />
    </Suspense>
  );
}
