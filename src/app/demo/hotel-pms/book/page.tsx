import { StayBookPage } from "@/components/demos/staynest/pages/BookPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "StayNest — จองห้องพัก", description: "ขั้นตอนจองห้องพักออนไลน์", path: "/demo/hotel-pms/book" });
export default function Page() { return <StayBookPage />; }
