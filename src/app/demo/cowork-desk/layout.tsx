import { DemoChrome } from "@/components/DemoChrome";
import { NestDeskProvider } from "@/components/demos/nestdesk/store";
import { NestDeskShell } from "@/components/demos/nestdesk/NestDeskShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("cowork-desk")!;

export default function CoworkDeskLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <NestDeskProvider>
        <NestDeskShell>{children}</NestDeskShell>
      </NestDeskProvider>
    </DemoChrome>
  );
}
