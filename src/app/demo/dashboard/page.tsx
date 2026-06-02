import { DemoChrome } from "@/components/DemoChrome";
import { DashboardDemo } from "@/components/demos/DashboardDemo";
import { getDemo } from "@/lib/demos";
import { pageMetadata } from "@/lib/seo";

const demo = getDemo("dashboard")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ตัวอย่างระบบหลังบ้าน`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบหลังบ้าน", "Dashboard ธุรกิจ", "ระบบจัดการออเดอร์", demo.name],
});

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <DashboardDemo />
    </DemoChrome>
  );
}
