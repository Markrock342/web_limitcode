import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { DEMOS, SYSTEM_DEMOS } from "@/lib/demos";

/** nested paths per system demo (beyond the slug root) */
const SYSTEM_PATHS: Record<string, string[]> = {
  "court-booking": ["login", "account", "book", "checkout", "success", "admin", "admin/grid"],
  "fleet-ops": ["login", "account", "jobs", "job", "vehicles", "breakdown", "parts"],
  "field-crm": ["login", "account", "jobs", "job", "quotes", "calendar", "customers", "new-job"],
  "clinic-admin": ["login", "account", "book", "confirm", "appointments", "patients", "schedule", "admin"],
  "kitchen-board": ["login", "account", "reserve", "order", "reservations", "kitchen", "menu", "orders"],
  "hotel-pms": ["login", "account", "book", "confirm", "front-desk", "rooms", "bookings", "housekeeping", "guests"],
  "gym-admin": ["login", "account", "members", "classes", "book-class", "checkin", "packages", "reports"],
  "ai-cms": ["login", "account", "users", "plans", "personas", "content", "analytics", "credits"],
  "tutor-admin": ["login", "account", "book", "confirm", "schedule", "tutors", "students", "admin"],
  dispatch: ["login", "account", "create", "orders", "order", "couriers", "zones", "summary"],
  "laundry-ops": ["login", "account", "pickup", "orders", "order", "pricing", "customers"],
  "cowork-desk": ["login", "account", "book", "confirm", "spaces", "members", "checkin", "admin"],
  "pet-clinic": ["login", "account", "book", "confirm", "appointments", "patients", "vets", "admin"],
  "venue-booking": ["login", "account", "venues", "book", "confirm", "events", "quotes", "admin"],
  "auto-detail": ["login", "account", "book", "confirm", "bays", "jobs", "job", "members"],
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
    {
      url: `${SITE_URL}/company-profile`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...systemPages,
    ...legacyDemos,
  ];
}
