import { DemoChrome } from "@/components/DemoChrome";
import { GuardNestProvider } from "@/components/demos/guardnest/store";
import { GuardNestShell } from "@/components/demos/guardnest/GuardNestShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("field-crm")!;

export default function FieldCrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <GuardNestProvider>
        <GuardNestShell>{children}</GuardNestShell>
      </GuardNestProvider>
    </DemoChrome>
  );
}
