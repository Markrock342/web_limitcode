import { DemoChrome } from "@/components/DemoChrome";
import { PawCareProvider } from "@/components/demos/pawcare/store";
import { PawCareShell } from "@/components/demos/pawcare/PawCareShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("pet-clinic")!;

export default function PetClinicLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <PawCareProvider>
        <PawCareShell>{children}</PawCareShell>
      </PawCareProvider>
    </DemoChrome>
  );
}
