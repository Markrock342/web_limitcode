import { DemoChrome } from "@/components/DemoChrome";
import { VenueHiveProvider } from "@/components/demos/venuehive/store";
import { VenueHiveShell } from "@/components/demos/venuehive/VenueHiveShell";
import { getDemo } from "@/lib/demos";

const demo = getDemo("venue-booking")!;

export default function VenueBookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoChrome demo={demo}>
      <VenueHiveProvider>
        <VenueHiveShell>{children}</VenueHiveShell>
      </VenueHiveProvider>
    </DemoChrome>
  );
}
