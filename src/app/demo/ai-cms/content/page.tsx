import { NovaContentPage } from "@/components/demos/novaoracle/pages/ContentPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "NovaOracle AI — คอนเทนต์",
  description: "สร้าง Draft และเผยแพร่บทความ",
  path: "/demo/ai-cms/content",
});

export default function Page() {
  return <NovaContentPage />;
}
