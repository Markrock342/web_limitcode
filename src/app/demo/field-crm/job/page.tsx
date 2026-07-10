import { Suspense } from "react";
import { GuardJobPage } from "@/components/demos/guardnest/pages/JobPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GuardNest Field — สรุปงาน",
  description: "รายละเอียดงานหน้างานและอัปเดตสถานะ",
  path: "/demo/field-crm/job",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดสรุปงาน…</div>}>
      <GuardJobPage />
    </Suspense>
  );
}
