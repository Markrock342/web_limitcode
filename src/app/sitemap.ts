import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { DEMOS } from "@/lib/demos";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const demoPages = DEMOS.map((d) => ({
    url: `${SITE_URL}/demo/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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
    ...demoPages,
  ];
}
