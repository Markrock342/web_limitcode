import { DemoChrome } from "@/components/DemoChrome";
import { MediSlotProvider } from "@/components/demos/medislot/store";
import { MediSlotShell } from "@/components/demos/medislot/MediSlotShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("clinic-admin")!;

export default function ClinicAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <MediSlotProvider>
        <MediSlotShell>{children}</MediSlotShell>
      </MediSlotProvider>
    </DemoChrome>
  );
}
