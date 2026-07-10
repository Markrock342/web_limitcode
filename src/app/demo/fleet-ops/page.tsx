import { BlueHomePage } from "@/components/demos/blueroute/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("fleet-ops")!;

export const metadata = pageMetadata({
  title: `${demo.name} — Dashboard`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบหลังบ้าน", "Job Order", "Fleet Dashboard", "ระบบซ่อมบำรุง", demo.name],
});

export default function Page() {
  return <BlueHomePage />;
}
