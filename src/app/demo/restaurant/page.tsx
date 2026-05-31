import type { Metadata } from "next";
import { DemoChrome } from "@/components/DemoChrome";
import { RestaurantDemo } from "@/components/demos/RestaurantDemo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("restaurant")!;

export const metadata: Metadata = {
  title: `${demo.name} — ตัวอย่างเว็บร้านอาหาร | LIMIT CODE STUDIO`,
  description: demo.description,
};

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <RestaurantDemo />
    </DemoChrome>
  );
}
