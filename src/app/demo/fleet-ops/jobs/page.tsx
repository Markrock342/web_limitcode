import { Suspense } from "react";
import { BlueJobsPage } from "@/components/demos/blueroute/pages/JobsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BlueRoute Fleet — รายการงาน",
  description: "รายการงานซ่อมบำรุง กรองตามวัน สถานะ และช่าง",
  path: "/demo/fleet-ops/jobs",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดรายการงาน…</div>}>
      <BlueJobsPage />
    </Suspense>
  );
}
