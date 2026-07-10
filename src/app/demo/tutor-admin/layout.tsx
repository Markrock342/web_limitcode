import { DemoChrome } from "@/components/DemoChrome";
import { BrightSlotProvider } from "@/components/demos/brightslot/store";
import { BrightSlotShell } from "@/components/demos/brightslot/BrightSlotShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("tutor-admin")!;

export default function TutorAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <BrightSlotProvider>
        <BrightSlotShell>{children}</BrightSlotShell>
      </BrightSlotProvider>
    </DemoChrome>
  );
}
