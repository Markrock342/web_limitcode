import type { Metadata } from "next";
import { DemoChrome } from "@/components/DemoChrome";
import { DashboardDemo } from "@/components/demos/DashboardDemo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("dashboard")!;

export const metadata: Metadata = {
  title: `${demo.name} — ตัวอย่างระบบหลังบ้าน | LIMIT CODE STUDIO`,
  description: demo.description,
};

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <DashboardDemo />
    </DemoChrome>
  );
}
