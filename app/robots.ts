import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Authenticated workspace pages carry a noindex directive in the app
        // layout. They must remain crawlable so search engines can read it.
        disallow: ["/api/"],
      },
    ],
    host: "https://invoicewala.shop",
    sitemap: "https://invoicewala.shop/sitemap.xml",
  };
}
