import { Suspense } from "react";
import { BlueJobPage } from "@/components/demos/blueroute/pages/JobPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BlueRoute Fleet — สรุปงาน",
  description: "รายละเอียดงานซ่อม อะไหล่ และค่าใช้จ่าย",
  path: "/demo/fleet-ops/job",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดสรุปงาน…</div>}>
      <BlueJobPage />
    </Suspense>
  );
}
