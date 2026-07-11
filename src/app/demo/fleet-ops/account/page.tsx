import { BlueAccountPage } from "@/components/demos/blueroute/pages/AccountPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "BlueRoute Fleet — บัญชีของฉัน", description: "บัญชีผู้ใช้ BlueRoute Fleet", path: "/demo/fleet-ops/account" });
export default function Page() { return <BlueAccountPage />; }
