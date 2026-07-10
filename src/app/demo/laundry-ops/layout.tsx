import { DemoChrome } from "@/components/DemoChrome";
import { FreshFoldProvider } from "@/components/demos/freshfold/store";
import { FreshFoldShell } from "@/components/demos/freshfold/FreshFoldShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("laundry-ops")!;

export default function LaundryOpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <FreshFoldProvider>
        <FreshFoldShell>{children}</FreshFoldShell>
      </FreshFoldProvider>
    </DemoChrome>
  );
}
