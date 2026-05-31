import type { Metadata } from "next";
import { DemoChrome } from "@/components/DemoChrome";
import { BookingDemo } from "@/components/demos/BookingDemo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("booking")!;

export const metadata: Metadata = {
  title: `${demo.name} — ตัวอย่างระบบจองบริการ | LIMIT CODE STUDIO`,
  description: demo.description,
};

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <BookingDemo />
    </DemoChrome>
  );
}
