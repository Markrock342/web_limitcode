import { Suspense } from "react";
import { FreshOrderPage } from "@/components/demos/freshfold/pages/OrderPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FreshFold Laundry — รายละเอียดงาน",
  description: "ดูรายละเอียดงานซักและอัปเดตสถานะ",
  path: "/demo/laundry-ops/order",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดงาน…</div>}>
      <FreshOrderPage />
    </Suspense>
  );
}
