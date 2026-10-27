import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
