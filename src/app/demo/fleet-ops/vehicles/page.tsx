import { Suspense } from "react";
import { BlueVehiclesPage } from "@/components/demos/blueroute/pages/VehiclesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BlueRoute Fleet — ค้นหารถ",
  description: "ค้นหาโปรไฟล์รถและประวัติแจ้งซ่อม",
  path: "/demo/fleet-ops/vehicles",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังโหลดรายการรถ…</div>}>
      <BlueVehiclesPage />
    </Suspense>
  );
}
