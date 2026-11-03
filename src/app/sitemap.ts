import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { ERP_GUIDE_PATH } from "@/lib/erp-guide";

export default function sitemap(): MetadataRoute.Sitemap {
  // Canonical marketing pages only. Demo accounts/forms contain sample data.
  // Omit lastModified rather than reporting every build as a content change.
  return ["", "/services/erp", ERP_GUIDE_PATH, "/showcase", "/company-profile", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
