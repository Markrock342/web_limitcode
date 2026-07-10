import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { DEMOS, SYSTEM_DEMOS } from "@/lib/demos";

/** nested paths per system demo (beyond the slug root) */
const SYSTEM_PATHS: Record<string, string[]> = {
  "court-booking": ["book", "checkout", "success", "admin", "admin/grid"],
  "fleet-ops": ["login", "jobs", "job", "vehicles", "breakdown"],
  "field-crm": ["jobs", "job", "quotes", "calendar", "customers"],
  "clinic-admin": ["book", "appointments", "patients", "schedule", "admin"],
  "kitchen-board": ["reserve", "reservations", "kitchen", "menu", "orders"],
  "hotel-pms": ["front-desk", "rooms", "bookings", "housekeeping", "guests"],
  "gym-admin": ["members", "classes", "checkin", "packages", "reports"],
  "ai-cms": ["users", "plans", "personas", "content", "analytics"],
  "tutor-admin": ["book", "schedule", "tutors", "students", "admin"],
  dispatch: ["orders", "order", "couriers", "zones", "summary"],
  "laundry-ops": ["pickup", "orders", "order", "pricing", "customers"],
  "cowork-desk": ["book", "spaces", "members", "checkin", "admin"],
  "pet-clinic": ["book", "appointments", "patients", "vets", "admin"],
  "venue-booking": ["venues", "book", "events", "quotes", "admin"],
  "auto-detail": ["book", "bays", "jobs", "job", "members"],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const legacyDemos = DEMOS.filter((d) => !d.liveUrl && !SYSTEM_DEMOS.some((s) => s.slug === d.slug)).map(
    (d) => ({
      url: `${SITE_URL}/demo/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  const systemPages = SYSTEM_DEMOS.flatMap((d) => {
    const root = {
      url: `${SITE_URL}/demo/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    };
    const nested = (SYSTEM_PATHS[d.slug] ?? []).map((path) => ({
      url: `${SITE_URL}/demo/${d.slug}/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));
    return [root, ...nested];
  });

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/showcase`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...systemPages,
    ...legacyDemos,
  ];
}
