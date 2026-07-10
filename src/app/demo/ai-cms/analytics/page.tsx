import { NovaAnalyticsPage } from "@/components/demos/novaoracle/pages/AnalyticsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NovaOracle AI — วิเคราะห์",
  description: "KPI สรุปผู้ใช้ เครดิต Persona และคอนเทนต์",
  path: "/demo/ai-cms/analytics",
});

export default function Page() {
  return <NovaAnalyticsPage />;
}
