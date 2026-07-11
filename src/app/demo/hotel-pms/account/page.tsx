import { StayAccountPage } from "@/components/demos/staynest/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "StayNest — การจองของฉัน", description: "บัญชีสมาชิกและการจองโรงแรม", path: "/demo/hotel-pms/account" });
export default function Page() { return <StayAccountPage />; }
