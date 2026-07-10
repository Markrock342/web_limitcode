import { Suspense } from "react";
import { ShineJobPage } from "@/components/demos/shineauto/pages/JobPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ShineAuto Detail — รายละเอียดงาน",
  description: "รายละเอียดงานดีเทลลิ่งและเลื่อนสถานะ",
  path: "/demo/auto-detail/job",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดรายละเอียดงาน…</div>}>
      <ShineJobPage />
    </Suspense>
  );
}
