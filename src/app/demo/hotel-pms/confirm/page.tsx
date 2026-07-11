import { Suspense } from "react";
import { StayConfirmPage } from "@/components/demos/staynest/pages/ConfirmPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "StayNest — ยืนยันการจอง", description: "รายละเอียดการจองห้องพัก", path: "/demo/hotel-pms/confirm" });
export default function Page() { return <Suspense fallback={<div className="p-6 text-sm text-slate-500">กำลังยืนยันการจอง…</div>}><StayConfirmPage /></Suspense>; }
