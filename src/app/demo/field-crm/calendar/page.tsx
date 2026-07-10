import { GuardCalendarPage } from "@/components/demos/guardnest/pages/CalendarPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GuardNest Field — ปฏิทินทีม",
  description: "ตารางงานทีมหน้างานแยกตามวัน",
  path: "/demo/field-crm/calendar",
});

export default function Page() {
  return <GuardCalendarPage />;
}
