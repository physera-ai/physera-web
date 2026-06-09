import type { MetadataRoute } from "next";
import { SITE_NAME } from "./site-metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "Physera is a research and product lab rethinking applied intelligence.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
