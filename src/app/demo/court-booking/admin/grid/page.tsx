import { Suspense } from "react";
import { SmashGridPage } from "@/components/demos/smashlane/pages/GridPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SmashLane — ตารางคอร์ท",
  description: "ตารางคอร์ทหลังบ้าน",
  path: "/demo/court-booking/admin/grid",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดตาราง…</div>}>
      <SmashGridPage />
    </Suspense>
  );
}
