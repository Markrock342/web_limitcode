import type { Metadata } from "next";
import { DemoChrome } from "@/components/DemoChrome";
import { CorporateDemo } from "@/components/demos/CorporateDemo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("corporate")!;

export const metadata: Metadata = {
  title: `${demo.name} — ตัวอย่างเว็บไซต์บริษัท | LIMIT CODE STUDIO`,
  description: demo.description,
};

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <CorporateDemo />
    </DemoChrome>
  );
}
