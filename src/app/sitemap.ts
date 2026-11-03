import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Canonical marketing pages only. Demo accounts/forms contain sample data.
  // Omit lastModified rather than reporting every build as a content change.
  return ["", "/services/erp", "/showcase", "/company-profile", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
