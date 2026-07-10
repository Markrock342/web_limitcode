import { GuardHomePage } from "@/components/demos/guardnest/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getDemo } from "@/lib/demos";

const demo = getDemo("field-crm")!;

export const metadata = pageMetadata({
  title: `${demo.name} — Dashboard`,
  description: demo.description,
  path: `/demo/${demo.slug}`,
  keywords: ["รับทำระบบ CRM", "Job Order", "ระบบทีมหน้างาน", demo.name],
});

export default function Page() {
  return <GuardHomePage />;
}
