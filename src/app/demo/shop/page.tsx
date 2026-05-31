import type { Metadata } from "next";
import { DemoChrome } from "@/components/DemoChrome";
import { ShopDemo } from "@/components/demos/ShopDemo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("shop")!;

export const metadata: Metadata = {
  title: `${demo.name} — ตัวอย่างเว็บขายของออนไลน์ | LIMIT CODE STUDIO`,
  description: demo.description,
};

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <ShopDemo />
    </DemoChrome>
  );
}
