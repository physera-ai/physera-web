import type { MetadataRoute } from "next";

const SITE_URL = "https://physera.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-05-04",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
