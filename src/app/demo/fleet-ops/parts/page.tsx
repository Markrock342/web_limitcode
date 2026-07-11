import { BluePartsPage } from "@/components/demos/blueroute/pages/PartsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "BlueRoute Fleet — คลังอะไหล่", description: "รายการและจำนวนคงเหลืออะไหล่รถ", path: "/demo/fleet-ops/parts" });
export default function Page() { return <BluePartsPage />; }
