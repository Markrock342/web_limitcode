import { DemoChrome } from "@/components/DemoChrome";
import { BookingDemo } from "@/components/demos/BookingDemo";
import { getDemo } from "@/lib/demos";
import { pageMetadata } from "@/lib/seo";

const demo = getDemo("booking")!;

export const metadata = pageMetadata({
  title: `${demo.name} — ตัวอย่างระบบจองบริการ`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบจอง", "ระบบนัดหมาย", "เว็บคลินิก", "จองออนไลน์", demo.name],
});

export default function Page() {
  return (
    <DemoChrome demo={demo}>
      <BookingDemo />
    </DemoChrome>
  );
}
